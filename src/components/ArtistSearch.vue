<template>
	<div class="artist-search-container">
		<div class="artist-search">
			<input
					v-model="searchQuery"
					type="text"
					placeholder="Search for artists"
					class="search-input"
			/>
			<button @click="searchArtists" class="search-button">
				<font-awesome-icon :icon="['fas', 'magnifying-glass']" />
			</button>
		</div>
		
		<div v-if="artistList.length > 0" class="results-container">
			<ul class="results-list">
				<li v-for="artist in artistList" :key="artist.id" class="artist-item">
					<img :src="artist.images[0]?.url" alt="Artist Photo" class="artist-image" />
					<div class="artist-info">
						<p class="artist-name">{{ artist.name }}</p>
						<p class="artist-popularity">Popularity: {{ artist.popularity }}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref , watch } from 'vue';
import axios from 'axios';

import { useKeyStore } from '@/stores/keyStore';


const searchQuery = ref<string>('');
const artistList = ref<Array<any>>([]);

const keyStore = useKeyStore();

watch(searchQuery, (newQuery) => {
	if (newQuery.length > 2) {
		searchArtists();
	} else {
		artistList.value = [];
	}
});

const searchArtists = async () => {
	if (!searchQuery.value || !keyStore.token) return;
	
	try {
		const response = await axios.get(
				`https://api.spotify.com/v1/search?q=${searchQuery.value}&type=artist`,
				{
					headers: {
						Authorization: `Bearer ${keyStore.token}`,
					},
				}
		);
		artistList.value = response.data.artists.items;
		console.log("artist data", artistList);
	} catch (error) {
		console.error('Error while searching for artist:', error);
	}
};

</script>

<style scoped>
.artist-search-container {
	@apply items-center justify-center bg-gray-800;
}

.artist-search {
	@apply flex items-center justify-center w-full max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-lg;
}

.search-input {
	@apply flex-grow p-3 text-white bg-gray-700 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400;
}

.search-button {
	@apply px-6 py-3 text-white bg-green-500 rounded-r-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500;
}

.results-container {
	@apply flex items-center justify-start w-full max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-lg;
}

.results-list {
	@apply divide-y divide-gray-700;
}

.artist-item {
	@apply flex items-center py-4 space-x-4;
}

.artist-image {
	@apply w-12 h-12 rounded-full;
}

.artist-info {
	@apply flex flex-col;
}

.artist-name {
	@apply text-white text-lg font-semibold;
}

.artist-popularity {
	@apply text-gray-400;
}
</style>