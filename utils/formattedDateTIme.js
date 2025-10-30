export const formattedDateTime = (dateStr, timeStr) => {
  const dateObj = new Date(dateStr);
  const formattedDate = `${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateObj
    .getDate()
    .toString()
    .padStart(2, "0")}/${dateObj.getFullYear()}`;

  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr.padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  const formattedTime = `${hour}:${minute} ${ampm}`;
  return { formattedDate, formattedTime };
};
