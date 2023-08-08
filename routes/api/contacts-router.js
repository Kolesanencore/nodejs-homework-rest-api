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

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(contastsSchemas.contactAddSchema),

  contactsController.add
);

contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(contastsSchemas.contactAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(contastsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateFavorite
);

contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.deleteById
);

export default contactsRouter;
