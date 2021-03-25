const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${ minutes }`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${ prefomattedDate } at ${ hours }:${ minutes }`;
  }

  if (hideYear) {
    // 10 January at 10:20
    return `${ day } ${ month } at ${ hours }:${ minutes }`;
  }

  // 10 January 2017. at 10:20
  return `${ day } ${ month } ${ year } at ${ hours }:${ minutes }`;
}


// --- Main function
function time(data) {
  const dateParam = data?.commit?.committer.date;
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();


  if (seconds < 5) {
    return {"new": 'now', "old": dateParam};
  } else if (seconds < 60) {
    return {"new": `${ seconds } seconds ago`, "old": dateParam};
  } else if (seconds < 90) {
    return {"new": 'about a minute ago', "old": dateParam};
  } else if (minutes < 60) {
    return {"new": `${ minutes } minutes ago`, "old": dateParam};
  } else if (isToday) {
    return {"new": getFormattedDate(date, 'Today'), "old": dateParam}; // Today at 10:20
  } else if (isYesterday) {
    return {"new": getFormattedDate(date, 'Yesterday'), "old": dateParam}; // Yesterday at 10:20
  } else if (isThisYear) {
    return {"new": getFormattedDate(date, false, true), "old": dateParam}; // 10 January at 10:20
  }

  return {"new": getFormattedDate(date), "old": dateParam}; // 1 January 2017 at 10:20
}

export default time;
