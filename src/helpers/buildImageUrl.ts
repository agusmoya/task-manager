/**
 * Build complete image URL from relative path or return as-is if already complete
 * @param imagePath - Image path from backend (relative) or complete URL
 * @param apiUrl - Base API URL from environment variables
 * @returns Complete image URL ready for src attribute
 */
export const buildImageUrl = (imagePath: string, apiUrl: string): string => {
  // Return empty string for falsy values
  if (!imagePath) return ''

  // Return as-is if already a complete URL (http/https) or blob URL
  if (imagePath.startsWith('http') || imagePath.startsWith('blob:')) {
    return imagePath
  }
  // Build complete URL for relative paths starting with /uploads
  if (imagePath.startsWith('/uploads')) {
    return `${apiUrl}${imagePath}`
  }

  // Handle data URLs and other edge cases
  if (imagePath.startsWith('data:')) return imagePath

  console.warn(`Unexpected image path format: ${imagePath}`)
  return imagePath
}
