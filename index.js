const { ApolloServer, gql } = require('apollo-server');

const users = [
  { id: 1, name: 'Luis Valentim', email: 'luis.menezes@discente.uenp.edu.br' },
  { id: 2, name: 'Gustavo', email: 'gustavo@gmail.com' },
];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    editUser(id: ID!, name: String, email: String): User
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find(user => user.id == args.id),
  },
  Mutation: {
    addUser: (parent, args) => {
      const newUser = { id: users.length + 1, name: args.name, email: args.email };
      users.push(newUser);
      return newUser;
    },
    editUser: (parent, args) => {
      const user = users.find(user => user.id == args.id);
      if (!user) {
        throw new Error(`User with id ${args.id} not found`);
      }
      if (args.name !== undefined) {
        user.name = args.name;
      }
      if (args.email !== undefined) {
        user.email = args.email;
      }
      return user;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Servidor pronto em ${url}`);
});
