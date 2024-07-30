<script setup lang="ts">
import DetailPane from "@/components/DetailPane.vue";
import DynamicTable from "@/components/DynamicTable.vue";
import FilterTextInput from "@/components/FilterTextInput.vue";
import type { TableModel } from "@/types";
import { debounce } from "@/utils/utils";
import { computed, ref, watch } from "vue";

interface Props<T> {
  tableData: T[];
  tableModel: TableModel<T>;
}
const props = defineProps<Props<any>>();
const { tableData, tableModel } = props;

const debouncedFilterText = ref("");
const filterText = ref<string>("");
const selectedRows = ref<number[]>([]);

/*-- Event handlers --*/
// handles selection and deselection of rows
const handleRowClick = (id: number) => {
  if (selectedRows.value.includes(id)) {
    selectedRows.value = selectedRows.value.filter((rowId) => rowId !== id);
  } else {
    selectedRows.value.push(id);
  }
};

// debounce the filter text input to limit updates to 250ms after the last keystroke
const debounceFilterText = debounce((newValue) => {
  debouncedFilterText.value = newValue;
}, 250);

/*-- Computed properties --*/
// Make all fields case-insensitive searchable:
const filteredTableData = computed(() =>
  tableData?.filter((row) => {
    // normalize needle
    const needle = debouncedFilterText.value.toLowerCase().trim();

    // get array of row keys to loop through
    const rowKeys = Object.keys(row);

    // default to not including the row
    let result = false;

    // loop through row keys
    for (let i = 0; i < rowKeys.length; i++) {
      // get value for current column
      const val = row[rowKeys[i]];
      if (!Array.isArray(val)) {
        // for all non-object column value types, we convert to string and check for the needle.
        if (val.toString().toLowerCase().includes(needle)) {
          result = true;
        }
      } else {
        // for columns that contain a list of items like Analysts and Identifiers, we'll join those items into a string and then check if that string includes the needle.
        if (val.join(",").toLowerCase().includes(needle)) {
          result = true;
        }
      }
    }

    return result;
  })
);

// get all column keys and labels:
const columnKeysAndLabels = computed(() =>
  tableModel?.columns.map((column) => {
    return { key: column.key, label: column.label };
  })
);

/*-- Watchers --*/
// debounce filter text input:
watch(filterText, (newValue) => {
  debounceFilterText(newValue);
});
</script>

<template>
  <main class="main">
    <div class="headline">Deals!</div>
    <FilterTextInput v-model="filterText" />
    <div class="grid-container">
      <DynamicTable
        @handleRowClick="handleRowClick"
        :tableData="filteredTableData"
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
