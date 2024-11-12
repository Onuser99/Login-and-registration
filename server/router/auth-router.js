const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");

router.use(express.json());

router.route("/home")
    .get(authControllers.home)
    .post(authControllers.home);



router.post("/register", authControllers.register);
router.get("/register", authControllers.register);
router.post("/login", authControllers.login);

router.get("/getFun", (req, res) => {
    console.log("hellooo");
    res.send("Hello from /getFun route");
});

module.exports = router;
