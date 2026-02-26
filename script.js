// Script for handling avatar click and image upload

document.addEventListener('DOMContentLoaded', function () {
    const avatar = document.getElementById('avatar');
    const fileInput = document.getElementById('avatarUpload');

    // Handle avatar click to trigger file input
    avatar.addEventListener('click', function () {
        fileInput.click();
    });

    // Handle file upload
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatar.src = e.target.result; // Update avatar image
            };
            reader.readAsDataURL(file);
        }
    });
});