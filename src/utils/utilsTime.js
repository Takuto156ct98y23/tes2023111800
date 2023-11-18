import { availableAge } from "../data/constants/userConstants";
import { range } from "./arrayUtils";

const oneSecondInMillisecond = 1000;
const oneMinuteInMillisecond = 1000 * 60;
const oneHourInMillisecond = 1000 * 60 * 60;
const oneDayInMillisecond = 1000 * 60 * 60 * 24;
const oneMonthInMillisecond = 1000 * 60 * 60 * 24 * 30;
const oneYearInMillisecond = 1000 * 60 * 60 * 24 * 365;

const timeVsMilliseconds = {
  millisecond: 1,
  second: oneSecondInMillisecond,
  minute: oneMinuteInMillisecond,
  hour: oneHourInMillisecond,
  day: oneDayInMillisecond,
  month: oneMonthInMillisecond, // Assuming an average of 30 days in a month
  year: oneYearInMillisecond, // Assuming 365 days in a year
};

/*
console.log(formatJapaneseTime("2022-03-15T08:30:00")); // Output: 2022年3月15日8時30分
console.log(formatJapaneseTime(1647392400000)); // Output: 2022年3月15日8時0分
console.log(formatJapaneseTime(new Date("2022-03-15T08:45:00"))); // Output: 2022年3月15日8時45分
console.log(formatJapaneseTime(null)); // Output: ?????????
*/
export function formatJapaneseTime(input) {
  if (!input) {
    return "?????????";
  }
  const dateObj = new Date(input);

  if (isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  return `${year}年${month}月${day}日${hours}時${minutes}分`;
}

/*
console.log(formatDurationJapanese(16016466150))
// 6ヶ月5日9時1分

なお、あくまで概算なので、厳密な年月日数とは異なる。
*/
export function formatDurationJapanese(milliseconds) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  const years = Math.floor(milliseconds / YEAR);
  const months = Math.floor((milliseconds % YEAR) / MONTH);
  const days = Math.floor((milliseconds % MONTH) / DAY);
  const hours = Math.floor((milliseconds % DAY) / HOUR);
  const minutes = Math.floor((milliseconds % HOUR) / MINUTE);

  let formattedString = "";
  if (years > 0) {
    formattedString += `${years}年`;
  }
  if (months > 0) {
    formattedString += `${months}ヶ月`;
  }
  if (days > 0) {
    formattedString += `${days}日`;
  }
  if (hours > 0) {
    formattedString += `${hours}時`;
  }
  if (minutes > 0) {
    formattedString += `${minutes}分`;
  }
  if (formattedString === "") {
    formattedString = "0分";
  }

  return formattedString;
}

/*
This function takes two parameters:
    time: the amount of time to convert, specified as a number
    unit: the unit of time, specified as a string. Valid values are 'year', 'month', 'day', 'hour', 'minute', or 'second'.

The function uses a switch statement to determine how to convert the time based on the specified unit. If an invalid unit is passed in, the function returns null.

const millisecondsInOneYear = timeToMilliseconds(1, 'year');
console.log(millisecondsInOneYear); // Output: 31536000000
*/
export function timeToMilliseconds(time, unit) {
  switch (unit) {
    case "year":
      return time * oneYearInMillisecond;
    case "month":
      return time * oneMonthInMillisecond;
    case "day":
      return time * oneDayInMillisecond;
    case "hour":
      return time * oneHourInMillisecond;
    case "minute":
      return time * oneMinuteInMillisecond;
    case "second":
      return time * oneSecondInMillisecond;
    default:
      return null;
  }
}

