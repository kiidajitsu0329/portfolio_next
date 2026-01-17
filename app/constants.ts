// レイアウト定数
export const LAYOUT = {
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  MAX_WIDTH: 'max-w-7xl',
  CONTAINER_PADDING: 'px-6',
} as const;

// Z-Index 管理
export const Z_INDEX_VALUES = {
  NAVIGATION: 50,
  MODAL_BACKDROP: 60,
  MODAL_CONTENT: 61,
} as const;

export const Z_INDEX_CLASSES = {
  NAVIGATION: 'z-50',
  MODAL_BACKDROP: '[z-60]',
  MODAL_CONTENT: '[z-61]',
} as const;

// アニメーション定数
export const ANIMATION = {
  SCROLL_THRESHOLD: 0.15,
  REVEAL_DURATION: 1.2,
  FADE_DURATION: 1,
  SCROLL_DEBOUNCE_MS: 100,
} as const;

// クラス名定数
export const CLASS_NAMES = {
  MOBILE_MENU_ITEM: 'mobile-menu-item block text-sm font-medium text-gray-600 hover:text-black transition-colors',
  NAV_LINK: 'hover:text-black transition-colors',
  PROJECT_CARD: 'project-card group cursor-pointer fade-in-section',
  BUTTON_PRIMARY: 'inline-block bg-black text-white px-12 py-5 rounded-full font-medium hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-2xl',
  MODAL_BACKDROP: 'z-[60]',
} as const;

// モーダル定数
export const MODAL = {
  MAX_HEIGHT: '90vh',
  BACKDROP_BLUR: 'backdrop-blur-xl',
} as const;

// ナビゲーションリンク
export const NAV_LINKS = [
  { href: '#work', label: 'Featured Projects' },
  { href: '#skills', label: 'Core Competencies' },
  { href: '#about', label: 'About Me' },
  { href: '#contact', label: 'Contact' },
] as const;
