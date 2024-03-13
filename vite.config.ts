import {defineConfig, PluginOption} from 'vite'
import react from '@vitejs/plugin-react'
import {visualizer} from 'rollup-plugin-visualizer';
import resolve from 'rollup-plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), visualizer() as PluginOption, resolve()],
})
