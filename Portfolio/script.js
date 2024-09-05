// JavaScript for draggable sliding functionality
const carouselWrapper = document.querySelector('.carousel-wrapper');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID;
let currentIndex = 0;

// Function to set position by translating the carousel
function setPositionByIndex() {
    currentTranslate = currentIndex * -100 / 3; // Assuming 3 slides are visible at a time
    carouselWrapper.style.transform = `translateX(${currentTranslate}%)`;
}

// Function to start dragging
function touchStart(index) {
    return function(event) {
        currentIndex = index;
        startPosition = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        carouselWrapper.style.cursor = 'grabbing';
    }
}

// Function to stop dragging
function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - previousTranslate;

    if (movedBy < -100 / 3 && currentIndex < 2) { // Slide right
        currentIndex++;
    }

    if (movedBy > 100 / 3 && currentIndex > 0) { // Slide left
        currentIndex--;
    }

    setPositionByIndex();
    carouselWrapper.style.cursor = 'grab';
}

// Function to move the carousel during dragging
function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = previousTranslate + currentPosition - startPosition;
    }
}

// Utility function to get mouse or touch position
function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Animation function for smooth dragging
function animation() {
    carouselWrapper.style.transform = `translateX(${currentTranslate}%)`;
    if (isDragging) requestAnimationFrame(animation);
}

// Add event listeners for touch and mouse events
carouselWrapper.addEventListener('mousedown', touchStart(currentIndex));
carouselWrapper.addEventListener('mouseup', touchEnd);
carouselWrapper.addEventListener('mouseleave', touchEnd);
carouselWrapper.addEventListener('mousemove', touchMove);

carouselWrapper.addEventListener('touchstart', touchStart(currentIndex));
carouselWrapper.addEventListener('touchend', touchEnd);
carouselWrapper.addEventListener('touchmove', touchMove);
