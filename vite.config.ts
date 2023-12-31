import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: '.',
        assetsDir: 'build',
        rollupOptions: {
            input: {
                app: './3D.html'
            }
        }
    }
})