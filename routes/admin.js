const express = require("express");
const router = express.Router();

const { handleAdminCreation, handleAdminLogin, handleAdminGet, handleUpdateAdmin, handleMrData } = require("../controllers/admin");


router.route("/create-admin").post(handleAdminCreation);
router.route("/admin-login").post(handleAdminLogin);

router.route("/get-admin/:id").get(handleAdminGet);
router.route("/update-admin/:id").patch(handleUpdateAdmin);

// admin mr and mrid Data

router.route("/mr-data/:id").get(handleMrData);




module.exports = router