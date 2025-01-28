export function isOnAuthPage(pathname: string) {
  return pathname.startsWith('/login') || pathname.startsWith('/register');
}

export function isOnUnprotectedPage(pathname: string) {
  const unProtectedPages = ['/terms', '/privacy-policy']; // Add more here if needed
  return (
    pathname === '/' || // The root page '/' is also an unprotected page
    unProtectedPages.some((page) => pathname.startsWith(page))
  );
}

export function isOnProtectedPages(pathname: string) {
  return !isOnUnprotectedPage(pathname);
}

export function isAPIRequest(pathname: string) {
  return pathname.startsWith('/api');
}
