import { useState } from 'react'

import clsx from 'clsx'

import { Button } from '../../button/Button'
import { Loader } from '../../loader/Loader'
import { ButtonLink } from '../../button-link/ButtonLink'
import { InvitationDetailView } from '../invitation-detail-view/InvitationDetailView'
import { ArrowRightIcon } from '../../icons/Icons'

import { DropdownView } from '../../../types/ui/dropdown'
import { INotification, NOTIFICATION_TYPE } from '../../../types/notification'
import { INVITATION_STATUS } from '../../../types/invitation'

import './NotificationList.css'

interface NotificationListProps {
  unreadCount: number
  notifications: INotification[]
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  fetchingNotifications: boolean
}

export const NotificationList = ({
  unreadCount,
  notifications,
  markAsRead,
  markAllAsRead,
  fetchingNotifications,
}: NotificationListProps) => {
  const [currentView, setCurrentView] = useState<DropdownView>(DropdownView.LIST)
  const [notificationDetail, setNotificationDetail] = useState<INotification | null>(null)

  /**
   * Navigate back to notification list from detail view
   */
  const handleBackToList = () => {
    setCurrentView(DropdownView.LIST)
    setNotificationDetail(null)
  }

  /**
   * Handle notification item click - mark as read if unread
   * @param notification - Clicked notification
   * @param e - Click event
   */
  const handleNotificationClick = async (notification: INotification) => {
    const { read, id } = notification
    console.log(notification)

    // Mark as read if unread
    if (!read) await markAsRead(id)
  }

  const handleShowDetails = (notification: INotification) => {
    const { data, type } = notification

    if (!data) return
    // Navigate to invitation detail if it's an invitation
    if (
      type === NOTIFICATION_TYPE.INVITATION &&
      data.invitationStatus === INVITATION_STATUS.PENDING &&
      data.invitationId
    ) {
      setNotificationDetail(notification)
      setCurrentView(DropdownView.INVITATION_DETAIL)
    }
  }

  /**
   * Handle mark all as read action
   */
  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
  }

  /**
   * Get notification type icon based on notification type
   * @param type - Notification type
   * @returns Icon component or null
   */
  const getNotificationTypeIcon = (type: NOTIFICATION_TYPE) => {
    switch (type) {
      case NOTIFICATION_TYPE.TASK:
        return '📝'
      case NOTIFICATION_TYPE.EVENT:
        return '📅'
      case NOTIFICATION_TYPE.INVITATION:
        return '👥'
      case NOTIFICATION_TYPE.SYSTEM:
        return '📋'
      default:
        return '🔔'
    }
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

  const showDetailButton = (notification: INotification) =>
    notification && notification.data?.invitationStatus === INVITATION_STATUS.PENDING

  const showResolvedNotification = (notification: INotification) => {
    if (
      !notification ||
      !notification.data ||
      !notification.data.actionUrl ||
      notification.data.invitationStatus === INVITATION_STATUS.PENDING
    )
      return false
    const { invitationStatus } = notification.data

    return invitationStatus === INVITATION_STATUS.REJECTED
      ? INVITATION_STATUS.REJECTED
      : INVITATION_STATUS.ACCEPTED
  }

  return (
    <div className="notification-dropdown__content">
      {currentView === DropdownView.LIST && (
        <>
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

          <ul className="notification-dropdown__list">
            {fetchingNotifications ? (
              <div className="notification-dropdown__loading">
                <Loader />
                &nbsp; Loading notifications...
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification: INotification) => {
                const { id, title, message, createdAt, read, type } = notification
                return (
                  <li
                    key={id}
                    className={clsx(
                      'notification-dropdown__item',
                      !read && 'notification-dropdown__item--unread'
                    )}
                    onClick={() => handleNotificationClick(notification)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Notification: ${title}`}
                  >
                    <h3 className="notification-dropdown__item-icon">
                      {getNotificationTypeIcon(type)}
                    </h3>

                    <div className="notification-dropdown__item-content">
                      <span className="notification-dropdown__item-title">{title}</span>
                      <small className="notification-dropdown__item-message">{message}</small>
                      <time className="notification-dropdown__item-time">
                        {formatNotificationTime(createdAt)}
                      </time>
                    </div>

                    {!read && (
                      <span className="notification-dropdown__item-unread-dot" aria-hidden="true" />
                    )}

                    {showDetailButton(notification) && (
                      <Button
                        variant="icon"
                        className="notification-dropdown__details-btn"
                        onClick={() => handleShowDetails(notification)}
                        aria-label="Show details"
                      >
                        <ArrowRightIcon size={20} />
                      </Button>
                    )}

                    {showResolvedNotification(notification) && (
                      <small className="notification-dropdown__item-status">
                        {notification.data?.invitationStatus === INVITATION_STATUS.REJECTED &&
                          'Rejected'}
                        {notification.data?.invitationStatus === INVITATION_STATUS.ACCEPTED &&
                          'Accepted'}
                      </small>
                    )}
                  </li>
                )
              })
            ) : (
              <li className="notification-dropdown__empty">
                <span>No new notifications</span>
              </li>
            )}

            {notifications.length >= 2 && (
              <footer className="notification-dropdown__footer">
                <ButtonLink className="notification-dropdown__view-all" to="/home">
                  View all notifications
                </ButtonLink>
              </footer>
            )}
          </ul>
        </>
      )}

      {notificationDetail && currentView === DropdownView.INVITATION_DETAIL && (
        <InvitationDetailView notification={notificationDetail} onBack={handleBackToList} />
      )}
    </div>
  )
}
