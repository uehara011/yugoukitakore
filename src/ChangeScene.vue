<script setup lang="ts">
import { useAREngine } from './AREngine';
import { TestScene, TestScene2 } from './scene';
import {Range_Position,Attack_Position} from './ImgPosition';

const ar_engine = useAREngine(); //シングルトンを取得

const scene_a = () => {
    ar_engine.replaceScene(new TestScene());
}

const scene_b = () => {
    ar_engine.replaceScene(new TestScene2());
}

</script>

<template>
    <img src="./assets/logo.svg" 
    width="150" height="100" 
    :style="{position: 'absolute', top:Range_Position.top + 'px',left:Range_Position.left + 'px'}"
    @click="scene_a" />
    <img src="./assets/Fish.jpeg" 
    width="150" height="150"
    :style="{position: 'absolute', top: Attack_Position.top + 'px',left: Attack_Position.left + 'px'}" 
    @click="scene_b" />
</template>./AREngine