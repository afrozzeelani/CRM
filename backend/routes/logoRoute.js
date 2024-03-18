const express = require("express");
const companyRoute = express.Router();
const { chackFile, fileUploadMiddleware } = require("../middleware/multer");

const { verifyHR, verifyAdminHR } = require("../middleware/authMiddleware");

const { CreateLogo, GetLogo } = require("../controllers/logoController");

// create a companey logo
companyRoute.post("/logo/:id?", fileUploadMiddleware, chackFile, CreateLogo);
companyRoute.get("/logo/?", GetLogo);

module.exports = logoRoute;
