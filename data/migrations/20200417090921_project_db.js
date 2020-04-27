exports.up = function (knex) {
    return (
      knex.schema
        // projects
        .createTable("projects", tbl => {
          tbl.increments("id").primary();
          tbl.string("ProjectName", 255).notNullable().unique();
          tbl.text("Description");
          tbl.boolean("completed").notNullable().defaultTo(false);
        })
  
        // resources
        .createTable("resources", tbl => {
            tbl.increments("id").primary();
            tbl.string("ResourceName", 255).notNullable().index();
            tbl.text("Description");
        })
  
        // tasks
        .createTable("tasks", tbl => {
         tbl.increments("id").primary();
         tbl.string("Description", 255).notNullable();
         tbl.text("Notes");
          tbl.boolean("completed").notNullable().defaultTo(false);
          // foreign key
          tbl
            .int("project_id")
            .notNullable()
            .references("id")
            .inTable("projects")
            .onDelete("RESTRICT") // 'CASCADE', 'RESTRICT', 'SET NULL', 'DO NOTHING'
            .onUpdate("CASCADE");
        })
  
        // Project_Resources
        .createTable("project_resources", tbl => {
          tbl.increments("id").primary();
  
          tbl
            .int("project_id")
            .notNullable()
            .references("id")
            .inTable("projects")
            .onDelete("RESTRICT") // 'CASCADE', 'RESTRICT', 'SET NULL', 'DO NOTHING'
            .onUpdate("CASCADE");
  
          tbl
            .int("resource_id")
            .notNullable()
            .references("id")
            .inTable("resources")
            .onDelete("RESTRICT") // 'CASCADE', 'RESTRICT', 'SET NULL', 'DO NOTHING'
            .onUpdate("CASCADE");
  
          tbl.unique(["project_id", "resource_id"]);
        })
    );
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("projects")
      .dropTableIfExists("resources")
      .dropTableIfExists("tasks")
      .dropTableIfExists("project_resources")
  };
  