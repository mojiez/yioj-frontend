<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header>
      <h1>用户页面</h1>
    </a-layout-header>
    <a-layout-content>
      <!-- 子路由页面将会渲染在这里 -->
      <router-view />
    </a-layout-content>
    <a-layout-footer>
      <a href="https://www.baidu.com" target="_blank">无敌暴龙战神</a>
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts"></script>
<style scoped>
#userLayout {
}
</style>
