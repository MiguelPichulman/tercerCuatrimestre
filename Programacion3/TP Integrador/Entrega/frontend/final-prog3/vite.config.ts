import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    open: '/src/index.html'
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/pages/store/home/home.html'),
        login: resolve(__dirname, 'src/pages/auth/login/login.html'),
        register: resolve(__dirname, 'src/pages/auth/register/registro.html'),
        cart: resolve(__dirname, 'src/pages/store/cart/cart.html')
      }
    }
  }
});