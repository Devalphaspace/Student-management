const express = require("express");

const router = express.Router();

const {
  addStudentsController,
  getStudentsController,
  updateStudentController,
  deleteStudentContoller,
} = require("../controllers/students_controller");

router.post("/add_student", addStudentsController);
router.get("/get_students", getStudentsController);
router.put("/update_student/:id", updateStudentController);
router.delete("/delete_student/:id", deleteStudentContoller);

module.exports = router;
