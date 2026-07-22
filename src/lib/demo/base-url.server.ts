// Bazowy adres publicznych demo. Docelowo subdomena demo.ksing.pl —
// dopóki nie jest skonfigurowana, używamy bieżącej domeny aplikacji.

import { getRequestHost } from "@tanstack/react-start/server";

export function getPublicBaseUrl(): string {
  const configured = process.env.PUBLIC_DEMO_BASE_URL;
  if (configured) return configured.replace(/\/+$/, "");
  const host = getRequestHost();
  const proto = host.includes("localhost") || host.startsWith("127.") ? "http" : "https";
  return `${proto}://${host}`;
}
