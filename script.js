// 1. Handle the Enter Key / Form Submission
function handleFormSubmit(event) {
    event.preventDefault(); // STOPS THE REFRESH
    handleContinueClick();
    return false;
}

// 2. Main Continue Logic
function handleContinueClick() {
    const nameModal = document.getElementById('name-modal');
    const visitorInput = document.getElementById('visitor-name');
    const name = visitorInput.value.trim();

    if (name === '') {
        visitorInput.focus();
        return;
    }

    // Hide Modal with transition
    nameModal.style.opacity = '0';
    setTimeout(() => {
        nameModal.classList.add('modal-hidden');
        document.body.classList.remove('modal-active');
        
        // Show custom cursor after modal is gone
        document.getElementById('cursor').style.opacity = '1';
        document.getElementById('cursor-blur').style.opacity = '1';
    }, 500);

    // Show custom welcome toast
    const welcome = document.createElement('div');
    welcome.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; z-index: 10000;
        background: rgba(255, 153, 51, 0.2); backdrop-filter: blur(10px);
        border: 1px solid #FF9933; color: white; padding: 1rem 2rem;
        border-radius: 15px; font-weight: bold; animation: fadeInUp 0.5s ease;
    `;
    welcome.textContent = `Namaste, ${name}!`;
    document.body.appendChild(welcome);
    setTimeout(() => welcome.remove(), 4000);
}

// 3. Custom Cursor Movement
const cursor = document.getElementById('cursor');
const blur = document.getElementById('cursor-blur');

let mX = 0, mY = 0;
let bX = 0, bY = 0;

document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
    cursor.style.transform = `translate(${mX}px, ${mY}px)`;
});

function animateBlur() {
    bX += (mX - bX) * 0.1; // Smooth following
    bY += (mY - bY) * 0.1;
    blur.style.transform = `translate(${bX - 175}px, ${bY - 175}px)`;
    requestAnimationFrame(animateBlur);
}
animateBlur();

// 4. Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-overlay');
    const modal = document.getElementById('name-modal');

    setTimeout(() => {
        loader.classList.add('modal-hidden');
        modal.classList.remove('modal-hidden');
        // Hide cursors while in modal
        cursor.style.opacity = '0';
        blur.style.opacity = '0';
    }, 1500);
});

// 5. Smooth Scroll
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