/*
In this example, the getAllDatesInMonth function takes two arguments: the year and month for which you want to get all the dates. It then creates a new Date object for the first day of that month and uses a while loop to iterate through all the dates in the month.

On each iteration, it checks whether the current date is still in the target month using the getMonth method, and if it is, it adds that date to the dates array using the push method. It then increments the date by one day using the setDate method.

Finally, the function returns the dates array, which contains all the dates in the target month.



const dates = getAllDatesInMonth(2023, 2); // 2023年2月
console.log(dates);

0:Wed Feb 01 2023 00:00:00 GMT+0900 (Japan Standard Time)
1:Thu Feb 02 2023 00:00:00 GMT+0900 (Japan Standard Time)
2:Fri Feb 03 2023 00:00:00 GMT+0900 (Japan Standard Time)
3:Sat Feb 04 2023 00:00:00 GMT+0900 (Japan Standard Time)
4:Sun Feb 05 2023 00:00:00 GMT+0900 (Japan Standard Time)
5:Mon Feb 06 2023 00:00:00 GMT+0900 (Japan Standard Time)
6:Tue Feb 07 2023 00:00:00 GMT+0900 (Japan Standard Time)
7:Wed Feb 08 2023 00:00:00 GMT+0900 (Japan Standard Time)
8:Thu Feb 09 2023 00:00:00 GMT+0900 (Japan Standard Time)
9:Fri Feb 10 2023 00:00:00 GMT+0900 (Japan Standard Time)
10:Sat Feb 11 2023 00:00:00 GMT+0900 (Japan Standard Time)
11:Sun Feb 12 2023 00:00:00 GMT+0900 (Japan Standard Time)
12:Mon Feb 13 2023 00:00:00 GMT+0900 (Japan Standard Time)
13:Tue Feb 14 2023 00:00:00 GMT+0900 (Japan Standard Time)
14:Wed Feb 15 2023 00:00:00 GMT+0900 (Japan Standard Time)
15:Thu Feb 16 2023 00:00:00 GMT+0900 (Japan Standard Time)
16:Fri Feb 17 2023 00:00:00 GMT+0900 (Japan Standard Time)
17:Sat Feb 18 2023 00:00:00 GMT+0900 (Japan Standard Time)
18:Sun Feb 19 2023 00:00:00 GMT+0900 (Japan Standard Time)
19:Mon Feb 20 2023 00:00:00 GMT+0900 (Japan Standard Time)
20:Tue Feb 21 2023 00:00:00 GMT+0900 (Japan Standard Time)
21:Wed Feb 22 2023 00:00:00 GMT+0900 (Japan Standard Time)
22:Thu Feb 23 2023 00:00:00 GMT+0900 (Japan Standard Time)
23:Fri Feb 24 2023 00:00:00 GMT+0900 (Japan Standard Time)
24:Sat Feb 25 2023 00:00:00 GMT+0900 (Japan Standard Time)
25:Sun Feb 26 2023 00:00:00 GMT+0900 (Japan Standard Time)
26:Mon Feb 27 2023 00:00:00 GMT+0900 (Japan Standard Time)
27:Tue Feb 28 2023 00:00:00 GMT+0900 (Japan Standard Time)
*/

export function getAllDatesInMonth(year, month) {
  const dates = [];
  const monthIndex = month - 1;
  const theFirstDayOfTheSpecifiedMonth = 1;
  const date = new Date(year, monthIndex, theFirstDayOfTheSpecifiedMonth);

  // 何らかの理由でinfinite loopに突入しそうだったら強制終了させるための変数
  let numForSafety = 0;
  while (date.getMonth() === monthIndex) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);

    numForSafety++;
    if (32 <= numForSafety) {
      return;
    }
  }

  return dates;
}

// DropDownのoption。（使用可能年齢から計算した）西暦年一覧。
export const getYearOptions = (yearRange) => {
  const ages = range(yearRange);
  const currentYear = new Date().getFullYear();
  const years = [
    {
      value: null,
      label: "設定なし",
    },
  ];
  for (const age of ages) {
    if (age < availableAge) {
      continue;
    }
    const year = currentYear - age;
    years.push({ value: year, label: `${year}` });
  }
  return years;
};

