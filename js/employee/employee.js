getAllEmployee()

//   EmployeeForm Open
function openModal() {
  document.getElementById("employeeModal").classList.remove("hidden");
  document.getElementById("employeeModal").classList.add("flex");
}
function closeModal() {
  document.getElementById("employeeModal").classList.add("hidden");
  document.getElementById("employeeModal").classList.remove("flex");
}

// Preview Image before upload (for form usage)
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



  function getAllEmployee() {
    // Fetch employees from backend
  $.ajax({
    url: "http://localhost:8080/agriherd/api/v1/employee", 
    method: "GET",
    dataType: "json",
    success: function (employees) {
      let cardsContainer = $("#employeeCards");
      cardsContainer.empty(); // Clear old cards

      employees.forEach(emp => {
        // Extract initials for fallback avatar
        let initials = emp.fullName
          ? emp.fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
          : "NA";

        // ✅ FIX: Image is raw Base64, so prepend prefix
        let imageTag = "";
        if (emp.empImage && emp.empImage !== "") {
          imageTag = `<img src="data:image/jpeg;base64,${emp.empImage}"  
                        alt="${emp.fullName}"
                        class="w-12 h-12 rounded-full object-cover border border-gray-300" />`;
        } else {
          imageTag = `
            <div class="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold">
              ${initials}
            </div>`;
        }

        // Build card
        let card = `
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center space-x-4">
              ${imageTag}
              <div>
                <h4 class="font-semibold text-gray-900">ID: ${emp.empId}</h4>
                <p class="text-sm text-gray-800 font-semibold"> Name: ${emp.fullName}</p>
                <p class="text-sm text-gray-600">NIC: ${emp.nic}</p>
                <p class="text-sm text-gray-600">Role: ${emp.role}</p>
                <p class="text-sm text-gray-500">Email: ${emp.email}</p>
                <p class="text-sm text-gray-500">Mobile: ${emp.phoneNumber}</p>
                <p class="text-sm text-gray-500">Address: ${emp.address}</p>
                <p class="text-sm text-gray-500">Gender: ${emp.gender}</p>
                <p class="text-sm text-gray-500">Joined: ${emp.joinDate}</p>
                <p class="text-sm text-gray-500">Birthday: ${emp.bDay}</p>
              </div>
            </div>
            <button onclick="updateEmployee('${emp.empId}')"
        class="text-blue-600 hover:text-blue-800 p-1 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" 
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 4h2m-1 0v16m7-8H5" />
        </svg>
      </button>

      <!-- Delete button -->
      <button onclick="deleteEmployee('${emp.empId}')"
        class="text-red-600 hover:text-red-800 p-1 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" 
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
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
  }

  $(document).ready(function () {
  
});


// employee save funtion
$(document).ready(function () {
    $("form").on("submit", function (e) {
      e.preventDefault(); // prevent normal form submission

      let form = $(this)[0];
      let formData = new FormData(form); // capture all form inputs including file

      $.ajax({
        url: "http://localhost:8080/agriherd/api/v1/employee",
        method: "POST",
        data: formData,
        contentType: false,   // ❗ important for multipart
        processData: false,   // ❗ important for multipart
        success: function () {
          alert("✅ Employee saved successfully!");
          form.reset(); // clear form after success
        },
        error: function (xhr, status, error) {
          console.error("❌ Error saving employee:", error);
          alert("Error: " + xhr.responseText);
        }
      });
    });
  });
