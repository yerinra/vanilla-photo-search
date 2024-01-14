import add from "@/add";

function component() {
  const element = document.createElement("div");

  element.innerHTML = add(1, 1);

  return element;
}

document.body.appendChild(component());
