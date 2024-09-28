<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";

const doInit = () => {
  console.log("这是前端框架");
};
onMounted(() => {
  doInit();
});
</script>
