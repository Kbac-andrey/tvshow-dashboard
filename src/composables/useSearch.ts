import { onUnmounted, ref } from 'vue';
import { api } from '@/utils/api';
import { useDebounceFn } from './useDebounceFn';
import type { SearchResult } from '@/types/tvmaze.types';

export function useSearch() {
  const query= ref('');
  const results = ref<SearchResult[]>([]);
  const isSearching = ref(false);
  const error = ref<string | null>(null);
  let latestRequestId = 0;

  const { debounced: search, cancel } = useDebounceFn(async (q: string) => {
    const normalized = q.trim();
    if (!normalized) {
      results.value = [];
      error.value = null;
      isSearching.value = false;
      return;
    }

    const requestId = ++latestRequestId;
    isSearching.value = true;
    error.value = null;

    try {
      const { data } = await api.searchShows(normalized);
      if (requestId === latestRequestId) {
        results.value = data;
      }
    } catch {
      if (requestId === latestRequestId) {
        error.value = 'Search failed. Please try again.';
      }
    } finally {
      if (requestId === latestRequestId) {
        isSearching.value = false;
      }
    }
  }, 400);

  onUnmounted(cancel);

  return { query, results, isSearching, error, search };
}
