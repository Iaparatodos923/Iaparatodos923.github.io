// Elementos
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');
const body = document.body;

// Control de scroll
function disableBodyScroll() {
    body.classList.add('menu-open');
}
function enableBodyScroll() {
    body.classList.remove('menu-open');
}

function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    overlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    disableBodyScroll();
}

function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    enableBodyScroll();
}

// Evento hamburguesa
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navLinks.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Cerrar con overlay
overlay.addEventListener('click', closeMenu);

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
    }
});

// Cerrar menú al redimensionar a escritorio
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navLinks.classList.contains('open')) {
        closeMenu();
    }
});

// Resaltar sección activa en scroll (solo si no hay pestaña abierta)
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) return;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinkItems.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.4, rootMargin: "-10px 0px -10px 0px" });
sections.forEach(section => observer.observe(section));

// Sistema de pestañas
function openTab(tabId) {
    if (navLinks.classList.contains('menu-open')) closeMenu();
    
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
        selectedTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const hero = document.getElementById('hero-section');
    if (hero) hero.style.display = 'none';
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    localStorage.setItem('activeTab', tabId);
}

function closeTab(tabId) {
    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.remove('active');
    
    const hero = document.getElementById('hero-section');
    if (hero) hero.style.display = 'flex';
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = '';
    });
    localStorage.removeItem('activeTab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Recuperar pestaña guardada
document.addEventListener('DOMContentLoaded', () => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab && document.getElementById(savedTab)) {
        openTab(savedTab);
    }
});

// Asignar eventos a los botones que abren pestañas (con data-open-tab)
document.querySelectorAll('[data-open-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = btn.getAttribute('data-open-tab');
        if (tabId) openTab(tabId);
    });
});
// Botón del hero
const heroBtn = document.getElementById('heroBtn');
if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openTab('tab-charla1');
    });
}
// Enlaces de navegación principal
document.querySelectorAll('.main-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.getAttribute('data-tab');
        if (tabId) openTab(tabId);
        closeMenu();
    });
});
// Botones volver (back-btn)
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = btn.getAttribute('data-close-tab');
        if (tabId) closeTab(tabId);
    });
});
