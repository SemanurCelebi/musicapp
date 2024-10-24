<template>
	<div class="flex items-center justify-center bg-gray-800 p-4">
		<div v-if="artistDetail" class="max-w-xl mx-auto p-4 mt-28 bg-gray-700 rounded-lg shadow-lg">
			<div class="flex items-center justify-between">
				<img
						:src="artistDetail.images[0]?.url"
						alt="Artist Image"
						class="w-40 h-40 rounded-full mx-auto mb-4"
				/>
				<h1 class="text-white text-6xl font-semibold mb-4 pl-3">{{ artistDetail.name }}</h1>
			</div>
			<p class="text-white text-lg font-light mb-2">Followers: {{ artistDetail.followers.total }}</p>
			<a
					:href="artistDetail.external_urls.spotify"
					target="_blank"
					class="bg-green-500 text-white px-2 py-1 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
			>
				Spotify Link
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDetailStore, Artist } from "@/stores/detailStore";
import {onMounted, ref} from "vue";
const detailStore = useDetailStore();

const artistDetail = ref<Artist | null>(null);

const props = defineProps({
	artistId: {
		type: String,
		required: true
	}
})
const getArtistDetail = async (artistId: string) => {
	try {
		await detailStore.getArtist(artistId);
		artistDetail.value = detailStore.artist;
	} catch (error) {
		console.error('Error fetching setup data:', error);
	}
}
onMounted(() => {
	getArtistDetail(props.artistId);
});
</script>