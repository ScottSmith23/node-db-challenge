module.exports = {
    projectToBody,
    taskToBody,
    resourceToBody
  };
  
  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  function projectToBody(project) {
    const result = {
      ...project,
      completed: intToBoolean(project.completed),
    };
  
    if (project.actions) {
      result.actions = project.actions.map(action => ({
        ...action,
        completed: intToBoolean(action.completed),
      }));
    }
  
    return result;
  }
  
  function taskToBody(action) {
    return {
      ...action,
      completed: intToBoolean(action.completed),
    };
  }

  function resourceToBody(resource) {
    return {
      ...resource,
    };
  }
  