export type PwaPlatform = 'ios' | 'android' | 'desktop';

export function detectPwaPlatform(): PwaPlatform {
  if (typeof navigator === 'undefined') return 'desktop';

  const userAgent = navigator.userAgent;
  const isIos =
    /iPad|iPhone|iPod/i.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIos) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  return 'desktop';
}

export function isStandaloneMode(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}
