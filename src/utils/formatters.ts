const _NA: string = 'N/A';
const _UNKNOWN: string = 'Unknown';

export const formatRating = (rating: number | null): string =>
  rating != null ? rating.toFixed(1) : _NA;

export const formatYear = (date: string | null): string =>
  date && !Number.isNaN(new Date(date).getTime()) ? new Date(date).getFullYear().toString() : _UNKNOWN;

export const formatRuntime = (minutes: number | null): string =>
  minutes ? `${minutes} min` : _NA;

export const stripHtml = (html: string | null): string =>
  html ? html.replace(/<[^>]*>/g, '') : '';
