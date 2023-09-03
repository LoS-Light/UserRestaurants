
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', event => {
        img.src = '/images/unavailable.jpg';
    });
});