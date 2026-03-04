import type { Show } from '@/types/tvmaze.types';

export type GenreMap = Record<string, Show[]>;

export function groupByGenre(shows: Show[]): GenreMap {
  const map: GenreMap = {};

  for (const show of shows) {
    for (const genre of show.genres) {
      if (!map[genre]) map[genre] = [];
      map[genre].push(show);
    }
  }

  for (const genre in map) {
    map[genre] = [...map[genre]!].sort(
      (a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0)
    );
  }

  return map;
}
