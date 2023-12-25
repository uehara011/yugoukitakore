// import * as THREE from 'three';
// import Cannon from 'cannon';
// import { TestScene2 } from './scene'; // ボールを生成するTestScene2クラスをインポート

// export async function launchBall(scene: THREE.Scene, world: Cannon.World, container: HTMLElement) {
//     const testScene = new TestScene2(); // TestScene2のインスタンスを生成

//     const ball = testScene.ball; // TestScene2で生成されたballを取得
//     if (ball) {
//         scene.add(ball); // sceneにballを追加
//     }

//     const ballShape = new Cannon.Sphere(0.5);
//     const ballBody = new Cannon.Body({ mass: 1, shape: ballShape });
//     world.addBody(ballBody);

//     const initialVelocity = new Cannon.Vec3(0, 0, -5);

//     const launchBall = () => {
//         ballBody.position.set(0, 0, 0);
//         ballBody.velocity.copy(initialVelocity);
//     };

//     const animate = () => {
//         requestAnimationFrame(animate);
//         world.step(1 / 60);

//         // ballMeshの位置更新
//         if (ball) {
//             const cannonPosition = ballBody.position;
//             const position = new THREE.Vector3(cannonPosition.x, cannonPosition.y, cannonPosition.z);
//             ball.position.copy(position);
//         }
//     };

//     animate();

//     const launchButton = document.createElement('button');
//     launchButton.textContent = 'Launch Ball';
//     launchButton.addEventListener('click', launchBall);
//     container.appendChild(launchButton);
// }
