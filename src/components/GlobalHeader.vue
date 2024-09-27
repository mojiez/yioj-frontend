<template>
  <div id="globalHeader">
    <a-row class="grid" align="center" style="margin-bottom: 16px">
      <a-col flex="auto">
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
      </a-col>
      <a-col flex="100px">
        <div class="user-title">
          {{ store.state["user"]?.loginUser.userName ?? "没有登陆" }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const selectedKeys = ref(["/"]);

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "zhang",
  });
}, 3000);
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
.user-title {
  font-size: large;
}
</style>
