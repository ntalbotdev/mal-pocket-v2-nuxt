<script lang="ts" setup>
import { fetchSeasonalAnime } from '~/stores/api'

const seasonalSchedule = ref<any>(null)
const animeList = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const loading = ref(false)

const showJapanese = inject('showJapanese', ref(false))

const loadSeasonal = async (page: number = 1) => {
	loading.value = true
	try {
		const response = await fetchSeasonalAnime(page)
		seasonalSchedule.value = response

		if (response && response.data) {
			// Remove duplicates based on mal_id
			const uniqueAnime = response.data.filter((anime: any, index: number, self: any[]) => 
				index === self.findIndex((a: any) => a.mal_id === anime.mal_id)
			)
			animeList.value = uniqueAnime
		}

		// Calculate total pages from pagination info
		if (response && response.pagination) {
			totalPages.value = response.pagination.last_visible_page || 1
		}

		currentPage.value = page
	} catch (error) {
		console.error('Error fetching seasonal schedule:', error)
	} finally {
		loading.value = false
	}
}

const handlePageChange = (page: number) => {
	loadSeasonal(page)
}

onMounted(() => {
	loadSeasonal(1)
})
</script>

<template>
  	<div class="anime_page anime_page--top-airing">
      	<div v-if="loading" class="loading_spinner" />
      	<div v-else-if="animeList.length === 0" class="anime_page__error">
        	Too many requests, please try again
      	</div>
		
      	<div v-else>
			<div class="anime_page__grid">
				<AnimeCard
					v-for="anime in animeList"
					:key="anime.mal_id" 
					:anime="anime"
					:show-japanese="showJapanese"
				/>
			</div>
			
			<AppPagination 
				:current-page="currentPage"
				:total-pages="totalPages"
				@page-change="handlePageChange"
			/>
		</div>
  	</div>
</template>