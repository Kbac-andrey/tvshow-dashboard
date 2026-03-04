<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useShowDetail } from '@/composables/useShowDetail';
import { formatRating, formatYear, formatRuntime, stripHtml } from '@/utils/formatters';
import StarRating from '@/components/common/StarRating.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import ErrorMessage from '@/components/common/ErrorMessage.vue';

const route = useRoute();
const id = computed(() => {
  const parsed = Number(route.params.id);
  return Number.isFinite(parsed) ? parsed : 0;
});
const { show, isLoading, error } = useShowDetail(id);
const heroStyle = computed(() =>
  show.value?.image?.original ? { backgroundImage: `url(${show.value.image.original})` } : undefined
);
</script>

<template>
  <main class="show-detail">
    <LoadingSpinner v-if="isLoading" />
    <ErrorMessage v-else-if="error" :message="error" />

    <template v-else-if="show">
      <div class="show-detail__hero" :style="heroStyle">
        <RouterLink
          to="/"
          class="show-detail__back"
          aria-label="Back to home page"
          title="Back to home"
        >
          &#8249;
        </RouterLink>

        <div class="show-detail__hero-overlay">
          <h1>{{ show.name }}</h1>
          <StarRating :value="show.rating.average ?? 0" size="lg" />
          <p class="show-detail__meta">
            {{ formatYear(show.premiered) }} · {{ formatRuntime(show.runtime) }} · {{ show.status }}
          </p>
          <div class="show-detail__genres">
            <span v-for="g in show.genres" :key="g" class="genre-chip">{{ g }}</span>
          </div>
          <p class="show-detail__summary">{{ stripHtml(show.summary) }}</p>
          <dl class="show-detail__facts">
            <dt>Network</dt>  <dd>{{ show.network?.name ?? 'N/A' }}</dd>
            <dt>Language</dt> <dd>{{ show.language ?? 'N/A' }}</dd>
            <dt>Schedule</dt> <dd>{{ show.schedule.days.join(', ') }} at {{ show.schedule.time || 'N/A' }}</dd>
            <dt>Rating</dt>   <dd>{{ formatRating(show.rating.average) }}</dd>
          </dl>
          <a
            v-if="show.officialSite"
            :href="show.officialSite"
            target="_blank"
            rel="noopener noreferrer"
            class="show-detail__official-link btn btn--primary"
          >
            Official Site ↗
          </a>
        </div>
      </div>
    </template>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.show-detail {
  min-height: 100vh;

  &__hero {
    position: relative;
    min-height: 85vh;
    background-size: cover;
    background-position: center top;
    display: flex;
    align-items: flex-end;
    @include respond-to('md') { min-height: 88vh; }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(13,13,18,0.15) 0%, rgba(13,13,18,0.7) 40%, rgba(13,13,18,0.98) 100%);
    }
  }

  &__back {
    position: absolute;
    top: var(--space-md);
    left: var(--page-padding);
    z-index: 10;

    border: none;
    background: transparent;
    color: var(--color-text-primary);
    font-size: 3.2rem;
    line-height: 1;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    opacity: 0.85;
    transition: color var(--transition), transform var(--transition), opacity var(--transition);

    &:hover {
      color: var(--color-accent);
      opacity: 1;
      transform: scale(1.08);
    }

    &:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 6px;
      border-radius: 2px;
      opacity: 1;
    }
  }

  &__hero-overlay {
    position: relative;
    z-index: 1;
    padding: var(--space-2xl) var(--page-padding) var(--space-2xl);
    max-width: var(--page-max-width);
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  &__meta    { color: var(--color-text-muted); font-size: 0.9rem; }
  &__genres  { display: flex; flex-wrap: wrap; gap: var(--space-sm); }

  &__summary {
    color: var(--color-text-primary);
    font-size: 0.95rem;
    line-height: 1.75;
    max-width: 72ch;
    margin-top: var(--space-sm);
    margin-bottom: 0;
  }

  &__facts {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: var(--space-sm) var(--space-lg);

    dt { color: var(--color-text-muted); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
    dd { color: var(--color-text-primary); font-size: 0.9rem; }
  }

  &__official-link {
    width: 100%;
    justify-content: center;
    text-align: center;

    @include respond-to('sm') {
      align-self: flex-start;
      width: fit-content;
      justify-content: flex-start;
      text-align: left;
    }
  }
}
</style>