// DropDownのoption。月。１～１２までの数。
export const getmonthIndexesOptions = () => {
  const monthIndexesOptions = [
    {
      value: null,
      label: "設定なし",
    },
  ];
  for (const monthIndex of range(12)) {
    monthIndexesOptions.push({
      value: monthIndex,
      label: `${monthIndex + 1}`,
    });
  }
  return monthIndexesOptions;
};

// DropDownのoption。ある年の有る月の日付一覧を返す。
export const getDayOptions = (year, monthIndex) => {
  const month = monthIndex + 1;

  const days = getAllDatesInMonth(year, month);
  const dayOptions = [
    {
      value: null,
      label: "設定なし",
    },
  ];
  for (const dateObjOfTheday of days) {
    const day = dateObjOfTheday.getDate();
    dayOptions.push({
      value: day,
      label: `${day}`,
    });
  }
  return dayOptions;
};

/*
timeがspecifiedTimeより前の時間だったらtrue。

timeとspecifiedTimeはstring,number,objectのどれでもよい。

const specifiedTime = "2023-03-16T06:06:30.390+00:00";
const time1 = "2023-03-15T02:01:21.310+00:00";
const time2 = new Date("2023-03-16T08:00:00.000+00:00").getTime();
const time3 = new Date();

console.log(isBeforeSpecifiedTime(time1, specifiedTime)); // true
console.log(isBeforeSpecifiedTime(time2, specifiedTime)); // false
console.log(isBeforeSpecifiedTime(time3, specifiedTime)); // depends on current time
*/
export function isBeforeSpecifiedTime(time, specifiedTime) {
  if (!time) {
    // throw new Error("invalid time.");
    return;
  }
  if (!specifiedTime) {
    // throw new Error("invalid specifiedTime.");
    return;
  }
  const timeObj = new Date(time);
  const specifiedTimeObj = new Date(specifiedTime);
  return timeObj < specifiedTimeObj;
}

/*
例：

(+24)
console.log(getIntXTimeUnitsLater(24,"hour"));
Sun Mar 26 2023 11:29:33 GMT+0900 (Japan Standard Time) ←24時間後の値

(-24)
console.log(getIntXTimeUnitsLater(-24,"hour"));
Fri Mar 24 2023 11:29:14 GMT+0900 (Japan Standard Time) ←24時間前の値

(timeUnitなし → 単位はmillisecond)
console.log(getIntXTimeUnitsLater(oneDayInMillisecond));
Sun Mar 26 2023 11:31:45 GMT+0900 (Japan Standard Time)

*/
export function getIntXTimeUnitsLater(intX, timeUnit = "millisecond") {
  const currentDateObj = new Date();
  // const futureDateObj = new Date(
  //   currentDateObj.getTime() + intX * timeVsMilliseconds[timeUnit]
  // );
  // return futureDateObj;
  return getIntXTimeUnitsLaterFromADate({
    intX,
    timeUnit,
    date: currentDateObj,
  });
}

/*
console.log(getIntXTimeUnitsLaterFromADate({intX:24,timeUnit:"hour",date:"1998-01-05T00:00:00"}));
// Tue Jan 06 1998 00:00:00 GMT+0900 (Japan Standard Time)
console.log(getIntXTimeUnitsLaterFromADate({intX:-24,timeUnit:"hour",date:"1998-01-05T00:00:00"}));
// Sun Jan 04 1998 00:00:00 GMT+0900 (Japan Standard Time)
console.log(getIntXTimeUnitsLaterFromADate({intX:oneDayInMillisecond,date:"1998-01-05T00:00:00"}));
// Tue Jan 06 1998 00:00:00 GMT+0900 (Japan Standard Time)
*/
export function getIntXTimeUnitsLaterFromADate({
  intX,
  timeUnit = "millisecond",
  date,
}) {
  const dateObj = new Date(date);
  const futureDateObj = new Date(
    dateObj.getTime() + intX * timeVsMilliseconds[timeUnit]
  );
  return futureDateObj;
}

