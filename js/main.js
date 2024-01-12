// Display current year dynamically
function updateYear() {
  let dateElement = document.getElementById("date");

  if (dateElement) {
    dateElement.innerText = new Date().getFullYear();
  } else {
    console.error("Error: Element with ID 'date' not found in the document.");
  }
}

updateYear();
