<script setup lang="ts">
import type { TableColumn } from "@/types";
import { SortDirection } from "@/types";
import { getColumnByKey } from "@/utils/utils";

export interface DynamicTableProps<T> {
  visibleColumns: TableColumn<T>[];
  columns: TableColumn<T>[];
  selectedRows: number[];
  sortColumn: string | null;
  sortDirection: SortDirection;
  tableData: T[];
}

defineProps<DynamicTableProps<any>>();
defineEmits(["handleRowClick", "handleColumnHeaderClick"]);
</script>

<!-- DynamicTable is what the spec calls the "grid" component -->
<template>
  <table
    class="table"
    data-testid="dynamic-table"
  >
    <thead class="table-header">
      <th class="table-header-cell"><!-- empty header cell for checkbox column --></th>
      <th
        class="table-header-cell"
        :class="`${getColumnByKey(col.key, columns)?.sortable ? 'sortable' : 'unsortable'}`"
        :key="col.key"
        v-for="col in visibleColumns"
        @click="
          getColumnByKey(col.key, columns)?.sortable
            ? $emit('handleColumnHeaderClick', col.key)
            : void 0
        "
      >
        <div class="flex-contents">
          <div data-testid="column-label">{{ col.label }}</div>
          <div data-testid="sort-icon-container">
            {{
              sortColumn === col.key
                ? sortDirection === SortDirection.ASC
                  ? "&uarr;"
                  : "&darr;"
                : ""
            }}
          </div>
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
        <td class="table-cell checkbox">
          <input
            class="checkbox-element"
            type="checkbox"
            :data-testid="`checkbox-${row.id}`"
            :checked="selectedRows.includes(row.id)"
          />
        </td>
        <td
          class="table-cell"
          v-for="col in visibleColumns"
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
  background-color: $grayBlue;
  color: white;

  .table-header {
    .table-header-cell {
      min-width: 40px;
      padding: 10px 0;
      text-align: left;
      font-weight: 400;

      ::selection {
        background-color: transparent;
      }

      .flex-contents {
        min-height: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        & > div:nth-child(2) {
          margin-left: 5px;
        }
      }

      &:hover.sortable {
        cursor: pointer;

        .flex-contents > div:first-child {
          text-decoration: underline;
        }
      }

      &:hover.unsortable {
        cursor: not-allowed;
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

      &.checkbox {
        padding: 0 10px;
        width: 10px;

        &:hover {
          cursor: pointer;
        }

        .checkbox-element {
          &:hover {
            cursor: pointer;
          }
        }
      }
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
