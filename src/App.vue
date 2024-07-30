<script setup lang="ts">
import mockData from "../mockData/mockData10.json";
import DealsView from "./components/DealsView.vue";
import { MOCK_TABLE_MODEL } from "./tableModel";
</script>

<template>
  <DealsView
    :tableData="mockData"
    :tableModel="MOCK_TABLE_MODEL"
  />
</template>

<style lang="scss"></style>
