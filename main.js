document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("login-modal");
  const openLoginBtn = document.getElementById("open-login");
  const closeLoginBtn = document.getElementById("close-login");
  const loginForm = document.getElementById("login-form");
  const publicSite = document.getElementById("public-site");
  const dashboardView = document.getElementById("dashboard-view");
  const navbar = document.querySelector(".navbar");
  const logoutBtn = document.getElementById("logout-btn");

  // Open Modal
  openLoginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
  });

  // Close Modal
  closeLoginBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
  });

  // Close Modal on outside click
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
    }
  });

  // Handle Login Simulation
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginModal.style.display = "none";
    
    // Switch Views
    publicSite.classList.add("hidden");
    navbar.classList.add("hidden");
    dashboardView.classList.remove("hidden");
  });

  // Handle Logout
  logoutBtn.addEventListener("click", () => {
    dashboardView.classList.add("hidden");
    publicSite.classList.remove("hidden");
    navbar.classList.remove("hidden");
  });
});