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

export function calculateDurations(timestamps) {
  const totalDurationsInSeconds = { travaux: 0, trajet: 0, pause: 0 };

  timestamps.forEach((timestamp, index) => {
      const startTime = new Date(timestamp.created_at);
      let endTime;

      if (index === timestamps.length - 1 && timestamp.isActive === "1") {
          endTime = new Date(); // Current time for active last timestamp
      } else if (index < timestamps.length - 1) {
          endTime = new Date(timestamps[index + 1].created_at); // Start time of the next timestamp
      } else {
          endTime = new Date(timestamp.updated_at); // End time of the current timestamp
      }

      // Calculate duration in seconds
      if (endTime) {
          const durationSeconds = (endTime - startTime) / 1000;

          // Add the duration to the total for the appropriate type
          if (totalDurationsInSeconds.hasOwnProperty(timestamp.type)) {
              totalDurationsInSeconds[timestamp.type] += durationSeconds;
          }
      }
  });

  // Convert total durations from seconds to HH:MM:SS
  const totalDurationsFormatted = {};
  Object.keys(totalDurationsInSeconds).forEach(type => {
      const totalSeconds = totalDurationsInSeconds[type];
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      totalDurationsFormatted[type] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  return totalDurationsFormatted;
}

export function convertToTimeFormat(dateTimeStr) {
  // Parse the date string
  const [day, month, yearAndTime] = dateTimeStr.split("/");
  const [year, time] = yearAndTime.split(" ");
  const [hours, minutes, seconds] = time.split(":");

  // Create a new Date object
  const date = new Date(year, month - 1, day, hours, minutes, seconds);

  // Format the time
  const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  return formattedTime;
}