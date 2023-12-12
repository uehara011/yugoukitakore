import * as THREE from 'three';
import useLogger from './logger';
const log = useLogger();
import Cannon from 'cannon';

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

export class TestScene2 {
    ball?: THREE.Mesh;

    constructor() {
        this.initBall();
    }

    async initBall() {
        // ボールの生成（ここでは簡略化）
        const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
        const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.ball = new THREE.Mesh(ballGeometry, ballMaterial);
    }

    launchBallAnimation(world: Cannon.World) {
        const ball = this.ball;
        if (!ball) return;

        const ballShape = new Cannon.Sphere(0.5);
        const ballBody = new Cannon.Body({ mass: 1, shape: ballShape });
        world.addBody(ballBody);

        const initialVelocity = new Cannon.Vec3(0, 0, -5);

        const launchBall = () => {
            ballBody.position.set(0, 0, 0);
            ballBody.velocity.copy(initialVelocity);
        };

        const animate = () => {
            requestAnimationFrame(animate);
            world.step(1 / 60);

            const cannonPosition = ballBody.position;
            const position = new THREE.Vector3(cannonPosition.x, cannonPosition.y, cannonPosition.z);
            ball.position.copy(position);
        };

        animate();

        launchBall(); // ボールの発射処理を最初に実行

        // ボタンなどのUI要素はこのメソッド内で追加することも可能です
        // ここでは省略しています
    }
}
