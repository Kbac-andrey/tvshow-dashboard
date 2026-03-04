<template>
  <div class="spinner" role="status" aria-label="Loading">
    <div class="spinner__ring" />
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  display: flex;
  justify-content: center;
  padding: var(--space-xl);

  &__ring {
    width: 36px;
    height: 36px;
    border: 3px solid var(--color-surface-raised);
    border-top-color: var(--color-accent);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
}
</style>
