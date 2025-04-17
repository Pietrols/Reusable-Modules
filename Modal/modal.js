const body = document.body;

// Function to create modal section
function createModal() {
  const modal = document.createElement("section");
  modal.classList.add("modal", "hidden");

  const flexDiv = createTopFlexRow();
  const contentDiv = createContent();
  const emailInput = createEmailInput();
  const submitButton = createSubmitButton();

  modal.appendChild(flexDiv);
  modal.appendChild(contentDiv);
  modal.appendChild(emailInput);
  modal.appendChild(submitButton);

  return modal;
}

// Function to create top flex row with image and close button
function createTopFlexRow() {
  const flexDiv = document.createElement("div");
  flexDiv.classList.add("flex");

  const img = createImage();
  const closeButton = createCloseButton();

  flexDiv.appendChild(img);
  flexDiv.appendChild(closeButton);

  return flexDiv;
}

// Function to create image
function createImage() {
  const img = document.createElement("img");
  img.src = "./images/20a32f9b-1a4e-4ab0-bbe0-fe090cffe514.svg";
  img.width = 50;
  img.height = 50;
  img.alt = "user";
  return img;
}

// Function to create close button
function createCloseButton() {
  const closeButton = document.createElement("button");
  closeButton.classList.add("btn-close");
  closeButton.textContent = "⨉";
  return closeButton;
}

// Function to create content (heading and paragraph)
function createContent() {
  const contentDiv = document.createElement("div");

  const heading = document.createElement("h3");
  heading.textContent = "stay in touch";

  const para = document.createElement("p");
  para.textContent = `This is a dummy newsletter form so don't bother trying to test it. Not
  that I expect you to, anyways. :)`;

  contentDiv.appendChild(heading);
  contentDiv.appendChild(para);

  return contentDiv;
}

// Function to create email input field
function createEmailInput() {
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.id = "email";
  emailInput.placeholder = "pietrols@gmail.com";
  return emailInput;
}

// Function to create submit button
function createSubmitButton() {
  const submitButton = document.createElement("button");
  submitButton.classList.add("btn");
  submitButton.textContent = "Submit";
  return submitButton;
}

// Function to create overlay
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay", "hidden");
  return overlay;
}

// Function to create open modal button
function createOpenModalButton() {
  const openButton = document.createElement("button");
  openButton.classList.add("btn", "btn-open");
  openButton.textContent = "Open Modal";
  return openButton;
}

// Function to open modal
function openModal(modal, overlay) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

// Function to close modal
function closeModal(modal, overlay) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

// Assemble modal structure
const modal = createModal();
const overlay = createOverlay();
const openModalBtn = createOpenModalButton();

// Append everything to the body
body.appendChild(modal);
body.appendChild(overlay);
body.appendChild(openModalBtn);

// Add event listeners
openModalBtn.addEventListener("click", () => openModal(modal, overlay));

const closeModalBtn = document.querySelector(".btn-close");
closeModalBtn.addEventListener("click", () => closeModal(modal, overlay));

overlay.addEventListener("click", () => closeModal(modal, overlay));
