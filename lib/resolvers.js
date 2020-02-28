"use strict";

const courses = [
  {
    _id: "1",
    title: "Mi titulo",
    teacer: "Mi profesor",
    description: "Mi descripcion",
    topic: "Mi materia"
  },
  {
    _id: "2",
    title: "Mi titulo",
    teacer: "Mi profesor",
    description: "Mi descripcion",
    topic: "Mi materia"
  },
  {
    _id: "3",
    title: "Mi titulo",
    teacer: "Mi profesor",
    description: "Mi descripcion",
    topic: "Mi materia"
  }
];

module.exports = {
  Query: {
    getCourses: () => courses,
    getCourse: (root, args) =>
      courses.filter(course => course._id === args.id).pop()
  }
};
