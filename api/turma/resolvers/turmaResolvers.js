const turmas = [
  {
    id: 1,
    descricao: "Turma 1",
  },
  {
    id: 2,
    descricao: "Turma 2",
  },
];

const turmaResolvers = {
  Query: {
    turmas: (parent, args, context, info) => turmas,
  },
};

module.exports = turmaResolvers;
