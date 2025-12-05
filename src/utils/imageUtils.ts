/**
 * Утилиты для работы с изображениями
 */

/**
 * Генерирует placeholder изображение в формате SVG
 */
export function generatePlaceholder(width = 400, height = 300): string {
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"%3E%3Crect fill="%231a1a1a" width="${width}" height="${height}"/%3E%3Ctext fill="%23a0a0a0" font-family="monospace" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E`;
}

/**
 * Получает оптимизированный URL изображения
 * В будущем можно добавить CDN или сервис оптимизации
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string {
  const { width = 800 } = options;
  
  // Если это внешний URL или уже оптимизирован, возвращаем как есть
  if (src.startsWith('http') || src.includes('?')) {
    return src;
  }

  // В будущем можно добавить параметры для CDN
  // Например: return `${CDN_BASE_URL}${src}?w=${width}&q=${quality}&format=${format}`;
  // Используем width для будущей оптимизации
  void width; // Подавляем предупреждение о неиспользуемой переменной
  
  return src;
}

/**
 * Проверяет, является ли URL валидным изображением
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const lowerUrl = url.toLowerCase();
  
  return imageExtensions.some(ext => lowerUrl.includes(ext)) || 
         url.startsWith('data:image') ||
         url.startsWith('http');
}

