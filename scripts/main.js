const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_OFFSET = 1; // Adjust for 1-based month index
const MIN_MONTH = 1; // Minimum valid month
const MAX_MONTH = 12; // Maximum valid month
const BASE = 10; // Base for number parsing (decimal)

const ORIGIN_YEAR = 2018;
const CURRENT_YEAR = new Date().getFullYear();

function calcYearsOfExperience() {
  const yearsExperience = "yearsExperience";
  const experience = document?.getElementById(yearsExperience);
  const currentYearsOfExperience = CURRENT_YEAR - ORIGIN_YEAR;
  experience.textContent = currentYearsOfExperience;
}

function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}$/; // Matches YYYY-MM format
  return regex.test(dateString);
}

function formatDate(dateString) {
  if (!dateString) {
    return "PRESENT";
  }

  if (!isValidDateFormat(dateString)) {
    console.error("Invalid date format. Expected 'YYYY-MM'.");
  }

  const [year, month] = dateString.split("-");

  const monthIndex = parseInt(month, BASE); // Parse month as base 10
  if (monthIndex < MIN_MONTH || monthIndex > MAX_MONTH) {
    console.error("Invalid month value. Must be between 01 and 12.");
  }

  const monthName = monthNames[monthIndex - MONTH_OFFSET];
  return `${monthName} ${year}`;
}

// Helper function to fetch JSON data
async function fetchData(file) {
  try {
    const response = await fetch(`/assets/data/${file}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to render Tech Stack cards
function renderTechStack(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card--techstack");
    card.textContent = item.title;
    container.appendChild(card);
  });
}

// Function to render Professional Experience cards
function renderProfessionalExperience(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card--work-history");

    const position = document.createElement("strong");
    position.textContent = `${item.position} | ${item.company}`;
    card.appendChild(position);

    const dates = document.createElement("p");
    dates.innerHTML = `
      <time datetime="${item.startDate}">${formatDate(item.startDate)}</time> - 
      <time datetime="${item.endDate}">${formatDate(item.endDate)}</time>`;
    card.appendChild(dates);

    const responsibilitiesList = document.createElement("ul");
    item.responsibilities.forEach((responsibility) => {
      const listItem = document.createElement("li");
      listItem.textContent = responsibility;
      responsibilitiesList.appendChild(listItem);
    });
    card.appendChild(responsibilitiesList);

    container.appendChild(card);
  });
}

// Function to render Projects cards
function renderProjects(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card--projects");

    const title = document.createElement("span");
    title.classList.add("card--heading");
    title.textContent = item.title;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = item.description;
    card.appendChild(description);

    const featuresList = document.createElement("ul");
    item.features.forEach((feature) => {
      const listItem = document.createElement("li");
      listItem.textContent = feature;
      featuresList.appendChild(listItem);
    });
    card.appendChild(featuresList);

    const techStack = document.createElement("p");
    techStack.textContent = `Built with: ${item.techStack.join(", ")}`;
    card.appendChild(techStack);

    const link = document.createElement("a");
    link.href = item.link;
    link.textContent = "View Project";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    card.appendChild(link);

    container.appendChild(card);
  });
}

// Function to render Certifications cards
function renderCertifications(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card--techstack");

    const link = document.createElement("a");
    link.href = item.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.title;

    card.appendChild(link);
    container.appendChild(card);
  });
}

calcYearsOfExperience();

// Main function to fetch and render all sections
async function renderAllSections() {
  // Fetch data
  const techStackData = await fetchData("stack.json");
  const experienceData = await fetchData("experience.json");
  const projectsData = await fetchData("projects.json");
  const certificationsData = await fetchData("certifications.json");

  // Render sections
  renderTechStack(techStackData, "techStackContainer");
  renderProfessionalExperience(experienceData, "experienceContainer");
  renderProjects(projectsData, "projectsContainer");
  renderCertifications(certificationsData, "certificationsContainer");
}

// Call the main function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", renderAllSections);
