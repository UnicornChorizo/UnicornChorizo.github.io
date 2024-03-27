document.addEventListener('DOMContentLoaded', function() {
    const dishImages = document.querySelectorAll('.dish-image');

    dishImages.forEach(image => {
        image.addEventListener('click', function() {
            // Reset previously enlarged image and hide descriptions
            dishImages.forEach(img => {
                img.classList.remove('enlarged');
                img.style.transform = 'scale(1)'; // Reset scale
            });

            // Enlarge clicked image
            this.classList.add('enlarged');
            this.style.transform = 'scale(1.1)'; // Enlarge image

            // Display corresponding description
            const altText = this.getAttribute('alt');
            const price = this.dataset.price;
            const description = this.dataset.description;

            // Get the corresponding description element within the same article
            const dishDescription = this.closest('article').querySelector('.dish-description');

            // Update the description content
            const descriptionHTML = `<p><strong>${altText}</strong>: ${description} - Price: ${price}</p>`;
            dishDescription.innerHTML = descriptionHTML;

            // Show the description block
            dishDescription.classList.remove('hidden');
        });
    });
});
