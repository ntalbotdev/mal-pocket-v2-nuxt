<template>
	<div class="layout">
		<AppHeader 
			:show-japanese="showJapanese"
			@update:show-japanese="showJapanese = $event"
		/>
		<main class="main">
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
const showJapanese = ref(false);

// Provide the language state to child components
provide('showJapanese', showJapanese);
</script>