import * as THREE from 'three';

export interface ARScene {
    makeObjectTree(): THREE.Object3D;
    animate(sec: number): void;
};

export class TestScene implements ARScene {
    cube?: THREE.Object3D;

    makeObjectTree(): THREE.Object3D {
        // 立方体のジオメトリを作成
        const geometry = new THREE.BoxGeometry();

        // 材質を作成（色を指定）
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

        // 立方体のメッシュを作成
        this.cube = new THREE.Mesh(geometry, material);

        return this.cube;
    }

    animate(sec: number): void {
        if (!this.cube) return;

        // 立方体を回転させるアニメーション
        //this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }
}

