import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/access"; // 引入权限管理(主要是access/index.ts的部分) 如果不引入，则前端的权限管理功能可以直接移除 耦合度低
import "bytemd/dist/index.css"; // 引入bytemd的组件
const app = createApp(App);
app.use(ArcoVue).use(store).use(router);
app.mount("#app");
