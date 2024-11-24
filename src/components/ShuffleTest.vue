<script setup lang="ts">
import {v4 as uuidv4} from 'uuid'
import {onMounted, onUnmounted, ref} from 'vue'
import {getRandomNumber, shuffle} from './../utils/utils.ts'

interface Item {
  id: string,
  color: {
    l: number,
    c: number,
    h: number,
  },
}

const items = ref<Item[]>([])
const interval = ref<number | null>(null)

const generateItems = () => {
  const numberOfItems = 2000
  const newItems = []
  for (let i = 0; i < numberOfItems; i++) {
    const item: Item = {
      id: uuidv4(),
      color: {
        l: getRandomNumber(0, 1),
        c: getRandomNumber(0, 0.4),
        h: getRandomNumber(0, 360),
      },
    }
    newItems.push(item)
  }
  items.value = newItems
}

const changeItemsPositions = () => {
  items.value = shuffle(items.value)
}

onMounted(() => {
  generateItems()
  interval.value = setInterval(() => {
    changeItemsPositions()
  }, 500)
})

onUnmounted(() => {
  if (interval.value !== null) {
    clearInterval(interval.value)
  }
})

</script>

<template>
  <div class="w-full h-full flex flex-row flex-wrap">
    <div
        v-for="item in items"
        :key="item.id"
        class="w-5 h-5"
        :style="{
          backgroundColor: `oklch(${item.color.l} ${item.color.c} ${item.color.h})`
        }"
    >
    </div>
  </div>
</template>

<style scoped>

</style>
