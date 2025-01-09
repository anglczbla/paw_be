const express = require("express");
const router = express.Router();
const {
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
} = require("../controllers/profileController"); // Import dengan destrukturisasi

// Rute untuk profile
router.post("/", createProfile);
router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
