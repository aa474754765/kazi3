<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const theme = ref<Boolean>(true);

const toggleTheme = (status: boolean) => {
  if (!status) {
    document
      .querySelector("#logo")
      ?.setAttribute("src", "../../../public/KAZI-dark.png");
    document.querySelector("html")?.setAttribute("class", "dark");
  } else {
    document
      .querySelector("#logo")
      ?.setAttribute("src", "../../../public/KAZI.png");
    document.querySelector("html")?.removeAttribute("class");
  }
};
</script>

<template>
  <div class="header-bar header-container">
    <router-link to="/" class="logo">
      <img id="logo" src="../../../public/KAZI.png" />
    </router-link>
    <div class="nav">
      <router-link class="link" to="/">HOME</router-link>
      <router-link class="link" to="/">CUSTOMIZE</router-link>
      <router-link class="link" to="/">STARS</router-link>
    </div>
    <div class="tools">
      <el-switch
        style="--el-switch-on-color: var(--color-kazi)"
        v-model="theme"
        @change="toggleTheme"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo {
  margin-right: 6.4rem;

  img {
    width: auto;
    height: 20px;
    vertical-align: bottom;
  }
}

.nav,
.tools {
  display: flex;
  flex-direction: row;

  .link {
    font-size: 1.4rem;
    margin: 0 0.8rem;
    letter-spacing: 0.5px;
  }
}

.tools {
  flex-grow: 1;
  justify-content: right;
}
</style>
