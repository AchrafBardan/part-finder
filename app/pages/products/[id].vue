<script setup lang="ts">
const { id } = useRoute().params;
</script>

<template>
  <div>product: {{ id }}</div>
</template>
