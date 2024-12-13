import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // или путь к вашей папке с исходниками
  build: {
    outDir: '../dist' // или другой путь для сборки
  },
  server: {
    host: '0.0.0.0', // чтобы приложение было доступно по сети
    port: 5174 // или другой порт, если нужно
  }
});

