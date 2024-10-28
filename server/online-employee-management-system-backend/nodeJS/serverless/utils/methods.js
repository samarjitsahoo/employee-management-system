const Employee = require("../model/employee-model");
const Admin = require("../model/admin-model");
const Leave = require("../model/leave-model");
const Notice = require("../model/notice-model");
const Notification = require("../model/notification-model");
const Resign = require("../model/resign-model");

const setModel = (modelName) => {
  switch (modelName) {
    case "admin":
      return Admin;
    case "employee":
      return Employee;
    case "resign":
      return Resign;
    case "leave":
      return Leave;
    case "notice":
      return Notice;
    default:
      return null;
  }
};

const sendNotification = async (regdNo, title, message) => {
  const notification = await Notification.createNotification(
    regdNo,
    title,
    message
  );
  if (notification.error) {
    res.status(400).json({ error: notification.error });
  } else {
    res
      .status(200)
      .json({ message: action + " Leave action updated successfully" });
  }
};

module.exports = { setModel, sendNotification };