function formatDate(rawDate: string): string {
  const parsedDate = new Date(rawDate);
  return `${String(
    parsedDate.getFullYear(),
  )}/${parsedDate.getMonth()}/${parsedDate.getDate()} ${parsedDate.getHours()}:${parsedDate.getMinutes()}`;
}

export {formatDate};
