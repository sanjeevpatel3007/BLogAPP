import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // this is add for phone ,, view to show
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  // }

})
