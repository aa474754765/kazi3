<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const theme = ref<Boolean>(true);

const toggleTheme = (status: boolean) => {
  if (!status) {
    document
      .querySelector("#logo")
      ?.setAttribute("src", "../../../KAZI-dark.png");
    document.querySelector("html")?.setAttribute("class", "dark");
  } else {
    document.querySelector("#logo")?.setAttribute("src", "../../../KAZI.png");
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
      <router-link class="link" to="/">GRADIENTS</router-link>
      <router-link class="link" to="/">PHOTOS</router-link>
      <router-link class="link" to="/stars">LIKES</router-link>
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
    position: relative;
    font-size: 1.4rem;
    margin: 0 0.8rem;
    letter-spacing: 0.5px;
  }

  .link:nth-of-type(1):hover::after {
    content: "GRADIENTS";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: clip 0.3s linear;
    background-image: linear-gradient(
      to right,
      rgb(142, 107, 251),
      rgb(178, 253, 61)
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  .link:nth-of-type(3):hover::after {
    content: "LIKES";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: clip 0.8s linear;
    background-image: linear-gradient(
      to right,
      rgb(38, 40, 249),
      rgb(161, 5, 238)
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
}

.tools {
  flex-grow: 1;
  justify-content: right;
}

@keyframes clip {
  0% {
    clip: rect(0 0px 100px 0);
  }

  100% {
    clip: rect(0 100px 100px 0);
  }
}
</style>
