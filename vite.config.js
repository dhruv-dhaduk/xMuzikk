import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.ico", "logos/wave_144x144.png","logos/wave_192x192.png", "logos/wave_512x512.png"],
            manifest: {
                name: "xMuzikk",
                short_name: "xMuzikk",
                description: "xMuzikk: A music player for the web",
                theme_color: "#000000",
                background_color: "#000000",
                start_url: "/",
                display: "standalone",
                icons: [
                    {
                        src: "logos/wave_144x144.png",
                        sizes: "144x144",   
                        type: "image/png",
                    },
                    {
                        src: "logos/wave_192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "logos/wave_512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    }
                ]
            }
        })
    ],
});
