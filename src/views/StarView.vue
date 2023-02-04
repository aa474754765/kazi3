<script setup lang="ts">
import { ref } from "vue";
import GradientsBox from "@/components/GradientsBox/index.vue";
import { starKey, Storager } from "@/utils/storage";

const gradients = ref<string[]>([]);

const renderStarBox = (): void => {
  gradients.value = Storager.get<string>(starKey).map((i) => i.value);
};
renderStarBox();
</script>
<template>
  <h1>Yours Favorites</h1>
  <el-row :gutter="32">
    <el-col
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="6"
      v-for="i in gradients"
      :key="i"
    >
      <GradientsBox
        :gradients="i"
        :starred="true"
        @unstar="renderStarBox"
        class="grid-content"
      />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-row {
  margin-bottom: 2.4rem;

  button {
    margin-right: 1.2rem;
  }
}

.el-col {
  border-radius: 4px;
  margin-bottom: 3.2rem;
}

.grid-content {
  position: relative;
  border-radius: 1rem;
  min-height: 20rem;
}
</style>
