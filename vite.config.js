import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Compras Mirante',
        short_name: 'Mirante',
        start_url: '/',
        display: 'fullscreen',
        theme_color: '#141414',
        background_color: '#141414',
        icons: [
          {
            src: '/mirante512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any maskable'
          },
          {
            src: '/mirante1024.png',
            type: 'image/png',
            sizes: '1024x1024'
          }
        ],
        screenshots: [
          {
            src: '/screenshot-desktop.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: '/screenshot-mobile.png',
            sizes: '1080x1920',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache'
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources'
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
            }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
    host: true,
    allowedHosts: ['736fccddc09a.ngrok-free.app'],
  },
});
