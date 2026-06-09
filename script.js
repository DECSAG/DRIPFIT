// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = {};

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Add to cart
        cartCount[productName] = (cartCount[productName] || 0) + 1;
        
        // Visual feedback
        this.textContent = 'Added! ✓';
        this.style.background = '#28a745';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '';
        }, 2000);
        
        // Update cart display
        updateCart();
    });
});

// Update cart display
function updateCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const totalItems = Object.values(cartCount).reduce((a, b) => a + b, 0);
    cartIcon.textContent = `🛒 Cart (${totalItems})`;
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});