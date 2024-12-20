<template>
	<div class="flex items-center justify-center bg-gray-800 p-4">
		<div v-if="playlistDetail" class="max-w-xl mx-auto p-4 mt-28 bg-gray-700 rounded-lg shadow-lg">
			<div class="flex items-center justify-between">
				<img
						:src="playlistDetail.images[0]?.url"
						alt="Artist Image"
						class="w-40 h-40 rounded-full mx-auto mb-4"
				/>
				<h1 class="text-white text-6xl font-semibold mb-4 pl-3">{{ playlistDetail.name }}</h1>
			</div>
			<p class="text-white text-lg font-light mb-2">Description: {{ playlistDetail.description }}</p>
			<p class="text-white text-lg font-light mb-2">Owner: {{ playlistDetail.owner.display_name }}</p>
			<a
					:href="playlistDetail.external_urls.spotify"
					target="_blank"
					class="bg-green-500 text-white px-2 py-1 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
			>
				Spotify Link
			</a>
			<a
					:href="playlistDetail.owner.external_urls.spotify"
					target="_blank"
					class="bg-green-500 text-white px-2 py-1 ml-2.5 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
			>
				Owner Link
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDetailStore } from "@/stores/detailStore";

import { Playlist } from "@/types/playlist";

const detailStore = useDetailStore();

let playlistDetail = ref<Playlist>();

const props = defineProps({
	playlistId: {
		type: String,
		required: true
	}
})

const getPlaylistDetail = async () => {
	try {
		await detailStore.getPlaylistData(props.playlistId);
		playlistDetail.value = detailStore.playlist;
	} catch (error) {
		console.error('Error fetching data', error);
	}
}
onMounted(() => {
	getPlaylistDetail();
});
</script>