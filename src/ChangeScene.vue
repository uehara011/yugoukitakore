<script setup lang="ts">
import { useAREngine } from './AREngine';
import { TestScene2, moveObject } from './scene'; //import { TestScene, TestScene2, moveObject } from './scene';
//import {Range_Position,Attack_Position, Range_Position} from './ImgPosition';
import {ref} from 'vue';
import { reactive } from 'vue';

const ar_engine = useAREngine(); //シングルトンを取得
const logoPosition = reactive({ top: 100, left: 200 });
const Attack_Position = reactive({top:60, left:1500});
const Range_Position = reactive({top:80, left:20});
/*
const scene_a = () => {
    const newScene = new TestScene();
    ar_engine.replaceScene(newScene);
}*/

const scene_b = () => {
    const newScene = new TestScene2();
    ar_engine.replaceScene(newScene);
}

const scene_c = () => {moveObject();}


</script>

<template>
    <!--<img src="./assets/launch.svg" 
    width="150" height="100" 
    :style="{position: 'absolute', top:Range_Position.top + '%',left:Range_Position.left + '%'}" 
    @click="scene_a" />  --> <!--いらない-->
    <img src="./assets/launch.svg" 
    width="200" height="200"
    :style="{position: 'absolute', top: Attack_Position.top + '%',left: Attack_Position.left + '%'}" 
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