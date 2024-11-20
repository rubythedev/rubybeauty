// Function to load and initialize the gallery
function loadPhotoGallery() {
    const galleryContainer = document.querySelector(".gallery-container");
    const totalImages = 14; // Adjust this number based on your folder
    const imagePaths = [];

    // Populate image paths
    for (let i = 1; i <= totalImages; i++) {
        imagePaths.push(`images/gallery/image_${i}.png`);
    }

    // Shuffle the images
    imagePaths.sort(() => Math.random() - 0.5);

    // Initialize the carousel with three images
    const displayedImages = imagePaths.slice(0, 3);

    // Clear any existing images before appending new ones
    galleryContainer.innerHTML = '';

    displayedImages.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Gallery Image ${index + 1}`;
        img.classList.add("gallery-image");
        if (index === 1) img.classList.add("center"); // Middle image
        else if (index === 0) img.classList.add("left"); // Left image
        else img.classList.add("right"); // Right image
        galleryContainer.appendChild(img);
    });

    // Start the image cycling process
    startGalleryCarousel(imagePaths, galleryContainer);
}

// Function to cycle images
function startGalleryCarousel(imagePaths, galleryContainer) {
    let index = 0; // Keep track of the current image index

    setInterval(() => {
        index = (index + 1) % imagePaths.length;

        // Get all the currently displayed images
        const images = galleryContainer.querySelectorAll(".gallery-image");
        const nextIndex = (index + 2) % imagePaths.length;

        // Update the image sources and CSS classes for positions
        images[0].src = imagePaths[index];
        images[1].src = imagePaths[(index + 1) % imagePaths.length];
        images[2].src = imagePaths[nextIndex];

        images[0].className = "gallery-image left";
        images[1].className = "gallery-image center";
        images[2].className = "gallery-image right";
    }, 3000); // Change images every 3 seconds
}


// Initialize the gallery on DOMContentLoaded
document.addEventListener("DOMContentLoaded", loadPhotoGallery);




// Function to load gallery images dynamically and use lazy loading for service sections
function loadGalleryImages() {
    const services = document.querySelectorAll(".service"); // Get all services sections

    services.forEach(service => {
        const folder = service.getAttribute("data-folder"); // Get the folder name (soft_glam, full_glam, etc.)
        const galleryContainer = service.querySelector(".service-gallery"); // Find the gallery container inside the service section

        console.log(`Loading images for ${folder}...`); // Debug log

        // Create and append the first image dynamically with lazy loading
        const firstImage = document.createElement("img");
        const imgPath = `images/services/${folder}/${folder}_1.png`; // Construct image path for the first image
        firstImage.src = imgPath;
        firstImage.alt = `${folder} Image 1`; // Alt text for the first image
        firstImage.classList.add("gallery-image");
        firstImage.loading = "lazy"; // Enable lazy loading
        galleryContainer.appendChild(firstImage); // Append the first image to the gallery container

        // Preload images for smoother transitions
        preloadImages(folder);
    });

    // Start image cycling after images are loaded
    startImageCycling();
}

// Function to preload images for smooth transitions
function preloadImages(folder) {
    const totalImages = 3; // Assuming there are 3 images per service
    for (let i = 2; i <= totalImages; i++) {
        const img = new Image();
        img.src = `images/services/${folder}/${folder}_${i}.png`;
        img.loading = "lazy"; // Preload with lazy loading
    }
}

// Function to cycle through images in the gallery
function startImageCycling() {
    const galleries = document.querySelectorAll(".service-gallery");

    galleries.forEach(gallery => {
        let index = 1; // Start from the second image
        const folder = gallery.closest(".service").getAttribute("data-folder"); // Get the folder name
        const totalImages = 3; // Assuming there are 3 images per service

        setInterval(() => {
            const currentImage = gallery.querySelector(".gallery-image"); // Get the current image
            const nextImage = document.createElement("img");
            const nextImagePath = `images/services/${folder}/${folder}_${(index + 1)}.png`; // Path for the next image

            nextImage.src = nextImagePath;
            nextImage.alt = `${folder} Image ${(index + 1)}`;
            nextImage.classList.add("gallery-image");
            nextImage.loading = "lazy"; // Enable lazy loading for the next image

            // Fade out the current image and fade in the new image
            currentImage.classList.add("fade-out");
            nextImage.classList.add("fade-in");

            // Replace the current image with the new one after the fade-out
            currentImage.replaceWith(nextImage);

            // Remove the fade-out class after the transition
            setTimeout(() => {
                currentImage.classList.remove("fade-out");
            }, 1000); // Wait for 1 second (transition duration) before removing the class

            index = (index + 1) % totalImages; // Increment index and wrap around after the last image
        }, 6000); // Change image every 6 seconds
    });
}

// Initialize EmailJS
(function () {
    emailjs.init("geminibeauty2002!"); // Replace with your user ID
})();

// Handling form submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const userName = event.target.user_name.value;
    const userEmail = event.target.user_email.value;
    const message = event.target.message.value;

    emailjs.send("geminibeauty2002!", "template_fqeqcpd", {
        user_name: userName,
        user_email: userEmail,
        message: message,
    })
    .then(
        () => showResponseMessage("Message sent successfully!", true),
        () => showResponseMessage("Oops! Something went wrong. Please try again.", false)
    );

    document.getElementById("contact-form").reset(); // Reset the form
});

// Function to show response messages
function showResponseMessage(message, isSuccess) {
    const responseMessage = document.getElementById("response-message");
    responseMessage.innerText = message;
    responseMessage.style.backgroundColor = isSuccess ? "#d4edda" : "#f8d7da";
    responseMessage.style.color = isSuccess ? "#155724" : "#721c24";
    responseMessage.style.opacity = 0;

    setTimeout(() => {
        responseMessage.style.transition = "opacity 1s ease-in-out";
        responseMessage.style.opacity = 1; // Fade in effect
    }, 50);
}

// Add fade-in effect for elements
window.addEventListener("load", () => {
    document.querySelectorAll(".fade-in").forEach(element => {
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.transition = "opacity 1s ease-in-out";
            element.style.opacity = 1;
        }, 200);
    });
});

// Initialize the photo gallery and service galleries
document.addEventListener("DOMContentLoaded", () => {
    loadPhotoGallery();
    loadGalleryImages();
});
