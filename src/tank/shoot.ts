import * as THREE from 'three';
import * as CANNON from 'cannon';  // Cannon.js のモジュールパスに合わせて修正

export function shoot(tankGroup: THREE.Group) {
    const shotDirection = new THREE.Vector3(0, 0, -1); // 例としてZ軸方向に射撃
    const shotStartPosition = tankGroup.position.clone(); // Tankの位置を取得

    createBall(shotStartPosition, shotDirection);
}

function createBall(position: THREE.Vector3, direction: THREE.Vector3) {
    // Cannon.js: ボールの物理演算の設定
    const ballShape = new CANNON.Sphere(0.1);
    const ballBody = new CANNON.Body({ mass: 1, shape: ballShape });
    ballBody.position.copy(new CANNON.Vec3(position.x, position.y, position.z));
    const forceMagnitude = 10; // 射撃の力の大きさ
    ballBody.velocity.copy(new CANNON.Vec3(direction.x * forceMagnitude, direction.y * forceMagnitude, direction.z * forceMagnitude));

    // Three.js: ボールのグラフィックスの設定
    const ballGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

    // Three.js Mesh と Cannon.js Body を関連付け
    ballMesh.userData.physicsBody = ballBody;
    ballBody.threeMesh = ballMesh;

    // シーンにボールを追加
    scene.add(ballMesh);

    // Cannon.js ワールドにボディを追加
    world.addBody(ballBody);
}

// 以下は Three.js シーンと Cannon.js ワールドの初期化などのコード
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

// 初期ループ
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    // Three.js シーンの更新
    for (const obj of scene.children) {
        if (obj.userData && obj.userData.physicsBody) {
            obj.position.copy(obj.userData.physicsBody.position);
            obj.quaternion.copy(obj.userData.physicsBody.quaternion);
        }
    }

    renderer.render(scene, camera);
}

animate();
