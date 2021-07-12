const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const UserController = require("../controllers/userController");
const validateRegisterSchema = require("../validationSchema/validateRegisterSchema");
const validateLoginSchema = require("../validationSchema/validateLoginSchema");
const validateProfileUpdateSchema = require("../validationSchema/validateProfileUpdateSchema");

/* ------------- User Registration Begins ------------ */
/**
 * @route POST /api/v1/user/register
 * @desc Registration for email link activation
 * @access Public
 */
router.post("/signup", validateRegisterSchema, UserController.userSignup);
/* ------------- User RegistrationEnds ------------ */

/* ------------- Activate Account Begins ------------ */
/**
 * @route POST /api/v1/user/account-activate
 * @desc Activate Account through provided link in email
 * @access Public
 */
router.post("/account-activate", UserController.activateAccount);
/* ------------- Activate Account Ends ------------ */

/* ------------- Login Begins ------------ */
/**
 * @route POST /api/v1/user/login
 * @desc User Login
 * @access Public
 */
router.post("/login", validateLoginSchema, UserController.userLogin);
/* ------------- Login Ends ------------ */

/* ------------- Get Registered User Begins ------------ */
/**
 * @route GET /api/v1/user
 * @desc Get all users profile
 * @access Private
 */
router.get(
  "/",
  auth.checkAuth,
  auth.verifyAdmin,
  UserController.getRegisteredUsers
);
/* ------------- Get Regisrered User Ends ------------ */

/* ------------- Get user profile Begins (self) ------------ */
/**
 * @route GET /api/v1/user/:id
 * @desc Get user profile
 * @access Private
 */
router.get("/:id", auth.checkAuth, UserController.getUserProfile);
/* ------------- Get user profile Ends (self) ------------ */

/* ------------- Update User Profile Begins ------------ */
/**
 * @route Patch /api/v1/user
 * @desc Update user profile
 * @access Private
 */
router.patch(
  "/:id",
  auth.checkAuth,
  validateProfileUpdateSchema,
  UserController.updateUserProfile
);
/* ------------- Update User Profile Ends ------------ */

/* ------------- Update Password Begins ------------ */
/**
 * @route Patch /api/v1/user/:id/password
 * @desc Patch user password
 * @access Private
 */
router.patch(
  "/:id/password",
  auth.checkAuth,
  UserController.updateUserPassword
);
/* ------------- Update Password Ends ------------ */

/* ------------- Forgot Password Begins ------------ */
/**
 * @route PUT /api/v1/user/forgot-password
 * @desc Forgot Password
 * @access Public
 */
router.put("/forgot-password", UserController.forgotPassword);
/* ------------- Forgot Password Ends ------------ */

/* ------------- Reset Password Begins ------------ */
/**
 * @route PUT /api/v1/user/reset-password
 * @desc Reset Password
 * @access Public
 */
router.put("/reset-password", UserController.resetPassword);
/* ------------- Reset Password Ends ------------ */

/* ------------- Change User Privilege Begins ------------ */
/**
 * @route PATCH /api/user/admin
 * @desc Patch admin
 * @access Private (Admin)
 */
router.patch(
  "/patch-admin/:id",
  auth.checkAuth,
  auth.verifyAdmin,
  UserController.changeUserPrivilege
);
/* ------------- Change User Privilege Ends ------------ */

module.exports = router;
