<script lang="ts" setup>
import type { KeyLabelPair, TableRow } from "@/types";
import { getKeyLabelFromHeaders } from "@/utils/utils";

interface Props {
  row: TableRow;
  headers: KeyLabelPair[];
}

defineProps<Props>();
</script>

<template>
  <div class="detail-container">
    <div class="details-label">Details</div>
    <div
      v-for="(value, key) in row"
      :key="key"
      class="detail-item"
    >
      <div class="label">{{ getKeyLabelFromHeaders(key, headers) }}:</div>
      <div class="value">{{ Array.isArray(value) ? value.join(", ") : value }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-container {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  border: 1px solid $grayBlue;
  display: flex;
  flex-direction: column;

  .details-label {
    font-size: 20px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: $lightBlue;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    color: white;
    font-weight: lighter;
  }

  .detail-item {
    margin-bottom: 5px;
    padding: 5px 10px;
    border-bottom: 1px dotted rgba(black, 0.5);
    display: flex;

    &:last-of-type {
      border-bottom: none;
    }

    .label {
      min-width: 120px;
    }
  }
}
</style>
