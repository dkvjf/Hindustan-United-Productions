document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

function handleFormSubmit(event) {
    // This stops the page from refreshing
    event.preventDefault(); 
    // This calls your existing function to hide the modal and show the greeting
    handleContinueClick();
    return false;
}

// Handle continue button click
function handleContinueClick() {
    const nameModal = document.getElementById('name-modal');
    const visitorInput = document.getElementById('visitor-name');
    const name = visitorInput.value.trim();
    
    if (name === '') {
        visitorInput.focus();
        return;
    }

    nameModal.classList.add('modal-hidden');
    document.body.classList.remove('modal-active');
    
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    if (cursor && cursorBlur) {
        cursor.style.display = 'block';
        cursorBlur.style.display = 'block';
    }

    const greetingElem = document.createElement('div');
    greetingElem.id = 'welcome-message';
    greetingElem.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 15000; background: rgba(0,0,0,0.75); color: #fff; padding: 12px 16px; border-radius: 12px; font-weight: 600; box-shadow: 0 0 20px rgba(0, 255, 113, 0.35);';
    greetingElem.textContent = `Welcome, ${name}! Enjoy the production journey.`;
    document.body.appendChild(greetingElem);

    setTimeout(() => {
        greetingElem.remove();
    }, 4500);
}



const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});


function validateForm() {
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    if (!email.value || !email.value.includes('@')) {
        alert('Please enter a valid email address.');
        isValid = false;
    }

    if (!message.value.trim()) {
        alert('Please enter a message.');
        isValid = false;
    }

    return isValid;
}

// Add event listener for form submission if form exists
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
        }
    });
}

// Custom cursor implementation
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let blurX = mouseX;
let blurY = mouseY;

if (cursor && cursorBlur) {
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const render = () => {
        blurX += (mouseX - blurX) * 0.15;
        blurY += (mouseY - blurY) * 0.15;
        cursorBlur.style.transform = `translate(${blurX}px, ${blurY}px)`;
        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .btn');
    hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-active');
            cursorBlur.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-active');
            cursorBlur.classList.remove('hover-active');
        });
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorBlur.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorBlur.style.opacity = '1';
    });
}

// Loader and name prompt flow
window.addEventListener('load', () => {
    const loaderOverlay = document.getElementById('loader-overlay');
    const nameModal = document.getElementById('name-modal');
    const visitorInput = document.getElementById('visitor-name');

    if (nameModal) {
        document.body.classList.add('modal-active');
    }

    if (loaderOverlay) {
        setTimeout(() => {
            loaderOverlay.classList.add('modal-hidden');
            if (nameModal) {
                nameModal.classList.remove('modal-hidden');
                visitorInput?.focus();
            } else {
                document.body.classList.remove('modal-active');
            }

            const cursor = document.getElementById('cursor');
            const cursorBlur = document.getElementById('cursor-blur');
            if (cursor && cursorBlur && nameModal) {
                cursor.style.display = 'none';
                cursorBlur.style.display = 'none';
            }
        }, 1600);
    }
});
