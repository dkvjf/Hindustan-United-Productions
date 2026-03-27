function handleFormSubmit(event) {
    event.preventDefault(); 
    handleContinueClick();
}

function handleContinueClick() {
    const nameModal = document.getElementById('name-modal');
    const visitorInput = document.getElementById('visitor-name');
    const name = visitorInput.value.trim();

    if (name === '') {
        visitorInput.focus();
        return;
    }

    const cursor = document.getElementById('cursor');
    const blur = document.getElementById('cursor-blur');

    // Update the "About" section with the user's name if the span exists
    const displayName = document.getElementById('display-name');
    if (displayName) displayName.textContent = name;

    nameModal.style.opacity = '0';
    
    setTimeout(() => {
        nameModal.classList.add('modal-hidden');
        
        if (cursor && blur) {
            cursor.style.display = 'block';
            blur.style.display = 'block';
            requestAnimationFrame(() => {
                cursor.style.opacity = '1';
                blur.style.opacity = '1';
            });
        }
    }, 500);

    const welcome = document.createElement('div');
    welcome.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; z-index: 10000;
        background: rgba(255, 153, 51, 0.2); backdrop-filter: blur(10px);
        border: 1px solid #FF9933; color: white; padding: 1rem 2rem;
        border-radius: 15px; font-weight: bold; pointer-events: none;
    `;
    welcome.textContent = `Namaste, ${name}!`;
    document.body.appendChild(welcome);
    setTimeout(() => welcome.remove(), 4000);
}

let mX = 0, mY = 0; 
let bX = 0, bY = 0; 

document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
    
    const cursorEl = document.getElementById('cursor');
    if (cursorEl) {
        cursorEl.style.transform = `translate3d(${mX - 5}px, ${mY - 5}px, 0)`;
    }

    const boxes = document.querySelectorAll('.home-box, section');
    boxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        const x = mX - rect.left;
        const y = mY - rect.top;
        
        box.style.setProperty('--x', `${x}px`);
        box.style.setProperty('--y', `${y}px`);

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 20;

            box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        } else {
            box.style.transform = ""; 
        }
    });
});

function animateBlur() {
    bX += (mX - bX) * 0.1;
    bY += (mY - bY) * 0.1;
    
    const blurEl = document.getElementById('cursor-blur');
    if (blurEl) {
        blurEl.style.transform = `translate3d(${bX - 175}px, ${bY - 175}px, 0)`;
    }
    requestAnimationFrame(animateBlur);
}
animateBlur();

window.addEventListener('load', () => {
    const loader = document.getElementById('loader-overlay');
    const modal = document.getElementById('name-modal');

    setTimeout(() => {
        if (loader) loader.classList.add('modal-hidden');
        if (modal) modal.classList.remove('modal-hidden');
    }, 1500);
});

// --- OPTION 1: ACTUAL WEBSITE MESSAGE TRANSMISSION ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            message: contactForm.querySelector('textarea').value
        };

        submitBtn.innerText = "TRANSMITTING...";
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://hyperhrishi.pythonanywhere.com/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Message Secured on HyperHrishi Server.");
                contactForm.reset();
            } else {
                alert("Server error. Transmission failed.");
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Could not reach server. Check your connection.");
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href !== "#") {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});
