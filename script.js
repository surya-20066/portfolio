/*
  Script for Surya Sathwik's Portfolio
  Author: Antigravity
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Loader Removal
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // 2. Typing Effect
    const typingText = document.getElementById('typing-text');
    const professions = [
        "Applied AI Developer",
        "Full-Stack Builder",
        "GATE Top 10%",
        "Problem Solver"
    ];
    let profIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const current = professions[profIndex];
        if (isDeleting) {
            typingText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            profIndex = (profIndex + 1) % professions.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 3. Neural Network Background Animation
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = 'rgba(14, 165, 233, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(91, 33, 182, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();

    // 4. Reveal on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it's a section with stats, start the counter
                if (entry.target.id === 'about') {
                    startCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 5. Stats Counter Logic
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps approx

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    if (target === 8.8) stat.textContent = current.toFixed(1);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            updateCount();
        });
    }

    // 6. Navigation Link Highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // 9. Anti-Gravity Card Logic
    const agCard = document.getElementById('ag-card');
    if (agCard) {
        let isAgFlipped = false;
        let agTimer;
        let countdownStart = null;
        const countdownDuration = 2600;
        const circle = document.querySelector('.countdown-circle');
        const countdownSec = document.getElementById('countdown-sec');
        const label = document.querySelector('.countdown-label');
        const circumference = 604;

        function triggerAgFlip() {
            if (isAgFlipped) return;
            isAgFlipped = true;
            agCard.classList.add('flipped');
            clearTimeout(agTimer);
            if (circle) circle.style.opacity = '0';
            if (label) label.style.opacity = '0';

            // Create burst particles
            createBurst(agCard);
        }

        function createBurst(parent) {
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'burst-particle';
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.position = 'absolute';
                particle.style.top = '50%';
                particle.style.left = '50%';
                particle.style.background = 'var(--secondary)';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '10';
                particle.style.boxShadow = '0 0 10px var(--secondary)';

                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 150 + 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                parent.appendChild(particle);

                particle.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
                ], {
                    duration: 800,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => particle.remove();
            }
        }

        function updateCountdown(timestamp) {
            if (!countdownStart) countdownStart = timestamp;
            const progress = timestamp - countdownStart;
            const remaining = Math.max(0, countdownDuration - progress);

            if (circle) {
                const offset = circumference - (progress / countdownDuration) * circumference;
                circle.style.strokeDashoffset = Math.max(0, offset);
            }

            if (countdownSec) {
                countdownSec.textContent = Math.ceil(remaining / 1000);
            }

            if (progress < countdownDuration && !isAgFlipped) {
                requestAnimationFrame(updateCountdown);
            }
        }

        agTimer = setTimeout(triggerAgFlip, countdownDuration);
        requestAnimationFrame(updateCountdown);

        agCard.addEventListener('click', () => {
            clearTimeout(agTimer);
            triggerAgFlip();
        });
    }


    // 10. Contact Form Logic (AJAX via FormSubmit.co)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<strong>SENDING...</strong>';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    if (response.ok) {
                        btn.innerHTML = '<strong>✓ SENT!</strong>';
                        btn.style.borderColor = '#34d399';
                        contactForm.reset();
                        setTimeout(() => {
                            btn.innerHTML = originalHTML;
                            btn.style.borderColor = '';
                            btn.disabled = false;
                        }, 3000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(() => {
                    // Fallback: submit natively
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    contactForm.submit();
                });
        });
    }

});

