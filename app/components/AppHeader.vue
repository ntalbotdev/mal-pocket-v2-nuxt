<script setup lang="ts">
interface AppHeaderProps {
  showJapanese: boolean;
}

interface AppHeaderEmits {
  (e: 'update:showJapanese', value: boolean): void;
}

const props = defineProps<AppHeaderProps>();
const emit = defineEmits<AppHeaderEmits>();
const route = useRoute();

function navLinkClass(path: string) {
  return [
    'header__nav-link',
    route.path === path ? 'header__nav-link--active' : ''
  ].join(' ');
}

const updateLanguage = (value: boolean) => {
  emit('update:showJapanese', value);
};
</script>

<template>
	<header class="header">
		<div class="header__inner">
			<h1 class="header__title">
				<span class="header__title--large">MAL</span>
				<span class="header__title--small">Pocket</span>
			</h1>
			
			<LanguageToggle :model-value="props.showJapanese" @update:model-value="updateLanguage" />
		</div>

		<nav class="header__nav">
			<ul class="header__nav-list">
				<li class="header__nav-item">
					<NuxtLink :to="'/'" :class="navLinkClass('/')">Today</NuxtLink>
				</li>
				<li class="header__nav-item">
					<NuxtLink :to="'/top-airing'" :class="navLinkClass('/top-airing')">Top Airing</NuxtLink>
				</li>
				<li class="header__nav-item">
					<NuxtLink :to="'/seasonal'" :class="navLinkClass('/seasonal')">Seasonal</NuxtLink>
				</li>
				<li class="header__nav-item">
					<NuxtLink :to="'/upcoming'" :class="navLinkClass('/upcoming')">Upcoming</NuxtLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style scoped>
.header__content {
  @apply flex justify-between items-center;
}
</style>