<script setup lang="ts">

import {ref, onMounted, onUnmounted} from 'vue'
import {getRandomNumber} from '../utils/utils.ts'

interface Item {
  id: number,
  label: string,
  active: boolean,
}

const generateItems = (count: number) => {
  const items = new Map()
  for (let i = 0; i < count; i++) {
    items.set(i, {
      id: i,
      label: `${i}`,
      active: false,
    })
  }
  return items
}

const items = ref<Map<number, Item>>(generateItems(5000))
const interval = ref<number | null>(null)
const lastUpdated = ref<Item[]>([])

const updateMapItems = () => {
  // reset last updated items
  for (const item of lastUpdated.value) {
    item.active = false;
  }
  const updated = [];
  for (let i = 0; i < 20; i++) {
    const randomNumber = getRandomNumber(0, 4999, 0)
    const item = items.value.get(randomNumber)!
    item.active = true
    updated.push(item)
  }
  lastUpdated.value = updated
}

onMounted(() => {
  interval.value = setInterval(() => {
    updateMapItems()
  }, 50)
})

onUnmounted(() => {
  if (interval.value !== null) {
    clearInterval(interval.value)
  }
})

</script>

<template>
  <div class="w-full flex flex-row flex-wrap gap-0.5">
    <div v-for="[key, item] in items" :key="key" class="bg-gray-200 rounded-md p-1" :class="{
      'bg-green-300': item.active,
    }">
      {{item.label}}
    </div>
  </div>
</template>

<style scoped>

</style>