import express from "express";

import contactController from "../../controllers/contactController.js";

const router = express.Router();

router.get("/", contactController.listContacts);
router.get("/:contactId", contactController.getContactById);

router.post("/", contactController.addContact);

router.put("/:contactId", contactController.updateContact);

router.delete("/:contactId", contactController.deleteContact);

export default router;
