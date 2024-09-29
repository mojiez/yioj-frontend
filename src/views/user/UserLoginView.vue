<template>
  <a-space direction="vertical" size="large" :style="{ width: '600px' }">
    <a-form :model="form" :layout="layout">
      <a-form-item field="name" label="Username">
        <a-input
          v-model="form.userAccount"
          placeholder="please enter your username..."
        />
      </a-form-item>
      <a-form-item field="password" label="Password">
        <a-input
          v-model="form.userPassword"
          placeholder="please enter your password..."
        />
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="isRead"> I have read the manual </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button @click="doSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
    <div>
      {{ form }}
    </div>
  </a-space>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserControllerService } from "../../../generated";
import store from "@/store";

import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
const layout = ref("horizontal");
const isRead = ref(false);
const router = useRouter();
const form = reactive({
  userAccount: "",
  userPassword: "",
});
const doSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    message.success("登陆成功！");
    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登陆失败: " + res.message);
  }
};
</script>
