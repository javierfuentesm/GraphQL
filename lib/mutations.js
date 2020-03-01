"use strict";
const connectDB = require("./db");
const { ObjectID } = require("mongodb");

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
  },
  createStudent: async (root, { input }) => {
    let db, student;

    try {
      db = await connectDB();
      student = await db.collection("students").insertOne(input);
      input._id = student.insertedId;
    } catch (error) {
      console.log(error);
    }
    return input;
  },
  editCourse: async (root, { input, _id }) => {
    let db, course;

    try {
      db = await connectDB();
      await db
        .collection("graphql")
        .updateOne({ _id: ObjectID(_id) }, { $set: input });

      course = await db.collection("graphql").findOne({ _id: ObjectID(_id) });
    } catch (error) {
      console.log(error);
    }
    return course;
  }
  ,
  editStudent: async (root, { input, _id }) => {
    let db, student;

    try {
      db = await connectDB();
      await db
        .collection("students")
        .updateOne({ _id: ObjectID(_id) }, { $set: input });

      student = await db.collection("students").findOne({ _id: ObjectID(_id) });
    } catch (error) {
      console.log(error);
    }
    return student;
  }
};
