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

export function formatDateTime(date, time) {
  let day = date.split("/")[0];
  let month = date.split("/")[1];
    if(day.length == 1){
      day = `0${day}`;
  }
    if (month.length == 1) {
    month = `0${month}`;
  }
  return (date.split("/")[2] + "/" + month + "/" + day + " " + time.split(":")[0] + ":" + time.split(":")[1] + time.split(":")[2]);
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