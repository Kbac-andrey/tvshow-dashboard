<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: number;
  size?: 'sm' | 'md' | 'lg';
}>();

const TOTAL_STARS = 5;
const filledStars = computed(() => Math.round((props.value / 10) * 5));
</script>

<template>
  <div
    :class="['star-rating', props.size && `star-rating--${props.size}`]"
    :aria-label="`Rating: ${props.value} out of 10`"
    role="img"
  >
    <span
      v-for="i in TOTAL_STARS"
      :key="i"
      :class="['star-rating__star', i <= filledStars && 'star-rating__star--filled']"
      aria-hidden="true"
    >★</span>
  </div>
</template>

<style lang="scss" scoped>
.star-rating {
  display: flex;
  align-items: center;
  gap: 3px;

  &__star {
    color: var(--color-surface-raised);
    font-size: 0.75rem;
    line-height: 1;
    transition: color var(--transition);
    &--filled { color: var(--color-accent); }
  }

  &--lg &__star { font-size: 1.1rem; }
}
</style>
