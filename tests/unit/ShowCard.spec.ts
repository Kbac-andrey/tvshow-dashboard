import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import ShowCard from '@/components/shows/ShowCard.vue';
import type { Show } from '@/types/tvmaze.types';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/show/:id', name: 'show-detail', component: { template: '' } }],
});

const mockShow: Show = {
  id: 42,
  name: 'Breaking Bad',
  genres: ['Drama', 'Crime'],
  rating: { average: 9.5 },
  image: { medium: '/img.jpg', original: '/img.jpg' },
  status: 'Ended',
  premiered: null,
  ended: null,
  summary: null,
  network: null,
  schedule: { time: '22:00', days: ['Sunday'] },
  runtime: 45,
  language: 'English',
  officialSite: null,
};

describe('ShowCard', () => {
  const mount_ = () => mount(ShowCard, { props: { show: mockShow }, global: { plugins: [router] } });

  it('renders show name',       () => expect(mount_().text()).toContain('Breaking Bad'));
  it('renders genre chips',     () => expect(mount_().text()).toContain('Drama'));
  it('renders rating badge',    () => expect(mount_().text()).toContain('9.5'));
  it('links to detail URL',     () => expect(mount_().find('a').attributes('href')).toContain('/show/42'));
  it('has alt text on poster',  () => expect(mount_().find('img').attributes('alt')).toBe('Breaking Bad poster'));
});
