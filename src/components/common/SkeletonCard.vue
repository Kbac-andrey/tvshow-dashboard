<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton skeleton-card__poster" />
    <div class="skeleton-card__info">
      <div class="skeleton skeleton-card__title" />
      <div class="skeleton skeleton-card__subtitle" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.skeleton-card {
  flex-shrink: 0;
  width: var(--card-width);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);

  @include respond-to('md') { width: var(--card-width-md); }
  @include respond-to('xl') { width: var(--card-width-lg); }

  &__poster   { aspect-ratio: 2 / 3; width: 100%; }
  &__info     { padding: var(--space-sm); display: flex; flex-direction: column; gap: 6px; }
  &__title    { height: 14px; width: 80%; border-radius: var(--radius-sm); }
  &__subtitle { height: 10px; width: 55%; border-radius: var(--radius-sm); }
}
</style>
