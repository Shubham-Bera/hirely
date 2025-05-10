(function () {
  'use strict';
  window.addEventListener('load', function () {
    var forms = document.getElementsByTagName('form');
    Array.prototype.forEach.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

const designationOptions = {
  tech: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer'],
  "non-tech": ['HR Executive', 'Sales Manager', 'Content Writer', 'Business Analyst']
};
let techSkills = window.techSkills || [];
let nonTechSkills = window.nonTechSkills || [];

  const categorySelect = document.getElementById('category');
  const skillsSelect = document.getElementById('skills');

  function updateSkillsDropdown(category) {
    skillsSelect.innerHTML = ''; // Clear previous skills

    let skillsArray = [];

    if (category === 'tech') {
      skillsArray = techSkills;
    } else if (category === 'non-tech') {
      skillsArray = nonTechSkills;
    }

    skillsArray.forEach(skill => {
      const option = document.createElement('option');
      option.value = skill;
      option.textContent = skill;
      skillsSelect.appendChild(option);
    });
  }

  // Initial population (if needed)
  categorySelect.addEventListener('change', function () {
    updateSkillsDropdown(this.value);
  });
document.getElementById('category')?.addEventListener('change', function () {
  const category = this.value;
  const designationSelect = document.getElementById('designation');
  designationSelect.innerHTML = '<option value="">Select Designation</option>';

  if (designationOptions[category]) {
    designationOptions[category].forEach(role => {
      const option = document.createElement('option');
      option.value = role;
      option.textContent = role;
      designationSelect.appendChild(option);
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const roleInput = document.getElementById("loginRoleInput");
  const roleSwitch = document.getElementById("loginRoleSwitch");
  const roleText = document.getElementById("loginRoleText");

  if (roleSwitch && roleInput && roleText) {
    roleSwitch.addEventListener("change", () => {
      if (roleSwitch.checked) {
        roleInput.value = "recruiter";
        roleText.innerHTML = `Logging in as <strong>Recruiter</strong>`;
      } else {
        roleInput.value = "jobseeker";
        roleText.innerHTML = `Logging in as <strong>Job Seeker</strong>`;
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const roleSwitchreg = document.getElementById("roleSwitch");
  const userRole = document.getElementById("userRole");
  const jobSeekerLabel = document.getElementById("jobSeekerLabel");
  const recruiterLabel = document.getElementById("recruiterLabel");

  if (roleSwitchreg && userRole && jobSeekerLabel && recruiterLabel) {
    roleSwitchreg.addEventListener("change", () => {
      if (roleSwitchreg.checked) {
        userRole.value = "recruiter";
        recruiterLabel.classList.add("active");
        jobSeekerLabel.classList.remove("active");
      } else {
        userRole.value = "jobseeker";
        jobSeekerLabel.classList.add("active");
        recruiterLabel.classList.remove("active");
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
    const features = [
        "Smart Job Search Filters",
        "Resume Builder & Templates",
        "One-Click Quick Apply",
        "Instant Interview Notifications",
        "Application Status Tracking",
        "Verified Company Profiles",
        "AI-Powered Job Matching",
        "Schedule Interviews Seamlessly"
    ];

    const featureText = document.getElementById("feature-text");
    let index = 0;

    function showNextFeature() {
        featureText.style.opacity = 0;

        setTimeout(() => {
            featureText.textContent = features[index];
            featureText.style.opacity = 1;
            index = (index + 1) % features.length;
        }, 500);
    }

    // Initial display
    showNextFeature();
    setInterval(showNextFeature, 3000);
});




