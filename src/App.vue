<template>
  <div id="app">
    <AGN
      v-if="isCommentAvaiable"
      :score="score"
      :comment="comment"
      :img="img"
      :commentator="commentator"
    />

    <div>
      <div v-if="!isCommentAvaiable">

        <div class="form-control">
          <div>AcFun文章链接：</div>
          <input
            :disabled="isCommentAvaiable"
            type="text"
            id="acfun-url"
            class="form-control"
            name="url"
            v-model="url"
          />
        </div>
        <div class="form-control">
          <button class="button" v-on:click="confirmUrl(url)">开始评分</button>
        </div>
      </div>
      <div v-if="isCommentAvaiable">
        <div class="form-control">
          <div>评分：</div>
          <input
            type="range"
            min="1"
            max="10"
            v-model.number="score"
            class="form-control"
            name="score"
          />
        </div>
        <div class="form-control">
          <div>评论（留空使用默认评论）：</div>
          <textarea
            name="comment"
            v-model="comment"
          ></textarea>
        </div>
        <div class="form-control">
          <div>评论员：</div>
          <input
            type="text"
            name="commentator"
            v-model="commentator"
          />
        </div>
        <div class="form-control">
          <button class="button" v-on:click="savePng()">保存到下载目录</button>
          <button class="button" v-on:click="reset()">再评一篇</button>
        </div>
      </div>
    </div>

    <Loading :isLoading="isLoading" />
  </div>
</template>

<script>
import AGN from "./components/AGN.vue";
import Loading from "./components/Loading.vue";
import {disableScroll, enableScroll} from "./libs/disable-scroll.js";

const STATE_ENUM = {
  init: 0,
  acfunLoading: 10,
  acfunLoaded: 20,
  downloading: 30,
  downloaded: 40,
};
export default {
  name: "app",
  components: {
    AGN,
    Loading,
  },
  methods: {
    reset: function() {
      this.state = STATE_ENUM.init;
      this.score = 6;
      this.commentator = "AGN测评员";
      this.comment = "";
      this.url = "https://www.acfun.cn/a/ac34399056";
      this.img = "data:image/jpeg;charset=utf-8;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    },
    savePng: async function() {
      this.state = STATE_ENUM.downloading;
      disableScroll();
      window.scrollTo(0,0)
      await new Promise(res=>setTimeout(res, 500));
      await window.electronAPI.generateAgnImage(this.showItem);
      enableScroll();
      this.state = STATE_ENUM.downloaded;
      window.alert('保存成功');
    },
    confirmUrl: async function (url) {
      this.state = STATE_ENUM.acfunLoading;
      const image = await window.electronAPI.loadAcfun(url);
      this.img = "data:image/jpeg;charset=utf-8;base64," + image;
      this.state = STATE_ENUM.acfunLoaded;
    },
  },
  computed: {
    isLoading() {
      return [STATE_ENUM.acfunLoading, STATE_ENUM.downloading].indexOf(this.state) !== -1;
    },
    isCommentAvaiable() {
      return [STATE_ENUM.acfunLoaded, STATE_ENUM.downloading, STATE_ENUM.downloaded].indexOf(this.state) !== -1;
    }
  },
  data: () => {
    return {
      score: 6,
      state: STATE_ENUM.init,
      showItem: false,
      commentator: "AGN测评员",
      comment: "",
      url: "https://www.acfun.cn/a/ac34399056?from=video",
      img: "data:image/jpeg;charset=utf-8;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    };
  },
};
</script>

<style>
:root {
  --main-color: #13bf13;
  --border-color: #0c880c;
  --trans-color: rgba(19, 191, 19, 0.85);
}

body {
  background-color: transparent;
  color: #333435;
  font-size: 14px;
  line-height: 1.643;
}

.form-control {
  margin-top: 12px;
  width: 800px;
}

.form-control .button {
  padding: 4px 8px;
  margin-right: 40px;
}
.form-control input[type=slider], .form-control input[type=text], .form-control textarea {
  width: 600px;
}
.form-control textarea {
  min-height: 80px;
}
</style>
