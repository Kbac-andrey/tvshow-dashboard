<script setup lang="ts">
import SearchBar from './SearchBar.vue';
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/" class="header__logo">🎬 ShowDash</RouterLink>
      <div class="header__search">
        <SearchBar />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  background: rgba(13, 13, 18, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: var(--page-max-width);
    margin: 0 auto;
    padding: 0 var(--page-padding);
    gap: var(--space-md);
  }

  &__logo {
    font-family: var(--font-display);
    font-size: 1.3rem;
    color: var(--color-accent);
    white-space: nowrap;
    flex-shrink: 0;
  }

  &__search { flex: 1; max-width: 480px; }
}
</style>
