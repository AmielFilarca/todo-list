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

// create project
projects.push(defaultProject("All Todos"));
projects.push(project("Project 1"));
projects.push(project("Project 2"));
projects.push(project("Project 3"));

// add todo to project
projects[1].addTodo(
  todo("Project 1 Todo 1", "Description", "Due Date", "Priority")
);
projects[1].addTodo(
  todo("Project 1 Todo 2", "Description", "Due Date", "Priority")
);
projects[3].addTodo(
  todo("Project 3 Todo 1", "Description", "Due Date", "Priority")
);

export { projects, project, todo };
