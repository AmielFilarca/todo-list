import { projects, project, todo } from "./data";

function renderProjects() {
  // Remove existing elements before rendering
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
    // Select default project on render
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

function renderTodos() {
  // Remove existing elements before rendering
  const myNode = document.querySelector(".todo-list");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  // Get index of selected project
  const index = document.querySelector(
    'input[type="radio"][name="project"]:checked'
  ).dataset.index;
  // Add todo button
  const addTodoBtn = document.createElement("button");
  addTodoBtn.classList.add("add-button", "add-todo");
  addTodoBtn.textContent = "+ Add Todo";
  const btnDiv = document.querySelector(".todo-add");
  while (btnDiv.firstChild) {
    btnDiv.removeChild(btnDiv.lastChild);
  }
  btnDiv.appendChild(addTodoBtn);
  if (index == 0) {
    // Index of default project
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
    addTodoBtn.classList.add("disabled-btn");
  } else {
    // User's projects
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
    addTodoBtn.classList.remove("disabled-btn");
    addTodoBtn.addEventListener("click", addTodoBtnOnClick);
  }
}

const addProjectBtn = document.querySelector(".add-project");
addProjectBtn.addEventListener("click", () => {
  projects.push(project(`Project ${projects.length}`));
  renderProjects();
  // Select new project
  const radioBtn = document.getElementById(
    `projectIndex${projects.length - 1}`
  );
  radioBtn.checked = true;
  renderTodos();
});

function addTodoBtnOnClick() {
  const index = document.querySelector(
    'input[type="radio"][name="project"]:checked'
  ).dataset.index;
  if (index != 0) {
    projects[index].addTodo(
      todo(
        `Project ${index} Todo ${projects[index].projectTodos.length + 1}`,
        "Description",
        "Due Date",
        "Priority"
      )
    );
    renderTodos();
  }
}

function onLoad() {
  renderProjects();
  renderTodos();
}

export { onLoad };
