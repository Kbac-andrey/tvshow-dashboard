<script setup lang="ts">
import { useShows } from '@/composables/useShows';
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';
import GenreSection from '@/components/shows/GenreSection.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import ErrorMessage from '@/components/common/ErrorMessage.vue';

const { genres, genreMap, isLoading, error, hasMore, fetchNextPage } = useShows();

const { sentinel } = useInfiniteScroll(() => {
  if (hasMore.value && !isLoading.value) fetchNextPage();
});
</script>

<template>
  <main class="home">
    <ErrorMessage v-if="error" :message="error" />

    <GenreSection
      v-for="genre in genres"
      :key="genre"
      :genre="genre"
      :shows="genreMap[genre]!"
    />

    <div ref="sentinel" class="scroll-sentinel" aria-hidden="true" />
    <LoadingSpinner v-if="isLoading" />
    <p v-if="!hasMore && !isLoading" class="end-message">All shows loaded</p>
  </main>
</template>

<style lang="scss" scoped>
.home {
  padding-top: var(--space-xl);
  padding-bottom: var(--space-2xl);
}
</style>
