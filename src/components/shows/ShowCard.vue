<script setup lang="ts">
import type { Show } from '@/types/tvmaze.types';
import StarRating from '@/components/common/StarRating.vue';
import { formatRating } from '@/utils/formatters';

defineProps<{ show: Show }>();
</script>

<template>
  <RouterLink :to="{ name: 'show-detail', params: { id: show.id } }" class="show-card">
    <div class="show-card__poster">
      <img
        :src="show.image?.medium ?? '/placeholder.jpg'"
        :alt="`${show.name} poster`"
        loading="lazy"
      />
      <span class="show-card__rating-badge">{{ formatRating(show.rating.average) }}</span>
    </div>
    <div class="show-card__info">
      <h3 class="show-card__title">{{ show.name }}</h3>
      <div class="show-card__genres" aria-label="Genres">
        <span v-for="genre in show.genres.slice(0, 2)" :key="genre" class="genre-chip">
          {{ genre }}
        </span>
      </div>
      <StarRating :value="show.rating.average ?? 0" />
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.show-card {
  flex-shrink: 0;
  width: var(--card-width);
  scroll-snap-align: start;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  transition: transform var(--transition), box-shadow var(--transition);
  display: block;

  @include respond-to('md') { width: var(--card-width-md); }
  @include respond-to('xl') { width: var(--card-width-lg); }

  &:hover, &:focus-visible {
    transform: translateY(-6px) scale(1.02);
    box-shadow: var(--shadow-hover);
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  &__poster {
    position: relative;
    aspect-ratio: 2 / 3;
    background: var(--color-surface-raised);
    overflow: hidden;

    img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow); }
  }

  &:hover &__poster img { transform: scale(1.06); }

  &__rating-badge {
    position: absolute;
    top: 8px; right: 8px;
    background: rgba(13, 13, 18, 0.85);
    color: var(--color-accent);
    font-size: 0.72rem;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: var(--radius-sm);
    backdrop-filter: blur(4px);
  }

  &__info {
    padding: var(--space-sm) var(--space-sm) var(--space-md);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__genres { display: flex; flex-wrap: wrap; gap: 4px; }
}
</style>