/*
  const date1 = "2023-03-20T10:00:00";
  const date2 = 1672609800000; // Equivalent to '2023-03-20T12:30:00'
  console.log(getTimeDifferenceInMilliseconds(date1, date2)); //6664200000

  const date3 = new Date("2023-03-20T10:00:00");
  const date4 = new Date("2023-03-20T12:30:00");
  console.log(getTimeDifferenceInMilliseconds(date3, date4)); //9000000

  const past = new Date("1998-01-01T10:00:00");
  const future = new Date("2025-03-20T12:30:00");
  console.log(getTimeDifferenceInMilliseconds(past, future)); // 858825000000
  console.log(getTimeDifferenceInMilliseconds(future, past)); // 858825000000
  console.log(getTimeDifferenceInMilliseconds(past, future, false)); // 858825000000
  console.log(getTimeDifferenceInMilliseconds(future, past, false)); // -858825000000
*/
export function getTimeDifferenceInMilliseconds(
  input1,
  input2,
  // 絶対値にするならtrue
  useAbs = true
) {
  // Convert input parameters to Date objects if needed
  const date1 = convertToValidDate(input1);
  const date2 = convertToValidDate(input2);
  // Ensure both input parameters are converted to Date objects
  if (!date1 || !date2) {
    throw new Error(
      "Both input parameters must be valid Date objects, strings, or numbers."
    );
  }
  // Calculate the time difference in milliseconds
  const differenceInMilliseconds = date2.getTime() - date1.getTime();
  return useAbs ? Math.abs(differenceInMilliseconds) : differenceInMilliseconds;
}

// stringやnumberをDateオブジェクトに変換する
export function convertToValidDate(input) {
  if (input instanceof Date) {
    return input;
  } else if (typeof input === "string" || typeof input === "number") {
    const date = new Date(input);
    if (isNaN(date)) {
      return null;
    }
    return date;
  }
  return null;
}

/*
  2つ目のargumentが未来のDateならtrue

  const date1 = "1998-01-01T10:00:00";
  const date2 = 1672609800000; // Equivalent to '2023-03-20T12:30:00'
  console.log(dateXisFuture(date1, date2)); // true

  const date3 = new Date("2023-03-20T12:30:00");
  const date4 = new Date("1998-01-01T10:00:00");
  console.log(dateXisFuture(date3, date4)); // false

  const sameDate = new Date("2023-03-20T12:30:00");
  console.log(dateXisFuture(sameDate, sameDate)); // false
*/
export function dateXisFuture(standardDate, dateX) {
  const timeDifference = getTimeDifferenceInMilliseconds(
    standardDate,
    dateX,
    false
  );
  if (0 < timeDifference) {
    return true;
  } else {
    return false;
  }
}

/*
const unixTimestamp = 1682482830
console.log(convertUnixTimestampToDateObj(unixTimestamp))
// Wed Apr 26 2023 13:20:30 GMT+0900 (Japan Standard Time)
*/
export const convertUnixTimestampToDateObj = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000;
  const dateObject = new Date(milliseconds);
  return dateObject;
};

/*
// Usage example:
const milliseconds = 86400000; // 1 day in milliseconds
const timeUnit = 'day';
console.log(convertMilliseconds(milliseconds,timeUnit))// 1
*/
export function convertMilliseconds(
  milliseconds,
  timeUnit,
  // outputから小数点を省くために四捨五入するならtrue
  roundsOff = true
) {
  if (!timeVsMilliseconds.hasOwnProperty(timeUnit)) {
    throw new Error("Invalid time unit specified");
  }
  const converted = milliseconds / timeVsMilliseconds[timeUnit];
  return roundsOff ? Math.round(converted) : converted;
}
