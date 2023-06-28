function formatDate(rawDate: string, includeMinute: boolean): string {
  const parsedDate = new Date(rawDate)
  const hours = String(parsedDate.getHours()).padStart(2, '0')
  const minutes = String(parsedDate.getMinutes()).padStart(2, '0')

  const dateString = `${String(
    parsedDate.getFullYear(),
  )}/${parsedDate.getMonth()}/${parsedDate.getDate()}`

  if (!includeMinute) {
    return dateString
  }

  const timeString = `${hours}:${minutes}`

  return `${dateString} ${timeString}`
}

export {formatDate}
