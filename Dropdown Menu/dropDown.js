// dropdown.js

function createDropdownButton({ id, label, iconClass }) {
  const button = document.createElement("button");
  button.classList.add("btn");
  button.id = id;
  button.innerHTML = `${label} <i class="${iconClass}" id="arrow"></i>`;
  return button;
}

function createDropdownMenu({ id, items }) {
  const menu = document.createElement("div");
  menu.classList.add("dropdown");
  menu.id = id;

  items.forEach(({ href, icon, text }) => {
    const a = document.createElement("a");
    a.href = href;

    const i = document.createElement("i");
    i.className = icon;

    a.appendChild(i);
    a.append(text);
    menu.appendChild(a);
  });

  return menu;
}

function setupDropdownInteraction(buttonId, menuId, arrowId) {
  const button = document.getElementById(buttonId);
  const menu = document.getElementById(menuId);
  const arrow = document.getElementById(arrowId);

  const toggleDropdown = () => {
    menu.classList.toggle("show");
    arrow.classList.toggle("arrow");
  };

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // Optional: close dropdown when clicking outside
  document.addEventListener("click", () => {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      arrow.classList.remove("arrow");
    }
  });
}

// Usage
const dropdownItems = [
  { href: "#create", icon: "bx bx-plus-circle", text: "Create New" },
  { href: "#draft", icon: "bx bx-book", text: "All Drafts" },
  { href: "#move", icon: "bx bx-folder", text: "Move To" },
  { href: "#profile", icon: "bx bx-user", text: "Profile Settings" },
  { href: "#settings", icon: "bx bx-cog", text: "Settings" },
];

const dropdownBtn = createDropdownButton({
  id: "btn",
  label: "Dropdown",
  iconClass: "bx bx-chevron-down",
});

const dropdownMenu = createDropdownMenu({
  id: "dropdown",
  items: dropdownItems,
});

document.body.appendChild(dropdownBtn);
document.body.appendChild(dropdownMenu);

setupDropdownInteraction("btn", "dropdown", "arrow");
