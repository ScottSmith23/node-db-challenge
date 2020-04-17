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



module.exports = router;