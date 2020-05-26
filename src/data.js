// Array of Projects
let projects = [];

// Factory function for the default project
const defaultProject = (projectName, projectTodos, status) => {
  projectName, (projectTodos = []), (status = false);
  return { projectName, projectTodos, status };
};

// Factory function for projects
const project = (projectName, projectTodos, status) => {
  projectName, (projectTodos = []), (status = false);
  const addTodo = (todo) => {
    projectTodos.push(todo);
  };
  return { projectName, projectTodos, status, addTodo };
};

// Factory function of Todo
const todo = (title, description, dueDate, priority, status) => {
  title, description, dueDate, priority, (status = false);
  return { title, description, dueDate, priority, status };
};

// Create default project
projects.push(defaultProject("All Todos"));

export { projects, project, todo };
