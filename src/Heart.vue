<template>
    <div>
      <img v-show="showImages[0]" src="./heart.png" width="30" height="30" :style="{ marginRight: '5px' }" />
      <img v-show="showImages[1]" src="./heart.png" width="30" height="30" :style="{ marginRight: '5px' }" />
      <img v-show="showImages[2]" src="./heart.png" width="30" height="30" :style="{ marginRight: '5px' }" />
      <img v-show="showImages[3]" src="./heart.png" width="30" height="30" :style="{ marginRight: '5px' }" />
      <img v-show="showImages[4]" src="./heart.png" width="30" height="30" :style="{ marginRight: '5px' }" />
      <img v-show="showImages[5]" src="./heart.png" width="30" height="30" :style="{ marginRight: '5px' }" />
    </div>
  </template>
  
  <script setup lang="ts">
  import useHeart from './Heart';
  const { showImages } = useHeart();
  </script>
  