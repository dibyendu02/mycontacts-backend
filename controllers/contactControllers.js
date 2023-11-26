const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//desc Create New Contact
//route GET /api/contacts/
//access public

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});


const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandetory");
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
    })
  res.status(201).json(contact);
});


const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});


const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    )
  res.status(200).json(updatedContact);
});



const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("contact not found");
  }
  await Contact.deleteOne({ "_id" : req.params.id });
  res.status(200).json(contact);
});

module.exports = { getAllContacts, createContact, getContact, updateContact, deleteContact };
