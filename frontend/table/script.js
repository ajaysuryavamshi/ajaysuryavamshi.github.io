document.addEventListener("DOMContentLoaded", function () {
  fetch("reporter-data.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#dataTable tbody");

      data.forEach((item, index) => {
        let colorClass = "";
        if (item.validation_status.toLowerCase() === "pass") {
          colorClass = "table-success";
        } else if (item.validation_status.toLowerCase() === "fail") {
          colorClass = "table-danger";
        } else if (item.validation_status.toLowerCase() === "orchestration failure") {
          colorClass = "table-danger";
        } else if (item.validation_status.toLowerCase() === "activation error") {
          colorClass = "table-danger";
        } else if (item.validation_status.toLowerCase() === "pending") {
          colorClass = "table-secondary";
        } else {
          colorClass = "table-warning";
        }

        const link = `<a href="#" onclick="openNewTab('${item.order_number}')">${item.order_number}</a>`;
        const row = `<tr class="${colorClass}">
                              <th scope="row">${link}</th>
                              <td>${item.environment}</td>
                              <td>${item.channel}</td>
                              <td>${item.order_type}</td>
                              <td>${item.validation_status}</td>
                              <td>${item.validation_date}</td>
                          </tr>`;
        tableBody.innerHTML += row;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function openNewTab(id) {
  const urlWithQueryParam = `${window.location.href}?orderNumber=${id}`;
  window.open(urlWithQueryParam, "_blank");
}
