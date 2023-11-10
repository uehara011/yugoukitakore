<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import WebAR from './WebAR.vue'
// import { SceneTransitioner, TestSceneMaker, AnotherSceneMaker } from './scene';


// const scene_transitioner = new SceneTransitioner();
// scene_transitioner.create("threejs");

// function scene_a() {
//   scene_transitioner.transitTo(new TestSceneMaker());
// }

// function scene_b() {
//   scene_transitioner.transitTo(new AnotherSceneMaker());
// }

// const arexp = test_webxr();

// scene_transitioner.test()
</script>


<template>
  <main>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <HelloWorld msg="You did it!" />
    <WebAR id="webar"></WebAR>
    <!-- <button @click="scene_a">Scene A</button>
    <button @click="scene_b">Scene B</button> -->
  </main>
</template>

<style scoped>
#webar {
  display: flex;
  align-items: end;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
