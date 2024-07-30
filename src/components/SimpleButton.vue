<script setup lang="ts">
interface Props {
  disabled?: boolean;
}
defineProps<Props>();
defineEmits(["simpleButtonClick"]);
</script>

<template>
  <button
    class="button"
    @click="$emit('simpleButtonClick')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
.button {
  border-radius: 10px;
  border: 1px solid $logoBlue;
  background-color: white;
  padding: 10px;

  &::selection {
    background-color: transparent;
  }

  &:hover {
    cursor: pointer;
    background-color: rgba($primaryBlue, 0.75);
    border: 1px solid $darkBlue;
    color: white;
  }

  &:disabled {
    border: 1px solid rgba(black, 0.25);
    color: rgba(black, 0.25);

    &:hover {
      background-color: white;
      cursor: default;
    }
  }
}
</style>
