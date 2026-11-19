/**
 * ===================================================================
 * PORTOFOLIO CZARENNA CALLISTA CLIONA HARIE
 * Interactive App Script:
 * - Floating Pill Navbar Scroll Spy & Smooth Transition
 * - Hero Typewriter Effect (Cinematographer, Illustrator, Film Director, CIMS)
 * - Merged About & Pengalaman: Skills, Software, & 8 Filterable Experiences
 * - Hasil Karya Gallery & Detail Modal Lightbox
 * - Audio Effects & Interactive Fish Feeding Controls
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.portfolioData;
  if (!data) return;

  // =================================================================
  // AUTHENTIC PROFILE PHOTO INITIALIZATION
  // =================================================================
  const cioProfileImg = document.getElementById('cio-profile-img');
  if (cioProfileImg && window.CIO_PROFILE_IMAGE) {
    cioProfileImg.src = window.CIO_PROFILE_IMAGE;
  }

  // =================================================================
  // 1. TYPEWRITER ANIMATION IN HERO SECTION (GLOBAL CREATIVE DISCIPLINES)
  // =================================================================
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const phrases = (data.home && data.home.typewriterPhrases) || [
      "Cinematography & Visual Storytelling.",
      "Digital Illustration & Character Design.",
      "Film Directing & Production.",
      "Video Editing & Color Grading.",
      "Art Direction & Concept Design.",
      "Photography & Portrait Lighting."
    ];

    let phraseIdx = 0;
    let charIdx = phrases[0].length;
    let isDeleting = true;
    let typingSpeed = 2400; // Hold full phrase for 2.4s

    function typeLoop() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        // Finished typing word, hold for reading
        typingSpeed = 2400;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        // Immediately start next phrase without lingering on blank
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 100;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typewriterEl.textContent = phrases[0];
    setTimeout(typeLoop, typingSpeed);
  }

  // =================================================================
  // 2. ABOUT: RENDER INTERACTIVE TABS (HARD SKILLS, SOFTWARE, SOFT SKILLS)
  // =================================================================
  
  // 2A. Hard Skills
  const hardSkillsContainer = document.getElementById('hard-skills-list');
  if (hardSkillsContainer && data.about.hardSkills) {
    hardSkillsContainer.innerHTML = data.about.hardSkills.map(skill => `
      <div class="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/5 transition-all group flex items-start gap-3">
        <div class="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
          <i data-lucide="${skill.icon || 'star'}" class="w-4 h-4"></i>
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">${skill.name}</p>
          <p class="text-[11px] text-slate-500 mt-0.5 leading-snug">${skill.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // 2B. Software & Tools (With authentic official logos and clean spacious alignment)
  const softwareContainer = document.getElementById('software-list');
  if (softwareContainer && data.about.software) {
    softwareContainer.innerHTML = data.about.software.map(sw => {
      const badgeStyle = sw.mastery === 'Advanced'
        ? 'bg-blue-50 text-blue-700 border-blue-200/90'
        : sw.mastery === 'Proficient'
        ? 'bg-sky-50 text-sky-700 border-sky-200/90'
        : 'bg-amber-50 text-amber-700 border-amber-200/90';

      return `
      <div class="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group flex flex-col justify-between">
        <div>
          <!-- Header: Official Logo + Level Badge -->
          <div class="flex items-center justify-between gap-3 mb-3.5">
            <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <img 
                src="${sw.logoUrl}" 
                alt="${sw.name}" 
                referrerpolicy="no-referrer"
                class="w-full h-full object-contain rounded-lg"
              />
            </div>
            <span class="text-[11px] font-mono font-bold px-3 py-1 rounded-full border shadow-2xs ${badgeStyle}">
              ${sw.mastery || 'Proficient'}
            </span>
          </div>

          <!-- App Title & Category: Uncramped, Clean Typography -->
          <div class="mb-3">
            <h5 class="font-hero font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              ${sw.name}
            </h5>
            <div class="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500 font-mono">
              <span class="font-semibold text-slate-700">${sw.category}</span>
              <span>&bull;</span>
              <span class="text-blue-600 font-bold uppercase tracking-wider text-[10px]">${sw.role}</span>
            </div>
          </div>
        </div>

        <!-- Description Footer -->
        <div class="pt-3 border-t border-slate-100/90 mt-1">
          <p class="text-xs text-slate-600 leading-relaxed">${sw.desc}</p>
        </div>
      </div>
    `;
    }).join('');
  }

  // 2C. Soft Skills (Rich visual character & leadership cards)
  const softSkillsContainer = document.getElementById('soft-skills-list');
  if (softSkillsContainer && data.about.softSkills) {
    softSkillsContainer.innerHTML = data.about.softSkills.map(soft => `
      <div class="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-blue-400 hover:shadow-xs transition-all group flex items-start gap-3">
        <div class="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200/70 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
          <i data-lucide="${soft.icon || 'check'}" class="w-4 h-4"></i>
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2 mb-0.5 flex-wrap">
            <p class="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">${soft.name}</p>
            <span class="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
              ${soft.badge}
            </span>
          </div>
          <p class="text-[11px] text-slate-600 leading-snug">${soft.desc}</p>
        </div>
      </div>
    `).join('');
  }


  // 2E. Interactive Tab Switching Logic
  const aboutTabButtons = document.querySelectorAll('.about-tab-btn');
  const aboutTabPanes = document.querySelectorAll('.about-tab-pane');

  aboutTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      aboutTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      aboutTabPanes.forEach(pane => {
        pane.classList.add('hidden');
        pane.classList.remove('block');
      });

      const activePane = document.getElementById(`tab-pane-${targetTab}`);
      if (activePane) {
        activePane.classList.remove('hidden');
        activePane.classList.add('block');
      }

      if (window.lucide) {
        lucide.createIcons();
      }
    });
  });

  // 2F. Copy Email Button in Profile Card
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'chaiyouuu@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Email ${email} copied!`);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      } else {
        showToast(`Email: ${email}`);
      }
    });
  }

  // =================================================================
  // 3. ABOUT & EXPERIENCE: RENDER 8 DOCUMENTED EXPERIENCES
  // =================================================================
  const pengalamanFilterContainer = document.getElementById('pengalaman-filters');
  const pengalamanList = document.getElementById('pengalaman-list');

  const expCategories = [
    { label: "All Experience (8)", value: "all" },
    { label: "Film Production", value: "film" },
    { label: "Events & Organization", value: "event" }
  ];
  let activeExpFilter = "all";

  function renderPengalamanFilters() {
    if (!pengalamanFilterContainer) return;
    pengalamanFilterContainer.innerHTML = expCategories.map(cat => `
      <button 
        data-filter="${cat.value}"
        class="exp-filter-btn px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
          cat.value === activeExpFilter
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
            : 'bg-white/90 text-slate-600 border border-slate-200 hover:border-blue-500 shadow-sm'
        }"
      >
        ${cat.label}
      </button>
    `).join('');

    pengalamanFilterContainer.querySelectorAll('.exp-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeExpFilter = btn.getAttribute('data-filter');
        renderPengalamanFilters();
        renderPengalamanList();
      });
    });
  }

  function renderPengalamanList() {
    if (!pengalamanList || !data.pengalaman) return;

    let filtered = data.pengalaman;
    if (activeExpFilter === "film") {
      filtered = data.pengalaman.filter(exp => 
        exp.category.includes("Film") || exp.category.includes("Sinema")
      );
    } else if (activeExpFilter === "event") {
      filtered = data.pengalaman.filter(exp => 
        !exp.category.includes("Film") && !exp.category.includes("Sinema")
      );
    }

    pengalamanList.innerHTML = filtered.map(exp => `
      <div class="water-glass-panel p-6 sm:p-7 space-y-4">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[11px] font-bold text-blue-600 uppercase font-mono tracking-wider">${exp.category}</span>
              <span class="text-slate-300">&bull;</span>
              <span class="text-xs text-slate-500 font-mono">${exp.period}</span>
            </div>
            <h4 class="font-hero text-lg sm:text-xl font-bold text-slate-950">
              ${exp.title}
            </h4>
          </div>
          <span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 w-fit">
            Role: ${exp.role}
          </span>
        </div>

        <!-- Description -->
        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
          ${exp.desc}
        </p>

        <!-- Highlights Checklist -->
        <div class="pt-2">
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-2">Key Responsibilities &amp; Highlights:</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            ${exp.points.map(pt => `
              <div class="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2">
                <span class="text-blue-600 font-bold">&check;</span>
                <span>${pt}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
    initCardSpotlights();
  }

  renderPengalamanFilters();
  renderPengalamanList();

  // =================================================================
  // 4. ARTWORKS GALLERY: FILTER & STORYBOARD GALLERY
  // =================================================================
  const filterContainer = document.getElementById('karya-filters');
  const karyaGrid = document.getElementById('karya-grid');
  const categories = ["All", "Illustration", "Photography", "Graphic Design", "Crochet"];
  let activeCat = "All";

  function renderKaryaFilters() {
    if (!filterContainer) return;
    filterContainer.innerHTML = categories.map(cat => `
      <button 
        data-cat="${cat}"
        class="karya-filter-btn px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
          cat === activeCat 
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
            : 'bg-white/90 text-slate-600 border border-slate-200 hover:border-blue-500 shadow-sm'
        }"
      >
        ${cat}
      </button>
    `).join('');

    filterContainer.querySelectorAll('.karya-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCat = btn.getAttribute('data-cat');
        renderKaryaFilters();
        renderKarya();
      });
    });
  }

  function renderKarya() {
    if (!karyaGrid || !data.karya) return;
    const filtered = activeCat === "All" 
      ? data.karya 
      : data.karya.filter(k => k.category === activeCat);

    karyaGrid.innerHTML = filtered.map((item) => `
      <div 
        class="water-glass-panel overflow-hidden group cursor-pointer flex flex-col justify-between"
        onclick="openSinglePhotoModal('${item.image}', '${item.category}', '${item.tag}')"
      >
        <div>
          <!-- Thumbnail Container: Full Image Presentation (No Carousel) -->
          <div class="h-64 sm:h-72 overflow-hidden bg-slate-900 relative">
            <img 
              src="${item.image}" 
              alt="${item.category}" 
              loading="lazy"
              referrerpolicy="no-referrer"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10 pointer-events-none"></div>
            
            <div class="absolute top-3 left-3 z-20">
              <span class="px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-[10px] font-mono font-bold text-white shadow-sm">
                ${item.category}
              </span>
            </div>
            <div class="absolute top-3 right-3 z-20">
              <span class="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-slate-800 border border-slate-200 shadow-sm">
                ${item.tag}
              </span>
            </div>
          </div>

          <!-- Card Info: Category Only (Minimalist) -->
          <div class="p-3.5 sm:p-4 flex items-center justify-between border-t border-slate-100 bg-white/60">
            <span class="font-display font-bold text-xs text-slate-700 bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/80">
              ${item.category}
            </span>
            <span class="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-mono">
              <span>View Artwork</span>
              <span>&rarr;</span>
            </span>
          </div>
        </div>
      </div>
    `).join('');

    initCardSpotlights();
  }

  renderKaryaFilters();
  renderKarya();

  // =================================================================
  // 5. PROJECTS SHOWCASE: FILTER & RENDER
  // =================================================================
  const projectsFilterContainer = document.getElementById('projects-filters');
  const projectsGrid = document.getElementById('projects-grid');
  const projectCategories = ["All Projects", "Photography", "Character Design"];
  let activeProjCat = "All Projects";

  function renderProjectsFilters() {
    if (!projectsFilterContainer) return;
    projectsFilterContainer.innerHTML = projectCategories.map(cat => `
      <button 
        data-cat="${cat}"
        class="proj-filter-btn px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
          cat === activeProjCat 
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
            : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-500 shadow-sm'
        }"
      >
        ${cat}
      </button>
    `).join('');

    projectsFilterContainer.querySelectorAll('.proj-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeProjCat = btn.getAttribute('data-cat');
        renderProjectsFilters();
        renderProjects();
      });
    });
  }

  function renderProjects() {
    if (!projectsGrid || !data.projects) return;
    const filtered = activeProjCat === "All Projects"
      ? data.projects
      : data.projects.filter(p => p.category === activeProjCat);

    projectsGrid.innerHTML = filtered.map(proj => {
      const hasMultiple = proj.images && proj.images.length > 1;
      const imagesList = hasMultiple ? proj.images : [proj.image || (proj.images && proj.images[0])];

      return `
      <div 
        class="water-glass-panel overflow-hidden group cursor-pointer flex flex-col justify-between"
        onclick="openProjectModal('${proj.id}')"
      >
        <div>
          <!-- Thumbnail with Carousel Support -->
          <div class="h-60 sm:h-64 overflow-hidden bg-slate-900 relative card-carousel">
            ${imagesList.map((img, idx) => `
              <img 
                src="${img}" 
                alt="${proj.title}" 
                loading="lazy"
                referrerpolicy="no-referrer"
                class="carousel-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}"
              />
            `).join('')}

            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent z-10 pointer-events-none"></div>
            
            <div class="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-20">
              <span class="px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-[10px] font-mono font-bold text-white shadow-sm">
                ${proj.category}
              </span>
              <span class="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-slate-200 shadow-sm">
                ${proj.tag}
              </span>
            </div>

            <div class="absolute top-3.5 right-3.5 z-20">
              <span class="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-slate-800 border border-slate-200 shadow-sm">
                ${proj.year}
              </span>
            </div>

            ${hasMultiple ? `
              <!-- Multi-photo indicators on Image Bottom -->
              <div class="absolute bottom-3 left-3.5 z-20 pointer-events-none">
                <span class="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono flex items-center gap-1.5 shadow-sm">
                  <span>📸</span>
                  <span class="carousel-counter">1/${imagesList.length}</span>
                </span>
              </div>
              <div class="absolute bottom-4 right-3.5 flex items-center gap-1.5 z-20 pointer-events-none">
                ${imagesList.map((_, idx) => `
                  <span class="carousel-dot h-1.5 rounded-full transition-all duration-500 ${idx === 0 ? 'bg-white w-4' : 'bg-white/50 w-1.5'}"></span>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Body Info: Title Only -->
          <div class="p-5 sm:p-6">
            <h3 class="font-hero font-bold text-lg sm:text-xl text-slate-950 group-hover:text-blue-600 transition-colors leading-snug">
              ${proj.title}
            </h3>
          </div>
        </div>

        <!-- Footer Card -->
        <div class="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="font-mono text-[11px] text-slate-500 font-medium">${proj.category} &bull; ${proj.year}</span>
          <span class="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            <span>View Project</span>
            <span>&rarr;</span>
          </span>
        </div>
      </div>
    `;
    }).join('');

    initCardSpotlights();
    initCarousels();
  }

  // =================================================================
  // CAROUSEL AUTO-CYCLE LOGIC (DI BIKIN BERUBAH UBAH PERLAHAN)
  // =================================================================
  window.activeCarouselTimers = [];

  function initCarousels() {
    if (window.activeCarouselTimers) {
      window.activeCarouselTimers.forEach(t => clearInterval(t));
    }
    window.activeCarouselTimers = [];

    const carousels = document.querySelectorAll('.card-carousel');
    carousels.forEach(carousel => {
      const slides = carousel.querySelectorAll('.carousel-slide');
      const dots = carousel.querySelectorAll('.carousel-dot');
      const counter = carousel.querySelector('.carousel-counter');
      if (slides.length <= 1) return;

      let currentIdx = 0;
      const timer = setInterval(() => {
        const nextIdx = (currentIdx + 1) % slides.length;
        
        slides[currentIdx].classList.remove('opacity-100', 'z-10');
        slides[currentIdx].classList.add('opacity-0', 'z-0');

        slides[nextIdx].classList.remove('opacity-0', 'z-0');
        slides[nextIdx].classList.add('opacity-100', 'z-10');

        if (dots.length > 0) {
          dots[currentIdx].classList.remove('bg-white', 'w-3.5');
          dots[currentIdx].classList.add('bg-white/40', 'w-1.5');

          dots[nextIdx].classList.remove('bg-white/40', 'w-1.5');
          dots[nextIdx].classList.add('bg-white', 'w-3.5');
        }

        if (counter) {
          counter.textContent = `${nextIdx + 1}/${slides.length}`;
        }

        currentIdx = nextIdx;
      }, 3500); // transisi halus setiap 3.5 detik

      window.activeCarouselTimers.push(timer);
    });
  }

  renderProjectsFilters();
  renderProjects();

  // =================================================================
  // 6. DETAIL MODAL (KARYA & PROJECTS WITH CAROUSEL SUPPORT)
  // =================================================================
  const modal = document.getElementById('detail-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  function buildModalCarouselHTML(item) {
    const images = (item.images && item.images.length > 0) ? item.images : [item.image];
    const isMulti = images.length > 1;

    return `
      <div class="space-y-3">
        <!-- Main Image with Carousel Controls -->
        <div class="max-h-[60vh] min-h-[260px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center relative p-1 shadow-inner border border-slate-800">
          <img 
            id="modal-main-img" 
            src="${images[0]}" 
            alt="${item.title || item.category || 'Karya'}" 
            referrerpolicy="no-referrer"
            class="max-h-[58vh] w-auto max-w-full object-contain rounded-xl shadow-lg transition-opacity duration-300" 
          />
          
          ${isMulti ? `
            <button id="modal-prev-btn" type="button" class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md z-20 font-bold text-lg select-none cursor-pointer">
              &#10094;
            </button>
            <button id="modal-next-btn" type="button" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md z-20 font-bold text-lg select-none cursor-pointer">
              &#10095;
            </button>
            <div id="modal-slide-counter" class="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-mono z-20 select-none">
              1 / ${images.length}
            </div>
          ` : ''}
        </div>

        ${isMulti ? `
          <!-- Clickable Thumbnail Row -->
          <div class="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar justify-center" id="modal-thumbnails">
            ${images.map((img, i) => `
              <button 
                type="button" 
                class="modal-thumb-item w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${i === 0 ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}"
                data-idx="${i}"
              >
                <img src="${img}" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  function initModalCarouselListeners(images) {
    if (!images || images.length <= 1) return;
    let currentModalIdx = 0;
    const mainImg = document.getElementById('modal-main-img');
    const counter = document.getElementById('modal-slide-counter');
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    const thumbs = document.querySelectorAll('.modal-thumb-item');

    function showModalSlide(idx) {
      currentModalIdx = (idx + images.length) % images.length;
      if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = images[currentModalIdx];
          mainImg.style.opacity = '1';
        }, 150);
      }
      if (counter) {
        counter.textContent = `${currentModalIdx + 1} / ${images.length}`;
      }
      thumbs.forEach((thumb, i) => {
        if (i === currentModalIdx) {
          thumb.classList.add('border-blue-500', 'scale-105');
          thumb.classList.remove('border-transparent', 'opacity-60');
        } else {
          thumb.classList.remove('border-blue-500', 'scale-105');
          thumb.classList.add('border-transparent', 'opacity-60');
        }
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showModalSlide(currentModalIdx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showModalSlide(currentModalIdx + 1); });
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(thumb.getAttribute('data-idx'));
        showModalSlide(idx);
      });
    });
  }

  window.openProjectModal = function (id) {
    const proj = data.projects.find(p => p.id === id);
    if (!proj || !modal || !modalBody) return;

    const imagesList = (proj.images && proj.images.length > 0) ? proj.images : [proj.image];

    modalBody.innerHTML = `
      <div class="space-y-4">
        ${buildModalCarouselHTML(proj)}
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-mono font-bold">${proj.category}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">${proj.tag}</span>
            <span class="text-xs text-slate-400 font-mono">${proj.year}</span>
          </div>
          <h3 class="font-hero text-xl sm:text-2xl font-bold text-slate-950">${proj.title}</h3>
        </div>
      </div>
    `;

    initModalCarouselListeners(imagesList);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.openSinglePhotoModal = function (imgUrl, category, tag) {
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="space-y-4">
        <div class="max-h-[68vh] min-h-[260px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center relative p-1 shadow-inner border border-slate-800">
          <img 
            src="${imgUrl}" 
            alt="${category || 'Karya'}" 
            referrerpolicy="no-referrer"
            class="max-h-[66vh] w-auto max-w-full object-contain rounded-xl shadow-lg" 
          />
        </div>
        <div class="flex items-center justify-between pt-1">
          <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold">${category || ''}</span>
          ${tag ? `<span class="text-xs text-slate-500 font-mono font-medium">${tag}</span>` : ''}
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.openDetailModal = function (id) {
    const item = data.karya.find(k => k.id === id);
    if (!item) return;
    const img = (item.images && item.images.length > 0) ? item.images[0] : item.image;
    window.openSinglePhotoModal(img, item.category, item.tag);
  };

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // =================================================================
  // 6. CONTACT FORM HANDLING
  // =================================================================
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success-note');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        setTimeout(() => formSuccess.classList.add('hidden'), 5000);
      }
      contactForm.reset();
    });
  }

  // =================================================================
  // 7. FLOATING PILL NAVBAR SCROLL SPY & CLICK HANDLING
  // =================================================================
  const sections = document.querySelectorAll('section[id]');
  const navPillItems = document.querySelectorAll('.nav-pill-item');

  navPillItems.forEach(item => {
    item.addEventListener('click', () => {
      navPillItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  window.addEventListener('scroll', () => {
    let currentId = 'home';
    const scrollPos = window.scrollY + 250;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navPillItems.forEach(item => {
      const targetNav = item.getAttribute('data-nav');
      if (targetNav === currentId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // =================================================================
  // 8. CARD MOUSE SPOTLIGHT (INTERACTIVE AMBIENT GLOW ON HOVER)
  // =================================================================
  function initCardSpotlights() {
    document.querySelectorAll('.water-glass-panel').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
  initCardSpotlights();

  // =================================================================
  // 9. TOP READING SCROLL PROGRESS BAR
  // =================================================================
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && progressBar) {
      const progress = (window.scrollY / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });

  // =================================================================
  // 10. FLOATING BACK TO TOP BUTTON
  // =================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =================================================================
  // 11. INTERACTIVE ONE-CLICK COPY TO CLIPBOARD & TOAST
  // =================================================================
  const toast = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    if (toastText) toastText.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const val = btn.getAttribute('data-copy');
      if (val) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(val).then(() => {
            showToast(`Copied: ${val}`);
          }).catch(() => {
            showToast(`Copied: ${val}`);
          });
        } else {
          showToast(`Copied: ${val}`);
        }
      }
    });
  });

  if (window.lucide) {
    lucide.createIcons();
  }
});
