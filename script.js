document.addEventListener('DOMContentLoaded', () => {


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
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            profIndex = (profIndex + 1) % professions.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();


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
        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 25000));
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


    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');


                if (entry.target.id === 'about') {
                    startCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 600;
            const increment = target / (duration / 16);
            const outputElement = stat.querySelector('.rank-num') || stat;

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    let displayValue = Math.floor(current);
                    if (target % 1 !== 0) displayValue = current.toFixed(1);
                    outputElement.textContent = displayValue;
                    requestAnimationFrame(updateCount);
                } else {
                    outputElement.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
                }
            };
            updateCount();
        });
    }


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




    function showToast(title, message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = type === 'success' ? 'fa-check' : 'fa-exclamation-triangle';

        toast.innerHTML = `
            <div class="toast-icon"><i class="fas ${icon}"></i></div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <div class="toast-progress"></div>
        `;

        container.appendChild(toast);


        setTimeout(() => toast.classList.add('show'), 10);


        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }


    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalHTML = btn.innerHTML;

            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

            window.location.href = `mailto:suryasathwikm@gmail.com?subject=${subject}&body=${body}`;

            btn.innerHTML = '<strong>OPENING MAIL CLIENT...</strong>';
            btn.style.boxShadow = '0 0 20px rgba(52, 211, 153, 0.4)';

            showToast('Mail Client Opened!', 'Please send the email from your application.', 'success');

            contactForm.reset();

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.boxShadow = '';
                btn.disabled = false;
            }, 5000);
        });
    }


    const stackWrapper = document.querySelector('.stack-wrapper');
    const files = [

        { name: 'Web Dev Intern', subtitle: 'Vault of Codes', type: 'image', src: 'vaultofcodes.png' },
        { name: 'Java Intern', subtitle: 'Codec Technologies', type: 'image', src: 'codec-java.png' },
        { name: 'database Intern', subtitle: 'Elevate Labs', type: 'image', src: 'Elevate labs.png' },


        { name: 'Hackathon Finalist', subtitle: 'ANITS', type: 'image', src: 'anits -hackathon.png' },
        { name: 'openAI Finalist', subtitle: 'NxtWave', type: 'image', src: 'nextwave.png' },
        { name: 'Innovation Cert', subtitle: 'NSRIT', type: 'image', src: 'NSRIT.png' },
        { name: 'Entrepreneurship', subtitle: 'IIM Vishakhapatnam', type: 'image', src: 'IIM.png' },
        { name: 'GATE Scorecard', subtitle: 'CS IT', type: 'image', src: 'cs_scorecard.png' },
        { name: 'MSME Cert', subtitle: 'Govt of India', type: 'image', src: 'MSME.png' },


        { name: 'Algorithms', subtitle: 'NPTEL', type: 'image', src: 'NPTEL.png' },
        { name: 'SQL for Data', subtitle: 'LinkedIn Learning', type: 'image', src: 'li-sql.png' },
        { name: 'SQL 101', subtitle: 'IBM Cognitive Class', type: 'image', src: 'ibm-sql.png' },
        { name: 'Mastering CSS', subtitle: 'Infosys Springboard', type: 'image', src: 'css.png' },
        { name: 'Intro to HTML', subtitle: 'Infosys Springboard', type: 'image', src: 'html.png' },
        { name: 'JS for Beginners', subtitle: 'Simplilearn SkillUp', type: 'image', src: 'js.png' },
        { name: 'Python Essentials 1', subtitle: 'Cisco Academy', type: 'image', src: 'py1.png' },
        { name: 'Python Essentials 2', subtitle: 'Cisco Academy', type: 'image', src: 'py2.png' }
    ];

    let isStackDragging = false;
    let stackStartX, stackStartY, stackCurrentX, stackCurrentY;
    let activeStackCard = null;

    function createCard(file, index) {
        const card = document.createElement('div');
        card.className = 'stack-card';

        let content = '';
        if (file.type === 'image') {
            const fallbackImg = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
            content = `<img src="${file.src}" alt="${file.name}" onerror="this.src='${fallbackImg}';">`;
        } else {
            content = `
                <div class="card-icon-placeholder" style="display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-file-alt" style="font-size: 4rem; color: #7c3aed;"></i>
                </div>
            `;
        }

        card.innerHTML = `
            ${content}
            <div class="stack-card-content">
                <p class="card-platform">${file.subtitle}</p>
                <div class="card-line-separator"></div>
                <h4 class="card-cert-name">${file.name}</h4>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (isStackDragging || Math.abs(stackCurrentX) > 5 || Math.abs(stackCurrentY) > 5) return;

            const viewer = document.getElementById('image-viewer');
            const viewerImg = document.getElementById('viewer-img');
            const viewerCaption = document.getElementById('viewer-caption');

            if (viewer && viewerImg && viewerCaption) {
                viewer.style.display = "flex";
                viewer.style.alignItems = "center";
                viewer.style.justifyContent = "center";
                viewer.style.flexDirection = "column";
                viewerImg.src = file.src;
                viewerCaption.innerHTML = file.name;
            }
        });

        return card;
    }

    function initStack() {
        if (!stackWrapper) return;
        files.forEach((file, i) => {
            const card = createCard(file, i);
            stackWrapper.appendChild(card);
            setupStackDrag(card);
        });
        updateStackStyles();
    }

    function setupStackDrag(card) {
        card.addEventListener('mousedown', stackDragStart);
        card.addEventListener('touchstart', stackDragStart, { passive: false });
    }

    function stackDragStart(e) {
        const currentTopCard = stackWrapper.children[0];
        if (currentTopCard !== e.currentTarget) return;

        isStackDragging = true;
        activeStackCard = e.currentTarget;
        stackCurrentX = 0;
        stackCurrentY = 0;

        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        stackStartX = clientX;
        stackStartY = clientY;

        activeStackCard.style.transition = 'none';

        document.addEventListener('mousemove', stackDragMove);
        document.addEventListener('touchmove', stackDragMove, { passive: false });
        document.addEventListener('mouseup', stackDragEnd);
        document.addEventListener('touchend', stackDragEnd);
    }

    function stackDragMove(e) {
        if (!isStackDragging || !activeStackCard) return;

        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        stackCurrentX = clientX - stackStartX;
        stackCurrentY = clientY - stackStartY;

        const rotate = stackCurrentX / 15;
        activeStackCard.style.transform = `translate(${stackCurrentX}px, ${stackCurrentY}px) rotate(${rotate}deg)`;

        if (e.type === 'touchmove') e.preventDefault();
    }

    function stackDragEnd() {
        if (!isStackDragging || !activeStackCard) return;
        isStackDragging = false;

        activeStackCard.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease';

        const threshold = 120;
        if (Math.abs(stackCurrentX) > threshold || Math.abs(stackCurrentY) > threshold) {
            const velocityX = stackCurrentX * 1.5;
            const velocityY = stackCurrentY * 1.5;
            activeStackCard.style.transform = `translate(${velocityX}px, ${velocityY}px) rotate(${stackCurrentX / 5}deg)`;
            activeStackCard.style.opacity = '0';

            const cardToMove = activeStackCard;
            setTimeout(() => {
                if (stackWrapper.contains(cardToMove)) {
                    stackWrapper.removeChild(cardToMove);
                    stackWrapper.appendChild(cardToMove);
                    cardToMove.style.opacity = '1';
                    updateStackStyles();
                }
            }, 300);
        } else {
            updateStackStyles();
        }

        document.removeEventListener('mousemove', stackDragMove);
        document.removeEventListener('touchmove', stackDragMove);
        document.removeEventListener('mouseup', stackDragEnd);
        document.removeEventListener('touchend', stackDragEnd);

        activeStackCard = null;
    }

    function updateStackStyles() {
        const cards = Array.from(stackWrapper.children);
        cards.forEach((card, i) => {
            card.style.zIndex = cards.length - i;
            if (i === 0) {
                card.style.transform = 'translate(0, 0) rotate(0deg)';
                card.style.opacity = '1';
                card.style.background = '#ffffff';
                card.querySelectorAll('h4, p').forEach(el => el.style.visibility = 'visible');
            } else if (i === 1) {
                card.style.transform = 'translate(-25px, -15px) rotate(-3deg)';
                card.style.opacity = '1';
                card.style.background = '#e9d5ff';
                card.querySelectorAll('h4, p').forEach(el => el.style.visibility = 'hidden');
            } else if (i === 2) {
                card.style.transform = 'translate(-50px, -30px) rotate(-6deg)';
                card.style.opacity = '1';
                card.style.background = '#d8b4fe';
                card.querySelectorAll('h4, p').forEach(el => el.style.visibility = 'hidden');
            } else {
                card.style.transform = 'translate(-75px, -45px) rotate(-9deg)';
                card.style.opacity = '0';
                card.querySelectorAll('h4, p').forEach(el => el.style.visibility = 'hidden');
            }
        });
    }

    initStack();

});

