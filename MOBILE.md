# Kelder Club — App nativa (Capacitor)

La misma web app (Vite + React) empaquetada como app nativa iOS/Android con [Capacitor](https://capacitorjs.com).

- **App ID:** `com.calzzapato.kelderclub`
- **Nombre:** Kelder Club
- **webDir:** `dist/` (se compila con `npm run build`)
- Config: `capacitor.config.ts`
- Íconos/splash fuente: `assets/` (logo Kelder blanco sobre rojo)

## Requisitos

- **iOS:** macOS + Xcode (usa Swift Package Manager, no requiere CocoaPods).
- **Android:** Android Studio + JDK 17.

## Comandos

```bash
# Compilar la web y copiarla a las plataformas nativas
npm run cap:sync

# Abrir el proyecto iOS en Xcode (compila web + sync + open)
npm run ios

# Abrir el proyecto Android en Android Studio
npm run android

# Regenerar íconos y splash desde assets/ (tras cambiar el logo)
npm run cap:assets
```

Desde Xcode / Android Studio se ejecuta en simulador o dispositivo y se genera el build para App Store / Play Store.

## Flujo de trabajo

1. Editas el código en `src/` como siempre.
2. `npm run cap:sync` para reflejar los cambios en las apps nativas.
3. Corres desde Xcode / Android Studio.

Las carpetas `ios/` y `android/` son proyectos nativos versionados; los artefactos de build (Pods, DerivedData, `.gradle`, `build/`) están ignorados por sus propios `.gitignore`.
