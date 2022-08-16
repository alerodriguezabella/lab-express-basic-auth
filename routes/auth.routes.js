const router = require("express").Router();
const bcryptjs = require('bcryptjs')
const saltRounds = 10
const User = require('../models/User.model')

/* GET signup page */
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  // console.log(req.body)
  const {username, password} = req.body

  bcryptjs
  .genSalt(saltRounds)
  .then(salt => bcryptjs.hash(password, salt))
  .then(hashedPassword => {
    // console.log(`Pw hash: ${hashedPassword}`)
    return User.create({
      username, 
      passwordHash: hashedPassword
    })
  })
  .then(userFromDB => {
    // console.log('Newly created user is: ', userFromDB)
    res.redirect('/auth/profile')
  })
  .catch(error => console.log(error))
});

  /* GET profile page */
router.get("/profile", (req, res) => {
    res.render("auth/profile");
});

module.exports = router;