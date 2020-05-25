// Array of Projects
let projects = [];
// Factory function of Project
const project = (projectName, projectTodos) => {
  projectName, (projectTodos = []);
  const addTodo = (todo) => {
    projectTodos.push(todo);
  };
  return { projectName, projectTodos, addTodo };
};
// Factory function of Todo
const todo = (title, description, dueDate, priority) => {
  title, description, dueDate, priority;
  return { title, description, dueDate, priority };
};

// create project
projects.push(project("Project 1 Name"));
projects.push(project("Project 2 Name"));
projects.push(project("Project 3 Name"));
console.table(projects);

function renderProjects() {
  // Remove existing elements
  const myNode = document.querySelector(".projects-radio-group");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  // Render default project
  const dInput = document.createElement("input");
  dInput.setAttribute("type", "radio");
  dInput.setAttribute("id", "projectChoice0");
  dInput.setAttribute("name", "project");
  dInput.setAttribute("value", "All Todos");
  dInput.checked = true;
  const dLabel = document.createElement("label");
  dLabel.setAttribute("for", "projectChoice0");
  dLabel.textContent = "All Todos";
  const dDiv = document.createElement("div");
  dDiv.appendChild(dInput);
  dDiv.appendChild(dLabel);
  myNode.appendChild(dDiv);
  // Render all projects
  projects.forEach((p) => {
    const pInput = document.createElement("input");
    pInput.setAttribute("type", "radio");
    pInput.setAttribute("id", `projectChoice${projects.indexOf(p) + 1}`);
    pInput.setAttribute("name", "project");
    pInput.setAttribute("value", p.projectName);
    const pLabel = document.createElement("label");
    pLabel.setAttribute("for", `projectChoice${projects.indexOf(p) + 1}`);
    pLabel.textContent = p.projectName;
    const pDiv = document.createElement("div");
    pDiv.appendChild(pInput);
    pDiv.appendChild(pLabel);
    myNode.appendChild(pDiv);
  });
}

renderProjects();
renderProjects();
renderProjects();

// add todo to project
projects[0].addTodo(
  todo(
    "Todo 1 Title",
    "Todo 1 Description",
    "Todo 1 Due Date",
    "Todo 1 Priority"
  )
);
console.table(projects[0].projectTodos);
