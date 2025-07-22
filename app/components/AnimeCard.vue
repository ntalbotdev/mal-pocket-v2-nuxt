<template>
  <NuxtLink class="anime-card" :to="`https://myanimelist.net/anime/${anime.mal_id}`" target="_blank" rel="noopener noreferrer" :title="displayTitle">
    <div class="anime-card__image">
      <img 
        :src="anime.images.jpg.image_url" 
        :alt="anime.title"
        class="anime-card__poster"
      >
    </div>
    <div class="anime-card__content">
      <h3 class="anime-card__title">{{ displayTitle }}</h3>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface AnimeCardProps {
  anime: {
    mal_id: number;
    title: string;
    title_english?: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
  showJapanese?: boolean;
}

const props = defineProps<AnimeCardProps>();

const displayTitle = computed(() => {
  if (props.showJapanese && props.anime.title) {
    return props.anime.title;
  }
  return props.anime.title_english || props.anime.title;
});
</script>

<style scoped lang="scss">
@use "@/assets/css/variables" as *;

.anime-card {
  @apply rounded drop-shadow overflow-hidden hover:shadow-lg transition-shadow duration-200;
  background-color: $color-bg;
}

.anime-card__image {
  @apply aspect-[3/4] overflow-hidden;
}

.anime-card__poster {
  @apply w-full h-full object-cover;
}

.anime-card__content {
  @apply p-4;
}

.anime-card__title {
  @apply text-sm font-medium text-gray-900 line-clamp-2;
}
</style>
