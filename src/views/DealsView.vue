<script setup lang="ts">
import DetailPane from "@/components/DetailPane.vue";
import DynamicTable from "@/components/DynamicTable.vue";
import type { TableModel } from "@/types";
import { computed, ref } from "vue";

interface Props<T> {
  tableData: T[];
  tableModel: TableModel<T>;
}
const props = defineProps<Props<any>>();

const selectedRows = ref<number[]>([]);

// handles selection and deselection of rows
const handleRowClick = (id: number) => {
  if (selectedRows.value.includes(id)) {
    selectedRows.value = selectedRows.value.filter((rowId) => rowId !== id);
  } else {
    selectedRows.value.push(id);
  }
};

// get all column keys and labels:
const columnKeysAndLabels = computed(() =>
  props.tableModel?.columns.map((column) => {
    return { key: column.key, label: column.label };
  })
);
</script>

<template>
  <main class="main">
    <div class="headline">Deals!</div>
    <div class="grid-container">
      <DynamicTable
        @handleRowClick="handleRowClick"
        :tableData="tableData"
        :columns="tableModel.columns"
        :selectedRows="selectedRows"
      />
      <DetailPane
        v-if="selectedRows.length === 1 && tableData.find((row) => row.id === selectedRows[0])"
        :headers="columnKeysAndLabels"
        :row="tableData.filter((row) => row.id === selectedRows[0])[0]"
      />
    </div>
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

  .grid-container {
    display: flex;
    flex-direction: row;
  }
}
</style>
