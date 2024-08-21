<template>
  <div class="blog w-full flex flex-col gap-5">
    <div class="blog-head flex w-full bg-white justify-center">
      <div class="wrapper flex flex-col px-2.5 sm:px-8">
        <div class="title-bar flex w-full justify-between flex-wrap py-3 sm:py-5 sm:justify-start sm:flex-nowrap gap-x-10 gap-y-2.5">
          <h2 class="title font-bold order-1">Блог</h2>
          <Search class="order-3 max-w-full sm:order-2 sm:max-w-25rem" v-model="searchValue"/>
          <div class="switch-filter flex gap-2.5 items-center cursor-pointer ml-auto order-2 sm:order-3" @click="toggleShowTagsOrClear">
            <div>
              <div class="clear" v-show="hasActiveTag && showTags">Очистить</div>
              <div class="hide" v-show="!hasActiveTag && showTags">Скрыть</div>
            </div>
            <div class="main flex items-center gap-1">Фильтр <i class="icon icon-down text-black" :class="{'rotate-180 -mb-1': showTags}"></i></div>
          </div>
        </div>
        <Tags class="py-3 sm:py-5" :tags="tags" @checkTag="checkTag" v-show="showTags"/>
      </div>
    </div>
    <div class="blog__content w-full">
      <div class="content-wrapper px-2.5 w-full flex justify-center">
        <div class="content-main rounded-xl bg-white w-full grid grid-cols-blog gap-x-5 gap-y-10 p-4 lg:p-8" v-if="filteredBlogs.length">
          <BlogItem v-for="(blog, index) in filteredBlogs" :key="index" :blog="blog" @open-blog="openBlogModal" />
        </div>
        <SearchNoResult class="rounded-xl bg-white py-16 px-8" v-else/>
      </div>
      <BlogModal :blog="activeBlog" v-if="showBlogModal" @close="closeBlogModal"/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Search from '@/components/Base/Input/Search.vue';
import Tags from '@/components/Base/Tags.vue';
import BlogItem from '@/components/Base/BlogItem.vue';
import SearchNoResult from '@/components/Base/SearchNoResult.vue';
import BlogModal from '@/components/Base/BlogModal.vue';
import { useStore } from '@/stores/Store';

const { blogs } = useStore();

const tags = ref([
  { name: 'Город', key: 'city', check: false },
  { name: 'Природа', key: 'nature', check: false },
  { name: 'Люди', key: 'people', check: false },
  { name: 'Животные', key: 'animals', check: false },
  { name: 'Еда', key: 'food', check: false },
  { name: 'Напитки', key: 'drinks', check: false },
  { name: 'Архитектура', key: 'architecture', check: false },
  { name: 'Искусство', key: 'art', check: false },
]);

const showTags = ref(false);
const searchValue = ref('');
const showBlogModal = ref(false);
const activeBlog = ref(null)

const hasActiveTag = computed(() => {
  return tags.value.some(tag => tag.check);
});

const toggleShowTagsOrClear = () => {
  if (hasActiveTag.value) {
    tags.value.forEach(tag => tag.check = false);
  } else {
    showTags.value = !showTags.value;
  }
};

const checkTag = (tagKey) => {
  const tag = tags.value.find(t => t.key === tagKey);
  if (tag) {
    tag.check = !tag.check;
  }
};

const openBlogModal = (blog) => {
  activeBlog.value = blog;
  showBlogModal.value = true;
}

const closeBlogModal = () => {
  activeBlog.value = null;
  showBlogModal.value = false;
}
// Вычисляемое свойство для фильтрации по тегам
const filteredByTags = computed(() => {
  if (!blogs.length) return []; // Проверка на наличие данных
  if (!hasActiveTag.value) {
    console.log("No active tags, returning all blogs");
    return blogs;
  }

  // Получаем ключи всех активных тегов
  const activeTagKeys = tags.value
    .filter(tag => tag.check)
    .map(tag => tag.key);

  // Фильтрация блогов по всем выбранным тегам
  const filtered = blogs.filter(blog => {
    // Проверяем, что каждый активный тег присутствует в тегах блога
    return activeTagKeys.every(tagKey => blog.tags.some(blogTag => blogTag.key === tagKey));
  });

  console.log("Filtered by tags:", filtered);
  return filtered;
});


const filteredBlogs = computed(() => {
  if (!filteredByTags.value.length) return [];
  if (!searchValue.value) {
    return filteredByTags.value;
  }

  const filtered = filteredByTags.value.filter(blog => 
    blog.title.toLowerCase().includes(searchValue.value.toLowerCase())
  );

  console.log("Filtered by search:", filtered);
  return filtered;
});

</script>

<style lang="scss" scoped>
.blog {
  &-head {
    .title-bar {
      border-bottom: 1px solid rgb(249, 249, 249);
      .title {
        font-size: 2rem;
        line-height: 2rem;
      }

      .switch-filter {
        .clear {
          color: #2884EF;
        }
        .hide,
        .main {
          color: #A1A5B7;
        }
      }
    }
  }

  &__content {
    .content-wrapper {
      .content-main {
        max-width: 81.25rem;
      }
    }
  }
}

.wrapper {
  width: 100%;
  max-width: 79.675rem;
}
</style>
