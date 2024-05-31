document.addEventListener("DOMContentLoaded", () => {
  showStep(1);

  const carCompanySelect = document.getElementById("carCompany");
  const carModelSelect = document.getElementById("carModel");

  const carModels = {
    Toyota: ["Camry", "Corolla", "Prius", "Highlander"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot"],
    Ford: ["Fiesta", "Focus", "Mustang", "Explorer"],
    BMW: ["X5", "3 Series", "5 Series", "7 Series"],
    Mercedes: ["C-Class", "E-Class", "S-Class", "GLA"],
  };

  carCompanySelect.addEventListener("change", function () {
    const selectedCompany = this.value;
    carModelSelect.innerHTML =
      '<option value="" disabled selected>Select your car model</option>'; // Reset car model options

    if (selectedCompany in carModels) {
      carModels[selectedCompany].forEach((model) => {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        carModelSelect.appendChild(option);
      });
    }
  });

  // Initialize Dropzone
  const dropzoneElement = document.querySelector("#dropzone");
  const dropzone = new Dropzone(dropzoneElement, {
    url: "/file-upload",
    autoProcessQueue: false,
    maxFiles: 1,
    acceptedFiles: "image/*,application/pdf",
  });

  dropzoneElement.addEventListener("dragenter", () => {
    dropzoneElement.classList.add("dz-drag-hover");
  });

  dropzoneElement.addEventListener("dragleave", () => {
    dropzoneElement.classList.remove("dz-drag-hover");
  });

  dropzoneElement.addEventListener("drop", () => {
    dropzoneElement.classList.remove("dz-drag-hover");
  });

  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      if (dropzone.getQueuedFiles().length > 0) {
        dropzone.processQueue();
        dropzone.on("queuecomplete", function () {
          alert("Form submitted!");
          // Handle form submission
        });
      } else {
        alert("Please upload a file.");
      }
    });
});

function showStep(step) {
  const steps = document.querySelectorAll(".step");
  steps.forEach((stepElement, index) => {
    if (index === step - 1) {
      stepElement.classList.add("active");
    } else {
      stepElement.classList.remove("active");
    }
  });
}

function nextStep() {
  showStep(2);
}

function prevStep() {
  showStep(1);
}
