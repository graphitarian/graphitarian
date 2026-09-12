// Prevent Chrome from restoring the previous scroll position.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

async function loadComponent(elementId, file) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}: ${response.status}`);
        element.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageKey = currentPage === 'portfolio.html' ? 'portfolio' : 'home';

    document.querySelectorAll('.nav-links a[data-nav]').forEach(function (link) {
        link.classList.toggle('active', link.dataset.nav === pageKey);
    });
}

function setupNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
        });
    }

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            nav?.classList.remove('open');
            toggle?.setAttribute('aria-expanded', 'false');
        });
    });
}

function setupBrandLinks() {
    document.querySelectorAll('.brand').forEach(function (brand) {
        brand.addEventListener('click', function (event) {
            const href = brand.getAttribute('href') || '';

            // On the homepage, keep the existing smooth scroll-to-top behavior.
            if (href === '#home' || href === 'index.html#home') {
                if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html')) {
                    event.preventDefault();
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function setupPage() {
    setActiveNavigation();
    setupNavigation();
    setupBrandLinks();
}

Promise.all([
    loadComponent('site-header', 'components/header.html'),
    loadComponent('site-footer', 'components/footer.html')
]).then(setupPage);

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});
