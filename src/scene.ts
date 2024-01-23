
import * as THREE from 'three';
import useLogger from './logger';
const log = useLogger();
import Cannon from 'cannon';

let cube: THREE.Mesh;
export interface ARScene {
    makeObjectTree(): THREE.Object3D;
    animate(sec: number): void;

    name(): string;
};
/*
export class TestScene implements ARScene {
    cube?: THREE.Object3D;

    name() { return "test"; }

    makeObjectTree(): THREE.Object3D {
        const geometry = new THREE.BoxGeometry(0.01, 5, 5).translate(0, 0, 0);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        this.cube = cube;
        return cube;
    }

    animate(sec: number): void {
        if (!this.cube) return;
        // 立方体を回転させるアニメーション
        // this.cube.rotation.x += 0.01;
    }
}*/




export function moveObject() {
    cube.position.x += 1; // x軸方向に1つ進める
}

export class TestScene2 implements ARScene {
    cube?: THREE.Object3D;

    name() { return "test2"; }

    makeObjectTree(): THREE.Object3D {
        // 立方体のジオメトリを作成
        const geometry = new THREE.ConeGeometry(1, 1).translate(0, 0.5, 0);

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
        this.cube.position.y += 0.05;
        this.cube.position.x += 0.01;
    }
}
/*
import * as THREE from 'three';
import useLogger from './logger';
const log = useLogger();
import Cannon from 'cannon';

let cube: THREE.Mesh;
export interface ARScene {
    makeObjectTree(): THREE.Object3D;
    animate(sec: number): void;

    name(): string;
};

export class TestScene implements ARScene {
    cube?: THREE.Object3D;

    name() { return "test"; }

    makeObjectTree(): THREE.Object3D {
        const geometry = new THREE.BoxGeometry(0.01, 5, 5).translate(0, 0, 0);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        this.cube = cube;
        return cube;
    }

    animate(sec: number): void {
        if (!this.cube) return;
        // 立方体を回転させるアニメーション
        // this.cube.rotation.x += 0.01;
    }
}



export function moveObject() {
    cube.position.x += 1; // x軸方向に1つ進める
}

export class TestScean2 implements ARScene {
    cube?: THREE.Object3D;

    name() { return "test2"; }

    makeObjectTree(): THREE.Object3D {
        // 立方体のジオメトリを作成
        const geometry = new THREE.ConeGeometry(1, 1).translate(0, 0.5, 0);

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
        this.cube.position.y += 0.05;
        this.cube.position.x += 0.01;
    }
}
*/