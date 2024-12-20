<template>
	<div class="flex items-center justify-center bg-gray-800 p-4">
		<div v-if="albumDetail" class="max-w-xl mx-auto p-4 mt-28 bg-gray-700 rounded-lg shadow-lg">
			<div class="flex items-center justify-between">
				<img
						:src="albumDetail.images[0]?.url"
						alt="Artist Image"
						class="w-40 h-40 rounded-full mx-auto mb-4"
				/>
				<h1 class="text-white text-6xl font-semibold mb-4 pl-3">{{ albumDetail.name }}</h1>
			</div>
			<p class="text-white text-lg font-light mb-2">Artist: {{ albumDetail.artists[0].name }}</p>
			<a
					:href="albumDetail.external_urls.spotify"
					target="_blank"
					class="bg-green-500 text-white px-2 py-1 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
			>
				Spotify Link
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDetailStore } from "@/stores/detailStore";
import { Album } from "@/types/album";

const detailStore = useDetailStore();

let albumDetail = ref<Album>();

const props = defineProps({
	albumId: {
		type: String,
		required: true
	}
})

const getAlbumDetail = async () => {
	try {
		await detailStore.getAlbumData(props.albumId);
		albumDetail.value = detailStore.album;
	} catch (error) {
		console.error('Error fetching setup data:', error);
	}
}
onMounted(() => {
	getAlbumDetail();
});
</script>