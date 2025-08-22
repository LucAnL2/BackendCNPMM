// import database và service bằng require
const db = require("../models/index"); // import database
const CRUDService = require("../services/CRUDService"); // import service

// hàm getHomePage
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll(); // lấy dữ liệu từ models/index
    console.log(data);
    return res.render("homepage.ejs", {
      data: JSON.stringify(data), // trả dữ liệu data về view
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

// hàm getAboutPage
let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

// hàm getCRUD
let getCRUD = async (req, res) => {
  try {
    let data = await CRUDService.getAllUser(); // hoặc db.User.findAll()
    return res.render("crud.ejs", { datalist: data });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

// hàm findAll CRUD
let getFindAllCrud = async (req, res) => {
  try {
    let data = await CRUDService.getAllUser();
    // console.log(data);
    return res.render("users/findAllUser.ejs", {
      datalist: data,
    }); // gọi view và truyền dữ liệu ra view
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

// hàm post CRUD
let postCRUD = async (req, res) => {
  try {
    let message = await CRUDService.createNewUser(req.body); // gọi service
    console.log(message);
    return res.send("Post crud to server");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

// hàm lấy dữ liệu để edit
let getEditCRUD = async (req, res) => {
  try {
    let userId = req.query.id;
    if (userId) {
      // check Id
      let userData = await CRUDService.getUserInfoById(userId);
      console.log(userData);
      return res.render("users/editUser.ejs", {
        data: userData,
      });
    } else {
      return res.send("Không lấy được id");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

// hàm update CRUD
let putCRUD = async (req, res) => {
  try {
    let data = req.body;
    let updatedData = await CRUDService.updateUser(data); // update rồi hiển thị lại danh sách user
    return res.render("users/findAllUser.ejs", {
      datalist: updatedData,
    });
    // return res.send('Update thành công');
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

// hàm delete CRUD
let deleteCRUD = async (req, res) => {
  try {
    let id = req.query.id; // vì trên view ?id=1
    if (id) {
      await CRUDService.deleteUserById(id);
      return res.send("Deleted!");
    } else {
      return res.send("Not find user");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

// export object
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
