const express = require("express");
const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const router = express.Router();

router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;