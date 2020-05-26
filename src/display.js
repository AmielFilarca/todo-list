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
    pInput.addEventListener("change", (e) => {
      const projectDivs = document.querySelectorAll("div[data-index]");
      projectDivs.forEach((div) => {
        div.classList.remove("active-project");
      });
      const div = document.querySelector(
        `div[data-index='div${e.target.dataset.index}']`
      );
      div.classList.add("active-project");
      const editBtns = document.querySelectorAll(".edit-button");
      editBtns.forEach((btn) => {
        btn.classList.add("hidden");
      });
      renderTodos();
      if (
        document.querySelector(
          `.edit-button[data-index='${e.target.dataset.index}']`
        )
      ) {
        const activeEditBtn = document.querySelector(
          `.edit-button[data-index='${e.target.dataset.index}']`
        );
        activeEditBtn.classList.remove("hidden");
      }
    });
    // Select default project on render
    if (projects.indexOf(p) === 0) {
      pInput.checked = true;
    }
    const pLabel = document.createElement("label");
    pLabel.setAttribute("for", `projectIndex${projects.indexOf(p)}`);
    pLabel.textContent = p.projectName;
    const pDiv = document.createElement("div");
    pDiv.setAttribute("data-index", `div${projects.indexOf(p)}`);
    pDiv.appendChild(pInput);
    pDiv.appendChild(pLabel);
    // Add edit button
    if (projects.indexOf(p) != 0) {
      const editBtn = document.createElement("button");
      editBtn.setAttribute("class", "edit-button");
      editBtn.setAttribute("data-index", projects.indexOf(p));
      editBtn.textContent = "edit";
      editBtn.addEventListener("click", (e) => {
        editBtn.classList.add("hidden");
        const currentLabel = document.querySelector(
          `label[for='projectIndex${projects.indexOf(p)}']`
        );
        const currentText = currentLabel.textContent;
        currentLabel.classList.add("hidden");
        const textInput = document.createElement("input");
        textInput.setAttribute("type", "text");
        textInput.setAttribute("placeholder", currentText);
        textInput.addEventListener("focusout", () => {
          if (textInput.value.trim() != "") {
            p.projectName = textInput.value;
          }
          renderProjects();
          const radioBtn = document.getElementById(
            `projectIndex${projects.indexOf(p)}`
          );
          radioBtn.checked = true;
          const defaultDiv = document.querySelector(`div[data-index='div0']`);
          defaultDiv.classList.remove("active-project");
          const newDiv = document.querySelector(
            `div[data-index='div${projects.indexOf(p)}']`
          );
          newDiv.classList.add("active-project");
          const activeEditBtn = document.querySelector(
            `.edit-button[data-index='${e.target.dataset.index}']`
          );
          activeEditBtn.classList.remove("hidden");
        });
        const div = document.querySelector(
          `div[data-index='div${projects.indexOf(p)}']`
        );
        div.appendChild(textInput);
        textInput.focus();
      });
      pDiv.appendChild(editBtn);
    }
    myNode.appendChild(pDiv);
  });
  const editBtns = document.querySelectorAll(".edit-button");
  editBtns.forEach((btn) => {
    btn.classList.add("hidden");
  });
  const defaultDiv = document.querySelector(`div[data-index='div0']`);
  defaultDiv.classList.add("active-project");
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
  const projectDivs = document.querySelectorAll("div[data-index]");
  projectDivs.forEach((div) => {
    div.classList.remove("active-project");
  });
  const div = document.querySelector(
    `div[data-index='div${projects.length - 1}']`
  );
  div.classList.add("active-project");
  const activeEditBtn = document.querySelector(
    `.edit-button[data-index='${projects.length - 1}']`
  );
  activeEditBtn.classList.remove("hidden");
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
