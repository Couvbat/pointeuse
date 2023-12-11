//format date object to DD/MM/YYYY
export function formatDate(dateObj) {
  return (
    dateObj.getDate() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getFullYear()
  );
}

//format time object to HH:MM
export function formatTime(timeObj) {
  return timeObj.toLocaleTimeString();
}

// Keep formatDate and formatTime function the same

// Add two new functions that take a dateTimeObj and format them
export function formatDateTimeAsDate(dateTimeObj) {
  return formatDate(dateTimeObj);
}

export function formatDateTimeAsTime(dateTimeObj) {
  return formatTime(dateTimeObj);
}

// Revised formatDateTime to accept a Date object and format it
export function formatDateTime(dateTimeObj) {
  const day = ("0" + dateTimeObj.getDate()).slice(-2);
  const month = ("0" + (dateTimeObj.getMonth() + 1)).slice(-2);
  const year = dateTimeObj.getFullYear();
  const hours = ("0" + dateTimeObj.getHours()).slice(-2);
  const minutes = ("0" + dateTimeObj.getMinutes()).slice(-2);

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function convertDateFormat(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function calculateDuration(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let diffInMilliseconds = Math.abs(endDate - startDate);

  const hours = Math.floor(diffInMilliseconds / 3600000);
  diffInMilliseconds -= hours * 3600000;

  const minutes = Math.floor(diffInMilliseconds / 60000);
  diffInMilliseconds -= minutes * 60000;

  const seconds = Math.floor(diffInMilliseconds / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export function formatCalendarDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}