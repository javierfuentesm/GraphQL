"use strict";

const connectDb = require("./db");
const { ObjectID } = require("mongodb");
const mutations = require("./mutations");
const types = require("./types");
const errorHandler = require("./errorHandler");
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
        errorHandler(error);
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
        errorHandler(error);
      }
      return course;
    },
    getPeople: async () => {
      let db,
        people = [];
      try {
        db = await connectDb();
        people = await db
          .collection("students")
          .find()
          .toArray();
      } catch (error) {
        errorHandler(error);
      }
      return people;
    },
    getPerson: async (root, args) => {
      let db, person;
      try {
        db = await connectDb();
        person = await db
          .collection("students")
          .findOne({ _id: ObjectID(args.id) });
      } catch (error) {
        errorHandler(error);
      }
      return person;
    }
  },
  Mutation: mutations,
  ...types
};
