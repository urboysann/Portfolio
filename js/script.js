// ============================================================
// 1. NAV SCROLL EFFECT
// ============================================================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > 30) {
        nav.classList.add('is-scrolled');
    } else {
        nav.classList.remove('is-scrolled');
    }
    lastScroll = currentScroll;
});

// ============================================================
// 2. NAV TOGGLE (mobile)
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const mobileNavQuery = window.matchMedia('(max-width: 980px)');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navToggle.setAttribute('aria-expanded', !isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNavQuery.matches) {
            navLinks.style.display = 'none';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

function handleNavBreakpointChange(e) {
    if (!e.matches) {
        navLinks.style.display = '';
        navToggle.setAttribute('aria-expanded', 'false');
    }
}
mobileNavQuery.addEventListener('change', handleNavBreakpointChange);

// ============================================================
// 3. REVEAL ON SCROLL
// ============================================================
const revealElements = document.querySelectorAll('.reveal');
let introGate = !!document.getElementById('introOverlay');
const pendingReveals = new Set();

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (introGate) {
                pendingReveals.add(entry.target);
            } else {
                entry.target.classList.add('is-visible');
            }
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

document.addEventListener('intro:complete', () => {
    introGate = false;
    const items = Array.from(pendingReveals);
    pendingReveals.clear();
    items.forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 110);
    });
});

