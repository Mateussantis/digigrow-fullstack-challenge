import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    watch: {
      // Ignorar a pasta onde o Tailwind gera o CSS (ajuste o caminho conforme necessário)
      ignored: ["**/dist/**", "**/output.css"],
    },
  },
});
