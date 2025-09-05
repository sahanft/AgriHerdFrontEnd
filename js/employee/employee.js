//   EmployeeForm Open
function openModal() {
  document.getElementById("employeeModal").classList.remove("hidden");
  document.getElementById("employeeModal").classList.add("flex");
}
function closeModal() {
  document.getElementById("employeeModal").classList.add("hidden");
  document.getElementById("employeeModal").classList.remove("flex");
}

// Preview Image
function previewImage(input, previewId) {
    const file = input.files[0];
    const preview = document.getElementById(previewId);
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
    }
}

$(document).ready(function () {
    // Fetch employees from backend
    $.ajax({
      url: "http://localhost:8080/agriherd/api/v1/employee", // <-- adjust if your endpoint is different
      method: "GET",
      dataType: "json",
      success: function (employees) {
        let cardsContainer = $("#employeeCards");
        cardsContainer.empty(); // Clear old cards

        employees.forEach(emp => {
          // Extract initials for avatar circle
          let initials = emp.fullName
            ? emp.fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
            : "NA";

          // Build card
          let card = `
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold">
                  ${initials}
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">${emp.empId}</h4>
                  <h4 class="font-semibold text-gray-900">${emp.nic}</h4>
                  <p class="text-sm text-gray-600">${emp.fullName}</p>
                  <p class="text-sm text-gray-500">${emp.role}</p>
                  <p class="text-sm text-gray-500">${emp.email}</p>
                  <p class="text-sm text-gray-500">${emp.phoneNumber}</p>
                  <p class="text-sm text-gray-500">${emp.address}</p>
                  <p class="text-sm text-gray-500">${emp.gender}</p>
                  <p class="text-sm text-gray-500">${emp.joinDate}</p>
                  <p class="text-sm text-gray-500">${emp.bDay}</p>
                  <p class="text-sm text-gray-500">${emp.empImage}</p>
                </div>
              </div>
            </div>
          `;

          // Append to container
          cardsContainer.append(card);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching employees:", error);
      }
    });
  });