<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import UserLayout from "@/layouts/UserLayout.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const doInit = () => {
  console.log("这是前端框架");
};
onMounted(() => {
  doInit();
});
</script>
