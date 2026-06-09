
document.addEventListener('DOMContentLoaded', () => {
    

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on navigation click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    function highlightActivePage() {
        const path = window.location.pathname;
        const pageName = path.substring(path.lastIndexOf('/') + 1);
        
        let found = false;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === pageName || (pageName === '' && href === 'index.html')) {
                link.classList.add('active');
                found = true;
            } else {
                link.classList.remove('active');
            }
        });
        
     
        if (!found && pageName === '') {
            const indexLink = Array.from(navLinks).find(l => l.getAttribute('href') === 'index.html');
            if (indexLink) indexLink.classList.add('active');
        }
    }
    highlightActivePage();

    
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const existingTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = existingTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            updateThemeIcon(targetTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon'; 
            }
        }
    }

    
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    const newsletterForm = document.getElementById('newsletter-form');
    const footerNewsletterForm = document.getElementById('footer-newsletter-form');
    
    function registerNewsletter(formElement) {
        if (!formElement) return;
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = formElement.querySelector('input[type="email"]');
            if (!emailInput || !emailInput.value.trim()) return;
            
            
            const originalText = emailInput.placeholder;
            const originalValue = emailInput.value;
            
            emailInput.value = '';
            emailInput.placeholder = 'SUBSCRIBED SUCCESSFULLY';
            emailInput.disabled = true;
            
            setTimeout(() => {
                emailInput.disabled = false;
                emailInput.placeholder = originalText;
            }, 3000);
        });
    }
    
    registerNewsletter(newsletterForm);
    registerNewsletter(footerNewsletterForm);

    
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.review-dot');
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        function nextSlide() {
            let target = currentSlide + 1;
            if (target >= slides.length) target = 0;
            showSlide(target);
        }
        
        
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                resetSlideTimer();
            });
        });
        
        function startSlideTimer() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetSlideTimer() {
            clearInterval(slideInterval);
            startSlideTimer();
        }
        
        
        showSlide(0);
        startSlideTimer();
    }

   
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filter === 'all' || cardCategory === filter) {
                        card.classList.remove('hide');
                        card.classList.add('show');
                    } else {
                        card.classList.remove('show');
                        card.classList.add('hide');
                    }
                });
            });
        });

        
        const urlParams = new URLSearchParams(window.location.search);
        const urlFilter = urlParams.get('filter');
        if (urlFilter) {
            const targetButton = Array.from(filterButtons).find(btn => btn.getAttribute('data-filter') === urlFilter);
            if (targetButton) {
                targetButton.click();
            }
        }
    }

    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Standard Front-End Validations
            if (!name || !email || !subject || !message) {
                showStatus('All fields are required.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            if (message.length < 10) {
                showStatus('Message should be at least 10 characters long.', 'error');
                return;
            }
            
           
            showStatus('Thank you for contacting us! We will get back to you shortly.', 'success');
            contactForm.reset();
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showStatus(msg, type) {
        if (!formStatus) return;
        formStatus.textContent = msg;
        formStatus.className = 'form-status ' + type;
        
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
    }
});
