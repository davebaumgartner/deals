<script setup lang="ts">
import DynamicTable from "./DynamicTable.vue";
interface Props<T> {
  tableData: T[];
}
defineProps<Props<any>>();
</script>

<template>
  <DynamicTable :tableData="tableData" />
</template>

<style lang="scss"></style>
