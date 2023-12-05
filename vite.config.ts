/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'custom-404-plugin',
      writeBundle() {
        const distPath = path.resolve(__dirname, 'dist');
        const custom404Content = `
          <!DOCTYPE html>
          <html lang="ko">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>존재하지 않는 페이지입니다.</title>
          </head>
          <body>
            <h1>404 - 존재하지 않는 페이지입니다.</h1>
            
            <p>
              혹은 "/g-magazine-fe" 외의 경로를 직접 입력하여 접속을 시도해선 안됩니다. <br>
              ex: "https://g-world-hackaton.github.io/g-magazine-fe/my-page" 로 직접 접근.
            </p>

            <p>아래 버튼을 누르면 Home으로 이동합니다.</p>
            <a href="/g-magazine-fe">Go to Home</a>
          </body>
          </html>
        `;
        fs.writeFileSync(path.join(distPath, '404.html'), custom404Content);
      },
    },
  ],
  base: "/g-magazine-fe/",
  server: {
    proxy: {
      '/g-magazine-fe/fonts': {
        target:'http://script.gmarket.com/fonts/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/g-magazine-fe\/fonts/, '')
      },
      '/uploads':{
        target: 'http://localhost:7001/uploads/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/uploads/, '')
      },
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
});
