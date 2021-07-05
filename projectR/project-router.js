const express = require('express');
const Projects = require('./project-model.js')
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get projects' });
    });
  });

router.get('/resources', (req, res) => {
    Projects.findResources()
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resources' });
    });
  });

router.get('/project_resources', (req, res) => {
    Projects.getAllProjectResources()
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resources' });
    });
  });
  
router.get('/tasks', (req, res) => {
    Projects.findTasks()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
  });

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Projects.get(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get project' });
    });
  });

  router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
  
    Projects.getProjectTasks(id)
    .then(list => {
      if (list) {
        res.json(list);
      } else {
        res.status(404).json({ message: 'Could not find tasks for given project id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get task list' });
    });
  });


  router.get('/:id/resources', (req, res) => {
    const { id } = req.params;
  
    Projects.getProjectResources(id)
    .then(list => {
      if (list) {
        res.json(list);
      } else {
        res.status(404).json({ message: 'Could not find resources for given project id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resource list' });
    });
  });

  router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the project',
      });
    });
  });

  router.post('/:id/tasks', (req, res) => {
    const data = { ...req.body, project_id: req.params.id };
    Projects.insertTask(data)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log("Error adding task.", err);
        res.status(500).json({ message: "Error adding tasks to project" });
      });
  });

  router.post('/:id/resources', (req, res) => {
    const data = { ...req.body, project_id: req.params.id };
    Projects.insertResource(data)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log("Error inserting resource.", err);
        res.status(500).json({ message: "Error inserting resource to project" });
      });
  });

  router.post('/resources', (req, res) => {
    const data = { ...req.body};
    Projects.addResource(data)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log("Error adding resource to database.", err);
        res.status(500).json({ message: "Error adding resource to database" });
      });
  });

  router.delete('/:id', (req, res) =>  {
    Projects.remove(req.params.id)
    .then(project => {
      if (project.length == 0) {
        res.status(500).json({
          message: "No Project Found"
        });
      } else {
        res.status(200).json({
          message: "Project deleted"
        });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the Project',
      });
    });
  });

  router.delete('/tasks/:id', (req, res) =>  {
    Projects.removeTask(req.params.id)
    .then(task => {
      if (task.length == 0) {
        res.status(500).json({
          message: "No Task Found"
        });
      } else {
        res.status(200).json({
          message: "Task deleted"
        });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the Task',
      });
    });
  });

  router.delete('/project_resources/:id', (req, res) =>  {
    Projects.removeResourcefromProj(req.params.id)
    .then(resource => {
      if (resource.length == 0) {
        res.status(500).json({
          message: "No Resource Found"
        });
      } else {
        res.status(200).json({
          message: "Resource deleted"
        });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the Resource from project',
      });
    });
  });

  router.delete('/resources/:id', (req, res) =>  {
    Projects.removeResource(req.params.id)
    .then(resource => {
      if (resource.length == 0) {
        res.status(500).json({
          message: "No Resource Found"
        });
      } else {
        res.status(200).json({
          message: "Resource deleted"
        });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the Resource from project',
      });
    });
  });

  //PUT Methods

  router.put('/:id', (req, res) =>  {
    const changes = req.body;
    Projects.update(req.params.id,changes)
    .then(() => {
      if (!changes.projectname || !changes.description) {
        res.status(400).json({ errorMessage: "Missing Data" });
      } else {
        res.status(200).json({ message: `Project updated.` });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the project',
      });
    });
  })

  router.put('/tasks/:id', (req, res) =>  {
    const changes = req.body;
    Projects.updateTask(req.params.id,changes)
    .then(() => {
      if (!changes.description) {
        res.status(400).json({ errorMessage: "Missing Data" });
      } else {
        res.status(200).json({ message: `Project updated.` });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the project',
      });
    });
  })


module.exports = router;