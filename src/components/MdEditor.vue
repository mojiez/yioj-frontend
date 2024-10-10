<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from "vue";
import highlight from "@bytemd/plugin-highlight";

const plugins = [
  gfm(),
  // Add more plugins here
  highlight(),
];
// const value = ref<string>("");
// const handleChange = (v: string) => {
//   value.value = v;
// };

/**
 * 交给父组件
 */

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
  {{ value }}
</template>

<style scoped></style>
