const db = require("../models/index.js");
const CRUDService = require("../services/CRUDService.js");

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
    return res.send("Error!");
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let getFindAllCrud = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("users/findAllUser.ejs", {
    datalist: data,
  });
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("Post CRUD thành công!");
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("users/editUser.ejs", {
      data: userData,
    });
  } else {
    return res.send("Không lấy được ID!");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUser(data);
  return res.render("users/findAllUser.ejs", {
    datalist: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("Deleted!");
  } else {
    return res.send("Không tìm thấy user!");
  }
};

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
