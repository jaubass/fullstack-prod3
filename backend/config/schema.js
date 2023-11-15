
// schema.js
import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Subject {
    _id: ID!
    semId: ID!
    name: String!
    descrip: String
    status: Int!
    difficulty: Int
    grade: Int
    like: Boolean
    createdAt: String!
    updatedAt: String!
  }

  type Semester {
    _id: ID!
    name: String!
    year: String!
    start: String!
    end: String!
    descrip: String
    color: String
    tipo: String
    tutorized: Boolean
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    subjects: [Subject]
    subject(id: ID!): Subject
    semesters: [Semester]
    semester(id: ID!): Semester
  }

  type Mutation {
    createSubject(semId: ID!, name: String!, descrip: String, status: Int!, difficulty: Int, grade: Int, like: Boolean): Subject
    updateSubject(id: ID!, semId: ID, name: String, descrip: String, status: Int, difficulty: Int, grade: Int, like: Boolean): Subject
    deleteSubject(id: ID!): String

    createSemester(name: String!, year: String!, start: String!, end: String!, descrip: String, color: String, tipo: String, tutorized: Boolean): Semester
    updateSemester(id: ID!, name: String, year: String, start: String, end: String, descrip: String, color: String, tipo: String, tutorized: Boolean): Semester
    deleteSemester(id: ID!): String
  }
`;

export { typeDefs };
