import express from "express";

import { validateBody } from "../../decorators/index.js";

import {
  isEmptyBody,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";

import contactsController from "../../controllers/contacts/contacts.js";

import contastsSchemas from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsController.getAllContacts);

contactsRouter.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getContactById
);

contactsRouter.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(contastsSchemas.contactAddSchema),
  contactsController.addContact
);

contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(contastsSchemas.contactAddSchema),
  contactsController.updateContactById
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(contastsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateContactFavorite
);

contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.deleteContactById
);

export default contactsRouter;
