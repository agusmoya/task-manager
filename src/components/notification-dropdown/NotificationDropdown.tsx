import { NotificationIcon } from '../icons/Icons'
import { Dropdown } from '../dropdown/Dropdown'
import { Button } from '../button/Button'
import { ButtonLink } from '../button-link/ButtonLink'

import { useNotificationActions } from '../../store/hooks/useNotificationActions'

import { INotification, NOTIFICATION_TYPE } from '../../types/notification'

import './NotificationDropdown.css'

interface NotificationDropdownProps {
  /** Maximum number of notifications to display */
  maxNotifications?: number
  /** Show notification count badge */
  showBadge?: boolean
  /** Custom trigger element (optional) */
  trigger?: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Size variant for the notification icon */
  size?: 'sm' | 'md' | 'lg'
  /** Callback when notification is clicked */
  onNotificationClick?: (notification: INotification) => void
  /** Callback when "Mark all as read" is clicked */
  onMarkAllAsRead?: () => void
}

/**
 * Reusable notification dropdown component
 * Displays notifications with count badge, mark as read functionality, and customizable trigger
 * @param props - NotificationDropdownProps
 * @returns JSX.Element - Notification dropdown with badge
 */
export const NotificationDropdown = ({
  maxNotifications = 10,
  showBadge = true,
  trigger,
  className,
  size = 'md',
  onNotificationClick,
  onMarkAllAsRead,
}: NotificationDropdownProps) => {
  const { unreadCount, notifications, markAsRead, markAllAsRead, fetchingNotifications } =
    useNotificationActions(1, maxNotifications)

  /**
   * Handle notification item click - mark as read if unread
   * @param notification - Clicked notification
   */
  const handleNotificationClick = async (notification: INotification) => {
    // Mark as read if unread
    if (!notification.read) {
      await markAsRead(notification.id)
    }

    // Call custom handler if provided
    onNotificationClick?.(notification)
  }

  /**
   * Handle mark all as read action
   */
  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
    onMarkAllAsRead?.()
  }

  /**
   * Format notification timestamp for display
   * @param createdAt - Notification creation timestamp
   * @returns Formatted time string
   */
  const formatNotificationTime = (createdAt: string) => {
    const date = new Date(createdAt)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  /**
   * Get notification type icon based on notification type
   * @param type - Notification type
   * @returns Icon component or null
   */
  const getNotificationTypeIcon = (type: NOTIFICATION_TYPE) => {
    switch (type) {
      case 'TASK_ASSIGNED':
      case 'TASK_COMPLETED':
      case 'TASK_DUE_SOON':
        return '📝'
      case 'EVENT_REMINDER':
        return '📅'
      case 'INVITATION_RECEIVED':
        return '👥'
      case 'SYSTEM_UPDATE':
        return '🔔'
      default:
        return '📋'
    }
  }

  const notificationClasses = `notification-dropdown ${className || ''}`
  const iconClasses = `notification-dropdown__icon notification-dropdown__icon--${size}`

  // Default trigger if none provided
  const defaultTrigger = (
    <div className="notification-dropdown__trigger" aria-label="Notifications">
      <NotificationIcon className={iconClasses} />
      {showBadge && unreadCount > 0 && (
        <span className="notification-dropdown__badge">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </div>
  )

  return (
    <Dropdown className={notificationClasses} trigger={trigger || defaultTrigger}>
      <div className="notification-dropdown__content">
        <header className="notification-dropdown__header">
          <h3 className="notification-dropdown__title">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              className="notification-dropdown__mark-all"
              onClick={handleMarkAllAsRead}
              aria-label="Mark all notifications as read"
            >
              Mark all as read
            </Button>
          )}
        </header>

        <div className="notification-dropdown__list">
          {fetchingNotifications ? (
            <div className="notification-dropdown__loading">Loading notifications...</div>
          ) : notifications.length > 0 ? (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-dropdown__item ${
                  !notification.read ? 'notification-dropdown__item--unread' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
                role="button"
                tabIndex={0}
                aria-label={`Notification: ${notification.title}`}
              >
                <div className="notification-dropdown__item-icon">
                  {getNotificationTypeIcon(notification.type)}
                </div>

                <div className="notification-dropdown__item-content">
                  <span className="notification-dropdown__item-title">{notification.title}</span>
                  <small className="notification-dropdown__item-message">
                    {notification.message}
                  </small>
                  <time className="notification-dropdown__item-time">
                    {formatNotificationTime(notification.createdAt)}
                  </time>
                </div>

                {!notification.read && (
                  <div className="notification-dropdown__item-unread-dot" aria-hidden="true" />
                )}
              </div>
            ))
          ) : (
            <div className="notification-dropdown__empty">
              <span>No new notifications</span>
            </div>
          )}
        </div>

        {notifications.length >= maxNotifications && (
          <footer className="notification-dropdown__footer">
            <ButtonLink className="notification-dropdown__view-all" to="/home">
              View all notifications
            </ButtonLink>
          </footer>
        )}
      </div>
    </Dropdown>
  )
}
