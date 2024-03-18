import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {visualizer} from 'rollup-plugin-visualizer';
import {Plugin as importToCDN} from 'vite-plugin-cdn-import';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), visualizer({open: true}), importToCDN({
        modules: [
            {
                name: 'axios',
                var: 'axios',
                path: 'https://cdn.staticfile.net/axios/1.6.5/axios.min.js',
            },
        ],
    }), reactRefresh()],
})
