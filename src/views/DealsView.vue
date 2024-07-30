<script setup lang="ts">
import DynamicTable from "@/components/DynamicTable.vue";
import type { TableModel } from "@/types";
import { ref } from "vue";

interface Props<T> {
  tableData: T[];
  tableModel: TableModel<T>;
}
defineProps<Props<any>>();

const selectedRows = ref<number[]>([]);

// handles selection and deselection of rows
const handleRowClick = (id: number) => {
  if (selectedRows.value.includes(id)) {
    selectedRows.value = selectedRows.value.filter((rowId) => rowId !== id);
  } else {
    selectedRows.value.push(id);
  }
};
</script>

<template>
  <main class="main">
    <div class="headline">Deals!</div>
    <DynamicTable
      @handleRowClick="handleRowClick"
      :tableData="tableData"
      :columns="tableModel.columns"
      :selectedRows="selectedRows"
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
