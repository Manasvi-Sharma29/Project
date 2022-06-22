const authorModel = require("../models/authorModel");

const isValidMail = function (v) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
};

const isValidTitle = function (str) {
  return /Mr|Mrs|Miss/.test(str);
};

const isValid = function (value) {
  if (typeof value == undefined || typeof value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  else if (typeof value == "string") return true;
};

const isValidPassword = function (pass) {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,10}$/.test(pass);
};

// create author
const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    if (!isValid(data.fname))
      return res
        .status(400)
        .send({ status: false, msg: "Please enter valid First Name" });
    if (!isValid(data.lname))
      return res
        .status(400)
        .send({ status: false, msg: "Please enter valid Last Name" });

    if (!isValidTitle(data.title))
      return res
        .status(400)
        .send({ status: false, msg: "Please enter valid Title" });

    if (!isValidMail(data.email))
      return res
        .status(400)
        .send({ status: false, msg: "Entered mail ID is not valid" });

    if (!isValidPassword(data.password))
      return res.status(400).send({
        status: false,
        msg: "Password should contain 5 to 10 characters, one special character and number and should not contain space ",
      });

    let mail = await authorModel.findOne({ email: data.email });
    if (mail)
      return res
        .status(400)
        .send({ status: false, msg: "Mail Id is already exist" });

    let savedData = await authorModel.create(data);
    res.status(201).send({ status: true, msg: savedData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = {
  createAuthor,
};
