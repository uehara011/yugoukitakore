<script setup lang="ts">
// import * as THREE from "three";
// import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import { onMounted, watch } from "vue";
import { WebAR, type WebARDelegate } from "./WebAR";

const overlay_dom = "overlay"

// const emit = defineEmits(['start_ar']);

class WebAREvents implements WebARDelegate {
    onARButton(): void {

    }
}

const webar = new WebAR();

onMounted(() => {
    webar.start(overlay_dom);
});


</script>

<template>
    <footer>te
        <button>test</button>
    </footer>
</template>

<style scoped>
.buttons {
    display: flex;
    align-items: flex-end;
}

footer {
    height: 10%;
    background-color: #330000;

}
</style>
