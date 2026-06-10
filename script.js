// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const overlay   = document.getElementById('overlay');

function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    overlay.classList.add('show');
}

function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('show');
}

hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close menu on ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── Sistema de pestañas (tab-content) ──
function openTab(tabId) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Mostrar la pestaña seleccionada
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
        // Scroll suave hasta la pestaña
        selectedTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Ocultar el hero y las secciones principales
    const hero = document.getElementById('hero-section');
    if (hero) hero.style.display = 'none';
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
}

function closeTab(tabId) {
    // Ocultar la pestaña activa
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.classList.remove('active');
    }

    // Restaurar el hero y las secciones principales
    const hero = document.getElementById('hero-section');
    if (hero) hero.style.display = 'flex';
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = '';
    });

    // Scroll suave hasta el inicio de la sección correspondiente
    const targetSection = document.querySelector(tabId.replace('tab-', '#'));
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}