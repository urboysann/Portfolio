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

// Tutup menu mobile saat salah satu link diklik — HANYA jika sedang di mode mobile,
// supaya di desktop nav-links tidak ikut ke-hide saat link diklik
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNavQuery.matches) {
            navLinks.style.display = 'none';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Reset state menu saat layar di-resize melewati breakpoint tablet,
// supaya inline style dari mode mobile tidak "nyangkut" di layar desktop
function handleNavBreakpointChange(e) {
    if (!e.matches) {
        navLinks.style.display = '';
        navToggle.setAttribute('aria-expanded', 'false');
    }
}
mobileNavQuery.addEventListener('change', handleNavBreakpointChange);

// ============================================================
// 3. REVEAL ON SCROLL (Intersection Observer)
// ============================================================
const revealElements = document.querySelectorAll('.reveal');

// Jika ada overlay intro, tahan animasi reveal sampai overlay selesai
// (agar elemen tidak "selesai" beranimasi diam-diam di balik overlay)
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
// 5. SERVICES ACCORDION — semua tertutup, toggle dengan ikon dropdown
// ============================================================
const serviceItems = document.querySelectorAll('[data-service]');

serviceItems.forEach(item => {
    const trigger = item.querySelector('.service-trigger');

    trigger.addEventListener('click', () => {
        // Tutup semua service lain
        serviceItems.forEach(other => {
            if (other !== item && other.classList.contains('is-open')) {
                other.classList.remove('is-open');
            }
        });

        // Toggle yang diklik
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

// Mapping nama teknologi -> slug icon (Simple Icons CDN)
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

// Data proyek (diperbarui dengan deskripsi informatif)
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

// Buka modal
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

// Tutup modal
function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
}

// Event listener untuk tombol di kartu proyek
document.querySelectorAll('.work-thumb[data-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.dataset.project, 10);
        openModal(index);
    });
});

// Tutup modal via tombol close
modalClose.addEventListener('click', closeModal);

// Tutup modal via klik overlay
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Tutup modal dengan Escape
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
// 8. INTRO OVERLAY (welcome / boot sequence)
// ============================================================
(function () {
    const overlay = document.getElementById('introOverlay');
    if (!overlay) return;

    const wordEl = document.getElementById('introWord');

    // Urutan kata "halo" lintas bahasa, berhenti di "Halo" (Indonesia)
    const words = ['Hello', 'Bonjour', 'Hola', 'Ciao', 'Hallo', 'こんにちは', '안녕하세요', 'Привет', 'Halo'];
    const finalWord = words[words.length - 1];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function dismiss() {
        overlay.classList.add('is-hidden');
        document.body.style.overflow = '';
        // Picu reveal elemen situs saat overlay hampir selesai slide,
        // supaya animasinya jelas kelihatan di layar (bukan tertutup overlay)
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('intro:complete'));
        }, 550);
        setTimeout(() => overlay.remove(), 750);
    }

    document.body.style.overflow = 'hidden';

    // Hormati preferensi reduced motion: langsung tampilkan kata akhir lalu slide masuk
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
        void wordEl.offsetWidth; // restart animasi CSS
        wordEl.classList.add('is-morphing');

        if (words[i] === finalWord) {
            setTimeout(dismiss, 700); // beri jeda sebentar di kata final, lalu slide otomatis
            return;
        }

        i++;
        setTimeout(showNextWord, cycleDelay);
    }

    setTimeout(showNextWord, 500);
})();