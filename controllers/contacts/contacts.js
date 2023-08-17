import { ctrlWrapper } from "../../decorators/index.js";
import * as contactControllers from "./index.js";

export default {
  getAllContacts: ctrlWrapper(contactControllers.getAllContacts),
  getContactById: ctrlWrapper(contactControllers.getContactById),
  addContact: ctrlWrapper(contactControllers.addContact),
  updateContactById: ctrlWrapper(contactControllers.updateContactById),
  deleteContactById: ctrlWrapper(contactControllers.deleteContactById),
  updateContactFavorite: ctrlWrapper(contactControllers.updateContactFavorite),
};
