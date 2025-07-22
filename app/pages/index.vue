<script lang="ts" setup>
import { fetchTodaySchedule } from '~/stores/api'
const todaySchedule = ref<any>(null)
const animeList = ref<any[]>([])

const showJapanese = inject('showJapanese', ref(false))

onMounted(async () => {
  try {
    const response = await fetchTodaySchedule()
    todaySchedule.value = response
    
    if (response && response.data) {
      
      // Remove duplicates based on mal_id
      const uniqueAnime = response.data.filter((anime: any, index: number, self: any[]) => 
        index === self.findIndex((a: any) => a.mal_id === anime.mal_id)
      )
      
      console.log('Unique anime after filtering:', uniqueAnime.length)
      animeList.value = uniqueAnime
    }
  } catch (error) {
    console.error('Error fetching today\'s schedule:', error)
  }
})
</script>

<template>
  <div class="today">
    <div class="today__content">
      <div v-if="!todaySchedule" class="today__loading">Loading...</div>
      <div v-else-if="animeList.length === 0" class="today__empty">No anime airing today</div>
      <div v-else class="today__grid">
        <AnimeCard 
          v-for="anime in animeList" 
          :key="anime.mal_id" 
          :anime="anime"
          :show-japanese="showJapanese"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.today__grid {
  @apply grid grid-cols-4 gap-4;
}
</style>