import { notification } from "antd";
const notificationFunction = ({ message, type }) => {
  notification.open({
    type,
    message,
  });
};
export { notificationFunction };
