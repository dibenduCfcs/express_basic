const express = require("express");
const coursesRepo = require("../../repository/coursesRepo");
const { rngfc, validateBody } = require("../../utils/commonFunction");
const { addNewStudent } = require("../../models/student");
const coursesRouter = express.Router();

coursesRouter.get("/", (req, res) => {
  res.status(200).json({
    meta: {
      status_code: 1,
      status_message: "Courses are fetch successfully.",
    },
    data: coursesRepo,
  });
});

coursesRouter.get("/:id", (req, res) => {
  let id = req.params.id;
  let responseData = coursesRepo.filter((item) => item._id === Number(id));
  res.status(200).json({
    meta: {
      status_code: 1,
      status_message: `Course with id ${id} are fetch successfully.`,
    },
    data: responseData,
  });
});

coursesRouter.post("/addNew", (req, res) => {
  try {
    let bodyValidation = addNewStudent.validate(req.body);
    if (bodyValidation.error) {
      res.status(400).json({
        meta: {
          status_code: 0,
          status_message: bodyValidation.error.details[0].message,
        },
        data: [],
      });
    } else {
      const { course_name, branch_name, year, sem } = req.body;
      coursesRepo.push({
        _id: rngfc(),
        course_name,
        branch_name,
        year,
        sem,
      });
      res.status(200).json({
        meta: {
          status_code: 1,
          status_message: `${course_name} courses is added successfully.`,
        },
        data: [],
      });
    }
  } catch (error) {
    res.status(200).json({
      meta: {
        status_code: 0,
        status_message: `Something went wrong ${error.message}`,
      },
      data: coursesRepo,
    });
  }
});

coursesRouter.delete("/:id", (req, res) => {
  let id = req.params.id;
  let index = coursesRepo.findIndex((item) => item._id === Number(id));
  if (index !== -1) {
    coursesRepo.splice(index, 1);
  }
  res.status(200).json({
    meta: {
      status_code: 1,
      status_message: "Course are deleted successfully.",
    },
    data: [],
  });
});

module.exports = coursesRouter;
