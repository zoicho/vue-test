<script setup lang="ts">
  import {RouterLink} from 'vue-router'
</script>

<template>
  <div class="w-full h-full flex flex-row justify-center flex-wrap gap-8 p-20">
    <RouterLink  to="/shuffle" className="p-4 bg-gray-200 rounded-md">
      Shuffle Array items
    </RouterLink>
    <RouterLink  to="/deep-state-updates" className="p-4 bg-gray-200 rounded-md">
      Deep state updates
    </RouterLink>
    <RouterLink  to="/map-updates" className="p-4 bg-gray-200 rounded-md">
      Map updates
    </RouterLink>
  </div>
</template>

<style scoped>

</style>