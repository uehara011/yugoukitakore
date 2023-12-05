import { reactive } from 'vue';

// reactiveを使用してlogoPositionを定義する


export const logoPosition = reactive({ top: 100, left: 200 });
export const Attack_Position = reactive({top:550, left:1000});
export const Range_Position = reactive({top:450, left:1200});


// 何らかのイベントや関数でlogoPositionを更新する例
// export function moveLogoToNewPosition(newTop: number, newLeft: number): void {
//   logoPosition.top = newTop;
//   logoPosition.left = newLeft;
// }
