import { describe, it, expect } from 'vitest';
import { groupByGenre } from '@/utils/groupByGenre';
import type { Show } from '@/types/tvmaze.types';

const minimalShow = (overrides: Partial<Show>): Show => ({
  id: 0,
  name: '',
  genres: [],
  status: '',
  premiered: null,
  ended: null,
  rating: { average: null },
  image: null,
  summary: null,
  network: null,
  schedule: { time: '', days: [] },
  runtime: null,
  language: null,
  officialSite: null,
  ...overrides,
});

describe('groupByGenre', () => {
  it('groups shows into correct genre buckets', () => {
    const shows: Show[] = [
      minimalShow({ id: 1, genres: ['Drama', 'Crime'], rating: { average: 8.5 } }),
      minimalShow({ id: 2, genres: ['Drama'], rating: { average: 7.0 } }),
      minimalShow({ id: 3, genres: ['Comedy'], rating: { average: 9.0 } }),
    ];
    const map = groupByGenre(shows);
    expect(map['Drama']).toHaveLength(2);
    expect(map['Comedy']).toHaveLength(1);
    expect(map['Crime']).toHaveLength(1);
  });

  it('sorts each genre bucket by rating descending', () => {
    const shows: Show[] = [
      minimalShow({ id: 1, genres: ['Drama'], rating: { average: 7.0 } }),
      minimalShow({ id: 2, genres: ['Drama'], rating: { average: 9.5 } }),
    ];
    expect(groupByGenre(shows)['Drama']![0]!.id).toBe(2);
  });

  it('treats null ratings as 0', () => {
    const shows: Show[] = [
      minimalShow({ id: 1, genres: ['Drama'], rating: { average: null } }),
      minimalShow({ id: 2, genres: ['Drama'], rating: { average: 6.0 } }),
    ];
    expect(groupByGenre(shows)['Drama']![0]!.id).toBe(2);
  });

  it('returns empty object for empty input', () => {
    expect(groupByGenre([])).toEqual({});
  });

  it('skips shows with no genres', () => {
    const shows: Show[] = [minimalShow({ id: 1, genres: [], rating: { average: 8.0 } })];
    expect(groupByGenre(shows)).toEqual({});
  });
});
