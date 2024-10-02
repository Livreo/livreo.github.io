// POPUP
document.addEventListener('DOMContentLoaded', function () {

    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popup-close');

    function showPopup() {
        popup.style.display = 'flex';
    }

    popupClose.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showPopup') === 'true') {
        showPopup();
    }
});


// Defilement
document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelectorAll('.feature');
    let currentIndex = 0;

    // Affiche la fonctionnalité active et cache les autres
    function showFeature(index) {
        features.forEach((feature, i) => {
            if (i === index) {
                feature.classList.add('active');
            } else {
                feature.classList.remove('active');
            }
        });
    }

    // Change la fonctionnalité toutes les secondes
    function startFeatureRotation() {
        showFeature(currentIndex);
        currentIndex = (currentIndex + 1) % features.length; // Boucle
    }

    // Démarre la rotation
    startFeatureRotation();
    setInterval(startFeatureRotation, 3000); // Change toutes les 3 secondes
});



