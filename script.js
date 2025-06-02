let projects = JSON.parse(localStorage.getItem("projects")) || [];

function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjects() {
  const container = document.getElementById("projects");
  container.innerHTML = "";

  projects.forEach((project, i) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";

    const title = document.createElement("h3");
    title.textContent = project.name;
    projectDiv.appendChild(title);

    // Tarefas
    project.tasks.forEach((task, j) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task" + (task.done ? " done" : "");

      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.onchange = () => {
        task.done = checkbox.checked;
        saveProjects();
        renderProjects();
      };

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(task.text));

      taskDiv.appendChild(label);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.onclick = () => {
        project.tasks.splice(j, 1);
        saveProjects();
        renderProjects();
      };

      taskDiv.appendChild(deleteBtn);
      projectDiv.appendChild(taskDiv);
    });

    // Novo input de tarefa
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.placeholder = "Nova tarefa";
    taskInput.onkeypress = (e) => {
      if (e.key === "Enter" && taskInput.value.trim() !== "") {
        project.tasks.push({ text: taskInput.value.trim(), done: false });
        taskInput.value = "";
        saveProjects();
        renderProjects();
      }
    };
    projectDiv.appendChild(taskInput);

    // Botão remover projeto
    const removeProjectBtn = document.createElement("button");
    removeProjectBtn.textContent = "🗑️ Excluir Projeto";
    removeProjectBtn.onclick = () => {
      projects.splice(i, 1);
      saveProjects();
      renderProjects();
    };
    projectDiv.appendChild(removeProjectBtn);

    container.appendChild(projectDiv);
  });
}

function addProject() {
  const nameInput = document.getElementById("project-name");
  const name = nameInput.value.trim();
  if (!name) return;

  projects.push({ name, tasks: [] });
  nameInput.value = "";
  saveProjects();
  renderProjects();
}

// Inicia
renderProjects();