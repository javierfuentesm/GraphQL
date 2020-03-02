"use strict";

const connectDb = require("./db");
const { ObjectID } = require("mongodb");
const mutations = require("./mutations");
const types = require("./types");
module.exports = {
  Query: {
    getCourses: async () => {
      let db,
        courses = [];
      try {
        db = await connectDb();
        courses = await db
          .collection("graphql")
          .find()
          .toArray();
      } catch (error) {
        console.log(error);
      }
      return courses;
    },
    getCourse: async (root, args) => {
      let db, course;
      try {
        db = await connectDb();
        course = await db
          .collection("graphql")
          .findOne({ _id: ObjectID(args.id) });
      } catch (error) {
        console.log(error);
      }
      return course;
    },
    getStudents: async () => {
      let db,
        students = [];
      try {
        db = await connectDb();
        students = await db
          .collection("students")
          .find()
          .toArray();
      } catch (error) {
        console.log(error);
      }
      return students;
    },
    getStudent: async (root, args) => {
      let db, student;
      try {
        db = await connectDb();
        student = await db
          .collection("students")
          .findOne({ _id: ObjectID(args.id) });
      } catch (error) {
        console.log(error);
      }
      return student;
    }
  },
  Mutation: mutations,
  ...types
};
