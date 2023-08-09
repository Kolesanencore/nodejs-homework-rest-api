import Contact from "../../models/contacts.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

// const getAll = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 10, ...query } = req.query;
//   const skip = (page - 1) * limit;
//   const result = await Contact.find(
//     { owner, ...query },
//     "-createdAt -updatedAt",
//     { skip, limit }
//   ).populate("owner", "name email");
//   res.json(result);
// };

export default getAll;

// const getAll = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 10, favorite } = req.query;
//   const skip = (page - 1) * limit;

//   const conditions = { owner };
//   if (favorite === "true") conditions.favorite = true;

//   const result = await Contact.find
//     ({ owner },
//     "-createdAt -updatedAt", {
//     skip,
//     limit,
//   }).populate("owner", "email subscription");
//   res.json(result);
// };
