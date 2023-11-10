import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import type { ARScene } from "./scene";

export interface WebARDelegate {
    onRender?(renderer: THREE.Renderer): void;
    onPlaneFound?(pose: THREE.Matrix4): void;
    onARButton?(): void;
}

export class WebAR {
    // // scene = new THREE.Scene();
    // // renderer?: THREE.WebGLRenderer;
    baseNode = new THREE.Object3D();
    delegate?: WebARDelegate;

    findPlane: boolean = true;

    constructor() { }

    start(overlay_dom: string) {

        /* Container */
        const container = document.getElementById("threejs");
        if (!container) {
            console.log("sorry cannot get three-container");
            return;
        }

        /* Scene */
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        /* Light */
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        light.position.set(0.5, 1, 0.25);
        scene.add(light);

        /* RENDERER */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;
        container.appendChild(renderer.domElement);

        const overray_element = document.getElementById(overlay_dom)

        /* ARButton */
        const arbutton = ARButton.createButton(renderer, {
            requiredFeatures: ["hit-test"],
            domOverlay: { root: overray_element! }
        });
        arbutton.addEventListener('click', () => {
            scene.background = null;
            this.delegate?.onARButton?.();
        });
        document.body.appendChild(arbutton);

        /* Geometry */
        const reticle = new THREE.Mesh(
            new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
            new THREE.MeshBasicMaterial()
        );

        reticle.matrixAutoUpdate = false;
        reticle.visible = false;
        scene.add(reticle);

        // const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32).translate(
        //     0,
        //     0.1,
        //     0
        // );

        // const material = new THREE.MeshPhongMaterial({
        //     color: 0xffffff * Math.random(),
        // });

        // this.baseNode.add(new THREE.Mesh(geometry, material));

        this.baseNode.matrixAutoUpdate = false;
        scene.add(this.baseNode);

        /* Camera */
        const camera = new THREE.PerspectiveCamera( //ダミーカメラ。webxrが制御するため使われない
            70,
            window.innerWidth / window.innerHeight,
            0.01,
            20
        );

        // const onSelect = () => {
        //     if (reticle.visible) {
        //         const mesh = new THREE.Mesh(geometry, material);
        //         reticle.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
        //         mesh.scale.y = Math.random() * 2 + 1;
        //         scene.add(mesh);
        //     }
        // }
        // /* Controller */
        // const controller = renderer.xr.getController(0);
        // controller.addEventListener("select", onSelect);
        // scene.add(controller);


        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        /* ウィンドウリサイズ対応 */
        window.addEventListener("resize", onWindowResize);

        let hitTestSource: XRHitTestSource | null = null;
        let hitTestSourceRequested = false;

        const render = (timestamp: number, frame: XRFrame) => {
            if (frame) {
                const referenceSpace = renderer.xr.getReferenceSpace();
                if (!referenceSpace) {
                    console.log("sorry cannot get renderer referenceSpace");
                    return;
                }

                const session = renderer.xr.getSession();
                if (!session) {
                    console.log("sorry cannot get renderer session");
                    return;
                }


                if (this.findPlane) {
                    if (hitTestSourceRequested === false) {
                        session.requestReferenceSpace("viewer").then((referenceSpace) => {
                            session.requestHitTestSource!({ space: referenceSpace })!.then(
                                (source) => {
                                    hitTestSource = source;
                                }
                            );
                        });

                        session.addEventListener("end", () => {
                            hitTestSourceRequested = false;
                            hitTestSource = null;
                        });

                        hitTestSourceRequested = true;
                    }

                    if (hitTestSource) {
                        const hitTestResults = frame.getHitTestResults(hitTestSource);

                        if (hitTestResults.length) {
                            const hit = hitTestResults[0];

                            reticle.visible = true;
                            const pose_matrix_array = hit.getPose(referenceSpace)!.transform.matrix;
                            const pose_matrix = new THREE.Matrix4();
                            pose_matrix.fromArray(pose_matrix_array);
                            reticle.matrix = pose_matrix;
                            this.baseNode.matrix = pose_matrix;

                            this.delegate?.onPlaneFound?.(pose_matrix);
                        } else {
                            reticle.visible = false;
                        }
                    }
                }

            }

            this.delegate?.onRender?.(renderer);
            renderer.render(scene, camera);
        }
        // フレームごとに実行されるアニメーション
        renderer.setAnimationLoop(render);
    }
};