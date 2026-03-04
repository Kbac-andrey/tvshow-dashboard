import { describe, it, expect } from 'vitest';
import { formatRating, formatYear, formatRuntime, stripHtml } from '@/utils/formatters';

describe('formatters', () => {
  describe('formatRating',  () => {
    it('formats to 1 decimal', () => expect(formatRating(8.567)).toBe('8.6'));
    it('returns N/A for null', () => expect(formatRating(null)).toBe('N/A'));
  });
  describe('formatYear', () => {
    it('extracts year',          () => expect(formatYear('2019-04-14')).toBe('2019'));
    it('returns Unknown for null', () => expect(formatYear(null)).toBe('Unknown'));
    it('returns Unknown for invalid date', () => expect(formatYear('not-a-date')).toBe('Unknown'));
  });
  describe('formatRuntime', () => {
    it('appends min',          () => expect(formatRuntime(60)).toBe('60 min'));
    it('returns N/A for null', () => expect(formatRuntime(null)).toBe('N/A'));
  });
  describe('stripHtml', () => {
    it('removes tags',           () => expect(stripHtml('<p>Hello <b>world</b></p>')).toBe('Hello world'));
    it('returns empty for null', () => expect(stripHtml(null)).toBe(''));
  });
});
