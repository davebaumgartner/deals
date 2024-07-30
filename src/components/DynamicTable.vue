<script setup lang="ts">
import type { TableColumn } from "@/types";
import { getColumnByKey } from "@/utils/utils";

interface Props<T> {
  tableData: T[];
  columns: TableColumn<T>[];
}
defineProps<Props<any>>();
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
        class="table-row"
        v-for="row in tableData"
        :key="row.id"
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
table {
  width: 100%;
}
</style>
