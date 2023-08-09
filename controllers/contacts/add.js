import Contact from "../../models/contacts.js";

const add = async (req, res) => {
  // console.log(req.user);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

export default add;
