<script setup lang="ts">
defineProps<{ message: string }>();
</script>

<template>
  <div class="error-message" role="alert">
    <p>{{ message }}</p>
  </div>
</template>

<style lang="scss" scoped>
.error-message {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-error);
  font-size: 0.9rem;
}
</style>
