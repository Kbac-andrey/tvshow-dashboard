import axios from 'axios';
import type { Show, SearchResult } from '@/types/tvmaze.types';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const api = {
  getShows: (page: number) => client.get<Show[]>(`/shows?page=${page}`),
  getShow: (id: number) => client.get<Show>(`/shows/${id}`),
  searchShows: (query: string) => client.get<SearchResult[]>(`/search/shows?q=${encodeURIComponent(query)}`),
};
