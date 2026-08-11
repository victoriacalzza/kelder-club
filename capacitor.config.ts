import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor config — packages the Vite web app (dist/) as a native iOS/Android shell.
 * Build the web first (`npm run build`), then `npx cap sync` to copy it into the platforms.
 */
const config: CapacitorConfig = {
  appId: "com.calzzapato.kelderclub",
  appName: "Kelder Club",
  webDir: "dist",
  backgroundColor: "#faf7f5", // cream, matches the app shell
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: "#d3122a", // Kelder red
      showSpinner: false,
      androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      // Light background (cream) → dark text/icons.
      style: "LIGHT",
      backgroundColor: "#faf7f5",
    },
    Keyboard: {
      resize: "native",
    },
  },
};

export default config;
