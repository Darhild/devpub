import router from "../router";

export const formatDateTime = d => {
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

export const formatDate = (year, month, day) => {
  return `${year}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};

export const formatToHtml = str => {
  const regex = /(&lt;)(.*?)(&gt;)/gi;
  return str.replace(regex, "<$2>");
};

export const handleResponseErrors = res => {
  if (res.status === 400) {
    this.$store.commit("setViewedErrors", {
      message: res.data.message
    });
    return true;
  } else if (res.status === 404) {
    router.push("/404");
  } else if (res.status === 500) {
    this.$store.commit("setViewedErrors", {
      message:
        "Произошла ошибка! Пожалуйста, попробуйте позже или обратитесь к администратору"
    });
    return true;
  }

  return false;
};
