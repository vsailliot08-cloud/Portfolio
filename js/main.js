/* --- LOGO ROTATIF --- */
const logo = document.getElementById('rotateLogo');
if (logo) {
    let isDragging = false;
    let currentRotation = 0;
    let startAngle = 0;

    function getAngle(x, y) {
        const rect = logo.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return Math.atan2(y - centerY, x - centerX);
    }

    function handleStart(e) {
        isDragging = true;
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        startAngle = getAngle(x, y) - currentRotation;
        logo.style.cursor = 'grabbing';
    }

    function handleMove(e) {
        if (!isDragging) return;
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        const angle = getAngle(x, y);
        currentRotation = angle - startAngle;
        logo.style.transform = `rotate(${currentRotation}rad)`;
    }

    function handleEnd() { isDragging = false; logo.style.cursor = 'grab'; }

    logo.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    logo.addEventListener('touchstart', handleStart);
    window.addEventListener('touchmove', (e) => { if (isDragging) e.preventDefault(); handleMove(e); }, { passive: false });
    window.addEventListener('touchend', handleEnd);
}

/* --- ACCORDÉON AC CARDS --- */
document.querySelectorAll('.ac-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.parentElement;
        card.classList.toggle('open');
    });
});

/* --- REVEAL DES CARDS AU SCROLL --- */
const grid = document.querySelector('.competences-grid');
if (grid && 'IntersectionObserver' in window) {
    grid.classList.add('reveal-enabled');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.competence-card').forEach(c => observer.observe(c));
}

/* --- TYPEWRITER --- */
const typewriter = document.getElementById('typewriter');
if (typewriter) {
    const phrases = [
        "Student in Networks and Telecommunications",
        "Future Systems & Network Administrator",
        "Passionate about Cybersecurity",
        "Seeking a Work-Study Position"
    ];

    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function updateTypewriter() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typewriter.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
            delay = 50; 
        } else {
            typewriter.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
            delay = 100; 
        }
        if (!isDeleting && characterIndex === currentPhrase.length) {
            isDeleting = true;
            delay = 2000; 
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500; 
        }
        setTimeout(updateTypewriter, delay);
    }
    window.onload = updateTypewriter;
}