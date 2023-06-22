function formatDate(rawDate: string): string {
  const parsedDate = new Date(rawDate);
  const hours = String(parsedDate.getHours()).padStart(2, '0');
  const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
  return `${String(
    parsedDate.getFullYear(),
  )}/${parsedDate.getMonth()}/${parsedDate.getDate()} ${hours}:${minutes}`;
}

export {formatDate};
