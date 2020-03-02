"use strict";
const connectDB = require("./db");
const { ObjectID } = require("mongodb");
const errorHandler = require("./errorHandler");

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
      errorHandler(error);
    }
    return newCourse;
  },
  createPerson: async (root, { input }) => {
    let db, student;

    try {
      db = await connectDB();
      student = await db.collection("students").insertOne(input);
      input._id = student.insertedId;
    } catch (error) {
      errorHandler(error);
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
      errorHandler(error);
    }
    return course;
  },
  editPerson: async (root, { input, _id }) => {
    let db, student;

    try {
      db = await connectDB();
      await db
        .collection("students")
        .updateOne({ _id: ObjectID(_id) }, { $set: input });

      student = await db.collection("students").findOne({ _id: ObjectID(_id) });
    } catch (error) {
      errorHandler(error);
    }
    return student;
  },
  addPerson: async (root, { courseID, personID }) => {
    let db, person, course;

    try {
      db = await connectDB();
      course = await db
        .collection("graphql")
        .findOne({ _id: ObjectID(courseID) });
      person = await db
        .collection("students")
        .findOne({ _id: ObjectID(personID) });
      if (!person || !course)
        throw new Error("EL curso o la persona no existen favor de verificar");

      await db
        .collection("graphql")
        .updateOne(
          { _id: ObjectID(courseID) },
          { $addToSet: { people: personID } }
        );
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },

  deleteStudent: async (root, { _id }) => {
    let db;
    try {
      db = await connectDB();
      await db.collection("students").deleteOne({ _id: ObjectID(_id) });
    } catch (error) {
      errorHandler(error);
    }
    return 1;
  },
  deleteCourse: async (root, { _id }) => {
    let db;
    try {
      db = await connectDB();
      await db.collection("graphql").deleteOne({ _id: ObjectID(_id) });
    } catch (error) {
      errorHandler(error);
    }
    return 1;
  }
};
