// Array of Projects
let projects = [];
// Factory function for the default project
const defaultProject = (projectName, status) => {
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
projects.push(project("Project 1 Name"));
projects.push(project("Project 2 Name"));
projects.push(project("Project 3 Name"));

function renderProjects() {
  // Remove existing elements
  const myNode = document.querySelector(".projects-radio-group");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  // Render all projects
  projects.forEach((p) => {
    const pInput = document.createElement("input");
    pInput.setAttribute("type", "radio");
    pInput.setAttribute("id", `projectIndex${projects.indexOf(p)}`);
    pInput.setAttribute("name", "project");
    pInput.setAttribute("value", p.projectName);
    pInput.setAttribute("data-index", projects.indexOf(p));
    pInput.addEventListener("change", () => {
      renderTodos();
    });
    if (projects.indexOf(p) === 0) {
      pInput.checked = true;
    }
    const pLabel = document.createElement("label");
    pLabel.setAttribute("for", `projectIndex${projects.indexOf(p)}`);
    pLabel.textContent = p.projectName;
    const pDiv = document.createElement("div");
    pDiv.appendChild(pInput);
    pDiv.appendChild(pLabel);
    myNode.appendChild(pDiv);
  });
}

renderProjects();

// add todo to project
projects[1].addTodo(
  todo("Project 1 Todo 1", "Todo Description", "Todo Due Date", "Todo Priority")
);
projects[1].addTodo(
  todo("Project 1 Todo 2", "Todo Description", "Todo Due Date", "Todo Priority")
);
projects[3].addTodo(
  todo("Project 3 Todo 1", "Todo Description", "Todo Due Date", "Todo Priority")
);

function renderTodos() {
  const myNode = document.querySelector(".todo-list");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  const index = document.querySelector(
    'input[type="radio"][name="project"]:checked'
  ).dataset.index;
  if (index == 0) {
    projects.forEach((p) => {
      const pIndex = projects.indexOf(p);
      p.projectTodos.forEach((t) => {
        const tInput = document.createElement("input");
        tInput.setAttribute("type", "checkbox");
        tInput.setAttribute(
          "id",
          `project${projects.indexOf(p)}todo${p.projectTodos.indexOf(t)}`
        );
        tInput.setAttribute("name", "todo");
        tInput.setAttribute(
          "data-index",
          projects[pIndex].projectTodos.indexOf(t)
        );
        t.status ? (tInput.checked = true) : (tInput.status = false);
        tInput.addEventListener("change", () => {
          t.status = tInput.checked;
        });
        const tLabel = document.createElement("label");
        tLabel.setAttribute(
          "for",
          `project${projects.indexOf(p)}todo${p.projectTodos.indexOf(t)}`
        );
        tLabel.textContent = t.title;
        const tDiv = document.createElement("div");
        tDiv.appendChild(tInput);
        tDiv.appendChild(tLabel);
        myNode.appendChild(tDiv);
      });
    });
  } else {
    projects[index].projectTodos.forEach((t) => {
      const tInput = document.createElement("input");
      tInput.setAttribute("type", "checkbox");
      tInput.setAttribute(
        "id",
        `todoIndex${projects[index].projectTodos.indexOf(t)}`
      );
      tInput.setAttribute("name", "todo");
      tInput.setAttribute(
        "data-index",
        projects[index].projectTodos.indexOf(t)
      );
      t.status ? (tInput.checked = true) : (tInput.status = false);
      tInput.addEventListener("change", () => {
        t.status = tInput.checked;
      });
      const tLabel = document.createElement("label");
      tLabel.setAttribute(
        "for",
        `todoIndex${projects[index].projectTodos.indexOf(t)}`
      );
      tLabel.textContent = t.title;
      const tDiv = document.createElement("div");
      tDiv.appendChild(tInput);
      tDiv.appendChild(tLabel);
      myNode.appendChild(tDiv);
    });
  }
}

renderTodos();
