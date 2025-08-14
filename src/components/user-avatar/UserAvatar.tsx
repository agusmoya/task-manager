import { useState, useMemo } from 'react'
import clsx from 'clsx'

import { Loader } from '../loader/Loader'

import { Size } from '../../types/ui/size'

import { buildImageUrl } from '../../helpers/buildImageUrl'
import { getEnvVariables } from '../../helpers/getEnvVariables'

import './UserAvatar.css'

interface UserAvatarProps {
  /** User's profile image URL (server path or blob URL) */
  imageUrl?: string
  /** User's first name for initials fallback */
  firstName: string
  /** User's last name for initials fallback */
  lastName: string
  /** Size variant of the avatar */
  size?: Size
  /** Whether the avatar is clickable (for file upload) */
  editable?: boolean
  /** Loading state for upload operations */
  loading?: boolean
  /** File change handler for editable avatars */
  onFileChange?: (file: File) => void
  /** Additional CSS classes */
  className?: string
  /** Accessibility label */
  ariaLabel?: string
}

const MAX_FILE_SIZE = 1024 * 1024 // 1MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp']

/**
 * Reusable user avatar component with optional file upload functionality
 * Supports different sizes, fallback initials, automatic URL detection, and file validation
 * @param props - UserAvatarProps
 * @returns JSX.Element - User avatar with optional upload capability
 */
export const UserAvatar = ({
  imageUrl,
  firstName,
  lastName,
  size = 'sm',
  editable = false,
  loading = false,
  onFileChange,
  className,
  ariaLabel,
}: UserAvatarProps) => {
  const { VITE_API_URL } = getEnvVariables()
  const [fileError, setFileError] = useState<string>('')

  /**
   * Generate user initials from first and last name
   */
  const initials = useMemo(() => {
    const firstInitial = firstName?.[0] || ''
    const lastInitial = lastName?.[0] || ''
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }, [firstName, lastName])

  /**
   * Process image URL - auto-detect if it needs buildImageUrl or use directly
   */
  const displayImage = useMemo(() => {
    if (!imageUrl) return null

    // If URL is already complete (http/https/blob), use directly
    if (imageUrl.startsWith('http') || imageUrl.startsWith('blob:')) {
      return imageUrl
    }

    // If it's a server relative path, use buildImageUrl
    return buildImageUrl(imageUrl, VITE_API_URL)
  }, [imageUrl, VITE_API_URL])

  /**
   * Handle file selection with validation
   * @param e - File input change event
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !onFileChange) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Only PNG, JPEG or WEBP files are allowed')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('File must be less than 1 MB')
      return
    }

    // Clear errors and call handler
    setFileError('')
    onFileChange(file)
  }

  /**
   * Avatar content with conditional rendering based on loading/image state
   */
  const avatarContent = (
    <>
      {loading ? (
        <Loader />
      ) : displayImage ? (
        <img
          className="user-avatar__image"
          src={displayImage}
          alt={`${firstName} ${lastName} avatar`}
        />
      ) : (
        <div className="user-avatar__initials">{initials}</div>
      )}
    </>
  )

  /**
   * Dynamic CSS classes based on props
   */
  const avatarClasses = clsx(
    'user-avatar',
    `user-avatar--${size}`,
    editable && 'user-avatar--editable',
    loading && 'user-avatar--loading',
    className
  )

  // Editable avatar with file input
  if (editable) {
    return (
      <div className="user-avatar-wrapper">
        <label className={avatarClasses} aria-label={ariaLabel || 'Upload profile picture'}>
          {avatarContent}
          <input
            className="user-avatar__input"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            aria-label="Upload profile picture"
          />
        </label>
        {fileError && (
          <span className="user-avatar__error" role="alert">
            {fileError}
          </span>
        )}
      </div>
    )
  }

  // Read-only avatar
  return (
    <div className={avatarClasses} aria-label={ariaLabel || `${firstName} ${lastName} avatar`}>
      {avatarContent}
    </div>
  )
}
