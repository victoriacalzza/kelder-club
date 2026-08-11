import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import './index.css'
import App from './App.tsx'

// Native shell (Capacitor) setup — no-op on web. Cream status bar with dark text,
// and hide the splash once the web app has mounted.
if (Capacitor.isNativePlatform()) {
  void (async () => {
    try {
      const { StatusBar, Style } = await import('@capacitor/status-bar')
      await StatusBar.setStyle({ style: Style.Light }) // light bg → dark text
      await StatusBar.setBackgroundColor({ color: '#faf7f5' }).catch(() => {}) // Android only
    } catch {
      /* plugin unavailable */
    }
  })()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (Capacitor.isNativePlatform()) {
  import('@capacitor/splash-screen')
    .then(({ SplashScreen }) => SplashScreen.hide())
    .catch(() => {})
}
