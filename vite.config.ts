import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vite yapılandırması
export default defineConfig({
  plugins: [vue()],
  base: '/musicapp/',
  resolve: {
    alias: {
      '@': '/src', // `@` ile `src` dizinini eşleştirir
    },
  },

});
