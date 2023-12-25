<script setup lang="ts">
import { useAREngine } from './AREngine';
import { TestScene, TestScene2, moveObject } from './scene';
import {Range_Position,Attack_Position} from './ImgPosition';
import {ref} from 'vue';

const ar_engine = useAREngine(); //シングルトンを取得
let currentScene = ref<TestScene | TestScene2 |null>(null); // ref()を使ってCurrentSceneを初期化

const scene_a = () => {
    const newScene = new TestScene();
    ar_engine.replaceScene(newScene); // scene_a で新しいシーンを設定
    currentScene.value = newScene; // 現在のシーンを更新
}

const scene_b = () => {
    const newScene = new TestScene2();
    if (currentScene) {
        currentScene.value = newScene; // scene_b を scene_a の上に重ねる
    }
}

const scene_c = () => {moveObject();}


</script>

<template>
    <img src="./assets/launch.svg" 
    width="150" height="100" 
    :style="{position: 'absolute', top:Range_Position.top + 'px',left:Range_Position.left + 'px'}"
    @click="scene_a" />
    <img src="./assets/launch.svg" 
    width="100" height="100"
    :style="{position: 'absolute', top: Attack_Position.top + 'px',left: Attack_Position.left + 'px'}" 
    @click="scene_b" />
    <button @click="scene_c">Scene C</button>
</template>./AREngine


<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>