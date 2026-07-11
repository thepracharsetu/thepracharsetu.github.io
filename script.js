/**
 * Project Name: The Prachar Setu
 * Script Purpose: Production Engine & Core Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SYSTEM INITIALIZATIONS & PRELOADER
    // ==========================================================================
    const handlePreloader = () => {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(preloader);

        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => preloader.remove(), 800);
            }, 300);
        });
    };
    handlePreloader();

    // ==========================================================================
    // 2. NAV ACCESSIBILITY & MOBILE TOGGLE SYSTEM
    // ==========================================================================
    const initNavigation = () => {
        const header = document.querySelector('.navbar-sticky');
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navItems = document.querySelectorAll('.nav-item');

        // Scroll state controller
        const checkScroll = () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', checkScroll);
        checkScroll();

        // Hamburger Menu actions
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', isActive);
            });

            // Auto close mobile drawer on element click
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    };
    initNavigation();

    // ==========================================================================
    // 3. BACK TO TOP BUTTON
    // ==========================================================================
    const handleBackToTop = () => {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-to-top';
        backBtn.setAttribute('aria-label', 'Return to top of page');
        backBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        document.body.appendChild(backBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backBtn.classList.add('show');
            } else {
                backBtn.classList.remove('show');
            }
        });

        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };
    handleBackToTop();

    // ==========================================================================
    // 4. INTERSECTION OBSERVER FOR SCROLL REVEALS
    // ==========================================================================
    const initScrollReveals = () => {
        // Collect prospective reveal containers and inject target elements
        const elementsToReveal = document.querySelectorAll('.glass-card, .card-3d, .testimonial-card, .timeline-content, .about-visual, .about-text');
        
        elementsToReveal.forEach(el => {
            el.classList.add('reveal');
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Unobserve once animated
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(reveal => revealObserver.observe(reveal));
    };
    initScrollReveals();

    // ==========================================================================
    // 5. INTERACTIVE NUMBER COUNTERS
    // ==========================================================================
    const initCounters = () => {
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length === 0) return;

        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent.trim();
                    const hasPercent = text.includes('%');
                    const value = parseInt(text, 10);
                    
                    if (isNaN(value)) return;

                    let count = 0;
                    const duration = 2000; // milliseconds
                    const increment = Math.ceil(value / (duration / 16)); // ~60fps target
                    
                    const updateCounter = () => {
                        count += increment;
                        if (count >= value) {
                            target.textContent = value + (hasPercent ? '%' : '');
                        } else {
                            target.textContent = count + (hasPercent ? '%' : '');
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => countObserver.observe(stat));
    };
    initCounters();

    // ==========================================================================
    // 6. PREMIUM 3D TILT INTERACTION CARD EFFECT
    // ==========================================================================
    const initTiltCards = () => {
        // Check for reduced motion preference before building 3D loops
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const cards = document.querySelectorAll('.glass-card, .service-detail-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Rotation ratios
                const rotateX = ((centerY - y) / centerY) * 10; // limits to 10deg max
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)';
            });
        });
    };
    initTiltCards();

    // ==========================================================================
    // 7. SECURE DIRECT FORM VALIDATION & INTEGRATION
    // ==========================================================================
    const initContactForm = () => {
        const form = document.getElementById('contactForm');
        const feedback = document.getElementById('validationFeedback');
        
        if (!form || !feedback) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear message display
            feedback.className = 'validation-feedback-box hidden';
            feedback.innerHTML = '';

            const name = document.getElementById('clientName').value.trim();
            const service = document.getElementById('requiredService').value;
            const requirement = document.getElementById('projectRequirement').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const email = document.getElementById('clientEmail').value.trim();

            let errors = [];

            // Core field validations
            if (name.length < 2) {
                errors.push("Please provide a valid Full Name (minimum 2 characters).");
            }
            if (!service) {
                errors.push("Please select a required service category.");
            }
            if (requirement.length < 15) {
                errors.push("Please elaborate on your project requirements (minimum 15 characters).");
            }

            // Dual Field validation: either Mobile OR Email must be completed
            if (!phone && !email) {
                errors.push("Please provide at least one contact pathway (either Mobile Number or Email Address).");
            } else {
                // Validate email format if provided
                if (email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        errors.push("Please enter a valid structure for your Email Address.");
                    }
                }
                // Validate Indian mobile standard layout if provided
                if (phone) {
                    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
                    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
                        errors.push("Please enter a valid 10-digit Indian Mobile Number.");
                    }
                }
            }

            // Error execution cycle
            if (errors.length > 0) {
                feedback.className = 'validation-feedback-box error-box';
                feedback.innerHTML = `<ul>${errors.map(err => `<li><i class="fa-solid fa-triangle-exclamation"></i> ${err}</li>`).join('')}</ul>`;
                feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return;
            }

            // FormSubmit Endpoint Delivery Integration
            feedback.className = 'validation-feedback-box success-box';
            feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Project outline verified successfully. Deploying connection portal...';
            
            // Redirect mapping to FormSubmit action pipeline
            form.action = "https://formsubmit.co/thepracharsetu@gmail.com";
            
            // Allow form delivery processing
            setTimeout(() => {
                form.submit();
            }, 1000);
        });
    };
    initContactForm();

    // ==========================================================================
    // 8. ACCORDION SINGLE-OPEN CONTROLLER
    // ==========================================================================
    const initFAQAccordion = () => {
        const detailsElements = document.querySelectorAll('.faq-item');
        detailsElements.forEach(item => {
            item.addEventListener('toggle', () => {
                if (item.open) {
                    detailsElements.forEach(otherItem => {
                        if (otherItem !== item && otherItem.open) {
                            otherItem.removeAttribute('open');
                        }
                    });
                }
            });
        });
    };
    initFAQAccordion();

    // ==========================================================================
    // 9. LIGHT PARALLAX SCENE LAYER EFFECTS
    // ==========================================================================
    const initParallaxEffect = () => {
        const spheres = document.querySelectorAll('.sphere-3d');
        if (spheres.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollVal = window.scrollY;
            spheres.forEach(sphere => {
                sphere.style.transform = `translateY(${scrollVal * 0.15}px)`;
            });
        });
    };
    initParallaxEffect();
});
