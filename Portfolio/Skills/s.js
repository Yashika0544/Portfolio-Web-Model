function showModal() {
    document.getElementById('overlay').style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
});