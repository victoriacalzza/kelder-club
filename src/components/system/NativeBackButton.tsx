import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import type { PluginListenerHandle } from "@capacitor/core";

/**
 * Android hardware back button → navigate back through the app's history. At the root route
 * it exits the app. No-op on web/iOS. Shares the same react-router navigation as the web app.
 */
export function NativeBackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let handle: PluginListenerHandle | undefined;
    let cancelled = false;
    void import("@capacitor/app").then(({ App }) => {
      App.addListener("backButton", () => {
        if (pathRef.current !== "/") navigate(-1);
        else void App.exitApp();
      }).then((h) => {
        if (cancelled) void h.remove();
        else handle = h;
      });
    });
    return () => {
      cancelled = true;
      void handle?.remove();
    };
  }, [navigate]);

  return null;
}
