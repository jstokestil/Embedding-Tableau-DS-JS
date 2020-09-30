// Single line comments

/*
Multi-line
Comments
*/

//Constants and Lets
const vizContainer = document.getElementById("vizContainer");
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const options = {
  device: "desktop",
  height: 800,
  width: 1000,
};
let viz;
//Button constants
const hideViz = document.getElementById("hideViz");
const showViz = document.getElementById("showViz");
const central = document.getElementById("Central");
const north = document.getElementById("North");
const south = document.getElementById("South");
const revertBtn = document.getElementById("All");

// function for initiating the viz
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

// Defining when to run the function
document.addEventListener("DOMContentLoaded", initViz);

// Function to hide viz
function vizHide() {
  console.log("viz hiding");
  viz.hide();
}

hideViz.addEventListener("click", vizHide);

// Function to show viz
function vizShow() {
  console.log("viz showing");
  viz.show();
}

showViz.addEventListener("click", vizShow);

// Function for filtering Region

function filterRegion(value) {
  const sheetFilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");

  console.log(sheetFilter);

  //First parameter = field in data source

  sheetFilter.applyFilterAsync(
    "Region",
    value,
    tableau.FilterUpdateType.REPLACE
  );
}

// Loop through filters to obtain the Value

document.querySelectorAll(".filter").forEach((button) => {
  console.log(button);
  button.addEventListener("click", (e) => filterRegion(e.target.value));
});

// Function to return to all filter

function filterAll() {
  const sheetFilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");

  sheetFilter.clearFilterAsync("Region");
}

revertBtn.addEventListener("click", filterAll);

/*
function filterAll() {
    viz.revertAllAsync();
  }
  
  revertBtn.addEventListener("click", filterAll);
  */
