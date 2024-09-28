// initial state
import { StoreOptions } from "vuex";
import AccessEnum from "@/access/accessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "登录lala",
      userRole: AccessEnum.USER,
    },
  }),
  actions: {
    // action 函数中，默认接收到的第一个参数是一个包含这些属性的对象，常用的结构是 { commit, state }，你可以根据需求解构其中的属性。
    getLoginUser({ commit, state }, payload) {
      // todo 改为发送请求给后端获取用户信息
      // 然后获取了用户信息以后更新state
      commit("updateUser", { userName: "鱼皮" });
    },
    getLoginUserTest({ commit, state }, payload) {
      // todo 改为发送请求给后端获取用户信息
      // 然后获取了用户信息以后更新state
      commit("updateUser", payload);
    },
  },
  mutations: {
    // 	1.  state: Vuex 自动传递的，当前模块或全局的状态，作为第一个参数。
    // 	2.	payload: 用户传递给 mutation 的数据，作为第二个参数。可以是任何数据类型，甚至是对象。
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
