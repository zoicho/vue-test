<script setup lang="ts">
import {onMounted, onUnmounted,ref} from 'vue'
import {generateDeepItems} from './../utils/utils.ts'
import type {DeepItem} from './../utils/utils.ts'

const items = ref<DeepItem[]>(generateDeepItems(5))

const iteration = ref(0)
const interval = ref<number | null>(null)

const updateItems = () => {
  iteration.value = iteration.value + 1
  if (iteration.value > 100) {
    iteration.value = 0
  }

  const updateLabels = (items: DeepItem[]) => {
    for (const item of items) {
      if (item.items?.length) {
        for (const subItem of item.items) {
          if (subItem.items?.length) {
            for (const nestedItem of subItem.items) {
              nestedItem.label = `Item ${iteration.value}`
            }
          }
        }
      }
    }
  }

  updateLabels(items.value)
}

onMounted(() => {
  interval.value = setInterval(() => {
    updateItems()
  }, 10)
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