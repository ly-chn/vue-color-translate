<script setup lang="ts">
import {computed, ref} from 'vue'
import {LyColor} from './util/ly-color.ts'

const targetColor = ref('#000000')

const lyColor = computed(()=>new LyColor(targetColor.value))
const translatedColor = computed(()=>{
  const keys = ['toHex', 'toHexA', 'toRGB', 'toRGBA', 'toHSL', 'toHSLA'] as const
  const res: Record<string, string> = {}
  keys.forEach(key=>{
    res[key] = lyColor.value[key]()
  })
  return res
})
</script>

<template>
  <div>
    请选择颜色代码: <input type="color" v-model="targetColor">
    或输入颜色代码: <input type="text" v-model="targetColor">
    <div style="height: 20px"></div>
    <table>
      <thead>
      <tr>
        <td>色彩空间</td>
        <td>颜色值</td>
        <td>示例</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(colorValue, colorKey) in translatedColor" :key="colorKey">
        <td>{{colorKey}}</td>
        <td>{{colorValue}}</td>
        <td :style="{background: colorValue}"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table{
  border: 1px solid darkgrey;
  border-collapse: collapse;
}

td{
  border: 1px solid darkgrey;
  width: 300px;
}
</style>
