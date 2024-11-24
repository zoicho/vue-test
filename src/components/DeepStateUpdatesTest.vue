<script setup lang="ts">
import {onMounted, onUnmounted,ref,shallowRef} from 'vue'
import {generateDeepItems} from './../utils/utils.ts'
import type {DeepItem} from './../utils/utils.ts'

//const items = ref<DeepItem[]>(generateDeepItems(5))
const items = shallowRef<DeepItem[]>(generateDeepItems(5))

const iteration = ref(0)
const interval = ref<number | null>(null)

const updateItems = () => {
  iteration.value = iteration.value + 1
  if (iteration.value > 100) {
    iteration.value = 0
  }

  items.value = items.value.map((item) => {
    if (item.items) {
      item.items = item.items.map((iItem) => {
        if (iItem.items) {
          iItem.items = iItem.items.map((iiItem) => ({
            ...iiItem,
            label: `Item ${iteration.value}`,
          }));
        }
        return iItem;
      });
    }
    return item;
  });

}

onMounted(() => {
  interval.value = setInterval(() => {
    updateItems()
  }, 100)
})

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})

</script>

<template>
  <ul class="px-4">
    <li v-for="item in items" :key="item.id">
      {{item.label}}
      <ul v-if="item.items" class="px-4">
        <li v-for="iItem in item.items" :key="iItem.id">
          {{iItem.label}}
          <ul v-if="iItem.items" class="px-4">
            <li v-for="iiItem in iItem.items" :key="iiItem.id">
              {{iiItem.label}}
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>

</style>