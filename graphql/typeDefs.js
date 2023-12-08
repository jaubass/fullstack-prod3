//schema
const typeDefs = `#graphql

  scalar Date

  type Subject {
    id: ID!
    semId: ID!
    name: String!
    descrip: String
    status: Int!
    difficulty: Int
    grade: Int
    like: Boolean
  }

  type Semester {
    id: ID!
    name: String!
    year: Int!
    start: Date!
    end: Date!
    descrip: String
    color: String!
    kind: Int!
    tutorized: Boolean
    subjects: [Subject]
  }

  type Query {
    semesters: [Semester]
    getSemesterById(id: ID!): Semester
    getSubjectsBySemesterId(semId: ID!): [Subject]
    getSubjectById(id: ID!): Subject
  }

  type Mutation {
    createSemester(
      name: String!, year: Int!, start: Date!, end: Date!, descrip: String, color: String!, kind: Int!, tutorized: Boolean): Semester
  }
`;

export default typeDefs;