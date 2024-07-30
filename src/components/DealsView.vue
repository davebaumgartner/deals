<script setup lang="ts">
import type { TableModel } from "@/types";
import DynamicTable from "./DynamicTable.vue";
interface Props<T> {
  tableData: T[];
  tableModel: TableModel<T>;
}
defineProps<Props<any>>();
</script>

<template>
  <main class="main">
    <div class="headline">Deals!</div>
    <DynamicTable
      :tableData="tableData"
      :columns="tableModel.columns"
    />
  </main>
</template>

<style lang="scss" scoped>
.main {
  min-width: 90vw;
  min-height: 100vh;
  background-color: $gray;
  padding: 20px;

  .headline {
    font-size: 30pt;
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>
