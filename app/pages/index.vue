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
			animeList.value = uniqueAnime
		}
	} catch (error) {
		console.error('Error fetching today\'s schedule:', error)
	}
})
</script>

<template>
  	<div class="anime_page anime_page--today">
      	<div v-if="!todaySchedule" class="loading_spinner" />
      	<div v-else-if="animeList.length === 0" class="anime_page__error">
        	Too many requests, please try again
      	</div>
		
      	<div v-else class="anime_page__grid">
			<AnimeCard
				v-for="anime in animeList"
				:key="anime.mal_id" 
				:anime="anime"
				:show-japanese="showJapanese"
			/>
      	</div>
  	</div>
</template>