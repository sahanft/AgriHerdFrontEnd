let currentPage = "dashboard";
      let sidebarOpen = true;

      // Initialize
      document.addEventListener("DOMContentLoaded", function () {
        showPage("dashboard");
        setupMobileMenu();
      });

      // Page navigation
      function showPage(pageName) {
        // Hide all pages
        const pages = document.querySelectorAll(".page-content");
        pages.forEach((page) => page.classList.add("hidden"));

        // Show selected page
        document.getElementById(pageName + "-page").classList.remove("hidden");

        // Update page title
        const titles = {
          dashboard: "Dashboard",
          animals: "Animals",
          employees: "Employees",
        };
        document.getElementById("page-title").textContent = titles[pageName];

        // Update active nav item
        const navItems = document.querySelectorAll(".nav-item");
        navItems.forEach((item) => {
          item.classList.remove("bg-dark-green-700", "border-dark-green-400");
          item.classList.add("border-transparent");
        });

        const activeItem = document.querySelector(`[data-page="${pageName}"]`);
        if (activeItem) {
          activeItem.classList.add(
            "bg-dark-green-700",
            "border-dark-green-400"
          );
          activeItem.classList.remove("border-transparent");
        }

        currentPage = pageName;
      }

      // Mobile menu functionality
      function setupMobileMenu() {
        const mobileMenuBtn = document.getElementById("mobile-menu-btn");
        const sidebar = document.getElementById("sidebar");
        const mainContent = document.getElementById("main-content");

        mobileMenuBtn.addEventListener("click", function () {
          sidebarOpen = !sidebarOpen;

          if (window.innerWidth < 768) {
            if (sidebarOpen) {
              sidebar.classList.remove("-translate-x-full");
              mainContent.classList.remove("ml-0");
              mainContent.classList.add("ml-64");
            } else {
              sidebar.classList.add("-translate-x-full");
              mainContent.classList.add("ml-0");
              mainContent.classList.remove("ml-64");
            }
          }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener("click", function (e) {
          if (
            window.innerWidth < 768 &&
            sidebarOpen &&
            !sidebar.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)
          ) {
            sidebarOpen = false;
            sidebar.classList.add("-translate-x-full");
            mainContent.classList.add("ml-0");
            mainContent.classList.remove("ml-64");
          }
        });

        // Handle responsive behavior
        window.addEventListener("resize", function () {
          if (window.innerWidth >= 768) {
            sidebar.classList.remove("-translate-x-full");
            mainContent.classList.remove("ml-0");
            mainContent.classList.add("ml-64");
          } else if (!sidebarOpen) {
            sidebar.classList.add("-translate-x-full");
            mainContent.classList.add("ml-0");
            mainContent.classList.remove("ml-64");
          }
        });

        // Initialize mobile state
        if (window.innerWidth < 768) {
          sidebarOpen = false;
          sidebar.classList.add("-translate-x-full");
          mainContent.classList.add("ml-0");
          mainContent.classList.remove("ml-64");
        }
      }

      // Add some interactive behavior to buttons
      document.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON" && !e.target.id) {
          e.target.style.transform = "scale(0.95)";
          setTimeout(() => {
            e.target.style.transform = "scale(1)";
          }, 150);
        }
      });
