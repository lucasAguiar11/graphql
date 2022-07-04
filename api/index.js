const { ApolloServer } = require("apollo-server");
const userSchema = require("./user/schema/user.graphql");
const userResolvers = require("./user/resolvers/userResolvers");

const UsersAPI = require("./user/datasource/user"); 

// apollo-server lib para criação de servidor graphql
// ele pode pegar as informações de qualquer lugar, um banco, memória ou api
// é como se fosse uma 'api' que centraliza tudo

// typeDefs -> Os schemas

// schema = core do graphql, o que pode ser usado e o que pode acessar
// resolver = funções que servem para implementar o que foi definido no schema
// Cada campo do query precisa de um resolver para ser executado

// linguagem própria do graphql SDL - schema definition language

/*
tipos de dados no SDL:

Scalares
    Int - inteiro de 32 bits
    Float - tipo ponto flutuante
    String - sequência de caracteres no formato UTF-8
    Boolean - true ou false
    ID - identificador único, usado normalmente para localizar dados É possível criar tipos scalar customizados, estudaremos mais adiante neste curso.

objetos e arrays [Colecao!]!
    type Livro {
        id: ID!
        titulo: String!
        autoria: String!
        paginas: Int!
        colecoes: [Colecao!]!
    }
    
QUERY TYPE - Semelhante ao REST GET/:id
    type Query {
        livros: [Livro!]!
        livro(id: ID!): Livro!
    }

MUTATION TYPE
    Mutations são os tipos GraphQL utilizados para adicionar, alterar e deletar dados, de forma similar às operações de POST, PUT e DELETE nos CRUDs desenvolvidos em REST.
    type Mutation {
        adicionaLivro(titulo: String!, autoria: String!, paginas: Int!, colecoes: Colecao!): Livro!
    }
*/

// introspection => permite que o servidor apresente o schema do graphql, algo parecido com o swagger

// GraphQl playground => permite que o usuário teste o schema do graphql
// GraphQl é uma especificação que define o comportamento de um servidor de graphql
// Apollo Server é uma ferramenta que implementa o GraphQl

const typeDefs = [userSchema];
const resolvers = [userResolvers];

const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => {
    return {
        usersAPI: new UsersAPI(),
    };
} });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
