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
