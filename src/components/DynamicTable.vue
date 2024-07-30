<script setup lang="ts">
interface Props<T> {
  tableData: T[];
}
defineProps<Props<any>>();
</script>

<template>
  <div>{{ JSON.stringify(tableData) }}</div>
</template>

<style lang="scss"></style>
