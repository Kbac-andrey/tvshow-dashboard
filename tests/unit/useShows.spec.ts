import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosResponse } from 'axios';

vi.mock('@/utils/api', () => ({ api: { getShows: vi.fn() } }));

import { api } from '@/utils/api';
import { useShows } from '@/composables/useShows';
import type { Show } from '@/types/tvmaze.types';

const createAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: { headers: {} } as AxiosResponse<T>['config'],
});

const minimalShow: Show = {
  id: 1,
  name: 'Test Show',
  genres: ['Drama'],
  status: 'Running',
  premiered: null,
  ended: null,
  rating: { average: 8 },
  image: null,
  summary: null,
  network: null,
  schedule: { time: '', days: [] },
  runtime: null,
  language: null,
  officialSite: null,
};

describe('useShows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('populates shows after fetch', async () => {
    vi.mocked(api.getShows).mockResolvedValue(createAxiosResponse([minimalShow]));
    const { shows, fetchNextPage } = useShows();
    await fetchNextPage();
    expect(shows.value).toHaveLength(1);
  });

  it('increments currentPage after fetch', async () => {
    vi.mocked(api.getShows).mockResolvedValue(createAxiosResponse([minimalShow]));
    const { currentPage, fetchNextPage } = useShows();
    await fetchNextPage();
    expect(currentPage.value).toBe(1);
  });

  it('sets hasMore false on 404', async () => {
    vi.mocked(api.getShows).mockRejectedValue({ isAxiosError: true, response: { status: 404 } });
    const { hasMore, fetchNextPage } = useShows();
    await fetchNextPage();
    expect(hasMore.value).toBe(false);
  });

  it('sets error on non-404 failure', async () => {
    vi.mocked(api.getShows).mockRejectedValue(new Error('Network error'));
    const { error, fetchNextPage } = useShows();
    await fetchNextPage();
    expect(error.value).toBeTruthy();
  });

  it('resets isLoading after fetch', async () => {
    vi.mocked(api.getShows).mockResolvedValue(createAxiosResponse([]));
    const { isLoading, fetchNextPage } = useShows();
    await fetchNextPage();
    expect(isLoading.value).toBe(false);
  });
});
