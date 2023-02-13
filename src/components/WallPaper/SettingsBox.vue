<script setup lang="ts">
interface Props {
  title: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
});
</script>

<template>
  <div class="settings-panel">
    <div class="title flex-between">
      <span>{{ props.title }}</span>
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.settings-panel {
  width: 100%;
  margin-bottom: 2.4rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: var(--color-panel-background);
  box-shadow: 0px 2px 6px 1px var(--color-box-shadow);

  .title {
    padding: 0.8rem;
    font-size: 1.4rem;
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
