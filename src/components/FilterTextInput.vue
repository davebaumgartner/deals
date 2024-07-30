<script setup lang="ts">
interface Props {
  modelValue: string;
}

defineProps<Props>();
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="input-text-filter-container">
    <input
      class="filter-text-input"
      type="text"
      :value="modelValue"
      @input="(e: Event) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
      placeholder="Type here to filter results"
    />
  </div>
</template>

<style lang="scss">
.input-text-filter-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;

  .filter-text-input {
    width: 100%;
    max-width: 800px;
    padding: 8px;
    font-size: 20px;
    border-radius: 10px;
    border: 1px solid black;
  }
}
</style>
