// Wrap everything in an IIFE to create a private scope
(function () {
  "use strict"; // Enable strict mode

  // --- 1. DOM Element References ---
  // Store references in a single object for clarity and easy access
  const elements = {
    form: null,
    formName: null,
    email: null,
    country: null,
    postalCode: null,
    phone: null,
    password: null,
    rePassword: null,
    inputsToValidate: [], // Array to hold all inputs needing validation
  };

  // Function to fetch and store DOM elements
  function fetchElements() {
    elements.form = document.querySelector("form");
    // Basic check if form exists
    if (!elements.form) {
      console.error("Form element not found!");
      return false;
    }
    elements.formName = document.getElementById("name");
    elements.email = document.getElementById("email");
    elements.country = document.getElementById("country");
    elements.postalCode = document.getElementById("postalCode");
    elements.phone = document.getElementById("phone");
    elements.password = document.getElementById("password");
    elements.rePassword = document.getElementById("passwordConfirm");

    // Populate the array of inputs to validate during submit
    elements.inputsToValidate = [
      elements.formName,
      elements.email,
      elements.country,
      elements.postalCode,
      elements.phone,
      elements.password,
      elements.rePassword,
    ].filter((el) => el !== null); // Filter out nulls if any elements weren't found

    // Check if essential elements were found
    if (!elements.password || !elements.rePassword) {
      console.error("Password fields not found!");
      return false;
    }
    return true; // Indicate success
  }

  // --- 2. Utility Functions ---

  function getErrorElement(input) {
    // Use nullish coalescing for robustness, though getElementById returns null if not found
    return document.getElementById(input?.id + "-error") ?? null;
  }

  function showError(input, message = "") {
    const errorElement = getErrorElement(input);
    if (!errorElement) return;

    let errorMessage = message;
    // Moved detailed message generation based on validity elsewhere (into handlers)
    // This function now primarily focuses on displaying the provided message.
    if (!errorMessage && input && input.validity) {
      // Basic fallback if no message provided
      if (input.validity.valueMissing) errorMessage = "This field is required.";
      // Add other simple fallbacks if desired, but handlers are more specific now
      else errorMessage = "Invalid input."; // Generic fallback
    }

    errorElement.innerHTML = errorMessage; // Use innerHTML for <br> tags
    input?.classList.add("invalid");
  }

  function clearError(input) {
    const errorElement = getErrorElement(input);
    if (errorElement) {
      errorElement.textContent = ""; // Clear the message
    }
    input?.classList.remove("invalid");
  }

  function doPasswordsMatch() {
    // Ensure elements exist before accessing value
    return elements.password?.value === elements.rePassword?.value;
  }

  // --- 3. Specific Validation Logic ---

  // Generates an array of specific error messages for the password
  function getPasswordErrorMessages(value) {
    let messages = [];
    if (!value) {
      // Handle empty value explicitly if needed
      messages.push("Password is required.");
      return messages; // Stop checking other rules if empty
    }

    // Check length requirement
    if (value.length < 8) {
      messages.push("Must be at least 8 characters long.");
    }
    // Check for lowercase letter
    if (!/[a-z]/.test(value)) {
      messages.push("Requires at least one lowercase letter [a-z].");
    }
    // Check for uppercase letter
    if (!/[A-Z]/.test(value)) {
      messages.push("Requires at least one uppercase letter [A-Z].");
    }
    // Check for number
    if (!/\d/.test(value)) {
      messages.push("Requires at least one number [0-9].");
    }
    // Check for symbol (IF you add it to the pattern)
    // if (!/[!@#$%^&*]/.test(value)) {
    //     messages.push("Requires at least one symbol.");
    // }
    return messages;
  }

  // Generates standard error message based on validity state
  function getStandardErrorMessage(input) {
    if (input.validity.valueMissing) {
      return "This field is required.";
    } else if (input.validity.tooShort) {
      return `Minimum length is ${input.minLength} characters.`;
    } else if (input.validity.tooLong) {
      return `Maximum length is ${input.maxLength} characters.`;
    } else if (input.validity.typeMismatch) {
      return input.type === "email"
        ? "Please enter a valid email address."
        : "Please use the correct format.";
    } else if (input.validity.patternMismatch) {
      return "Please match the requested format.";
    }
    return "Invalid input."; // Fallback
  }

  // --- 4. Event Handlers ---

  // Handler for generic inputs (name, email, country, etc.)
  function handleGenericInput(event) {
    const input = event.target;
    if (input.validity.valid) {
      clearError(input);
    } else {
      // Use the specific function to get standard messages
      showError(input, getStandardErrorMessage(input));
    }
  }

  // Handler for the main password input field
  function handlePasswordInput(event) {
    const input = event.target;
    const value = input.value;
    const validity = input.validity;

    if (validity.valid) {
      clearError(input);
    } else {
      const errorMessages = getPasswordErrorMessages(value);
      if (errorMessages.length > 0) {
        showError(input, errorMessages.join("<br>"));
      } else if (validity.valueMissing) {
        showError(input, "Password is required."); // Handle required case
      } else {
        // Fallback if pattern is complex and specific checks don't cover it
        showError(input, input.title || "Password format is invalid.");
      }
    }

    // Re-validate confirmation field whenever password changes
    if (elements.rePassword?.value) {
      // Check if confirm field has a value
      if (doPasswordsMatch()) {
        clearError(elements.rePassword);
        elements.rePassword.setCustomValidity("");
      } else {
        showError(elements.rePassword, "Passwords do not match.");
        elements.rePassword.setCustomValidity("Passwords do not match.");
      }
    }
  }

  // Handler for the password confirmation input field
  function handleConfirmPasswordInput(event) {
    const input = event.target;

    if (input.validity.valueMissing && input.required) {
      showError(input, "Please confirm your password.");
      input.setCustomValidity("Please confirm your password.");
    } else if (doPasswordsMatch()) {
      clearError(input);
      input.setCustomValidity("");
    } else {
      // Only show mismatch error if the field isn't empty
      if (input.value !== "") {
        showError(input, "Passwords do not match.");
        input.setCustomValidity("Passwords do not match.");
      } else {
        // If empty but not required, clear error and validity
        clearError(input);
        input.setCustomValidity("");
      }
    }
  }

  // Handler for the form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default submission in all cases initially
    let isFormValid = true;

    // Iterate over inputs that need validation
    elements.inputsToValidate.forEach((input) => {
      if (!input) return; // Skip if element wasn't found

      let isValidInput = input.checkValidity(); // Standard check first

      // Perform specific checks / generate specific messages for invalid fields

      if (input.id === elements.password?.id && !isValidInput) {
        const errorMessages = getPasswordErrorMessages(input.value);
        if (errorMessages.length > 0) {
          showError(input, errorMessages.join("<br>"));
        } else if (input.validity.valueMissing) {
          showError(input, "Password is required.");
        }
        // isValidInput remains false
      } else if (input.id === elements.rePassword?.id) {
        if (input.required && input.value === "") {
          isValidInput = false;
          showError(input, "Please confirm your password.");
        } else if (input.value !== "" && !doPasswordsMatch()) {
          isValidInput = false;
          showError(input, "Passwords do not match.");
          // Ensure custom validity is set for the checkValidity() call next time
          input.setCustomValidity("Passwords do not match.");
        } else if (input.value !== "" && doPasswordsMatch()) {
          // Matches or field is not empty and matches
          clearError(input);
          input.setCustomValidity("");
          isValidInput = true; // Explicitly mark valid for this check
        } else if (input.value === "" && !input.required) {
          // Empty but not required
          clearError(input);
          input.setCustomValidity("");
          isValidInput = true; // Valid
        } else if (input.value === "" && input.required) {
          // Handles case where required is true, value is empty, but checkValidity might have passed initially
          isValidInput = false;
          showError(input, "Please confirm your password.");
          input.setCustomValidity("Please confirm your password.");
        }
      }
      // For generic fields that failed standard checkValidity
      else if (!isValidInput) {
        showError(input, getStandardErrorMessage(input));
      }

      // Update overall form validity flag
      if (!isValidInput) {
        isFormValid = false;
      }
    }); // End forEach loop

    // Final action based on overall validity
    if (isFormValid) {
      console.log("Form Submitted Successfully!");
      alert("You have successfully created account.");
      // Optionally reset or submit the form programmatically
      // elements.form.reset();
      // elements.form.submit(); // This would bypass JS validation if uncommented carelessly
    } else {
      console.log("Form validation failed.");
      // Focus the first invalid field for better UX
      const firstInvalid = elements.form.querySelector(
        "input.invalid, input:invalid"
      );
      firstInvalid?.focus(); // Use optional chaining
    }
  }

  // --- 5. Attach Event Listeners ---
  function attachEventListeners() {
    // Attach listener to generic fields
    [
      elements.formName,
      elements.email,
      elements.country,
      elements.postalCode,
      elements.phone,
    ].forEach((input) => {
      input?.addEventListener("input", handleGenericInput); // Use optional chaining
    });

    // Attach listeners to password fields
    elements.password?.addEventListener("input", handlePasswordInput);
    elements.rePassword?.addEventListener("input", handleConfirmPasswordInput);

    // Attach listener to form submit event
    elements.form?.addEventListener("submit", handleSubmit);
  }

  // --- 6. Initialization ---
  function init() {
    // Fetch elements first
    if (!fetchElements()) {
      // Stop initialization if essential elements (like form) are missing
      return;
    }
    // Attach all the event listeners
    attachEventListeners();
    console.log("Form validation initialized.");
  }

  // --- Run Initialization ---
  // Ensure the DOM is fully loaded before running the initialization logic
  document.addEventListener("DOMContentLoaded", init);
})(); // Immediately invoke the function expression
