import moment from "moment";
import { todoStatus } from "../constants/todo";

export const sortTodoLost = (a, b) => {
  if (moment(a.date).unix() < moment(b.date).unix()) {
    return -1;
  }
  if (moment(a.date).unix() > moment(b.date).unix()) {
    return 1;
  }
  return 0;
};

export const getTodoStatus = (date, status = null) => {
  if (status === todoStatus.completed) return status;
  let dateDiff = moment(date).diff(moment(), "d");
  if (dateDiff >= 0) return todoStatus.pending;
  else return todoStatus.due;
};
