import { invitationsApi } from '../../services/invitationApi'
import { registerToastFor } from './toastHelper'

const { inviteContact } = invitationsApi.endpoints

const sendInvitationOperation = {
  endpoints: {
    matchPending: inviteContact.matchPending,
    matchFulfilled: inviteContact.matchFulfilled,
    matchRejected: inviteContact.matchRejected,
  },
  messages: {
    loading: 'Sending invitation…',
    success: 'Invitation sent successfully',
    error: 'Error sending invitation',
  },
}

const toastInvitationOperations = [sendInvitationOperation]

toastInvitationOperations.forEach(({ endpoints, messages }) =>
  registerToastFor({ endpoints, messages })
)
