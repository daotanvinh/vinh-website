// Online avatar upload functionality

function uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Avatar uploaded successfully!');
            loadAvatar(); // Call function to load avatar
        } else {
            console.error('Upload failed:', data.message);
        }
    })
    .catch(error => console.error('Error uploading avatar:', error));
}

function loadAvatar() {
    fetch('/api/get-avatar')
        .then(response => response.json())
        .then(data => {
            if (data.avatarUrl) {
                const avatarImg = document.getElementById('avatar');
                avatarImg.src = data.avatarUrl;
            }
        })
        .catch(error => console.error('Error loading avatar:', error));
}

// Example usage: Assuming there's an input element to select a file
document.getElementById('avatarInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        uploadAvatar(file);
    }
});