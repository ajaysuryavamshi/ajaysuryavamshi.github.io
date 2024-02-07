function showMoreOrHideFormSelects() {
  var hiddenFormSelects = document.getElementById("hiddenFormSelects");
  var showMoreBtn = document.getElementById("showMoreBtn");

  if (hiddenFormSelects.style.display === "flex") {
    hiddenFormSelects.style.display = "none";
    showMoreBtn.textContent = "Show more";
    resetFormSelectValues();
  } else {
    hiddenFormSelects.style.display = "flex";
    showMoreBtn.textContent = "Show less";
  }
}

function resetFormSelectValues() {
  var formSelects = document.querySelectorAll(".form-select");
  formSelects.forEach(function (select) {
    select.value = select.options[0].value;
  });
}

function submitForm() {
  console.log("Form submitted!");
}

// Assume ordersData is an array containing your JSON objects
// Function to fetch data from orders-data.json
async function fetchData() {
  try {
    const response = await fetch("./orders-data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Function to filter orders based on selected values
function filterOrders(ordersData, selectedValues) {
  return ordersData.filter((order) => {
    for (const key in selectedValues) {
      if (selectedValues[key] !== "All" && order[key] !== selectedValues[key]) {
        return false;
      }
    }
    return true;
  });
}

// Function to display orders in a responsive HTML table using Bootstrap
function displayOrders(filteredOrders, selectedRecords) {
  const tableContainer = document.getElementById("orderTableContainer");
  tableContainer.innerHTML = ""; // Clear previous content

  if (filteredOrders.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No matching orders found.";
    message.style.textAlign = "center"; // Align the message in the center

    tableContainer.style.display = "flex";
    tableContainer.style.alignItems = "center"; // Center vertically
    tableContainer.style.justifyContent = "center"; // Center horizontally

    tableContainer.appendChild(message);
    return;
  }

  // Determine the number of records to display
  const numRecords = Math.min(filteredOrders.length, selectedRecords);

  const table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-responsive"); // Add Bootstrap table classes, including responsive class

  // Create thead (header) element
  const thead = document.createElement("thead");
  table.appendChild(thead);

  // Create table header row with th elements
  const headerRow = thead.insertRow();
  const fieldsToInclude = [
    "environment", "purchase_type", "plan_name", "order_number", "customer_email",
    "order_status", "account_status", "insurance", "financing", "trade_in",
    "promotion", "referral", "wearable", "mdn_type"
  ];

  fieldsToInclude.forEach(fieldName => {
    const headerCell = document.createElement("th");
    headerCell.scope = "col";
    headerCell.textContent = fieldName;
    headerRow.appendChild(headerCell);
  });

  // Create tbody (body) element
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  // Create table rows based on the selected number of records
  for (let i = 0; i < numRecords; i++) {
    const row = tbody.insertRow();
    fieldsToInclude.forEach(fieldName => {
      const cell = row.insertCell();
      cell.textContent = filteredOrders[i][fieldName];
    });
  }

  tableContainer.appendChild(table);
  tableContainer.style.display = "block"; // Reset display property
}

// Event listener for the submit button
document.getElementById("submitBtn").addEventListener("click", async () => {
  // Fetch data when the button is clicked
  const ordersData = await fetchData();

  // Get selected values from the drop-downs
  const selectedValues = {
    environment: document.getElementById("environment").value,
    network_type: document.getElementById("networkType").value,
    purchase_type: document.getElementById("purchaseType").value,
    order_type: document.getElementById("orderType").value,
    plan_name: document.getElementById("planName").value,
    mdn_type: document.getElementById("mdnType").value,
    insurance: document.getElementById("insurance").value,
    financing: document.getElementById("financing").value,
    trade_in: document.getElementById("tradeIn").value,
    wearable: document.getElementById("wearable").value,
    promotion: document.getElementById("promotion").value,
    referral: document.getElementById("referral").value,
  };

  const records = document.getElementById("records").value;
  const filteredOrders = filterOrders(ordersData, selectedValues);
  displayOrders(filteredOrders, records);
});
