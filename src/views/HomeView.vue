<script setup lang="ts"></script>

<template>
  <h1>Generate your gradients</h1>
  <el-row :gutter="64">
    <el-col
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="6"
      v-for="(i, index) in 16"
      :key="index"
    >
      <div class="grid-content" />
    </el-col>
  </el-row>
</template>

<style scoped>
h1 {
  text-align: center;
  margin: 2.4rem 0 4.8rem;
  opacity: 0.7;
}

.el-col {
  border-radius: 4px;
  margin-bottom: 3.2rem;
}

.grid-content {
  border-radius: 1rem;
  min-height: 20rem;
  background-color: var(--color-b2-3);
}
</style>
