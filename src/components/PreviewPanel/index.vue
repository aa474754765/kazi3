<script setup lang="ts">
import { Download } from "@element-plus/icons-vue";
import type { BoxInfo } from "@/types";
import { computed, type CSSProperties, watch, reactive } from "vue";
import { useShare } from "../share";

const { isStar, setStarStatus, star, unStar, copy, downloadHtml } = useShare();

interface Props {
  info?: BoxInfo;
}
const props = withDefaults(defineProps<Props>(), {
  info: () => ({ deg: 0, colors: [] }),
});
const emit = defineEmits<{
  (e: "update:info", value: BoxInfo): void;
  (e: "back"): void;
  (e: "unstar"): void;
  (e: "star"): void;
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

const downloadSettings = reactive<{ width: number; height: number }>({
  width: 2560,
  height: 1600,
});
const download = () => {
  const target = document.createElement("div");
  target.style.width = isNaN(downloadSettings.width)
    ? "1920px"
    : `${downloadSettings.width}px`;
  target.style.height = isNaN(downloadSettings.width)
    ? "1200px"
    : `${downloadSettings.height}px`;
  target.style.backgroundImage = elStyle.value["background-image"] as string;
  downloadHtml(target);
};

const starClicked = (info: BoxInfo) => {
  if (isStar.value) {
    unStar(info);
    emit("unstar");
  } else {
    star(info);
    emit("star");
  }
};
</script>

<template>
  <el-row justify="center">
    <el-col :xs="20" :sm="16" :md="14" :lg="11" :xl="8">
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
        <el-popover placement="top-start" width="300" trigger="hover">
          <div class="download-settings">
            <el-input v-model="downloadSettings.width"></el-input>
            <span>×</span>
            <el-input v-model="downloadSettings.height"></el-input>
            <el-button @click="download" :icon="Download">Download</el-button>
          </div>
          <template #reference>
            <kazi-btn>
              <el-icon>
                <Download />
              </el-icon>
            </kazi-btn>
          </template>
        </el-popover>
        <kazi-btn @click="starClicked(info)">
          <svg-icon
            name="heart"
            :style="{ height: '1.4em' }"
            :color="isStar ? 'var(--like-color)' : 'var(--color-gray2)'"
          ></svg-icon>
        </kazi-btn>
      </div>
      <div id="preview-image" class="preview-image" :style="elStyle"></div>
      <template v-if="info.colors.length !== 0">
        <div class="properties flex-between">
          <div class="left-color">
            <el-color-picker
              :model-value="info.colors[0]"
              @active-change="
                info.colors[0] = $event;
                isStar = false;
              "
              show-alpha
            />
          </div>
          <div class="degree">
            <el-slider
              :style="{ 'margin-right': '10px' }"
              :min="0"
              :max="360"
              :model-value="info.deg"
              @input="
                info.deg = $event;
                isStar = false;
              "
            ></el-slider>
            {{ info.deg + "°" }}
          </div>
          <div class="right-color">
            <el-color-picker
              :model-value="info.colors[info.colors.length - 1]"
              @active-change="
                info.colors[info.colors.length - 1] = $event;
                isStar = false;
              "
              show-alpha
            />
          </div>
        </div>
      </template>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.preview-image {
  width: 100%;
  height: 0;
  padding-top: 60%;
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

.download-settings {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  span {
    width: 10rem;
    text-align: center;
    color: var(--color-text);
  }

  button {
    margin-left: 1rem;
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
