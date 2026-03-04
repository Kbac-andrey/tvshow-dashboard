<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Show } from '@/types/tvmaze.types';
import ShowCard from './ShowCard.vue';

defineProps<{ genre: string; shows: Show[] }>();

const track = ref<HTMLElement | null>(null);
const canLeft = ref(false);
const canRight = ref(false);

function updateArrows() {
  if (!track.value) {
    return;
  }

  const carousel = track.value;
  const firstCard = carousel.firstElementChild as HTMLElement | null;
  const lastCard = carousel.lastElementChild as HTMLElement | null;

  if (!firstCard || !lastCard) {
    canLeft.value = false;
    canRight.value = false;
    return;
  }

  const carouselRect = carousel.getBoundingClientRect();
  const firstRect = firstCard.getBoundingClientRect();
  const lastRect = lastCard.getBoundingClientRect();
  const epsilon = 2;

  canLeft.value = firstRect.left < carouselRect.left - epsilon;
  canRight.value = lastRect.right > carouselRect.right + epsilon;
}

function scrollBy(amount: number) {
  if (!track.value) {
    return;
  }

  track.value.scrollBy({ left: amount, behavior: 'smooth' });
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') scrollBy(300);
  if (e.key === 'ArrowLeft')  scrollBy(-300);
}

onMounted(() => {
  track.value?.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  // Wait for scroll-snap to settle before measuring
  setTimeout(updateArrows, 150);
});

onUnmounted(() => {
  track.value?.removeEventListener('scroll', updateArrows);
  window.removeEventListener('resize', updateArrows);
});
</script>

<template>
  <section class="genre-section">
    <h2 class="genre-section__title">{{ genre }}</h2>

    <div class="genre-section__track-wrapper">
      <!-- Left arrow -->
      <button
        v-if="canLeft"
        class="genre-section__arrow genre-section__arrow--left"
        :aria-label="`Scroll ${genre} left`"
        @click="scrollBy(-300)"
      >&#8249;</button>

      <div
        ref="track"
        class="genre-section__carousel"
        role="list"
        tabindex="0"
        :aria-label="`${genre} shows`"
        @keydown="onKeydown"
      >
        <ShowCard v-for="show in shows" :key="show.id" :show="show" role="listitem" />
      </div>

      <!-- Right arrow -->
      <button
        v-if="canRight"
        class="genre-section__arrow genre-section__arrow--right"
        :aria-label="`Scroll ${genre} right`"
        @click="scrollBy(300)"
      >&#8250;</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.genre-section {
  margin-bottom: var(--space-xl);

  &__title {
    color: var(--color-text-primary);
    margin-bottom: var(--space-md);
    padding: 0 var(--page-padding);
    font-size: clamp(1rem, 2vw, 1.3rem);
    display: flex;
    align-items: center;
    gap: var(--space-sm);

    &::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 1.1em;
      background: var(--color-accent);
      border-radius: 2px;
      flex-shrink: 0;
    }
  }

  &__track-wrapper {
    position: relative;
  }

  &__carousel {
    display: flex;
    gap: var(--space-md);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: var(--space-sm) var(--page-padding) var(--space-md);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    outline: none;

    &::-webkit-scrollbar { display: none; }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;

    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    cursor: pointer;

    background: rgba(13, 13, 18, 0.85);
    color: var(--color-text-primary);
    font-size: 1.8rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    backdrop-filter: blur(6px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    transition: background var(--transition), transform var(--transition), opacity var(--transition);
    opacity: 0.85;

    &:hover {
      background: var(--color-accent);
      color: #0d0d12;
      opacity: 1;
      transform: translateY(-50%) scale(1.08);
    }

    &--left  { left: 4px; }
    &--right { right: 4px; }
  }
}
</style>
