<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useGlobalState } from "@/stores/app";

const theme = ref<Boolean>(true);
const state = useGlobalState();

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
  <div
    class="header-bar header-container"
    :class="{ mobile: state.device.value === 'mobile' }"
  >
    <router-link to="/" class="logo">
      <img id="logo" src="/KAZI.png" />
    </router-link>
    <div class="nav">
      <template v-if="state.device.value === 'desktop'">
        <router-link class="link" to="/">GRADIENTS</router-link>
        <router-link class="link" to="/wallpaper">WALLPAPER</router-link>
        <router-link class="link" to="/stars">LIKES</router-link>
      </template>
      <template v-else>
        <router-link class="link-icon" to="/"
          ><el-icon :size="24"><Discount /></el-icon
        ></router-link>
        <router-link class="link-icon" to="/wallpaper"
          ><el-icon :size="24"><Picture /></el-icon
        ></router-link>
        <router-link class="link-icon" to="/stars"
          ><svg-icon class="link-icon" name="heart"></svg-icon
        ></router-link>
      </template>
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
  align-items: center;

  .link,
  .link-icon {
    position: relative;
    font-size: 1.4rem;
    margin: 0 0.8rem;
    letter-spacing: 0.5px;
  }
  .link-icon .svg-icon {
    color: var(--like-color);
    font-size: 16px;
    right: 6px;
  }
  .link-icon:nth-of-type(1) .el-icon {
    color: rgb(169, 15, 210);
  }
  .link-icon:nth-of-type(2) .el-icon {
    color: rgb(216, 168, 5);
  }
  .link:hover::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: clip 0.3s linear;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .link:nth-of-type(1):hover::after {
    content: "GRADIENTS";
    background-image: linear-gradient(
      to right,
      rgb(142, 107, 251),
      rgb(178, 253, 61)
    );
  }
  .link:nth-of-type(2):hover::after {
    content: "WALLPAPER";
    background-image: linear-gradient(
      to right,
      rgb(169, 15, 210),
      rgb(216, 168, 5)
    );
  }
  .link:nth-of-type(3):hover::after {
    content: "LIKES";
    background-image: linear-gradient(
      to right,
      rgb(38, 40, 249),
      rgb(161, 5, 238)
    );
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
