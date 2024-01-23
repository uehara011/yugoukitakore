import { enemyTank } from "./enemy_Tank";

export function enemyTank_move() {
    // 0からπ/2 (90度) のランダムな角度を生成
    const randomAngle = Math.random() * (Math.PI / 2);

    // ランダムな方向をX軸またはZ軸に限定
    const isMoveAlongX = Math.random() < 0.5;
    const direction = isMoveAlongX ? 1 : -1;

    // 移動距離を1に設定
    const distance = 0.1;

    // X軸またはZ軸方向の変位を計算
    const deltaX = isMoveAlongX ? distance * direction : 0;
    const deltaZ = isMoveAlongX ? 0 : distance * direction;

    // Tankの位置を更新
    enemyTank.position.x += deltaX;
    enemyTank.position.z += deltaZ;
}
