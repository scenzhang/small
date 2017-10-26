export default (dateStr) => {
  let date = new Date(dateStr);
  let today = new Date();
  let yrStr = today.getFullYear() === date.getFullYear() ? "" : ` ${date.getFullYear()}`;
  return `${date.toLocaleString('en-us', {month: "short"})} ${date.getDate()}${yrStr}`;
};