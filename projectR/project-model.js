const db = require("../data/db-config.js");
const mapper = require("./map");
module.exports = {
    get,
    findResources,
    findTasks,
    getProjectTasks,
    getProjectResources,
    getAllProjectResources,
    insert,
    insertTask,
    insertResource,
    addResource,
    remove,
    removeTask,
    removeResourcefromProj,
    removeResource,
    update,
    updateTask,
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

  function getAllProjectResources() {
    return db("project_resources");
  }

function findTasks() {
    return db("tasks as t")
        .join('projects as p','p.id','t.project_id')
        .select('t.id','t.description','t.notes','t.completed','t.project_id','p.projectname','p.description as ProjectDescription')
}

function findResources() {
    return db("resources");
}

function insert(project) {
    return db("projects")
      .insert(project, "id")
      .then(([id]) => get(id));
  }

function insertTask(task) {
    return db('tasks')
      .insert(task, 'id')
      .then(([id]) => get(id));
  }

function insertResource(resource) {
    return db('project_resources')
      .insert(resource, 'id')
      .then(([id]) => get(id));
  }

function addResource(resource) {
    return db('resources')
      .insert(resource, 'id')
      .then(([id]) => get(id));
  }

function remove(id) {
    return db("projects")
      .where("id", id)
      .del();
  }

function removeTask(id) {
    return db('tasks').where('id', id).del();
  }

function removeResourcefromProj(id) {
    return db('project_resources').where('id', id).del();
  }
  
  function removeResource(id) {
    return db('resources').where('id', id).del();
  }

  function update(id, changes) {
    return db("projects")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? get(id) : null));
  }

  function updateTask(id, changes) {
    return db('tasks')
      .where('id', id)
      .update(changes)
      .then((count) => (count > 0 ? get(id) : null));
  }




