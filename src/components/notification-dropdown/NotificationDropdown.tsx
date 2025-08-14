import { NotificationIcon } from '../icons/Icons'
import { Dropdown } from '../dropdown/Dropdown'
import { NotificationList } from './notification-list/NotificationList'

import { NotificationDropdownProps } from '../../types/ui/dropdown'

import { useNotificationActions } from '../../store/hooks/useNotificationActions'

import './NotificationDropdown.css'

/**
 * Reusable notification dropdown component
 * Displays notifications with count badge, mark as read functionality, and customizable trigger
 * @param props - NotificationDropdownProps
 * @returns JSX.Element - Notification dropdown with badge
 */
export const NotificationDropdown = ({
  maxNotifications = 5,
  showBadge = true,
  trigger,
  className = '',
  size = 'md',
}: NotificationDropdownProps) => {
  const { unreadCount, notifications, markAsRead, markAllAsRead, fetchingNotifications } =
    useNotificationActions(1, maxNotifications)

  const notificationClasses = `notification-dropdown ${className}`
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

  /**
   * Helper to adapt markAsRead mutation to Promise<void>
   * @param id - Notification id
   * @returns Promise<void>
   */
  const handleMarkAsRead = async (id: string): Promise<void> => {
    await markAsRead(id)
  }

  /**
   * Helper to adapt markAllAsRead mutation to Promise<void>
   * @returns Promise<void>
   */
  const handleMarkAllAsRead = async (): Promise<void> => {
    await markAllAsRead()
  }

  return (
    <Dropdown className={notificationClasses} trigger={trigger || defaultTrigger}>
      <NotificationList
        unreadCount={unreadCount}
        notifications={notifications}
        markAsRead={handleMarkAsRead}
        markAllAsRead={handleMarkAllAsRead}
        fetchingNotifications={fetchingNotifications}
      />
    </Dropdown>
  )
}
