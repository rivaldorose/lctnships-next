export const NOTIFICATION_TYPES = {
  booking_confirmed: {
    label: 'Booking Confirmed',
    icon: 'CheckCircle',
  },
  booking_request: {
    label: 'New Booking Request',
    icon: 'Calendar',
  },
  booking_reminder: {
    label: 'Booking Reminder',
    icon: 'Bell',
  },
  new_message: {
    label: 'New Message',
    icon: 'MessageSquare',
  },
  new_review: {
    label: 'New Review',
    icon: 'Star',
  },
  payment_received: {
    label: 'Payment Received',
    icon: 'CreditCard',
  },
  payout_sent: {
    label: 'Payout Sent',
    icon: 'Banknote',
  },
  project_update: {
    label: 'Project Update',
    icon: 'FolderOpen',
  },
} as const

export type NotificationType = keyof typeof NOTIFICATION_TYPES
