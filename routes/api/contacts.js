import express from "express";

import { validateBody } from "../../decorators/index.js";

import {
  isEmptyBody,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";

import contactsController from "../../controllers/contacts/contacts.js";

import contastsSchemas from "../../schemas/contacts-schemas.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contastsSchemas.contactAddSchema),
  contactsController.add
);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contastsSchemas.contactAddSchema),
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contastsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete("/:contactId", isValidId, contactsController.deleteById);

export default router;
