/**
 * Vite plugin: add a Content-Security-Policy <meta> to the built index.html.
 * Build only, because the dev server injects inline scripts and an HMR websocket.
 *
 * The app makes no network requests and loads no third-party code, so everything
 * is same-origin. Inline styles stay allowed (templates set style="…"); inline
 * scripts do not, so injected markup can't run code.
 */

import type { Plugin } from 'vite';

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  // Uploaded charts and the PNG download use blob: URLs
  "img-src 'self' blob: data:",
  "media-src 'self' blob:",
  "worker-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

export function contentSecurityPolicy(): Plugin {
  return {
    name: 'cvd-csp',
    apply: 'build',
    transformIndexHtml() {
      return [{
        tag: 'meta',
        attrs: { 'http-equiv': 'Content-Security-Policy', content: CONTENT_SECURITY_POLICY },
        injectTo: 'head-prepend',
      }];
    },
  };
}
