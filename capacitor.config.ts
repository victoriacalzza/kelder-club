import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor config — packages the Vite web app (dist/) as a native iOS/Android shell.
 * Build the web first (`npm run build`), then `npx cap sync` to copy it into the platforms.
 *
 * Live reload (dev only): set CAP_SERVER_URL to the Vite dev server before `cap sync`, e.g.
 *   CAP_SERVER_URL=http://localhost:5173 npx cap sync ios
 * The app then loads live from that URL and hot-reloads on save. Running `cap sync` WITHOUT the
 * env var reverts to the bundled dist/, so production builds are never affected. Use `localhost`
 * for the iOS Simulator (shares the Mac's network and is ATS-exempt); use the Mac's LAN IP for a
 * physical device (that needs an ATS exception).
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

// Dev-only live reload: point the native shell at the running Vite dev server.
if (process.env.CAP_SERVER_URL) {
  config.server = { url: process.env.CAP_SERVER_URL, cleartext: true };
}

export default config;
