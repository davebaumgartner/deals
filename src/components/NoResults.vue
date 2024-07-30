<script setup lang="ts">
defineEmits(["resetClicked"]);
</script>

<template>
  <div class="no-results">
    <div class="mb-10">No results found for current display settings.</div>
    <div>
      <a
        class="reset-link"
        @click="$emit('resetClicked')"
        >Click here</a
      >
      to reset all filters and sorting.
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-results {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 24px;

  .mb-10 {
    margin-bottom: 10px;
  }
}

.reset-link {
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
