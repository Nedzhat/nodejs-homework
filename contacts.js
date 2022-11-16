const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");
const { v4: uuidv4 } = require("uuid");

async function listContacts() {
  try {
    const res = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    console.table(res);
    return;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(id) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const res = data.filter((data) => data.id === id);
    console.table(res);
    return;
  } catch (error) {
    console.log(error);
  }
}

async function removeContactById(id) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const res = data.filter((data) => data.id !== id);
    console.log(`Remove contact ${id}ID`);
    console.table(res);
    fs.writeFile(contactsPath, JSON.stringify(res));
    return;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const res = [...data, { id: uuidv4(), name, email, phone }];
    console.table(res);
    fs.writeFile(contactsPath, JSON.stringify(res));
    return;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
};
