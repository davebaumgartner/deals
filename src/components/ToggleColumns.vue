<script setup lang="ts">
import type { KeyLabelPair, TableColumn, TableRow } from "@/types";
import { computed } from "vue";

interface Props {
  columns: TableColumn<TableRow>[];
  visibleColumns: KeyLabelPair[];
}
const props = defineProps<Props>();
defineEmits(["columnToggle", "resetColumns"]);
const hiddenColumns = computed(() =>
  props.columns.filter((column) => !props.visibleColumns.find((col) => col.key === column.key))
);
</script>

<template>
  <div class="toggle-columns-container">
    <div>Click a column name button to show/hide it:</div>
    <div class="columns-list">
      <div
        class="column visible"
        v-for="column in visibleColumns"
        :key="column.key"
        @click="$emit('columnToggle', column.key)"
      >
        {{ column.label }}
      </div>
      <div
        class="column hidden"
        v-for="column in hiddenColumns"
        :key="column.key"
        @click="$emit('columnToggle', column.key)"
      >
        {{ column.label }}
      </div>
      <div
        class="column reset hidden"
        @click="$emit('resetColumns')"
      >
        Reset column visibility
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toggle-columns-container {
  background-color: $darkGray;
  border-radius: 10px;
  border: 1px solid $darkBlue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;

  .column-buttons {
    display: flex;
    gap: 10px;
  }

  .columns-list {
    margin: 0 10px;
    display: flex;
    flex-wrap: wrap;

    .column {
      background-color: $primaryBlue;
      margin-right: 20px;
      padding: 4px 8px;
      border-radius: 10px;
      color: white;
      margin-bottom: 10px;

      &.hidden {
        border: 1px dashed $primaryBlue;
        background-color: transparent;
        color: $primaryBlue;

        &:hover {
          background-color: $primaryBlue;
          border-style: solid;
        }
      }

      &.visible {
        border: 1px solid $primaryBlue;

        &:hover {
          border-color: $brown;
          background-color: $brown;
        }
      }

      &::selection {
        background-color: transparent;
      }

      &:hover {
        cursor: pointer;
        background-color: $primaryBlue;
        color: white;
      }

      &.reset {
        background: transparent;

        &:hover {
          background-color: $primaryBlue;
          color: white;
        }
      }
    }
  }
}
</style>
