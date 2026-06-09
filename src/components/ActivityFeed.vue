<template>
  <div class="feed">
    <div class="feed__header">
      <span class="feed__title">Activity</span>
      <span class="feed__count">{{ items.length }}</span>
    </div>

    <div class="feed__list">
      <TransitionGroup name="feed-item">
        <div
          v-for="item in items"
          :key="item.id"
          class="feed__item"
          :class="`feed__item--${item.type}`"
        >
          <span class="feed__dot" />
          <div class="feed__content">
            <span class="feed__message">{{ item.message }}</span>
            <span class="feed__time">{{ item.time }}</span>
          </div>
        </div>
      </TransitionGroup>

      <div v-if="!items.length" class="feed__empty">
        Ожидание событий...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityItem } from '../stores/metrics.store'
defineProps<{ items: ActivityItem[] }>()
</script>

<style scoped>
.feed {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 360px;
}

.feed__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.feed__title { font-size: var(--text-sm); font-weight: 600; }

.feed__count {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  padding: 2px 8px;
  border-radius: 20px;
}

.feed__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

.feed__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.feed__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}

.feed__item--info    .feed__dot { background: var(--color-primary); }
.feed__item--warning .feed__dot { background: var(--color-warning); }
.feed__item--danger  .feed__dot { background: var(--color-danger); }

.feed__content { display: flex; flex-direction: column; gap: 2px; }

.feed__message { font-size: var(--text-xs); color: var(--color-text); line-height: 1.5; }
.feed__time    { font-size: var(--text-xs); color: var(--color-text-muted); font-family: var(--font-mono); }

.feed__empty   { font-size: var(--text-xs); color: var(--color-text-muted); text-align: center; padding: 20px 0; }

.feed-item-enter-active { transition: all 0.25s ease; }
.feed-item-enter-from   { opacity: 0; transform: translateY(-8px); }
</style>