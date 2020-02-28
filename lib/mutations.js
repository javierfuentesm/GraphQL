"use strict";
const connectDB = require("./db");
module.exports = {
  createCourse: async (root, args) => {
    let db, course;
    const defaults = {
      teacher: "",
      topic: ""
    };
    const newCourse = Object.assign(defaults, args.input);
    try {
      db = await connectDB();
      course = await db.collection("graphql").insertOne(args.input);
      newCourse._id = course.insertedId;
    } catch (error) {
      console.log(error);
    }
    return newCourse;
  }
};
