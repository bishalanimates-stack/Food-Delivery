document.addEventListener('DOMContentLoaded', () => {
    // 0. Intro Animation
    const body = document.body;
    let introActive = body.classList.contains('intro-active');

    if (introActive) {
        let isOpening = false;
        
        const openWebsite = () => {
            if (isOpening) return;
            isOpening = true;
            
            // Explicitly lock scroll during the transition to prevent momentum scrolling
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
            
            body.classList.remove('intro-active');
            introActive = false;
            
            // Unlock scroll once the 2.5s transition finishes
            setTimeout(() => {
                body.style.overflow = '';
                body.style.height = '';
            }, 2500);
        };

        // Open on scroll intent (harder to scroll)
        let scrollAccumulator = 0;
        window.addEventListener('wheel', (e) => {
            if (introActive && e.deltaY > 0) {
                scrollAccumulator += e.deltaY;
                if (scrollAccumulator > 300) { // Require significant scroll to trigger
                    openWebsite();
                }
            }
        }, { passive: true });
        
        let touchStartY = 0;
        window.addEventListener('touchstart', (e) => {
            if (introActive) touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        window.addEventListener('touchmove', (e) => {
            if (introActive && touchStartY) {
                if (touchStartY - e.touches[0].clientY > 150) { // Require longer swipe
                    openWebsite();
                }
            }
        }, { passive: true });

        // Auto open after 25 seconds
        setTimeout(() => {
            if (introActive) openWebsite();
        }, 25000);
    }

    // 1. Navbar Active State
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') !== '#' && currentLocation.includes(link.getAttribute('href'))) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // Global references for carousels
    const foodCarousel = document.getElementById('food-carousel');
    const restaurantCarousel = document.getElementById('restaurant-carousel');
    let activeCarousel = foodCarousel;

    // 2. Carousel Scrolling
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (prevBtn && nextBtn) {
        // Calculate scroll amount based on card width + gap
        const scrollAmount = 350; // card width (320px) + gap (30px)

        nextBtn.addEventListener('click', () => {
            if (activeCarousel) {
                activeCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });

        prevBtn.addEventListener('click', () => {
             if (activeCarousel) {
                activeCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
             }
        });

        const handleScroll = (carouselObj) => {
            if (carouselObj !== activeCarousel) return; // Only process active carousel
            
            if (carouselObj.scrollLeft <= 0) {
                prevBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'flex';
            }

            if (carouselObj.scrollLeft + carouselObj.clientWidth >= carouselObj.scrollWidth - 10) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'flex';
            }
        };

        if (foodCarousel) foodCarousel.addEventListener('scroll', () => handleScroll(foodCarousel));
        if (restaurantCarousel) restaurantCarousel.addEventListener('scroll', () => handleScroll(restaurantCarousel));
        
        // Initial setup for buttons
        prevBtn.style.display = 'none'; // Initially at start
    }

    // 3. Password Toggle
    const togglePasswordIcons = document.querySelectorAll('.password-toggle');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // The input is right before the icon in the markup
            const input = icon.previousElementSibling;
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // 4. Tabs Toggle (Foods / Restaurants)
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked
            tab.classList.add('active');
            
            // Switch carousels
            if (tab.dataset.tab === 'foods') {
                if (foodCarousel) foodCarousel.style.display = 'flex';
                if (restaurantCarousel) restaurantCarousel.style.display = 'none';
                activeCarousel = foodCarousel;
            } else if (tab.dataset.tab === 'restaurants') {
                if (foodCarousel) foodCarousel.style.display = 'none';
                if (restaurantCarousel) restaurantCarousel.style.display = 'flex';
                activeCarousel = restaurantCarousel;
            }
            
            // Reset scroll positions and evaluate button visibility
            if (activeCarousel && prevBtn && nextBtn) {
                activeCarousel.scrollLeft = 0;
                prevBtn.style.display = 'none'; // Start
                
                // Hide next if fewer items than view can hold
                if (activeCarousel.scrollWidth <= activeCarousel.clientWidth) {
                    nextBtn.style.display = 'none';
                } else {
                    nextBtn.style.display = 'flex';
                }
            }
        });
    });

    // 5. Form Validation & Submission (Mock)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form ID to know which message to show
            const formId = form.id;
            let successMessage = "Form submitted successfully!";
            
            if (formId === 'loginForm') {
                successMessage = "Logged in successfully!";
            } else if (formId === 'signupForm') {
                const pass = document.getElementById('signupPassword').value;
                const confirm = document.getElementById('signupConfirm').value;
                
                if (pass !== confirm) {
                    alert('Passwords do not match!');
                    return;
                }
                successMessage = "Account created successfully!";
            } else if (formId === 'contactForm') {
                successMessage = "Message sent successfully! We will get back to you soon.";
            }

            // Simple mock loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(successMessage);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                if (formId !== 'loginForm' && formId !== 'signupForm') {
                     form.reset();
                }
            }, 1000);
        });
    });
});
