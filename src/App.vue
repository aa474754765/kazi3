<script setup lang="ts">
import { RouterView } from "vue-router";
import PageHeader from "@/components/Header/index.vue";
</script>

<template>
  <PageHeader />
  <div class="main-container">
    <RouterView />
  </div>
</template>
