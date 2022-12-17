<template>
  <button @click="handleClick">button</button>
</template>
<script setup>
import { ref } from 'vue'

const handleClick = () => {
  console.log('click')
}

</script>
