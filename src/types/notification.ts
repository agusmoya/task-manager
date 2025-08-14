import { InvitationStatus } from './invitation'

/**
 * Notification type enumeration
 * Defines different types of notifications in the system
 */
export enum NOTIFICATION_TYPE {
  TASK = 'task',
  EVENT = 'event',
  INVITATION = 'invitation',
  SYSTEM = 'system',
}

/**
 * Notification entity interface.
 * Represents a single notification in the system.
 */
export interface INotification {
  id: string
  userId: string // User receiving the notification
  type: NOTIFICATION_TYPE // Type of notification
  title: string // Notification title
  message: string // Notification content
  data?: INotificationData // Additional context data
  read: boolean // Whether user has read it
  createdAt: string // When notification was created
  updatedAt?: string // When notification was last modified
}

/**
 * Additional data that can be attached to notifications.
 * Provides context for specific notification types.
 */
export interface INotificationData {
  invitationId?: string // For invitation notifications
  invitationStatus?: InvitationStatus
  taskId?: string // For task notifications
  eventId?: string // For event notifications
  fromUserId?: string // User who triggered the notification
  fromUserName?: string // Name of user who triggered it
  actionUrl?: string // URL for notification action
}

/**
 * Query options for notification filtering.
 */
export interface INotificationQueryOptions {
  limit?: number
  offset?: number
  read?: boolean
  type?: string
}
