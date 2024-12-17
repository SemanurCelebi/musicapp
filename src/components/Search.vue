<template>
	<div class="search-container">
		<div class="search">
			<input
					v-model="searchQuery"
					type="text"
					placeholder="What do you want to search?"
					class="search-input"
			/>
			<button @click="searchItem" class="search-button">
				<font-awesome-icon :icon="['fas', 'magnifying-glass']" />
			</button>
		</div>
		
		<div v-if="artistList.length > 0" class="results-container">
			<h3 class="header">Artists</h3>
			<ul class="artist-list">
				<li v-for="artist in artistList.slice(0, 3)" :key="artist.id" class="artist-item">
					<router-link  :to="{ name: 'ArtistDetail', params: { artistId: artist.id }}">
						<img :src="artist.images[0]?.url" alt="Artist Photo" class="artist-image"/>
					</router-link>
					<div class="artist-info">
						<p class="artist-name">{{ artist.name }}</p>
					</div>
				</li>
			</ul>
		</div>
		
		<div v-if="trackList.length > 0" class="results-container">
			<h3 class="header">Songs</h3>
			<ul class="track-list">
				<li v-for="track in trackList.slice(0, 3)" :key="track.id" class="track-item">
					<audio :src="track.preview_url" controls class="audio-player">
						Your browser does not support the audio element.
					</audio>
					<div class="track-info">
						<router-link  :to="{ name: 'TracksDetail', params: { trackId: track.id }}">
							<p class="track-name">{{ track.name }}</p>
						</router-link>
						<p class="track-artist">{{ track.artists[0]?.name }}</p>
					</div>
				</li>
			</ul>
		</div>
		
		<div v-if="albumList.length > 0" class="results-container">
			<h3 class="header">Albums</h3>
			<ul class="album-list">
				<li v-for="album in albumList.slice(0, 3)" :key="album.id" class="album-item">
					<img :src="album.images[0]?.url" alt="Album Cover" class="album-image" />
					<div class="album-info">
						<p class="album-name">{{ album.name }}</p>
						<p class="album-artist">{{ album.release_date }}-{{ album.artists[0]?.name }}</p>
					</div>
				</li>
			</ul>
		</div>
		
		<div v-if="playlistList.length > 0" class="results-container">
			<h3 class="header">Playlists</h3>
			<ul class="playlist-list">
				<li v-for="playlist in playlistList.filter(item => item !== null).slice(0, 3)" :key="playlist.id" class="playlist-item">
					<img :src="playlist.images[0]?.url" alt="Playlist Cover" class="playlist-image" />
					<div class="playlist-info">
						<p class="playlist-name">{{ playlist.name }}</p>
						<p class="playlist-owner">By {{ playlist.owner.display_name }}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref , watch } from 'vue';
import { searchSpotify } from "@/services/search";
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { Track } from "@/types/track";
import { Playlist } from "@/types/playlist";

import { useKeyStore } from '@/stores/keyStore';


const searchQuery = ref<string>('');

const artistList = ref<Artist[]>([]);
const albumList = ref<Album[]>([]);
const playlistList = ref<Playlist[]>([]);
const trackList = ref<Track[]>([]);

const keyStore = useKeyStore();

watch(searchQuery, (newQuery) => {
	if (newQuery.length > 2) {
		searchItem();
	} else {
		artistList.value = [];
		trackList.value = [];
		albumList.value = [];
		playlistList.value = [];
	}
});

const searchItem = async () => {
	if (!searchQuery.value || !keyStore.token) return;
	
	try {
		
		const response = await searchSpotify(searchQuery.value, keyStore.token);
		const { artists, albums, playlists, tracks }= response;
		
		artistList.value = artists.items;
		albumList.value = albums.items;
		playlistList.value = playlists.items;
		trackList.value = tracks.items;
		
		console.log("artist data", artistList.value);
		console.log("track data", trackList.value);
		console.log("album data", albumList.value);
		console.log("playlist data", playlistList.value);
	} catch (error) {
		console.error('Error while searching', error);
	}
};
</script>
