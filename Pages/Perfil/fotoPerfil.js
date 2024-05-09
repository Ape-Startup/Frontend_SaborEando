function updatePhotoPreview(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const image = document.getElementById('foto-preview');
        image.src = e.target.result;

        // Armazenar a nova foto de perfil localmente
        localStorage.setItem('perfilPhoto', e.target.result);
    };
    
    reader.readAsDataURL(file);
}

// Função para trocar a foto de perfil
function changeProfilePhoto() {
    const input = document.getElementById('file-upload');
    if (input.files && input.files[0]) {
        const file = input.files[0];
        updatePhotoPreview(file);
    }
}

document.getElementById('file-upload').addEventListener('change', changeProfilePhoto);

// carrega foto do perfil
const storedPhoto = localStorage.getItem('perfilPhoto');
if (storedPhoto) {
    document.getElementById('foto-preview').src = storedPhoto;
}