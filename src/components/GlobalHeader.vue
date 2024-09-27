<template>
  <div id="globalHeader">
    <a-menu
      mode="horizontal"
      :selected-keys="selectedKeys"
      @menu-item-click="doMenuClick"
    >
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div class="title-bar">
          <img class="img_title" src="../assets/avatar.jpg" />
          <div class="title">易OJ</div>
        </div>
      </a-menu-item>
      <a-menu-item v-for="item in routes" :key="item.path">{{
        item.name
      }}</a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const selectedKeys = ref(["/"]);
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 实现根据变化导航栏奇幻content内容， 同时能根据当前的路径反过来确定导航栏的key
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.img_title {
  height: 48px;
}
.title {
  color: black;
  font-size: large;
  margin-left: 14px;
}
</style>
