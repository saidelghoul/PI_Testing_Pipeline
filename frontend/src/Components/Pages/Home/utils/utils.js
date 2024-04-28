import { postTypes } from "./const";

export const isCreator = (userId, creatorId) => userId === creatorId;

export const getDeleteEndpoint = (eventType) => {
  if (eventType === postTypes.TEXT) return "publications/delete";
  if (eventType === postTypes.EVENT) return "evenemnt/remove";
};

export const getUpdateLink = (eventType) => {
  if (eventType === postTypes.TEXT) return "/update";
  if (eventType === postTypes.EVENT) return "/updateEvent";
};
