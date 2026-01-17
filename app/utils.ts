/**
 * スクロールイベントをスロットリング
 */
export const throttle = (callback: () => void, delay: number) => {
  let lastRun = 0;
  return () => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      callback();
      lastRun = now;
    }
  };
};

/**
 * モーダルのフォーカストラップを実装
 */
export const handleFocusTrap = (e: KeyboardEvent, onClose: () => void) => {
  if (e.key === 'Escape') {
    onClose();
  }
};

/**
 * ESC キー監視フック用のユーティリティ
 */
export const useEscapeKey = (onEscape: () => void) => {
  return (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onEscape();
    }
  };
};
