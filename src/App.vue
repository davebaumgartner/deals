<script setup lang="ts">
import DealsView from "./components/DealsView.vue";
import mockData from "../mockData/mockData10.json";
</script>

<template>
  <DealsView :tableData="mockData" />
</template>

<style lang="scss"></style>
