import { onUnmounted, ref, watch } from 'vue';

export function useInfiniteScroll(
  callback: () => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const sentinel = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;

  const stopWatch = watch(sentinel, (el) => {
    if (!el) {
      return;
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(el);
    stopWatch();
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return { sentinel };
}