// ============================================================
// 4. WORK FILTER
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.dataset.filter;

        workCards.forEach(card => {
            const cat = card.dataset.cat;
            if (filter === 'all' || cat === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ============================================================
// 5. SERVICES ACCORDION
// ============================================================
const serviceItems = document.querySelectorAll('[data-service]');

serviceItems.forEach(item => {
    const trigger = item.querySelector('.service-trigger');

    trigger.addEventListener('click', () => {
        serviceItems.forEach(other => {
            if (other !== item && other.classList.contains('is-open')) {
                other.classList.remove('is-open');
            }
        });
        item.classList.toggle('is-open');
    });
});

// ============================================================
// 6. PROJECT MODAL
// ============================================================
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalLink = document.getElementById('modalLink');

const techIconSlugs = {
    'React': 'react',
    'Next.js': 'nextdotjs',
    'Vue.js': 'vuedotjs',
    'TypeScript': 'typescript',
    'JavaScript': 'javascript',
    'Laravel': 'laravel',
    'Tailwind': 'tailwindcss',
    'MySQL': 'mysql',
    'HTML': 'html5',
    'CSS': 'css3',
    'Node.js': 'nodedotjs',
    'PostgreSQL': 'postgresql',
    'Redis': 'redis',
    'Figma': 'figma',
    'Framer Motion': 'framer',
    'Docker': 'docker',
    'CI/CD': 'githubactions',
    'Vercel': 'vercel',
    'Cloudflare': 'cloudflare'
};

function tagIconSrc(tagName) {
    const slug = techIconSlugs[tagName];
    return slug ? `https://cdn.simpleicons.org/${slug}` : '';
}

const projectsData = [{
    title: 'PNB EAGLES SEASON 9 — E-Sports Tournament Platform',
    badge: 'product',
    desc: 'Platform turnamen E-Sports resmi yang diselenggarakan oleh UKM Computer Club, Politeknik Negeri Bali. Event ini menjadi wadah bagi para gamers dan pecinta esports di Bali untuk berkompetisi dan mengembangkan bakat. Season 9 menghadirkan 5 kategori permainan berbeda dengan total hadiah mencapai 8 juta rupiah. Dibangun dengan Next.js untuk performa terbaik dan Tailwind CSS untuk antarmuka yang modern dan responsif. Platform ini mendukung manajemen peserta, jadwal pertandingan, dan sistem bracket otomatis.',
    tags: ['Next.js', 'Tailwind', 'TypeScript'],
    image: 'assets/eagles.jpeg',
    link: 'https://eagles.computerclubpnb.com/'
}, {
    title: 'IntechFest — Festival Teknologi & Kompetisi',
    badge: 'product',
    desc: 'Festival teknologi tahunan yang diselenggarakan oleh UKM Computer Club, Politeknik Negeri Bali. IntechFest merupakan ajang kompetisi di bidang Web Development, UI/UX Design, dan Capture The Flag (CTF) cybersecurity. Acara ini juga menghadirkan seminar dari para ahli industri teknologi. Platform dibangun dengan Laravel untuk backend yang solid dan Tailwind CSS untuk tampilan yang elegan. Sistem ini mengelola pendaftaran peserta, pengumpulan karya, penjurian, dan pengumuman pemenang secara terintegrasi.',
    tags: ['Laravel', 'Tailwind', 'MySQL'],
    image: 'assets/intechfest.jpeg',
    link: 'https://intechfest.cc/'
}, {
    title: 'Melahin.id — Platform Manajemen Sampah Digital',
    badge: 'exploration',
    desc: 'Platform berbasis website yang bertujuan untuk mengedukasi dan membantu masyarakat dalam pengelolaan sampah. IMelahin.id menyediakan informasi tentang jenis sampah, cara daur ulang, dan lokasi bank sampah terdekat. Proyek ini dibangun dengan HTML, CSS, dan JavaScript murni sebagai bentuk kepedulian terhadap lingkungan, khususnya mengatasi permasalahan sampah di Bali. Menampilkan data statistik real-time tentang volume sampah, partisipasi masyarakat, dan dampak lingkungan.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: 'assets/melahin.jpeg',
    link: '#'
}, {
    title: 'Web Community — Komunitas Web Developer Bali',
    badge: 'product',
    desc: 'Platform komunitas untuk para web developer di Bali yang bertujuan untuk berbagi pengetahuan, pengalaman, dan kolaborasi. Website ini menyediakan fitur forum diskusi, event meetup, sharing session, serta direktori anggota. Dibangun dengan Vue.js dan TypeScript untuk pengalaman pengguna yang interaktif dan kode yang terstruktur. Komunitas ini menjadi wadah bagi developer junior hingga senior untuk saling belajar dan mengembangkan karier di dunia web development.',
    tags: ['Vue.js', 'TypeScript', 'Tailwind'],
    image: 'assets/webcom.jpeg',
    link: '#'
}];

function openModal(index) {
    const data = projectsData[index];
    if (!data) return;

    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalLink.href = data.link;

    modalTags.innerHTML = data.tags.map(tag => {
        const icon = tagIconSrc(tag);
        const iconHtml = icon ? `<img class="tag-icon" src="${icon}" alt="" />` : '';
        return `<span class="tag">${iconHtml}${tag}</span>`;
    }).join('');

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.work-thumb[data-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.dataset.project, 10);
        openModal(index);
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
    }
});

// ============================================================
// 7. FOOTER YEAR
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// 8. LANGUAGE SWITCHER (ID & EN only)
// ============================================================
const translations = {
    id: {
        'nav.status': 'Tersedia untuk proyek baru',
        'nav.work': 'Proyek',
        'nav.services': 'Layanan',
        'nav.experience': 'Pengalaman',
        'nav.contact': 'Kontak',
        'nav.cta': 'Hubungi saya',
        'intro.eyebrow': '$ portfolio --init',
        'hero.role': 'role: Full-Stack Developer',
        'hero.desc': 'Menghadirkan produk digital yang responsif dan terarsitektur rapi, menjamin pengalaman pengguna yang optimal dari desain awal hingga tahap deployment.',
        'hero.cta': 'Lihat karya',
        'social.github.label': 'GitHub',
        'social.linkedin.label': 'LinkedIn',
        'social.instagram.label': 'Instagram',
        'work.label': 'selected work',
        'work.title': 'Proyek pilihan',
        'work.filter.all': 'Semua',
        'work.filter.product': 'Produk',
        'work.filter.exploration': 'Eksplorasi',
        'work.badge.product': 'product',
        'work.badge.exploration': 'exploration',
        'projects.0.title': 'PNB EAGLES SEASON 9 — E-Sports Tournament',
        'projects.1.title': 'IntechFest — Festival Teknologi',
        'projects.2.title': 'Melahin.id — Manajemen Sampah',
        'projects.3.title': 'Web Community — Komunitas Developer',
        'services.label': 'services',
        'services.title': 'Yang bisa dikerjakan',
        'services.items.0.name': 'Web Development',
        'services.items.0.desc': 'Membangun website dan web app dari nol dengan pendekatan modern. Fokus pada performa, aksesibilitas, dan pengalaman pengguna yang optimal. Menggunakan framework terbaru untuk hasil yang scalable dan mudah dipelihara.',
        'services.items.1.name': 'Backend & API',
        'services.items.1.desc': 'Merancang dan mengembangkan RESTful API serta sistem backend yang aman, terukur, dan efisien. Menerapkan best practice seperti autentikasi JWT, caching, dan optimasi query database untuk performa maksimal.',
        'services.items.2.name': 'UI Implementation',
        'services.items.2.desc': 'Menerjemahkan desain Figma menjadi antarmuka pixel-perfect dengan animasi halus dan interaksi yang responsif. Memastikan konsistensi visual di semua perangkat dan browser dengan pendekatan mobile-first.',
        'services.items.3.name': 'Performance & Deploy',
        'services.items.3.desc': 'Mengoptimalkan kecepatan loading website melalui teknik seperti code splitting, lazy loading, image optimization, dan caching. Menyiapkan alur deployment yang stabil dengan CI/CD dan containerization.',
        'experience.label': 'experience',
        'experience.title': 'Perjalanan karier',
        'experience.years': '5+ tahun pengalaman',
        'experience.items.0.company': 'Kampus Politeknik Negeri Bali',
        'experience.items.0.role': 'Mahasiswa D4 Teknologi Rekayasa Perangkat Lunak',
        'experience.items.0.date': '2024 — Sekarang',
        'experience.items.1.company': 'UKM Computer Club',
        'experience.items.1.role': 'Fungsionaris Divisi Web Development',
        'experience.items.1.date': '2024 — Sekarang',
        'experience.items.2.company': 'GRED (Robotika SMK TI Bali Global)',
        'experience.items.2.role': 'Pengurus Robotika (Divisi Line Follower dan Tim Kreatif)',
        'experience.items.2.date': '2023',
        'experience.items.3.company': 'PT Baliola Adi Maha Duta',
        'experience.items.3.role': 'Internship (Full-Stack Developer)',
        'experience.items.3.date': '2023',
        'experience.items.4.company': 'SMK TI Bali Global Denpasar',
        'experience.items.4.role': 'Siswa Jurusan Rekayasa Perangkat Lunak',
        'experience.items.4.date': '2021 — 2024',
        'contact.status': 'Tersedia untuk proyek baru',
        'contact.title': 'Siap membawa bisnis Anda ke tingkat berikutnya?',
        'contact.desc': 'Mari berdiskusi untuk membangun website yang responsif, cepat, dan siap membantu mengembangkan bisnis Anda.',
        'contact.cta': 'Hubungi saya',
        'modal.tech': 'Teknologi digunakan',
        'modal.cta': 'Lihat proyek',
        'footer.rights': 'Semua hak dilindungi.'
    },
    en: {
        'nav.status': 'Available for new projects',
        'nav.work': 'Work',
        'nav.services': 'Services',
        'nav.experience': 'Experience',
        'nav.contact': 'Contact',
        'nav.cta': "Let's talk",
        'intro.eyebrow': '$ portfolio --init',
        'hero.role': 'role: Full-Stack Developer',
        'hero.desc': 'Delivering responsive digital products with clean architecture, ensuring optimal user experience from design to deployment.',
        'hero.cta': 'View work',
        'social.github.label': 'GitHub',
        'social.linkedin.label': 'LinkedIn',
        'social.instagram.label': 'Instagram',
        'work.label': 'selected work',
        'work.title': 'Featured projects',
        'work.filter.all': 'All',
        'work.filter.product': 'Product',
        'work.filter.exploration': 'Exploration',
        'work.badge.product': 'product',
        'work.badge.exploration': 'exploration',
        'projects.0.title': 'PNB EAGLES SEASON 9 — E-Sports Tournament',
        'projects.1.title': 'IntechFest — Technology Festival',
        'projects.2.title': 'Melahin.id — Waste Management',
        'projects.3.title': 'Web Community — Developer Community',
        'services.label': 'services',
        'services.title': 'What I can do',
        'services.items.0.name': 'Web Development',
        'services.items.0.desc': 'Building websites and web apps from scratch with a modern approach. Focus on performance, accessibility, and optimal user experience using the latest frameworks for scalable and maintainable results.',
        'services.items.1.name': 'Backend & API',
        'services.items.1.desc': 'Designing and developing secure, scalable, and efficient RESTful APIs and backend systems. Implementing best practices like JWT authentication, caching, and query optimization for maximum performance.',
        'services.items.2.name': 'UI Implementation',
        'services.items.2.desc': 'Translating Figma designs into pixel-perfect interfaces with smooth animations and responsive interactions. Ensuring visual consistency across all devices and browsers with a mobile-first approach.',
        'services.items.3.name': 'Performance & Deploy',
        'services.items.3.desc': 'Optimizing website loading speed through code splitting, lazy loading, image optimization, and caching. Setting up stable deployment pipelines with CI/CD and containerization.',
        'experience.label': 'experience',
        'experience.title': 'Career journey',
        'experience.years': '5+ years experience',
        'experience.items.0.company': 'Politeknik Negeri Bali',
        'experience.items.0.role': 'D4 Software Engineering Technology Student',
        'experience.items.0.date': '2024 — Present',
        'experience.items.1.company': 'UKM Computer Club',
        'experience.items.1.role': 'Web Development Division Officer',
        'experience.items.1.date': '2024 — Present',
        'experience.items.2.company': 'GRED (Robotics SMK TI Bali Global)',
        'experience.items.2.role': 'Robotics Officer (Line Follower & Creative Team)',
        'experience.items.2.date': '2023',
        'experience.items.3.company': 'PT Baliola Adi Maha Duta',
        'experience.items.3.role': 'Internship (Full-Stack Developer)',
        'experience.items.3.date': '2023',
        'experience.items.4.company': 'SMK TI Bali Global Denpasar',
        'experience.items.4.role': 'Software Engineering Student',
        'experience.items.4.date': '2021 — 2024',
        'contact.status': 'Available for new projects',
        'contact.title': 'Ready to take your business to the next level?',
        'contact.desc': "Let's discuss building a responsive, fast website that helps grow your business.",
        'contact.cta': 'Contact me',
        'modal.tech': 'Technologies used',
        'modal.cta': 'View project',
        'footer.rights': 'All rights reserved.'
    }
};

let currentLang = localStorage.getItem('portfolio-lang') || 'id';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const translation = translations[lang]?.[key];
        if (translation !== undefined) {
            el.textContent = translation;
        }
    });

    const introEyebrow = document.querySelector('.intro-eyebrow');
    if (introEyebrow) {
        const key = introEyebrow.dataset.i18n;
        const translation = translations[lang]?.[key];
        if (translation !== undefined) {
            introEyebrow.textContent = translation;
        }
    }

    const contactStatus = document.querySelector('.contact .status-badge span[data-i18n]');
    if (contactStatus) {
        const key = contactStatus.dataset.i18n;
        const translation = translations[lang]?.[key];
        if (translation !== undefined) {
            contactStatus.textContent = translation;
        }
    }

    document.documentElement.lang = lang;
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
    });
});

