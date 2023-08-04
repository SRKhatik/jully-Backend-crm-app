const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const { userStatus, userType } = require("../utils/constants");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { name, userId, email, password, userType } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = {
    name,
    userId,
    email,
    password: hashedPassword,
    userType,
    userStatus:
      userType === userType.customer ? userStatus.approved : userStatus.pending,
  };

  const newUser = new userModel(user);
  newUser
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send({ message: "User Created Successfully!" });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(400)
          .send({ message: "UserId/Email already exists in the database " });
      }
      return res.status(500).send({ message: err.message });
    });
};

//logIn function

const login = async (req, res) => {
  console.log(req.body);

  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).send({ message: "UserId/Password is not passed" });
  }

  try {
    //for the userId
    const user = await userModel.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send({ message: `userId:${userId} is invalid ` });
    }

    //for the password syntace take on bcrypt documentaion
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).send({ message: "invalid Password" });
    }
    //if userid and password both are valid jwt token match and login 
    //syntac of jwt token payload header and secrate key
    const token = jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: "1h" });
    console.log(token)
  } catch {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  register,
  login,
};
