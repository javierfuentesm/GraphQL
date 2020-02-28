"use strict";

const connectDb = require("./db");
const { ObjectID } = require("mongodb");
const mutations = require("./mutations");
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
    }
  },
  Mutation: mutations
};
