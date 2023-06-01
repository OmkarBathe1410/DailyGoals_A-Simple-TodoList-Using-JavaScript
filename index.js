const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const container = document.querySelector(".container");

const task = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];

showAllTasks();

function showAllTasks() {
  task.forEach((value, index) => {

    const div = document.createElement("div");
    div.setAttribute("class", "task");

    const innerDiv = document.createElement("div");
    const p = document.createElement("p");
    p.innerText = value.task_title;
    const span = document.createElement("span");
    span.innerText = value.task_description;
    innerDiv.append(p);
    innerDiv.append(span);
    div.append(innerDiv);

    const delBtn = document.createElement("button");
    const i = document.createElement("i");
    i.setAttribute("class", "fa fa-trash-o");
    delBtn.append(i);
    delBtn.addEventListener("click", () => {
      removeTask();
      task.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(task));
      showAllTasks();
    });
    div.append(delBtn);

    container.append(div);
  });
};

function removeTask() {
  task.forEach(() => {
    const div = document.querySelector(".task");
    div.remove();
  });
};

form.addEventListener("submit", (e) => {
  /*Prevents from reloading the page, which is the default behaviour when we submit a form. */
  e.preventDefault();
  removeTask();
  task.push({
    task_title: title.value,
    task_description: description.value,
  });

  localStorage.setItem("task", JSON.stringify(task));
  console.log(task);
  showAllTasks();
});