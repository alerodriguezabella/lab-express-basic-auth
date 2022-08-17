const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  if(req.session.currentUser){
    const { username } = req.session.currentUser;
    res.render("index", {username});
  } else {
    res.render("index");
  }
});

module.exports = router;
