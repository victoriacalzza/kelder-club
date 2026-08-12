/**
 * Analytics event names, reserved for measuring whether Kelder Club actually generates
 * intent to visit a physical store. No analytics platform is wired yet — `track` just logs
 * in dev so the call sites exist and can be connected later without touching the UI.
 */
export type AnalyticsEvent =
  | "product_view"
  | "product_favorite"
  | "store_availability_view"
  | "store_view"
  | "directions_click"
  | "call_store"
  | "size_alert"
  | "promotion_view"
  | "promotion_product_click"
  | "cashback_product_click"
  | "credit_product_click"
  | "credivale_product_click"
  | "visit_list_add"
  | "visit_list_view";

export function track(event: AnalyticsEvent, props?: Record<string, string | number | boolean>) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, props ?? {});
  }
}
