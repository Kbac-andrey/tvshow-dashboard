<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useSearch } from '@/composables/useSearch';
import ShowCard from '@/components/shows/ShowCard.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const route = useRoute();
const { query, results, isSearching, search } = useSearch();

watch(
  () => route.query.q,
  (q) => {
    const normalized = Array.isArray(q) ? (q[0] ?? '') : (q ?? '');
    query.value = normalized;
    search(normalized);
  },
  { immediate: true }
);
</script>

<template>
  <main class="search-view">
    <h1 class="search-view__heading">
      Results for <em>"{{ query }}"</em>
    </h1>

    <LoadingSpinner v-if="isSearching" />

    <div v-else-if="results.length" class="search-view__grid">
      <ShowCard v-for="{ show } in results" :key="show.id" :show="show" />
    </div>

    <p v-else-if="query && !isSearching" class="search-view__empty">
      No shows found for "{{ query }}"
    </p>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.search-view {
  padding: var(--space-xl) var(--page-padding);
  max-width: var(--page-max-width);
  margin: 0 auto;

  &__heading {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    margin-bottom: var(--space-xl);
    color: var(--color-text-muted);
    em { font-style: normal; color: var(--color-text-primary); }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
    @include respond-to('sm') { grid-template-columns: repeat(3, 1fr); }
    @include respond-to('md') { grid-template-columns: repeat(4, 1fr); }
    @include respond-to('lg') { grid-template-columns: repeat(5, 1fr); }
    @include respond-to('xl') { grid-template-columns: repeat(6, 1fr); }
  }

  &__empty { color: var(--color-text-muted); text-align: center; padding: var(--space-2xl); }
}
</style>
