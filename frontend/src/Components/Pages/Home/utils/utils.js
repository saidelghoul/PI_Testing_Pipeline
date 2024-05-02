import { postTypes } from "./const";
import moment from "moment/moment";

export const isCreator = (userId, creatorId) => userId === creatorId; //true

export const validDate = (testDate, diffrnce) => {
  const currentDate = moment();
  return Math.abs(currentDate.diff(testDate, "days")) > diffrnce;
};

export const getDeleteEndpoint = (eventType) => {
  if (eventType === postTypes.TEXT) return "/publications/delete";
  if (eventType === postTypes.EVENT) return "/evenemnt/remove";
};

export const getUpdateLink = (eventType) => {
  if (eventType === postTypes.TEXT) return "/update";
  if (eventType === postTypes.EVENT) return "/updateEvent";
};

export const getLikePostEndpoint = (eventType) => {
  if (eventType === postTypes.TEXT) return "/publications/like";
  if (eventType === postTypes.EVENT) return "/evenemnt/like";
};

export const getDeslikePostEndpoint = (eventType) => {
  if (eventType === postTypes.TEXT) return "/publications/deslike";
  if (eventType === postTypes.EVENT) return "/evenemnt/deslike";
};

export const getReportPostEndpoint = (eventType) => {
  if (eventType === postTypes.TEXT) return "/publications/report";
  if (eventType === postTypes.EVENT) return "/evenemnt/report";
};
