import moment from "moment";
const formatDate = (str) => {
  return moment(str).format("LL");
};

export { formatDate };