setLanguage(currentLang);

// ============================================================
// 9. INTRO OVERLAY
// ============================================================
(function () {
    const overlay = document.getElementById('introOverlay');
    if (!overlay) return;

    const wordEl = document.getElementById('introWord');
    const words = ['Hello', 'Bonjour', 'Hola', 'Ciao', 'Hallo', 'こんにちは', '안녕하세요', 'Привет', 'Halo'];
    const finalWord = words[words.length - 1];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function dismiss() {
        overlay.classList.add('is-hidden');
        document.body.style.overflow = '';
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('intro:complete'));
        }, 550);
        setTimeout(() => overlay.remove(), 750);
    }

    document.body.style.overflow = 'hidden';

    if (prefersReducedMotion) {
        wordEl.textContent = finalWord;
        setTimeout(dismiss, 900);
        return;
    }

    let i = 0;
    const cycleDelay = 380;

    function showNextWord() {
        wordEl.textContent = words[i];
        wordEl.classList.remove('is-morphing');
        void wordEl.offsetWidth;
        wordEl.classList.add('is-morphing');

        if (words[i] === finalWord) {
            setTimeout(dismiss, 700);
            return;
        }

        i++;
        setTimeout(showNextWord, cycleDelay);
    }

    setTimeout(showNextWord, 500);
})();