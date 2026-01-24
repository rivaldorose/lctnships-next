import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from 'date-fns'
import { nl } from 'date-fns/locale'

export function formatDate(date: string | Date, formatStr: string = 'PPP') {
  return format(new Date(date), formatStr, { locale: nl })
}

export function formatRelativeDate(date: string | Date) {
  const d = new Date(date)

  if (isToday(d)) {
    return `Vandaag om ${format(d, 'HH:mm')}`
  }

  if (isTomorrow(d)) {
    return `Morgen om ${format(d, 'HH:mm')}`
  }

  if (isYesterday(d)) {
    return `Gisteren om ${format(d, 'HH:mm')}`
  }

  return format(d, 'PPP', { locale: nl })
}

export function formatTimeAgo(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: nl })
}

export function formatDateTime(date: string | Date) {
  return format(new Date(date), 'PPP p', { locale: nl })
}

export function formatTime(date: string | Date) {
  return format(new Date(date), 'HH:mm')
}

export function formatDateRange(start: string | Date, end: string | Date) {
  const startDate = new Date(start)
  const endDate = new Date(end)

  return `${format(startDate, 'PPP', { locale: nl })} ${format(startDate, 'HH:mm')} - ${format(endDate, 'HH:mm')}`
}
