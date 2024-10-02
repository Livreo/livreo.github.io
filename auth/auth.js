
document.addEventListener('DOMContentLoaded', function () {
  const roleSelect = document.getElementById('role');
  const vendeurFields = document.getElementById('vendeurFields');
  const livreurFields = document.getElementById('livreurFields');
  const allFields = document.getElementById('allFields');
  const signStep = document.getElementById('sign-step');
  const signupForm = document.getElementById('signupForm');
  const submitButton = document.querySelector('button[type="submit"]');

  let currentStep = 1;

  // Initialisation : n'affiche que le choix du rôle et met le bouton "Suivant"
  updateStepDisplay();

  roleSelect.addEventListener('change', function () {
    const selectedRole = roleSelect.value;

    if (selectedRole === "vendeur") {
      vendeurFields.style.display = 'block';
      livreurFields.style.display = 'none';
      currentStep = 2;
    } else if (selectedRole === "livreur") {
      livreurFields.style.display = 'block';
      vendeurFields.style.display = 'none';
      currentStep = 2;
    } else {
      vendeurFields.style.display = 'none';
      livreurFields.style.display = 'none';
      currentStep = 1;
    }

    updateStepDisplay();
  });

  submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Validation des champs à chaque étape avant de passer à la suivante
    if (currentStep === 2) {
      const roleSelected = roleSelect.value;
      const requiredFieldsFilled = validateStepTwoFields(roleSelected);

      if (requiredFieldsFilled) {
        // Passer à l'étape 3
        allFields.style.display = 'block';
        currentStep = 3;
        updateStepDisplay();
      } else {
        alert('Veuillez remplir tous les champs obligatoires.');
      }
    } else if (currentStep === 3) {
      // Validation finale des champs et enregistrement des données
      const roleSelected = roleSelect.value;
      const allInputsValid = validateStepThreeFields(roleSelected);

      if (allInputsValid) {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Vérifier la conformité des mots de passe
        if (password !== confirmPassword) {
          alert('Les mots de passe ne correspondent pas.');
          return;
        }

        const formData = new FormData(signupForm);
        const userData = {
          role: formData.get('role'),
          companyName: formData.get('companyName') || '',
          ifu: formData.get('ifu') || '',
          managerName: formData.get('managerName') || '',
          name: formData.get('name') || '',
          surname: formData.get('surname') || '',
          username: formData.get('username') || '',
          email: formData.get('email'),
          phone: formData.get('phone'),
          password: formData.get('password') // Sauvegarder le mot de passe
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        // Redirection selon le rôle
        if (userData.role === "livreur") {
          window.location.href = '../livreur/db-livreur.html';
        } else if (userData.role === "vendeur") {
          window.location.href = '../vendeur/db-vendeur.html';
        }
      } else {
        alert('Veuillez remplir tous les champs requis.');
      }
    }
  });

  function updateStepDisplay() {
    if (currentStep === 1) {
      signStep.textContent = 'Étape 1/3';
      submitButton.textContent = 'Suivant';
      submitButton.style.display = 'block';
    } else if (currentStep === 2) {
      signStep.textContent = 'Étape 2/3';
      submitButton.textContent = 'Suivant';
    } else if (currentStep === 3) {
      signStep.textContent = 'Étape 3/3';
      submitButton.textContent = "S'inscrire";
    }
  }

  // Fonction pour valider les champs obligatoires à l'étape 2
  function validateStepTwoFields(role) {
    let requiredFields = [];

    if (role === "vendeur") {
      requiredFields = ['companyName', 'managerName'];
    } else if (role === "livreur") {
      requiredFields = ['name', 'surname', 'username'];
    }

    return requiredFields.every(fieldId => {
      const field = document.getElementById(fieldId);
      return field && field.value.trim() !== '';
    });
  }

  // Fonction pour valider les champs obligatoires à l'étape 3
  function validateStepThreeFields(role) {
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');

    // Champs communs à vérifier
    if (emailField.value.trim() === '' || phoneField.value.trim() === '' || passwordField.value.trim() === '' || confirmPasswordField.value.trim() === '') {
      return false;
    }

    // Valider les champs spécifiques selon le rôle
    if (role === "vendeur") {
      const companyName = document.getElementById('companyName');
      const managerName = document.getElementById('managerName');
      return companyName.value.trim() !== '' && managerName.value.trim() !== '';
    } else if (role === "livreur") {
      const name = document.getElementById('name');
      const surname = document.getElementById('surname');
      const username = document.getElementById('username');
      return name.value.trim() !== '' && surname.value.trim() !== '' && username.value.trim() !== '';
    }

    return true;
  }
});

// Gestion des connexions
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const emailInput = document.getElementById('email').value.trim();
  const passwordInput = document.getElementById('password').value.trim();

  // Récupérer les données utilisateur stockées dans le localStorage
  const storedUserData = localStorage.getItem('userData');

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);

    // Afficher dans la console pour déboguer
    console.log('Données stockées:', userData);
    console.log('Email saisi:', emailInput);
    console.log('Mot de passe saisi:', passwordInput);

    // Vérifier que l'email et le mot de passe correspondent
    if (userData.email === emailInput && userData.password === passwordInput) {
      console.log('Connexion réussie !');
      if (userData.role === 'livreur') {
        window.location.href = '../livreur/db-livreur.html';
      } else if (userData.role === 'vendeur') {
        window.location.href = '../vendeur/db-vendeur.html';
      }
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  } else {
    alert('Aucun utilisateur trouvé.');
  }
});


// POPUP CONNEXION
document.addEventListener('DOMContentLoaded', function () {

  const loginPopup = document.getElementById('login-popup');
  const popupClose = document.getElementById('login-close');

  function LoginPop() {
    loginPopup.style.display = 'flex';
  }

  popupClose.addEventListener('click', function () {
    loginPopup.style.display = 'none';
  });

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('LoginPop') === 'true') {
    LoginPop();
  }
});


// MENU
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
    menuToggle.classList.toggle('x');
  });

  document.addEventListener('click', (event) => {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('show')) {
      menu.classList.remove('show');
      menuToggle.classList.remove('x');
    }
  });
});
