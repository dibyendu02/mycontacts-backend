const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//desc get all Contacts
//route GET /api/contacts/
//access private

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

//desc Create New Contact
//route POST /api/contacts/
//access private
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
      user_id: req.user.id
    })
  res.status(201).json(contact);
});

//desc get single Contact data
//route GET /api/contacts/:id
//access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

//desc update single contact
//route PUT /api/contacts/:id
//access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("contact not found");
  }
  if(contact.user_id != req.user.id){
    res.send(403);
    throw new Error("You don't have permission to update other's contacts")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    )
  res.status(200).json(updatedContact);
});


//desc delete single contact
//route DELETE /api/contacts/:id
//access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("contact not found");
  }
  if(contact.user_id != req.user.id){
    res.send(403);
    throw new Error("You don't have permission to delete other's contacts")
  }
  await Contact.deleteOne({ "_id" : req.params.id });
  res.status(200).json(contact);
});

module.exports = { getAllContacts, createContact, getContact, updateContact, deleteContact };
