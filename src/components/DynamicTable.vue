<script setup lang="ts">
import type { TableColumn } from "@/types";
import { getColumnByKey } from "@/utils/utils";

interface DynamicTableProps<T> {
  tableData: T[];
  selectedRows: number[];
  columns: TableColumn<T>[];
}
defineProps<DynamicTableProps<any>>();
defineEmits(["handleRowClick"]);
</script>

<!-- DynamicTable is what the spec calls the "grid" component -->
<template>
  <table
    class="table"
    data-testid="dynamic-table"
  >
    <thead class="table-header">
      <th
        class="table-header-cell"
        :key="col.key"
        v-for="col in columns"
      >
        <div class="flex-contents">
          <div data-testid="column-label">{{ col.label }}</div>
        </div>
      </th>
    </thead>
    <tbody>
      <tr
        :class="`table-row ${selectedRows.includes(row.id) ? 'active' : ''}`"
        v-for="row in tableData"
        :key="row.id"
        @click="$emit('handleRowClick', row.id)"
      >
        <td
          class="table-cell"
          v-for="col in columns"
          :key="col.key"
          :title="col.label"
        >
          {{
            // check for format function, apply if it exists, otherwise just display the value
            getColumnByKey(col.key, columns)?.displayFormatFunction !== undefined
              ? getColumnByKey(col.key, columns)!.displayFormatFunction!(row[col.key])
              : row[col.key]
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.table {
  margin-top: 10px;
  width: 100%;
  min-height: 450px;
  border-collapse: collapse;
  border-radius: 10px;
  min-width: 40px;
  background-color: $grayBlue;
  color: white;

  .table-header {
    .table-header-cell {
      padding: 10px 0;
      text-align: left;
      font-weight: 400;

      ::selection {
        background-color: transparent;
      }
    }
  }

  .table-row {
    &:hover {
      .table-cell {
        background: $brown;
        cursor: pointer;
      }
    }

    .table-cell {
      padding: 4px 0;
      font-weight: 300;
    }

    &.active,
    &.active:hover {
      .table-cell {
        background: $brown;
      }
    }
  }
}
</style>
