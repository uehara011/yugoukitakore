import { reactive } from 'vue';

// reactiveを使用してlogoPositionを定義する

export const logoPosition = reactive({ top: 100, left: 200 });
export const Attack_Position = reactive({top:170, left:500});
export const Range_Position = reactive({top:100, left:600});


// 何らかのイベントや関数でlogoPositionを更新する例
// export function moveLogoToNewPosition(newTop: number, newLeft: number): void {
//   logoPosition.top = newTop;
//   logoPosition.left = newLeft;
// }
