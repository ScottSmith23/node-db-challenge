
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
            project_id: 1,
            description: "initialize database",
            notes: "databaserino"
        },
        { project_id: 1, notes: "do it", description: "type and code stuff" },
        {
          project_id: 1,
          notes: "hooray!",
            description: "code the rest of the database",
        },
        {
          project_id: 2,
          notes: "look up how to do it",
            description: "do an API thingy",
        },
        { project_id: 2, notes: "very easy", description: "activate stuff" },
        {
          project_id: 2,
          notes: "yummy cake",
            description: "eat cake",
        },
        { project_id: 2, notes: "finish it", description: "dab on em" },
        { project_id: 3, notes: "so much money", description: "do a money and get big money" },
    ]);
    });
};
