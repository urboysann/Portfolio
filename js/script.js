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
// 3. REVEAL ON SCROLL (Intersection Observer)
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

    const t = window.translations[window.currentLang];
    modalTitle.dataset.i18n = `projects.${index}.title`;
    modalDesc.dataset.i18n = `projects.${index}.desc`;
    modalTitle.textContent = t[`projects.${index}.title`] || data.title;
    modalDesc.textContent = t[`projects.${index}.desc`] || data.desc;
    
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
// 8. INTRO OVERLAY
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

// ============================================================
// 9. LANGUAGE SELECTOR
// ============================================================
(function () {
    const langBtns = document.querySelectorAll('.lang-btn');
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangLabel = document.getElementById('currentLangLabel');

    // --- Translation data ---
    const translations = {
        id: {
            lang: '🇮🇩 ID',
            // Intro
            'intro.eyebrow': '$ portfolio --init',
            // Nav
            'nav.status': 'Tersedia untuk proyek baru',
            'nav.work': 'Work <sup>[04]</sup>',
            'nav.services': 'Services <sup>[04]</sup>',
            'nav.experience': 'Experience <sup>[5y+]</sup>',
            'nav.contact': 'Contact',
            'nav.cta': 'Let\'s talk',
            // Hero
            'hero.role': 'role: Full-Stack Developer',
            'hero.desc': 'Menghadirkan produk digital yang responsif dan terarsitektur rapi, menjamin pengalaman pengguna yang optimal dari desain awal hingga tahap deployment.',
            'hero.cta': 'Lihat karya',
            // Work
            'work.label': 'selected work',
            'work.title': 'Proyek pilihan',
            'work.filterAll': 'Semua',
            'work.filterProduct': 'Produk',
            'work.filterExploration': 'Eksplorasi',
            'projects.0.title': 'PNB EAGLES SEASON 9 — E-Sports Tournament',
            'projects.0.desc': 'Platform turnamen E-Sports resmi yang diselenggarakan oleh UKM Computer Club, Politeknik Negeri Bali. Event ini menjadi wadah bagi para gamers dan pecinta esports di Bali untuk berkompetisi dan mengembangkan bakat. Season 9 menghadirkan 5 kategori permainan berbeda dengan total hadiah mencapai 8 juta rupiah. Dibangun dengan Next.js untuk performa terbaik dan Tailwind CSS untuk antarmuka yang modern dan responsif. Platform ini mendukung manajemen peserta, jadwal pertandingan, dan sistem bracket otomatis.',
            'projects.1.title': 'IntechFest — Festival Teknologi',
            'projects.1.desc': 'Festival teknologi tahunan yang diselenggarakan oleh UKM Computer Club, Politeknik Negeri Bali. IntechFest merupakan ajang kompetisi di bidang Web Development, UI/UX Design, dan Capture The Flag (CTF) cybersecurity. Acara ini juga menghadirkan seminar dari para ahli industri teknologi. Platform dibangun dengan Laravel untuk backend yang solid dan Tailwind CSS untuk tampilan yang elegan. Sistem ini mengelola pendaftaran peserta, pengumpulan karya, penjurian, dan pengumuman pemenang secara terintegrasi.',
            'projects.2.title': 'Melahin.id — Manajemen Sampah',
            'projects.2.desc': 'Platform berbasis website yang bertujuan untuk mengedukasi dan membantu masyarakat dalam pengelolaan sampah. IMelahin.id menyediakan informasi tentang jenis sampah, cara daur ulang, dan lokasi bank sampah terdekat. Proyek ini dibangun dengan HTML, CSS, dan JavaScript murni sebagai bentuk kepedulian terhadap lingkungan, khususnya mengatasi permasalahan sampah di Bali. Menampilkan data statistik real-time tentang volume sampah, partisipasi masyarakat, dan dampak lingkungan.',
            'projects.3.title': 'Web Community — Komunitas Developer',
            'projects.3.desc': 'Platform komunitas untuk para web developer di Bali yang bertujuan untuk berbagi pengetahuan, pengalaman, dan kolaborasi. Website ini menyediakan fitur forum diskusi, event meetup, sharing session, serta direktori anggota. Dibangun dengan Vue.js dan TypeScript untuk pengalaman pengguna yang interaktif dan kode yang terstruktur. Komunitas ini menjadi wadah bagi developer junior hingga senior untuk saling belajar dan mengembangkan karier di dunia web development.',
            // Services
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
            // Experience
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
            // Contact
            'contact.status': 'Tersedia untuk proyek baru',
            'contact.title': 'Siap membawa bisnis Anda ke tingkat berikutnya?',
            'contact.desc': 'Mari berdiskusi untuk membangun website yang responsif, cepat, dan siap membantu mengembangkan bisnis Anda.',
            'contact.cta': 'Hubungi saya',
            // Modal
            'modal.techLabel': 'Teknologi digunakan',
            'modal.cta': 'Lihat proyek',
            // Footer
            'footer.rights': 'Semua hak dilindungi.'
        },
        en: {
            lang: '🇬🇧 EN',
            'intro.eyebrow': '$ portfolio --init',
            'nav.status': 'Available for new projects',
            'nav.work': 'Work <sup>[04]</sup>',
            'nav.services': 'Services <sup>[04]</sup>',
            'nav.experience': 'Experience <sup>[5y+]</sup>',
            'nav.contact': 'Contact',
            'nav.cta': "Let's talk",
            'hero.role': 'role: Full-Stack Developer',
            'hero.desc': 'Delivering responsive and well-architected digital products, ensuring optimal user experience from initial design to deployment.',
            'hero.cta': 'See work',
            'work.label': 'selected work',
            'work.title': 'Featured Projects',
            'work.filterAll': 'All',
            'work.filterProduct': 'Product',
            'work.filterExploration': 'Exploration',
            'projects.0.title': 'PNB EAGLES SEASON 9 — E-Sports Tournament',
            'projects.0.desc': 'Official E-Sports tournament platform organized by UKM Computer Club, Politeknik Negeri Bali. This event is a place for gamers and esports lovers in Bali to compete and develop their talents. Season 9 features 5 different game categories with a total prize pool of 8 million rupiah. Built with Next.js for maximum performance and Tailwind CSS for a modern and responsive interface. This platform supports participant management, match scheduling, and automatic bracket systems.',
            'projects.1.title': 'IntechFest — Technology Festival',
            'projects.1.desc': 'An annual technology festival organized by UKM Computer Club, Politeknik Negeri Bali. IntechFest is a competition in Web Development, UI/UX Design, and cybersecurity Capture The Flag (CTF). This event also features seminars from technology industry experts. The platform is built with Laravel for a solid backend and Tailwind CSS for an elegant display. The system seamlessly manages participant registration, submission collection, judging, and winner announcements.',
            'projects.2.title': 'Melahin.id — Waste Management',
            'projects.2.desc': 'A website-based platform that aims to educate and assist the community in waste management. IMelahin.id provides information on types of waste, recycling methods, and the nearest waste bank locations. This project was built with pure HTML, CSS, and JavaScript as a form of care for the environment, especially overcoming waste problems in Bali. Displays real-time statistical data on waste volume, community participation, and environmental impact.',
            'projects.3.title': 'Web Community — Developer Community',
            'projects.3.desc': 'A community platform for web developers in Bali that aims to share knowledge, experiences, and collaborate. This website provides discussion forums, meetup events, sharing sessions, and a member directory. Built with Vue.js and TypeScript for an interactive user experience and structured code. This community is a place for junior to senior developers to learn from each other and develop their careers in web development.',
            'services.label': 'services',
            'services.title': 'What I Can Do',
            'services.items.0.name': 'Web Development',
            'services.items.0.desc': 'Building websites and web apps from scratch with a modern approach. Focus on performance, accessibility, and optimal user experience. Using the latest frameworks for scalable and maintainable results.',
            'services.items.1.name': 'Backend & API',
            'services.items.1.desc': 'Designing and developing RESTful APIs and backend systems that are secure, scalable, and efficient. Implementing best practices like JWT authentication, caching, and database query optimization for maximum performance.',
            'services.items.2.name': 'UI Implementation',
            'services.items.2.desc': 'Translating Figma designs into pixel-perfect interfaces with smooth animations and responsive interactions. Ensuring visual consistency across all devices and browsers with a mobile-first approach.',
            'services.items.3.name': 'Performance & Deploy',
            'services.items.3.desc': 'Optimizing website loading speed through techniques like code splitting, lazy loading, image optimization, and caching. Setting up stable deployment pipelines with CI/CD and containerization.',
            'experience.label': 'experience',
            'experience.title': 'Career Journey',
            'experience.years': '5+ years experience',
            'experience.items.0.company': 'Politeknik Negeri Bali',
            'experience.items.0.role': 'Student D4 Software Engineering Technology',
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
            'experience.items.4.role': 'Student of Software Engineering',
            'experience.items.4.date': '2021 — 2024',
            'contact.status': 'Available for new projects',
            'contact.title': 'Ready to take your business to the next level?',
            'contact.desc': 'Let\'s discuss building a responsive, fast website that helps grow your business.',
            'contact.cta': 'Contact me',
            'modal.techLabel': 'Technologies used',
            'modal.cta': 'View project',
            'footer.rights': 'All rights reserved.'
        },
        ja: {
            lang: '🇯🇵 日本語',
            'intro.eyebrow': '$ portfolio --init',
            'nav.status': '新規プロジェクト受付中',
            'nav.work': '作品 <sup>[04]</sup>',
            'nav.services': 'サービス <sup>[04]</sup>',
            'nav.experience': '経歴 <sup>[5y+]</sup>',
            'nav.contact': 'お問い合わせ',
            'nav.cta': 'お問い合わせ',
            'hero.role': '役割: フルスタック開発者',
            'hero.desc': 'レスポンシブでよく構造化されたデジタル製品を提供し、初期設計からデプロイメントまで最適なユーザー体験を保証します。',
            'hero.cta': '作品を見る',
            'work.label': '厳選作品',
            'work.title': '注目プロジェクト',
            'work.filterAll': 'すべて',
            'work.filterProduct': 'プロダクト',
            'work.filterExploration': '探索',
            'projects.0.title': 'PNB EAGLES SEASON 9 — Eスポーツトーナメント',
            'projects.0.desc': 'バリ国立工科大学のUKMコンピュータクラブが主催する公式Eスポーツトーナメントプラットフォーム。このイベントは、バリ島のゲーマーやeスポーツ愛好家が競争し、才能を伸ばすための場です。シーズン9では、総額800万ルピアの賞金が用意された5つの異なるゲームカテゴリーがあります。最高のパフォーマンスを実現するNext.jsと、モダンでレスポンシブなインターフェースのためのTailwind CSSで構築されています。このプラットフォームは、参加者管理、試合のスケジューリング、および自動ブラケットシステムをサポートしています。',
            'projects.1.title': 'IntechFest — テクノロジーフェスティバル',
            'projects.1.desc': 'バリ国立工科大学のUKMコンピュータクラブが主催する毎年恒例のテクノロジーフェスティバル。IntechFestは、Web開発、UI/UXデザイン、サイバーセキュリティのCapture The Flag (CTF)のコンペティションです。このイベントでは、テクノロジー業界の専門家によるセミナーも開催されます。プラットフォームは、堅牢なバックエンドのためのLaravelとエレガントな表示のためのTailwind CSSで構築されています。システムは参加登録、提出物の収集、審査、および勝者の発表をシームレスに管理します。',
            'projects.2.title': 'Melahin.id — 廃棄物管理',
            'projects.2.desc': '廃棄物管理に関するコミュニティの教育と支援を目的としたWebベースのプラットフォーム。IMelahin.idは、廃棄物の種類、リサイクル方法、および最寄りの廃棄物バンクの場所に関する情報を提供します。このプロジェクトは、特にバリ島の廃棄物問題を克服するための環境への配慮の一環として、純粋なHTML、CSS、JavaScriptで構築されました。廃棄物の量、コミュニティの参加、環境への影響に関するリアルタイムの統計データを表示します。',
            'projects.3.title': 'Web Community — 開発者コミュニティ',
            'projects.3.desc': '知識や経験を共有し、協力することを目的としたバリ島のWeb開発者向けのコミュニティプラットフォーム。このWebサイトは、ディスカッションフォーラム、ミートアップイベント、共有セッション、メンバーディレクトリを提供します。インタラクティブなユーザー体験と構造化されたコードのためにVue.jsとTypeScriptで構築されています。このコミュニティは、ジュニアからシニアまでの開発者が互いに学び、Web開発のキャリアを発展させるための場所です。',
            'services.label': 'サービス',
            'services.title': '提供できるサービス',
            'services.svc0.name': 'Web開発',
            'services.svc0.desc': '最新のアプローチでゼロからWebサイトやWebアプリを構築します。パフォーマンス、アクセシビリティ、最適なユーザー体験に焦点を当てています。スケーラブルで保守しやすい結果を得るために最新のフレームワークを使用しています。',
            'services.svc1.name': 'バックエンド & API',
            'services.svc1.desc': '安全でスケーラブル、効率的なRESTful APIとバックエンドシステムを設計・開発します。JWT認証、キャッシング、データベースクエリ最適化などのベストプラクティスを実装し、最大のパフォーマンスを実現します。',
            'services.svc2.name': 'UI実装',
            'services.svc2.desc': 'Figmaデザインをピクセルパーフェクトなインターフェースに変換し、スムーズなアニメーションとレスポンシブなインタラクションを実現します。モバイルファーストのアプローチで、すべてのデバイスとブラウザで視覚的な一貫性を確保します。',
            'services.svc3.name': 'パフォーマンス & デプロイ',
            'services.svc3.desc': 'コードスプリッティング、レイジーローディング、画像最適化、キャッシングなどの技術を使用してWebサイトの読み込み速度を最適化します。CI/CDとコンテナ化で安定したデプロイメントパイプラインを構築します。',
            'experience.label': '経歴',
            'experience.title': 'キャリアの歩み',
            'experience.years': '5年以上の経験',
            'experience.items.0.company': 'バリ国立工科大学',
            'experience.items.0.role': 'ソフトウェアエンジニアリング技術 D4 学生',
            'experience.items.0.date': '2024 — 現在',
            'experience.items.1.company': 'UKM Computer Club',
            'experience.items.1.role': 'Web開発部門 役員',
            'experience.items.1.date': '2024 — 現在',
            'experience.items.2.company': 'GRED (ロボティクス SMK TI Bali Global)',
            'experience.items.2.role': 'ロボティクス役員 (ラインフォロワー & クリエイティブチーム)',
            'experience.items.2.date': '2023',
            'experience.items.3.company': 'PT Baliola Adi Maha Duta',
            'experience.items.3.role': 'インターンシップ (フルスタック開発者)',
            'experience.items.3.date': '2023',
            'experience.items.4.company': 'SMK TI Bali Global Denpasar',
            'experience.items.4.role': 'ソフトウェアエンジニアリング 学生',
            'experience.items.4.date': '2021 — 2024',
            'contact.status': '新規プロジェクト受付中',
            'contact.title': 'ビジネスを次のレベルに引き上げる準備はできていますか？',
            'contact.desc': 'レスポンシブで高速なWebサイトを構築し、ビジネスの成長を支援するためのディスカッションをしましょう。',
            'contact.cta': 'お問い合わせ',
            'modal.techLabel': '使用技術',
            'modal.cta': 'プロジェクトを見る',
            'footer.rights': 'All rights reserved.'
        }
    };

    let currentLang = 'id';

    // --- Toggle dropdown ---
    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = langDropdown.classList.contains('is-open');
            langDropdown.classList.toggle('is-open');
            langToggle.setAttribute('aria-expanded', !isOpen);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langDropdown.classList.remove('is-open');
            langToggle.setAttribute('aria-expanded', 'false');
        });

        langDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // --- Language selection (Desktop + Mobile) ---
    const handleLangSelect = (lang) => {
        if (lang && translations[lang]) {
            switchLanguage(lang);
        }
        if (langDropdown && langToggle) {
            langDropdown.classList.remove('is-open');
            langToggle.setAttribute('aria-expanded', 'false');
        }
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => handleLangSelect(btn.dataset.lang));
    });

    langOptions.forEach(option => {
        option.addEventListener('click', () => handleLangSelect(option.dataset.lang));
    });

    function switchLanguage(lang) {
        currentLang = lang;
        window.currentLang = lang;
        const t = window.translations[lang];

        // Update toggle label
        if (currentLangLabel) {
            currentLangLabel.textContent = lang.toUpperCase();
        }

        // Update active state on buttons (Desktop)
        langBtns.forEach(btn => {
            btn.classList.toggle('is-active', btn.dataset.lang === lang);
        });

        // Update active state on dropdown options (Mobile)
        langOptions.forEach(opt => {
            opt.classList.toggle('is-active', opt.dataset.lang === lang);
        });

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key] !== undefined) {
                // If the element contains HTML (like sup tags), use innerHTML
                if (key === 'nav.work' || key === 'nav.services' || key === 'nav.experience') {
                    el.innerHTML = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Save preference
        try {
            localStorage.setItem('preferred-lang', lang);
        } catch (e) { }

        // Re-apply service accordion state? No need, just text changed.
        // Work card titles already updated via data-i18n.
        // Modal tech label updated.

        // Update modal tech label and cta if modal is open or not
        document.querySelectorAll('.modal-tech-label span, .modal-link').forEach(el => {
            const key = el.dataset.i18n;
            if (key && t[key]) {
                el.textContent = t[key];
            }
        });
    }

    // --- Load saved language preference ---
    try {
        const saved = localStorage.getItem('preferred-lang');
        if (saved && translations[saved]) {
            currentLang = saved;
            // Need to wait for DOM ready to apply
            setTimeout(() => {
                switchLanguage(saved);
            }, 100);
        }
    } catch (e) { }

    // Expose for debugging and global access
    window.switchLanguage = switchLanguage;
    window.translations = translations;
    window.currentLang = currentLang;

    // Update modal tech label and cta when modal opens (already handled)
    // But also handle initial state
    setTimeout(() => {
        // Ensure modal labels are correct
        const techLabel = document.querySelector('.modal-tech-label span');
        const modalCta = document.querySelector('.modal-link');
        if (techLabel && techLabel.dataset.i18n) {
            const key = techLabel.dataset.i18n;
            const t = translations[currentLang];
            if (t[key]) techLabel.textContent = t[key];
        }
        if (modalCta && modalCta.dataset.i18n) {
            const key = modalCta.dataset.i18n;
            const t = translations[currentLang];
            if (t[key]) modalCta.textContent = t[key];
        }
    }, 200);

})();