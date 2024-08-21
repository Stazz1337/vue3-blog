<template>
  <div class="list-tags flex gap-2 flex-wrap">
    <div
      v-for="tag in tags"
      :key="tag.key"
      class="tag flex gap-1.5 rounded-full py-1.5 px-3.5 font-medium cursor-pointer"
      :class="[tagClass, {'active': tag?.check}]"
      @click="$emit('checkTag', tag.key)"
    >
      <span class="font-medium">{{ tag.name }}</span>
      <i class="tag-check icon text-black text-xl/5 font-bold" :class="tag?.check ? 'icon-check' : 'icon-plus'" v-if="'check' in tag"></i>
      <i class="tag-close icon icon-cross-x text-xl/5 font-bold"></i>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tags: { type: Array, default: []},
  tagClass: { type: String }
});

</script>

<style lang="scss" scoped>
.list-tags {
  .tag {
    background-color: #EEF6FF;
    color: #2884EF;
    font-size: 1rem;
    line-height: 1rem;
    &:hover {
      background-color: #3E97FF33;
    }
    .tag-close {
      display: none;
    }
    &.active {
      background-color: #3E97FF;
      color: white;
      &:hover {
        .tag-close {
          display: block;
          color: white;
        }
        .tag-check {
          display: none;
        }
      }
    }
  }
}
</style>
