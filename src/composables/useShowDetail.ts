import { ref, watch, type Ref } from 'vue';
import { api } from '@/utils/api';
import type { Show } from '@/types/tvmaze.types';

export function useShowDetail(id: Ref<number>) {
  const show = ref<Show | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  watch(
    id,
    async (newId, _oldId, onInvalidate): Promise<void> => {
      if (!newId) {
        show.value = null;
        error.value = 'Show not found.';
        isLoading.value = false;
        return;
      }

      let cancelled = false;
      onInvalidate(() => {
        cancelled = true;
      });

      isLoading.value = true;
      error.value = null;
      show.value = null;

      try {
        const { data } = await api.getShow(newId);
        if (!cancelled) show.value = data;
      } catch {
        if (!cancelled) error.value = 'Show not found.';
      } finally {
        if (!cancelled) isLoading.value = false;
      }
    },
    { immediate: true }
  );

  return { show, isLoading, error };
}
