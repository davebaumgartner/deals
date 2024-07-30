<script setup lang="ts">
import SimpleButton from "./SimpleButton.vue";
interface Props {
  clearFilterDisabled: boolean;
  clearSortDisabled: boolean;
  clearSelectedRowsDisabled: boolean;
  resetDisabled: boolean;
  exportCSVDisabled: boolean;
  columnSelectorVisible: boolean;
}
defineProps<Props>();
defineEmits([
  "clickClearFilter",
  "clickClearSort",
  "clickClearSelectedRows",
  "clickReset",
  "clickExportToCSV",
  "toggleColumnEditVisibility"
]);
</script>

<template>
  <div class="button-bar">
    <SimpleButton
      :disabled="clearFilterDisabled"
      data-testid="clear-filter-button"
      @simpleButtonClick="$emit('clickClearFilter')"
    >
      Clear filter
    </SimpleButton>

    <SimpleButton
      @simpleButtonClick="$emit('clickClearSort')"
      data-testid="clear-sort-button"
      :disabled="clearSortDisabled"
    >
      Clear sort
    </SimpleButton>

    <SimpleButton
      @simpleButtonClick="$emit('clickClearSelectedRows')"
      data-testid="clear-selected-rows-button"
      :disabled="clearSelectedRowsDisabled"
    >
      Clear selected rows
    </SimpleButton>

    <SimpleButton
      @simpleButtonClick="$emit('clickReset')"
      data-testid="reset-button"
      :disabled="resetDisabled"
    >
      Reset
    </SimpleButton>

    <SimpleButton
      data-testid="column-list-toggle-button"
      @simpleButtonClick="$emit('toggleColumnEditVisibility')"
    >
      {{ columnSelectorVisible ? "Close column selector" : "Show/hide columns" }}
    </SimpleButton>

    <SimpleButton
      @simpleButtonClick="$emit('clickExportToCSV')"
      data-testid="export-to-csv-button"
      :disabled="exportCSVDisabled"
    >
      Export to CSV
    </SimpleButton>
  </div>
</template>

<style lang="scss">
.button-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;

  & button:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
