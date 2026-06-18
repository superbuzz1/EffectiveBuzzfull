/**
 * Tiny dependency-free client router for EffectiveBuzz multi-surface architecture.
 * Handles both cross-origin navigation (subdomains) and local surface routing.
 */

export type Surface = 'marketing' | 'app' | 'docs' | 'admin' | 'status' | 'analytics';

export function navigateToSurface(surface: Surface, path: string = "/") {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname.includes('.localhost');
  
  if (isLocal) {
    // In local dev, use the mapped .html files
    const filename = surface === 'marketing' ? 'index.html' : `${surface}.html`;
    window.location.href = `/${filename}${path}`;
  } else {
    // In production, use subdomains
    // We assume the environment provides the base domain if needed, 
    // but typically subdomains of the current root domain work.
    const parts = window.location.hostname.split('.');
    const baseDomain = parts.length > 2 ? parts.slice(-2).join('.') : window.location.hostname;
    
    const subdomain = surface === 'marketing' ? '' : `${surface}.`;
    window.location.href = `https://${subdomain}${baseDomain}${path}`;
  }
}

export function getActiveSurface(): Surface {
  const host = window.location.hostname;
  if (host.startsWith('app.')) return 'app';
  if (host.startsWith('docs.')) return 'docs';
  if (host.startsWith('admin.')) return 'admin';
  if (host.startsWith('status.')) return 'status';
  
  // Handle local dev filenames
  const path = window.location.pathname;
  if (path.includes('app.html')) return 'app';
  if (path.includes('docs.html')) return 'docs';
  if (path.includes('admin.html')) return 'admin';
  if (path.includes('status.html')) return 'status';
  
  return 'marketing';
}
