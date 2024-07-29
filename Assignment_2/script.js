// Get references to the container and button elements
const container = document.querySelector(".content");
const button = document.querySelector("#regenerate-btn");

// Base URL for generating random images
const baseURL = "https://picsum.photos/";

// Set the total number of images based on screen size
let totalImages = window.innerWidth <= 768 ? 10 : 9; // 10 images for mobile, 9 for larger screens

// Array to store unique image IDs
let imageIds = [];

// Add event listener to regenerate button to generate new images
button.addEventListener("click", generateImages);

// Add event listener to window resize to adjust total images and regenerate
window.addEventListener("resize", () => {
    totalImages = window.innerWidth <= 768 ? 10 : 9;
    generateImages();
});

// Function to generate images
function generateImages() {
    // Clear existing images
    container.innerHTML = '';
    imageIds = [];

    // Generate unique images
    while (imageIds.length < totalImages) {
        const id = randomNumber();
        if (!imageIds.includes(id)) {
            imageIds.push(id);

            // Create image container element
            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";
            
            // Create image element
            const img = document.createElement("img");
            img.src = `${baseURL}${id}`;
            img.className = 'reveal'; // Add reveal class for scroll effect
            
            // Create download button element
            const downloadBtn = document.createElement("button");
            downloadBtn.className = "download-btn";
            downloadBtn.innerHTML = "<i class='fas fa-download'></i>"; // Font Awesome icon

            // Add download functionality to button
            downloadBtn.onclick = () => downloadImage(img.src);

            // Append image and download button to container
            imageContainer.appendChild(img);
            imageContainer.appendChild(downloadBtn);
            container.appendChild(imageContainer);
        }
    }
    revealOnScroll(); // Trigger reveal on scroll for new images
}

// Function to generate random number for image ID
function randomNumber() {
    return Math.floor(Math.random() * 1000) + 300; // Adjust range as needed
}

// Function to download image
function downloadImage(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop(); // Use image URL to name the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Generate initial set of images
generateImages();

// Function to add scroll to reveal effect
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    window.addEventListener('scroll', () => {
        for (let i = 0; i < reveals.length; i++) {
            const revealTop = reveals[i].getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('visible');
            } else {
                reveals[i].classList.remove('visible');
            }
        }
    });

    // Initial check to reveal images already in view
    for (let i = 0; i < reveals.length; i++) {
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('visible');
        } else {
            reveals[i].classList.remove('visible');
        }
    }
}
