<template>
	<div class="flex items-center justify-center bg-gray-800 p-4">
		<div v-if="trackDetail" class="mx-auto p-4 mt-28 bg-gray-700 rounded-lg shadow-lg">
			<div class="flex items-center justify-between">
				<img
						:src="trackDetail.album.images[0]?.url"
						alt="Artist Image"
						class="w-40 h-40 rounded-full mx-auto mb-4"
				/>
				<div class="text-white mb-4 pl-3 font-semibold">
					<h5 class="text-6xl mb-2">{{ trackDetail.artists[0].name }} </h5>
					<span class="text-3xl"> {{ trackDetail.name }}</span>
				</div>
			</div>
			<audio :src="trackDetail.preview_url" controls class="audio-player mb-3 inline">
				Your browser does not support the audio element.
			</audio>
			<p class="text-white text-lg font-light mb-2">Total Tracks: {{ trackDetail.album.total_tracks }}</p>
			<p class="text-white text-lg font-light mb-2">Album Name: {{ trackDetail.album.name }} </p>
			<p class="text-white text-lg font-light mb-2">Release Date: {{ trackDetail.album.release_date }}</p>
			<a
					:href="trackDetail.external_urls.spotify"
					target="_blank"
					class="bg-green-500 text-white px-2 py-1 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
			>
				Track Spotify Link
			</a>
			<a
					:href="trackDetail.album.external_urls.spotify"
					target="_blank"
					class="bg-green-500 text-white px-2 py-1 ml-1 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
			>
				Album Spotify Link
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDetailStore } from "@/stores/detailStore";
import { onMounted, ref } from "vue";
import { Track } from "@/types/track";

const detailStore = useDetailStore();

const trackDetail = ref<Track>();

const props = defineProps({
	trackId: {
		type: String,
		required: true
	}
})
const getTrackDetail = async () => {
	try {
		await detailStore.getTrackData(props.trackId);
		trackDetail.value = detailStore.track;
	} catch (error) {
		console.error('Error fetching setup data:', error);
	}
}
onMounted(() => {
	getTrackDetail();
});
</script>