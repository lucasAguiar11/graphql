// root (ou parent): o resultado da chamada no “nível” anterior da query;
// args: os argumentos que o resolver pode receber da query, por exemplo os dados para um novo User ou um ID;
// context: um objeto com o contexto para o GraphQL, como dados sobre a conexão, permissões de usuário, etc;
// info: a representação em árvore da query ou da mutation.

const { GraphQLScalarType, parseValue } = require("graphql");

const userResolvers = {
  // enums com valores customizados
  RolesType: {
    ESTUDANTE: "ESTUDANTE",
    DOCENTE: "DOCENTE",
    COORDENACAO: "COORDENACAO",
  },

  // Tipo scalar customizado
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "string de data e hora no formato ISO-8601",
    serialize: (value) => value.toISOString(), // valor que vem do meu source
    parseValue: (value) => new Date(value), // dados por input, com variáveis
    parseLiteral: (ast) => new Date(ast.value), // dados por input, mas passados como literais
  }),

  Query: {
    users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
    user: (root, { id }, { dataSources }) =>
      dataSources.usersAPI.getUserById(id),
  },
  Mutation: {
    adicionaUser: async (root, { user }, { dataSources }) =>
      dataSources.usersAPI.adicionaUser(user),
    atualizaUser: async (root, user, { dataSources }) =>
      dataSources.usersAPI.atualizaUser(user),
    deletaUser: async (root, { id }, { dataSources }) =>
      dataSources.usersAPI.deletaUser(id),
  },
};

module.exports = userResolvers;
