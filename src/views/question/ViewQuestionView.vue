<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制（ms）：">
                  <!--                  {{ question.judgeConfig.timeLimit ?? 0 }}-->
                  {{ timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制（KB）：">
                  <!--                  {{ question.judgeConfig.memoryLimit ?? 0 }}-->
                  {{ memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制（KB）：">
                  <!--                  {{ question.judgeConfig.stackLimit ?? 0 }}-->
                  {{ stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdView :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 提交后方可查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="submitLanguage"
            label="编程语言："
            style="min-width: 240px"
          >
            <a-select v-model="form.language" placeholder="选择编程语言">
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>c#</a-option>
              <a-option>go</a-option>
              <a-option>python</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeView
          :language="form.language"
          :value="form.code"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <a-button
          shape="round"
          type="primary"
          style="min-width: 200px; margin-left: 280px"
          size="large"
          @click="doSubmit"
        >
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps, toRaw } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdEditor from "@/components/MdEditor.vue";
import MdView from "@/components/MdView.vue";
import store from "@/store";
import CodeView from "@/components/CodeView.vue";

interface Props {
  id: string;
}

/**
 * 获取到动态路由 id
 */
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();
const timeLimit = ref();
const memoryLimit = ref();
const stackLimit = ref();
const loadData = async () => {
  /**
   * 返回结果格式QuestionVO = {
   *     acceptedNum?: number;
   *     answer?: string;
   *     content?: string;
   *     createTime?: string;
   *     favourNum?: number;
   *     id?: number;
   *     judgeCase?: Array<JudgeCase>;
   *     judgeConfig?: string;
   *     submitNum?: number;
   *     tags?: Array<string>;
   *     thumbNum?: number;
   *     title?: string;
   *     updateTime?: string;
   *     userId?: number;
   * };
   */
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
    // 做一些格式的转换
    // config 就一string类型的
    if (question.value?.judgeConfig) {
      const jsJudgeConfig = JSON.parse(question.value?.judgeConfig);
      timeLimit.value = jsJudgeConfig.timeLimit;
      stackLimit.value = jsJudgeConfig.stackLimit;
      memoryLimit.value = jsJudgeConfig.memoryLimit;
    }
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 代码编辑器中 默认程序
 */
const codeDefaultValue = ref(
  "public class Main {\n" +
    "    public static void main(String[] args) {\n" +
    '        System.out.println("Hello, World!");\n' +
    "    }\n" +
    "}\n"
);

/**
 * questionId?: number;
 */
const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: codeDefaultValue as unknown as string,
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  // 获取当前用户
  let loginUser = store.state.user.loginUser;
  console.log(toRaw(loginUser));
  const res = await QuestionSubmitControllerService.doSubmitUsingPost({
    /**
     * type QuestionSubmitAddRequest = {
     *     code?: string;
     *     judgeInfo?: string;
     *     language?: string;
     *     questionId?: number;
     *     userId?: number;
     * };
     */
    ...form.value,
    questionId: question.value.id,
    userId: loginUser.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1600px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
