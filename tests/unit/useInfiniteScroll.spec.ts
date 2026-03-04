import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) { this.callback = cb; }
  observe    = vi.fn();
  disconnect = vi.fn();
  trigger(isIntersecting: boolean) {
    const entry = { isIntersecting } as IntersectionObserverEntry;
    this.callback([entry], this as unknown as IntersectionObserver);
  }
}

describe('useInfiniteScroll', () => {
  let observer: MockIntersectionObserver;

  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      constructor(cb: IntersectionObserverCallback) { observer = new MockIntersectionObserver(cb); }
      observe    = (...args: Parameters<MockIntersectionObserver['observe']>) => observer.observe(...args);
      disconnect = () => observer.disconnect();
    });
  });

  it('fires callback when sentinel intersects', async () => {
    const callback = vi.fn();
    const C = defineComponent({
      setup() { const { sentinel } = useInfiniteScroll(callback); return { sentinel }; },
      template: '<div ref="sentinel" />'
    });
    mount(C);
    await nextTick();
    observer.trigger(true);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('does not fire callback when not intersecting', async () => {
    const callback = vi.fn();
    const C = defineComponent({
      setup() { const { sentinel } = useInfiniteScroll(callback); return { sentinel }; },
      template: '<div ref="sentinel" />'
    });
    mount(C);
    await nextTick();
    observer.trigger(false);
    expect(callback).not.toHaveBeenCalled();
  });
});
