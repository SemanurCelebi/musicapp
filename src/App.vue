<template>
	<div id="app" class="text-center">
		<div v-if="key">
			<router-view></router-view>
		</div>
		<Loader v-else/>
	</div>
</template>

<script setup lang="ts">
import '@/assets/styles/tailwind-components.css';
import { ref, onMounted } from 'vue';
import { useKeyStore } from './stores/keyStore';
const keyStore = useKeyStore();

const key = ref<string | null>(null);

const fetchKey = async () => {
	try {
		await keyStore.getKey();
		key.value = keyStore.token;
	} catch (error) {
		console.error('Error fetching setup data:', error);
	}
};


onMounted(() => {
	fetchKey();
});

</script>


<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
	background-color: rgb(31 41 55);
}
</style>
