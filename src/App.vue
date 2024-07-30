<script setup lang="ts">
import mockData from "../mockData/mockData10.json";
import { MOCK_TABLE_MODEL } from "./tableModel";
import DealsView from "./views/DealsView.vue";
</script>

<template>
  <DealsView
    :tableData="mockData"
    :tableModel="MOCK_TABLE_MODEL"
  />
</template>
