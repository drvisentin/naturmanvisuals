// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    host: true // Ascolta su tutte le interfacce (IPv4 e IPv6)
  }
});
