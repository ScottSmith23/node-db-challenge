const db = require("../data/db-config.js");
const mapper = require("./map");
module.exports = {
    get,
    findResources,
    findTasks,
    getProjectTasks,
    getProjectResources
}

//implementation details
function get(id) {
    let query = db("projects as p");
  
    if (id) {
      query.where("p.id", id).first();
  
      const promises = [query, getProjectTasks(id),getProjectResources(id)]; 
  
      return Promise.all(promises).then(function(results) {
        let [project, tasks,resources] = results;
  
        if (project) {
          project.tasks = tasks;
          project.resources = resources;
          return mapper.projectToBody(project);
        } else {
          return null;
        }
      });
    } else {
      return query.then(projects => {
        return projects.map(project => mapper.projectToBody(project));
      });
    }
  }



function getProjectTasks(Id) {
    return db("tasks")
      .where("project_id", Id)
      .then(tasks => tasks.map(task => mapper.taskToBody(task)));
  }

function getProjectResources(Id) {
    return db("project_resources as pr")
      .join('projects as p',"p.id","pr.project_id")
      .join('resources as r','r.id',"pr.resource_id")
      .select('pr.id',"r.resourcename","r.description")
      .where("project_id", Id)
      .then(resources => resources.map(resource => mapper.resourceToBody(resource)));
  }

function findTasks() {
    return db("tasks as t")
        .join('projects as p','p.id','t.project_id')
        .select('t.id','t.description','t.notes','t.completed','t.project_id','p.projectname','p.description as ProjectDescription')
}

function findResources() {
    return db("resources");
}



