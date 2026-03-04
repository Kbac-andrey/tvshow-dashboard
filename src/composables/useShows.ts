import { computed, ref } from 'vue';
import axios from 'axios';
import { api } from '@/utils/api';
import { groupByGenre, type GenreMap } from '@/utils/groupByGenre';
import type { Show } from '@/types/tvmaze.types';

export function useShows() {
  const shows = ref<Show[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(0);
  const hasMore = ref(true);
  const genreMap = computed<GenreMap>(() => groupByGenre(shows.value));
  const genres = computed<string[]>(() => Object.keys(genreMap.value).sort());

  const fetchNextPage = async (): Promise<void> => {
    if (isLoading.value || !hasMore.value) {
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await api.getShows(currentPage.value);
      if (data.length === 0) {
        hasMore.value = false;
      } else {
        shows.value = [...shows.value, ...data];
        currentPage.value++;
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        hasMore.value = false;
      } else {
        error.value = 'Failed to load shows. Please try again.';
      }
    } finally {
      isLoading.value = false;
    }
  };

  return { shows, isLoading, error, hasMore, currentPage, genreMap, genres, fetchNextPage };
}
