<template>
	<div id="app" class="text-center">
		<div v-if="key">
			spoti
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useKeyStore } from './stores/keyStore';
const keyStore = useKeyStore();

const key = ref<string | null>(null);

const fetchKey = async () => {
	try {
		await keyStore.getKey();
		key.value = keyStore.token;
		console.log("key data", key.value);
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
	margin-top: 60px;
}
</style>
