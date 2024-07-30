<script setup lang="ts">
import { computed, ref, watch } from "vue";

import ButtonBar from "@/components/ButtonBar.vue";
import DetailPane from "@/components/DetailPane.vue";
import DynamicTable from "@/components/DynamicTable.vue";
import FilterTextInput from "@/components/FilterTextInput.vue";
import NoResults from "@/components/NoResults.vue";
import ToggleColumns from "@/components/ToggleColumns.vue";

import type { TableModel } from "@/types";
import { SortDirection } from "@/types";

import {
  debounce,
  convertJSONToCSVandDownload as exportToCSV,
  getColumnByKey
} from "@/utils/utils";

/*-- Props --*/
interface Props<T> {
  tableData: T[];
  tableModel: TableModel<T>;
}

// There's probably a better way to do this with generics, but this will work for now.
const props = defineProps<Props<any>>();
const { tableData, tableModel } = props;

/*-- Refs --*/
const debouncedFilterText = ref("");
const filterText = ref<string>("");
const selectedRows = ref<number[]>([]);
// post-MVP these could go in local storage to persist sort
const sortDirection = ref<SortDirection>(SortDirection.ASC);
const sortColumn = ref("");
// only show the columns that are not hidden by default
const visibleColumns = ref(
  tableModel?.columns.filter((column) => !tableModel?.defaultHiddenColumns?.includes(column.key)) ??
    tableModel?.columns
);
const columnTogglesVisible = ref(false);

/*-- Event handlers --*/
// handles selection and deselection of rows
const handleRowClick = (id: number) => {
  if (selectedRows.value.includes(id)) {
    selectedRows.value = selectedRows.value.filter((rowId) => rowId !== id);
  } else {
    selectedRows.value.push(id);
  }
};

// Set sort parameters when column headers are clicked
const handleColumnHeaderClick = (columnKey: string) => {
  // current column is already sorted, reverse the order:
  if (sortColumn.value === columnKey) {
    sortDirection.value =
      sortDirection.value === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
  } else {
    sortColumn.value = columnKey;
    // changing sort column, so we'll reset sort order to ASC
    sortDirection.value = SortDirection.ASC;
  }
};

// Adds/removes columns from visibleColumns when a column toggle button is clicked
const handleColumnToggle = (columnKey: string) => {
  if (visibleColumns.value.find((column) => column.key === columnKey)) {
    visibleColumns.value = visibleColumns.value.filter((column) => column.key !== columnKey);
  } else {
    visibleColumns.value.push(tableModel?.columns.find((col) => col.key === columnKey)!);
  }
};

// Sort rows by calling sort functions defined inside the table model
const sortRows = () => {
  const sortFunction = getColumnByKey(sortColumn.value, tableModel.columns)?.sortFunction;
  if (sortFunction) {
    filteredTableData.value.sort((a, b) => sortFunction(a, b, sortDirection.value));
  }
};

// clear/reset methods
const clearFilter = () => {
  debouncedFilterText.value = "";
  filterText.value = "";
};
const clearSelectedRows = () => {
  selectedRows.value = [];
};
const resetColumns = () => {
  visibleColumns.value = tableModel?.columns.filter(
    (column) => !tableModel?.defaultHiddenColumns?.includes(column.key)
  );
};
const resetSort = () => {
  sortDirection.value = SortDirection.ASC;
  sortColumn.value = "";
  filteredTableData.value.sort(tableModel.defaultSort); // reset to default sort order
};
const reset = () => {
  clearFilter();
  clearSelectedRows();
  resetSort();
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
// sort rows every time column/direction/debouncedFilterText changes
watch([sortColumn, sortDirection, debouncedFilterText], () => sortRows());

// debounce filter text input:
watch(filterText, (newValue) => {
  debounceFilterText(newValue);
});
</script>

<template>
  <main class="main">
    <div class="headline">Deals!</div>
    <FilterTextInput v-model="filterText" />
    <ButtonBar
      :clearFilterDisabled="filterText.length <= 0"
      :resetSortDisabled="sortColumn === ''"
      :clearSelectedRowsDisabled="selectedRows.length <= 0"
      :columnSelectorVisible="columnTogglesVisible"
      :resetDisabled="selectedRows.length <= 0 && filterText === '' && sortColumn === ''"
      :exportCSVDisabled="filteredTableData?.length <= 0"
      @clickClearSelectedRows="clearSelectedRows"
      @clickClearFilter="clearFilter"
      @clickResetSort="resetSort"
      @clickReset="reset"
      @clickExportToCSV="exportToCSV(filteredTableData)"
      @toggleColumnEditVisibility="columnTogglesVisible = !columnTogglesVisible"
    />
    <ToggleColumns
      v-if="columnTogglesVisible"
      @toggleColumnVisibility="columnTogglesVisible = !columnTogglesVisible"
      @columnToggle="handleColumnToggle"
      @resetColumns="resetColumns"
      :columns="tableModel?.columns"
      :visibleColumns="
        visibleColumns.map((column) => {
          return { key: column.key, label: column.label };
        })
      "
    />
    <div class="grid-container">
      <DynamicTable
        data-testid="results"
        v-if="filteredTableData?.length > 0"
        @handleColumnHeaderClick="handleColumnHeaderClick"
        @handleRowClick="handleRowClick"
        :columns="tableModel.columns"
        :selectedRows="selectedRows"
        :sortColumn="sortColumn"
        :sortDirection="sortDirection"
        :tableData="filteredTableData"
        :visibleColumns="visibleColumns"
      />
      <NoResults
        v-else
        @resetClicked="reset"
      />
      <DetailPane
        data-testid="detail-pane"
        v-if="
          selectedRows.length === 1 && filteredTableData.find((row) => row.id === selectedRows[0])
        "
        :headers="columnKeysAndLabels"
        :row="filteredTableData.filter((row) => row.id === selectedRows[0])[0]"
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

    // Minimally responsive: move detail pane above table (below and it wouldn't be immediately visible) on small screens
    // Not a great experience necessarily, but certainly minimally responsive.
    @media (max-width: 768px) {
      [data-testid="results"] {
        order: 2;
      }
      [data-testid="detail-pane"] {
        order: 1;
      }
      flex-direction: column;
    }
  }
}
</style>
