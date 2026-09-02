/**
 * BuildIQ Projects — Project Management Consultancy | Architecture | Turnkey Construction
 * Core Application & Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // -------------------------------------------------------------
  // 2. Navigation & Sticky Scroll Behavior
  // -------------------------------------------------------------
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active link highlighting based on scroll position
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 250;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-amber-400', 'font-semibold');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-amber-400', 'font-semibold');
      }
    });
  });

  // Mobile Menu Drawer Controls
  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('hidden');
      mobileMenuDrawer.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });

    const closeMobileMenu = () => {
      mobileMenuDrawer.classList.add('hidden');
      mobileMenuDrawer.classList.remove('flex');
      document.body.style.overflow = '';
    };

    if (closeMobileMenuBtn) {
      closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu on clicking any link inside the drawer
    document.querySelectorAll('#mobile-menu-drawer a').forEach(item => {
      item.addEventListener('click', closeMobileMenu);
    });
  }

  // -------------------------------------------------------------
  // 3. Scroll Reveal Animations (Intersection Observer)
  // -------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // -------------------------------------------------------------
  // 4. Interactive Engineering Dashboard Tabs
  // -------------------------------------------------------------
  const dashboardTabs = document.querySelectorAll('.dashboard-tab-btn');
  const dashboardPanels = document.querySelectorAll('.dashboard-tab-panel');

  dashboardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanelId = tab.getAttribute('data-tab');

      // Update tab button styles
      dashboardTabs.forEach(t => {
        t.classList.remove('active', 'bg-amber-500', 'text-slate-950', 'font-bold');
        t.classList.add('bg-slate-800/60', 'text-slate-400', 'font-medium');
      });
      tab.classList.add('active', 'bg-amber-500', 'text-slate-950', 'font-bold');
      tab.classList.remove('bg-slate-800/60', 'text-slate-400', 'font-medium');

      // Show targeted panel
      dashboardPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
      
      if (window.lucide) window.lucide.createIcons();
    });
  });

  // -------------------------------------------------------------
  // 5. Portfolio Category Filter Tabs
  // -------------------------------------------------------------
  const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  portfolioFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update filter buttons active style
      portfolioFilterBtns.forEach(b => {
        b.classList.remove('active', 'bg-amber-500', 'text-slate-950', 'font-bold', 'shadow-md', 'shadow-amber-500/20');
        b.classList.add('bg-slate-900', 'border', 'border-slate-800', 'text-slate-400');
      });
      btn.classList.add('active', 'bg-amber-500', 'text-slate-950', 'font-bold', 'shadow-md', 'shadow-amber-500/20');
      btn.classList.remove('bg-slate-900', 'border', 'border-slate-800', 'text-slate-400');

      // Filter project cards
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          card.classList.add('flex');
        } else {
          card.classList.add('hidden');
          card.classList.remove('flex');
        }
      });

      if (window.lucide) window.lucide.createIcons();
    });
  });

  // -------------------------------------------------------------
  // 6. Lead Inquiry Form & Consultation Request Handler
  // -------------------------------------------------------------
  const leadForm = document.getElementById('consultation-lead-form');
  const formSuccessToast = document.getElementById('form-success-toast');
  const uploadInput = document.getElementById('drawing-upload');
  const uploadLabel = document.getElementById('upload-status-text');
  const waDirectSubmitBtn = document.getElementById('whatsapp-direct-submit');

  // File upload feedback
  if (uploadInput && uploadLabel) {
    uploadInput.addEventListener('change', () => {
      if (uploadInput.files && uploadInput.files.length > 0) {
        const fileNames = Array.from(uploadInput.files).map(f => f.name).join(', ');
        uploadLabel.textContent = `Attached: ${fileNames}`;
        uploadLabel.classList.add('text-amber-400');
      } else {
        uploadLabel.textContent = 'Click to attach drawings or BOQ files';
        uploadLabel.classList.remove('text-amber-400');
      }
    });
  }

  // Handle Form Submission
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-flex items-center gap-2 text-slate-950 font-bold">
          <svg class="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting Project Scope...
        </span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Show Toast Notification
        if (formSuccessToast) {
          formSuccessToast.classList.remove('hidden');
          formSuccessToast.scrollIntoView({ behavior: 'smooth', block: 'center' });

          setTimeout(() => {
            formSuccessToast.classList.add('hidden');
          }, 8000);
        }

        leadForm.reset();
        if (uploadLabel) {
          uploadLabel.textContent = 'Click to attach drawings or BOQ files';
          uploadLabel.classList.remove('text-amber-400');
        }
      }, 700);
    });
  }

  // WhatsApp Direct Transfer Button from Form
  if (waDirectSubmitBtn) {
    waDirectSubmitBtn.addEventListener('click', () => {
      const name = document.getElementById('lead-name')?.value || 'Client';
      const phone = document.getElementById('lead-phone')?.value || 'Not provided';
      const pLocation = document.getElementById('lead-location')?.value || 'Not specified';
      const pService = document.getElementById('lead-service')?.value || 'PMC / Turnkey';
      const pMessage = document.getElementById('lead-message')?.value || 'Project Discussion';

      const waMessage = `*New Project Consultation Inquiry — BuildIQ Projects*\n` +
        `• *Name:* ${name}\n` +
        `• *Phone:* ${phone}\n` +
        `• *Location:* ${pLocation}\n` +
        `• *Service Required:* ${pService}\n` +
        `• *Scope Notes:* ${pMessage}\n\n` +
        `Please connect with me to schedule an initial technical discussion.`;

      window.open(`https://wa.me/919820012345?text=${encodeURIComponent(waMessage)}`, '_blank');
    });
  }

  // -------------------------------------------------------------
  // 7. Sample Weekly Audit Modal System
  // -------------------------------------------------------------
  const openReportModalBtns = document.querySelectorAll('.open-report-modal-btn');
  const closeReportModalBtn = document.getElementById('close-report-modal');
  const closeModalBottomBtn = document.getElementById('close-modal-bottom');
  const reportModal = document.getElementById('sample-report-modal');

  openReportModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (reportModal) {
        reportModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeReportModal = () => {
    if (reportModal) {
      reportModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  if (closeReportModalBtn) closeReportModalBtn.addEventListener('click', closeReportModal);
  if (closeModalBottomBtn) closeModalBottomBtn.addEventListener('click', closeReportModal);

  if (reportModal) {
    reportModal.addEventListener('click', (e) => {
      if (e.target === reportModal) closeReportModal();
    });
  }

  // -------------------------------------------------------------
  // 8. Dynamic Copyright Year
  // -------------------------------------------------------------
  const yearDisplay = document.getElementById('year-display');
  if (yearDisplay) {
    yearDisplay.textContent = new Date().getFullYear();
  }
});
