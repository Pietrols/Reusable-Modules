# 🧩 Reusable UI Modules – Dropdown, Modal, Form Validation, and Image Carousel

This project contains four vanilla JavaScript modules built in a fully modular and reusable fashion. These components are generated entirely using the DOM API (no static HTML) and can be easily plugged into any web project with minimal configuration.

## 📁 Modules Overview

### 1. 🔽 Dropdown Menu

A clickable dropdown button that reveals a list of action links with icons. Perfect for navigation menus or action toolbars.

**Features:**

- Pure DOM-based element creation
- Icon support using Boxicons
- Toggleable dropdown state with arrow animation

**Usage:**

```javascript
import createDropdown from "./dropdown.js";
const dropdown = createDropdown();
document.body.appendChild(dropdown.button);
document.body.appendChild(dropdown.menu);
```

### 2. 💬 Modal Component

A modal popup with a user avatar, heading, paragraph, email input, and a submit button. Comes with an overlay and an open/close trigger.

**Features:**

- Fully modular structure
- Accessible form input
- Close via button or clicking outside
- Smooth open/close logic

**Usage:**

```javascript
import createModal from "./modal.js";
const { modal, overlay, openBtn } = createModal();
document.body.append(modal, overlay, openBtn);
```

### 3. ✓ Form Validation

A comprehensive form validation module using the Constraint Validation API that provides real-time feedback and custom error messages.

**Features:**

- HTML5 validation attributes (required, minlength, maxlength, pattern)
- Real-time validation feedback as users type
- Custom error messages for different validation states
- Visual indicators for valid/invalid fields
- Pattern validation with regular expressions

**Usage:**

```javascript
import { initFormValidation } from "./form-validation.js";

// Initialize validation on your form
initFormValidation("myForm", {
  customMessages: {
    valueMissing: "This field is required",
    patternMismatch: "Please use the correct format",
  },
});
```

### 4. 🖼️ Image Carousel

A responsive image slider with:

- Arrow navigation
- Dot indicators
- Auto-play every 5 seconds
- Pause on hover
- Swipe support (touchscreen friendly)

**Features:**

- Dynamic slide creation from an image array
- Auto-play with reset on interaction
- Swipe gesture support for mobile users
- Dot-based navigation with visual indicators

**Usage:**

```javascript
import createCarousel from "./carousel.js";
const carousel = createCarousel(imageArray); // Pass your image paths
document.querySelector(".container").appendChild(carousel);
```

## 🔧 Installation

No NPM or bundler needed. Just ensure you link each module file and have your assets (like images and icons) ready.

```html
<!-- Example icon support (for dropdown icons) -->
<link
  href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
  rel="stylesheet"
/>
```

## 📦 Folder Structure

```
/project-root
│
├── /js
│   ├── dropdown.js
│   ├── modal.js
│   ├── form-validation.js
│   └── carousel.js
│
├── /images
│   └── your-carousel-images.jpg
│
└── index.html
```

## ✅ To-Do (Optional Enhancements)

- Add keyboard accessibility for all components
- Allow dynamic dropdown item injection
- Add customizable props for modal texts
- Include light/dark theme toggle for carousel
- Extend form validation with custom validation logic

## 🧠 Author Notes

These UI components are built for learning purposes and rapid prototyping. They can be extended into a component library or used in real-world apps with enhancements like animation libraries, accessibility, and style customizations.
