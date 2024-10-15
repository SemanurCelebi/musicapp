<template>
	<div>
		<h1  class="text-4xl font-bold text-gray-800 m-12">artist sayfa</h1>
		
		<div v-if="artist">{{artist.id}}</div>
		<div class="images">
			<img v-if="artist" v-for="(image, index) in artist.images" :key="index" :src="image.url" :alt="artist.name" :width="image.width" />
		</div>
	</div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { useArtistStore } from '@/stores/artistStore'

const artistStore = useArtistStore();

const artist = ref<string | null>(null);

const getArtistStore = async () => {
	try {
		await artistStore.getArtist();
		artist.value = artistStore.artist;
		console.log("artist data", artist.value);
	} catch (error) {
		console.error('Error fetching setup data:', error);
	}
};

onMounted(async() => {
	await getArtistStore();
});

</script>

