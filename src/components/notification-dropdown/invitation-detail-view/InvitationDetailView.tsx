import { Button } from '../../button/Button'
import { ArrowLeftIcon } from '../../icons/Icons'

import { InvitationDetailViewProps } from '../../../types/ui/dropdown'

import { useInvitationActions } from '../../../store/hooks/useInvitationActions'

import './InvitationDetailView.css'

/**
 * Detailed view for invitation notifications with accept/reject actions
 * Similar to YouTube's nested dropdown navigation pattern
 */
export const InvitationDetailView = ({ notification, onBack }: InvitationDetailViewProps) => {
  const { data } = notification
  const { acceptInvitation, rejectInvitation, accepting, rejecting } = useInvitationActions()

  const handleAccept = async () => {
    if (!data?.invitationId) return
    await acceptInvitation(data.invitationId)
    onBack?.() // Return to list after action
  }

  const handleReject = async () => {
    if (!data?.invitationId) return
    await rejectInvitation(data.invitationId)
    onBack?.() // Return to list after action
  }

  const handleBackClick = () => {
    onBack?.()
  }

  return (
    <section className="notification-dropdown__invitation-detail">
      <header className="notification-dropdown__detail-header">
        <Button
          variant="icon"
          className="notification-dropdown__back-button"
          onClick={handleBackClick}
          aria-label="Back to notifications"
        >
          <ArrowLeftIcon size={20} />
        </Button>
        <h3>Contact Invitation</h3>
      </header>

      <section className="notification-dropdown__detail-content">
        <header className="notification-dropdown__invitation-info">
          <span className="notification-dropdown__invitation-title">{notification.title}</span>
          <p className="notification-dropdown__invitation-message">{notification.message}</p>
        </header>

        <div className="notification-dropdown__invitation-actions">
          <Button
            variant="filled"
            onClick={handleAccept}
            disabled={accepting || rejecting}
            className="notification-dropdown__accept-button"
          >
            {accepting ? 'Accepting...' : 'Accept'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleReject}
            disabled={rejecting || accepting}
            className="notification-dropdown__reject-button"
          >
            {rejecting ? 'Rejecting...' : 'Reject'}
          </Button>
        </div>
      </section>
    </section>
  )
}
