'use strict';

// Modal Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

if (modal && overlay && btnCloseModal && btnsOpenModal.length > 0) {
  const openModal = function (e) {
    e.preventDefault();
    console.log("✅ Modal Opened!");
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    console.log("❌ Modal Closed!");
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// Tabs for operations
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".operations__tab");
  const contents = document.querySelectorAll(".operations__content");

  if (tabs.length > 0 && contents.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabNumber = this.getAttribute("data-tab");

        tabs.forEach((btn) => btn.classList.remove("operations__tab--active"));
        contents.forEach((content) => content.classList.remove("operations__content--active"));

        this.classList.add("operations__tab--active");
        const activeContent = document.querySelector(`.operations__content--${tabNumber}`);
        if (activeContent) activeContent.classList.add("operations__content--active");
      });
    });
  }
});

// Savings Account Section
const createSavingsPanel = () => {
  const savingsPanel = document.querySelector('.savings-panel');
  if (!savingsPanel) return;

  savingsPanel.innerHTML = `
    <div class="savings-container">
      <div class="savings-text">
        <h2>The only Savings Account you will ever need</h2>
        <p>With <b>iMobile</b> and <b>Internet Banking</b>, manage your account <b>Anytime, Anywhere.</b></p>
      </div>
      <div class="savings-form">
        <h3>Savings Account Opening at Your Doorstep</h3>
        <form id="registerForm">
          <input type="text" id="name" placeholder="Full Name" required>
          <input type="text" id="email" placeholder="Email" required>
          <input type="password" id="password" placeholder="Password" required>
          <button type="submit" class="btn">Open Account</button>
        </form>
      </div>
    </div>
  `;
};

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn--show-modal").addEventListener("click", function () {
      document.getElementById("savingsPanel").scrollIntoView({ behavior: "smooth" });
  });
});

// 📌 **User Registration**
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Account created successfully!");
          localStorage.setItem("userId", data.userId); // Store user ID
          window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
          alert(`❌ ${data.message || "Registration failed!"}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("⚠️ Something went wrong! Please try again.");
      }
    });
  }

  // 📌 **User Login**
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Login successful!");
          localStorage.setItem("token", data.token); // Save authentication token
          localStorage.setItem("userId", data.userId); // Save user ID
          window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
          alert(`❌ ${data.message || "Invalid credentials!"}`);
        }
      } catch (error) {
        console.error("Login Error:", error);
        alert("⚠️ Something went wrong! Please try again.");
      }
    });
  }
});

// 📌 **Logout Function**
function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  alert("✅ Logged out successfully!");
  window.location.href = "login.html";
}
