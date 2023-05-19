var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usersModel = require('../users.model');

const fakeUsers = [{
  name: 'John',
  email: 'foo@example.com',
  password: 'password123',
},
{
  name: 'John Smith',
  email: 'foo23@example.com',
  password: 'password143',
}];
/* GET users listing. */
router.get('/seed', async function(req, res, next) {
  const usersCount = await usersModel.countDocuments();
  if (usersCount > 0) {
      res.send('aborted');
      return;
  } else {
      await usersModel.create(fakeUsers);
      res.send('seeded successfully');
  }
});

router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;
    const user = await usersModel.findOne({email});
    if(user){
      res.status(400)
      .send('User already exists!');
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      isAdmin: false
    }

    const dbUser = await usersModel.create(newUser);
    res.send(generateTokenReponse(dbUser));
  }
)

const generateTokenReponse = (user) => {
  const token = jwt.sign({
    id: user.id, email:user.email, isAdmin: user.isAdmin
  }, process.env.JWT_SECRET,{
    expiresIn:"30d"
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    token: token
  };
}

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await usersModel.findOne({email});
     if(user && (await bcrypt.compare(password,user.password))) {
      res.send(generateTokenReponse(user));
     }
     else{
       res.status(400).send("Username or password is invalid!");
     }
  
  }
)

module.exports = router;
