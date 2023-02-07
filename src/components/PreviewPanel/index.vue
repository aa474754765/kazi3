<script setup lang="ts">
import type { BoxInfo } from "@/types";
import { computed, type CSSProperties, watch } from "vue";
import { useShare } from "../share";

const { isStar, setStarStatus, star, unStar, copy } = useShare();

interface Props {
  info?: BoxInfo;
}
const props = withDefaults(defineProps<Props>(), {
  info: () => ({ deg: 0, colors: [] }),
});
const emit = defineEmits<{
  (e: "update:info", value: BoxInfo): void;
  (e: "back"): void;
}>();
const info = computed({
  get() {
    return props.info;
  },
  set(val: BoxInfo) {
    emit("update:info", val);
  },
});

watch(info, () => {
  setStarStatus(props.info);
});

const elStyle = computed((): CSSProperties => {
  return {
    "background-image": `linear-gradient(${
      info.value.deg
    }deg, ${info.value.colors.join(",")})`,
  };
});

const copyCss = () => {
  const color1 = info.value.colors[0];
  const color2 = info.value.colors[1];
  const text = `background-image: -moz-linear-gradient(90deg, ${color1}, ${color2});

background-image: -webkit-linear-gradient(90deg, ${color1}, ${color2});

background-image: linear-gradient(90deg, ${color1}, ${color2});`;
  copy(text);
};
</script>

<template>
  <el-row justify="center">
    <el-col :xs="20" :sm="16" :md="12" :lg="11" :xl="8">
      <div class="operation">
        <div class="back-btn">
          <kazi-btn @click="emit('back')">
            <el-icon>
              <Back />
            </el-icon>
          </kazi-btn>
        </div>
        <kazi-btn
          :style="{ 'background-color': info.colors[0] }"
          @click="copy(info.colors[0])"
        >
          <el-icon>
            <CopyDocument />
          </el-icon>
        </kazi-btn>
        <kazi-btn
          :style="{ 'background-color': info.colors[info.colors.length - 1] }"
          @click="copy(info.colors[info.colors.length - 1])"
        >
          <el-icon>
            <CopyDocument />
          </el-icon>
        </kazi-btn>
        <kazi-btn @click="copyCss">
          <el-icon>
            <CopyDocument />
          </el-icon>
          <span class="copy-text">Copy CSS</span>
        </kazi-btn>
        <kazi-btn>
          <el-icon>
            <Download />
          </el-icon>
        </kazi-btn>
        <kazi-btn :active="isStar" @click="!isStar ? star(info) : unStar(info)">
          <el-icon v-if="!isStar"><Star /></el-icon>
          <el-icon v-if="isStar"><StarFilled /></el-icon>
        </kazi-btn>
      </div>
      <div class="perview-image" :style="elStyle"></div>
      <template v-if="info.colors.length !== 0">
        <div class="properties flex-between">
          <div class="left-color">
            <el-color-picker
              :model-value="info.colors[0]"
              @active-change="info.colors[0] = $event"
              show-alpha
            />
          </div>
          <div class="degree">
            <el-slider
              :style="{ 'margin-right': '10px' }"
              :min="0"
              :max="360"
              :model-value="info.deg"
              @input="info.deg = $event"
            ></el-slider>
            {{ info.deg + "deg" }}
          </div>
          <div class="right-color">
            <el-color-picker
              :model-value="info.colors[info.colors.length - 1]"
              @active-change="info.colors[info.colors.length - 1] = $event"
              show-alpha
            />
          </div>
        </div>
      </template>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.perview-image {
  width: 100%;
  height: 0;
  padding-top: 60%;
  border-radius: 16px;
}

.operation {
  position: relative;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;

  .back-btn {
    flex: 1;
  }

  button {
    margin-right: 1rem;
  }
}

.properties {
  height: 80px;
  .degree {
    display: flex;
    align-items: center;
    flex-basis: 40%;
  }
}

:deep(.el-color-picker__color-inner),
:deep(.el-color-picker__trigger),
:deep(.el-color-picker__color) {
  padding: 0;
  border: none;
  border-radius: 50%;
}

:deep(.el-color-picker):hover .el-color-picker__trigger {
  border: none !important;
}

:deep(.el-color-picker__color-inner) i {
  display: none;
}

@media (max-width: 767px) {
  .copy-text {
    display: none;
  }
}
</style>
