import { postTypes } from "./const";

export const isCreator = (userId, creatorId) => userId === creatorId;

export const getDeleteEndpoint = (eventType) => {
  console.log(" >> ", eventType);
  if (eventType === postTypes.TEXT) return "publications/delete"; 
  if (eventType === postTypes.EVENT) return "evenemnt/remove";
};

export const getUpdateEndpoint = (eventType) => {
  switch (eventType) {
    case postTypes.TEXT:
      return "/evenemnt/update";
    case postTypes.EVENT:
      return "/publications/update";
    default:
      console.log(`Sorry, we are out of ${eventType}.`);
  }
};

export const getAllDataEndpoint = (eventType) => {
  switch (eventType) {
    case postTypes.TEXT:
      return "evenemnt";
    case postTypes.EVENT:
      return "";
    default:
      console.log(`Sorry, we are out of ${eventType}.`);
  }
};
