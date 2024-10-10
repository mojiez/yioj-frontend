<template>
  <div id="exampleView">
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
    <CodeEditorProps :value="codeValue" :handle-change="onCodeChange" />
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import CodeEditorProps from "@/components/CodeEditorProps.vue";

const mdValue = ref("");
const codeValue = ref("");
const onMdChange = (v: string) => {
  mdValue.value = v;
};
const onCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>
