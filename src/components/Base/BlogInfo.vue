<template>
  <div class="blog-item-stat flex items-center gap-2.5">
    <span>{{ formattedDate }}</span>
    <span>•</span>
    <span class="flex items-center gap-1"><i class="icon icon-time text-xl/5"></i>{{ timeSince }}</span>
    <span>•</span>
    <span class="comments flex items-center gap-1"><i class="icon icon-comments text-xl/5"></i>{{ formattedComments }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

const props = defineProps({
  createdAt: { type: String, default: '' },
  comments: { type: Number, default: 0 }
});

const formattedDate = computed(() => {
  if (!props.createdAt) return '';
  const date = parseISO(props.createdAt);
  return format(date, 'd MMM', { locale: ru });
});

const timeSince = computed(() => {
  if (!props.createdAt) return '';
  const date = parseISO(props.createdAt);
  return formatDistanceToNow(date, { locale: ru, addSuffix: true });
});

const formattedComments = computed(() => {
  switch (true) {
    case props.comments === 0:
      return '0 комментариев';
    case props.comments % 10 === 1 && props.comments % 100 !== 11:
      return `${props.comments} комментарий`;
    case props.comments % 10 >= 2 && props.comments % 10 <= 4 && (props.comments % 100 < 10 || props.comments % 100 >= 20):
      return `${props.comments} комментария`;
    default:
      return `${props.comments} комментариев`;
  }
});
</script>

<style lang="scss" scoped>
.blog-item-stat {
  color: #7E8299;
  font-size: 0.875rem;

  .comments {
    .icon {
      color: #050505;
    }
  }
}
</style>
