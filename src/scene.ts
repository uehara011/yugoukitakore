import * as THREE from 'three';
import useLogger from './logger';
const log = useLogger();

export interface ARScene {
    makeObjectTree(): THREE.Object3D;
    animate(sec: number): void;

    name(): string;
};

export class TestScene implements ARScene {
    cube?: THREE.Object3D;

    name() { return "test"; }
    makeObjectTree(): THREE.Object3D {
        // log.info("make object tree", this.name())
        const geometry = new THREE.BoxGeometry(1, 5, 5).translate(
            0,
            0,
            0
        );

        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
        });
        const cube = new THREE.Mesh(geometry, material);
        this.cube = cube
        return cube;
    }

    animate(sec: number): void {
        if (!this.cube) return;

        // 立方体を回転させるアニメーション
        //this.cube.rotation.x += 0.01;
    }
}



export async function loadSvgTexture(svgURL: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      // SVGテクスチャの読み込み処理を実装する
      // ここでは具体的なロジックを示していませんが、外部のライブラリや方法を使用してSVGをテクスチャとして読み込む処理を記述してください
      // 例: Three.jsのTextureLoaderを使用する場合
      const loader = new THREE.TextureLoader();
      loader.load(
        svgURL,
        (texture) => {
          resolve(texture);
        },
        undefined,
        (error) => {
          reject(error);
        }
      );
    });
  }
  


export class TestScene2 implements ARScene {
    ball?: THREE.Mesh; // TestScene2で使用するボールのオブジェクト

    name() { return "test2"; }

    constructor() {
        this.initBall(); // ボールの初期化
    }

    async initBall() {
        const svgURL = './assets/logo.svg'; // SVGファイルのパスを指定してください
        const ballRadius = 0.5;
        const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
        const texture = await loadSvgTexture(svgURL); // createBall.tsのloadSvgTextureと同様の処理を行う（詳細は省略）

        const material = new THREE.MeshBasicMaterial({ map: texture });
        this.ball = new THREE.Mesh(ballGeometry, material); // ボールを直接生成し、TestScene2のボールに代入
    }

    makeObjectTree(): THREE.Object3D {
        if (!this.ball) throw new Error('Ball not initialized');
        return this.ball;
    }


    animate(sec: number): void {
        if (!this.ball) return;

        // 立方体を回転させるアニメーション
        //this.cube.rotation.x += 0.01;
        
    }
}

