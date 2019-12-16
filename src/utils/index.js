export const formatDate = d => {
  return `${d.getFullYear()}-${d
    .getMonth()
    .toString()
    .padStart(2, "0")}-${d
    .getDate()
    .toString()
    .padStart(2, "0")}T${d
    .getHours()
    .toString()
    .padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

export const formatToHtml = str => {
  const regex = /(&lt;)(.*?)(&gt;)/gi;
  return str.replace(regex, "<$2>");
};
