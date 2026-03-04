export interface Show {
  id: number;
  name: string;
  genres: string[];
  status: string;
  premiered: string | null;
  ended: string | null;
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  summary: string | null;
  network: Network | null;
  schedule: { time: string; days: string[] };
  runtime: number | null;
  language: string | null;
  officialSite: string | null;
}

export interface SearchResult {
  score: number;
  show: Show;
}

export interface Network {
  id: number;
  name: string;
  country: { name: string; code: string; timezone: string } | null;
}
