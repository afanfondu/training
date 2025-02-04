import "./style.css";

document.querySelector("#app").innerHTML = `
  <div class="container justify-content-center">
    <ul class="list-group">
      <li class="list-group-item" draggable="true">:: An item</li>
      <li class="list-group-item" draggable="true">:: A second item</li>
    </ul>
    <ul class="list-group">
      <li class="list-group-item" draggable="true">:: A third item</li>
    </ul>
  </div>
`;

const containers = document.querySelectorAll(".list-group");
const listItems = document.querySelectorAll(".list-group-item");

listItems.forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");

    const nextItem = [
      ...container.querySelectorAll(".list-group-item:not(.dragging)"),
    ].find((item) => {
      const { top, height } = item.getBoundingClientRect();
      return e.clientY <= top + height / 2;
    });

    if (nextItem) {
      container.insertBefore(draggingItem, nextItem);
    } else {
      container.appendChild(draggingItem);
    }
  });
});
