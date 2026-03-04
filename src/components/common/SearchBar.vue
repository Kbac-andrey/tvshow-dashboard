<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@/composables/useDebounceFn';


const router = useRouter();
const route = useRoute();
const query = ref('');

const _SEARCH = 'search';
const _HOME = 'home';

const normalizeRouteQuery = (q: unknown): string =>
  Array.isArray(q) ? (q[0] ?? '') : (typeof q === 'string' ? q : '');

const { debounced: navigate, cancel } = useDebounceFn((q: string) => {
  const normalized = q.trim();

  if (normalized) {
    const currentQuery = normalizeRouteQuery(route.query.q).trim();
    if (route.name === _SEARCH && currentQuery === normalized) {
      return;
    }
    router.replace({ name: _SEARCH, query: { q: normalized } });
    return;
  }

  if (route.name === _SEARCH) {
    router.push({ name: _HOME });
  }
}, 400);

onUnmounted(cancel);

watch(
  () => route.query.q,
  (q) => {
    const normalized = normalizeRouteQuery(q);
    if (query.value !== normalized) {
      query.value = normalized;
    }
  },
  { immediate: true }
);

watch(query, navigate);
</script>

<template>
  <div class="search-bar" role="search">
    <input
      class="search-bar__input"
      v-model="query"
      type="search"
      placeholder="Search TV shows..."
      aria-label="Search TV shows"
      autocomplete="off"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238a8a9a' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E") no-repeat center;
    pointer-events: none;
  }

  &__input {
    width: 100%;
    padding: 10px 16px 10px 40px;
    background: var(--color-surface);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-lg);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    font-size: 0.9rem;
    transition: var(--transition);
    outline: none;

    &::placeholder { color: var(--color-text-muted); }

    &:focus {
      border-color: var(--color-accent);
      background: var(--color-surface-raised);
      box-shadow: 0 0 0 3px var(--color-accent-subtle);
    }
  }
}
</style>
