/**
 * BuildIQ Projects — Project Management Consultancy (PMC)
 * Core Application & Interactive Components Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // -------------------------------------------------------------
  // 1. Navigation & Scroll Behavior
  // -------------------------------------------------------------
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting based on scroll position
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-400', 'font-semibold');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-blue-400', 'font-semibold');
      }
    });
  });

  // Mobile Drawer Toggle
  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    if (closeMobileMenuBtn) {
      closeMobileMenuBtn.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    // Close mobile menu on clicking any drawer link
    document.querySelectorAll('#mobile-menu-drawer a').forEach(item => {
      item.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  // -------------------------------------------------------------
  // 2. Scroll Reveal Animations (Intersection Observer)
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
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // -------------------------------------------------------------
  // 3. Conceptual PMC Dashboard Tabs
  // -------------------------------------------------------------
  const dashboardTabs = document.querySelectorAll('.dashboard-tab-btn');
  const dashboardPanels = document.querySelectorAll('.dashboard-tab-panel');

  dashboardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanelId = tab.getAttribute('data-tab');

      // Update tab buttons active state
      dashboardTabs.forEach(t => {
        t.classList.remove('active', 'bg-blue-600', 'text-white');
        t.classList.add('bg-slate-800/60', 'text-slate-400');
      });
      tab.classList.add('active', 'bg-blue-600', 'text-white');
      tab.classList.remove('bg-slate-800/60', 'text-slate-400');

      // Show targeted panel
      dashboardPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.remove('hidden');
          panel.classList.add('animate-fadeIn');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('animate-fadeIn');
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 4. Interactive PMC Scope & Coordination Explorer
  // -------------------------------------------------------------
  const scopeTypeSelect = document.getElementById('calc-project-type');
  const scopeSizeInput = document.getElementById('calc-project-size');
  const scopeSizeDisplay = document.getElementById('calc-size-val');
  const scopeStageSelect = document.getElementById('calc-project-stage');
  
  const resCoordinationLevel = document.getElementById('res-coordination-level');
  const resMilestonesCount = document.getElementById('res-milestones-count');
  const resWeeklySiteHours = document.getElementById('res-weekly-hours');
  const resCriticalDeliverable = document.getElementById('res-critical-deliverable');

  function updateScopeExplorer() {
    if (!scopeTypeSelect || !scopeSizeInput) return;
    
    const pType = scopeTypeSelect.value;
    const pSize = parseInt(scopeSizeInput.value, 10);
    const pStage = scopeStageSelect.value;

    if (scopeSizeDisplay) {
      scopeSizeDisplay.textContent = Number(pSize).toLocaleString() + ' sq.ft';
    }

    // Dynamic calculations based on industry standard PMC frameworks
    let coordinationLevel = 'Full Multi-Stakeholder Matrix';
    let milestones = '12 Milestones';
    let weeklyHours = '24+ Inspection Hrs';
    let keyDeliverable = 'Site Execution & Snag Resolution Protocol';

    if (pType === 'residential') {
      if (pSize < 3000) {
        coordinationLevel = 'Focused PMC Oversight';
        milestones = '8 Key Milestones';
        weeklyHours = '12–16 Dedicated Site Hrs';
        keyDeliverable = 'Contractor Alignment & Finishes Quality Gate';
      } else {
        coordinationLevel = 'Comprehensive Luxury Residential PMC';
        milestones = '14 Key Milestones';
        weeklyHours = '28+ Dedicated Site Hrs';
        keyDeliverable = 'High-Tolerance Quality Audits & Millwork Inspection';
      }
    } else if (pType === 'commercial') {
      coordinationLevel = 'Corporate Turnkey PMC Matrix';
      milestones = Math.min(22, Math.max(10, Math.floor(pSize / 2500) + 8)) + ' Milestones';
      weeklyHours = '36+ Multi-Trade Oversight Hrs';
      keyDeliverable = 'HVAC/MEP, IT-Fitout & Base-Build Handover Matrix';
    } else if (pType === 'interior') {
      coordinationLevel = 'Precision Interior & Joinery PMC';
      milestones = '10 Stage Milestones';
      weeklyHours = '18–24 Dedicated Site Hrs';
      keyDeliverable = 'Material Batch Quality & 0-Snag Closeout Protocol';
    } else if (pType === 'renovation') {
      coordinationLevel = 'Live Site & Structural Upgrade PMC';
      milestones = '12 Phased Milestones';
      weeklyHours = '22+ Site Risk & Remediation Hrs';
      keyDeliverable = 'Demolition Safety, Structural Retrofit & MEP Coordination';
    }

    if (resCoordinationLevel) resCoordinationLevel.textContent = coordinationLevel;
    if (resMilestonesCount) resMilestonesCount.textContent = milestones;
    if (resWeeklySiteHours) resWeeklySiteHours.textContent = weeklyHours;
    if (resCriticalDeliverable) resCriticalDeliverable.textContent = keyDeliverable;
  }

  if (scopeTypeSelect && scopeSizeInput && scopeStageSelect) {
    scopeTypeSelect.addEventListener('change', updateScopeExplorer);
    scopeSizeInput.addEventListener('input', updateScopeExplorer);
    scopeStageSelect.addEventListener('change', updateScopeExplorer);
    updateScopeExplorer();
  }

  // -------------------------------------------------------------
  // 5. Sample Weekly Report Modal System
  // -------------------------------------------------------------
  const openReportModalBtns = document.querySelectorAll('.open-report-modal-btn');
  const closeReportModalBtn = document.getElementById('close-report-modal');
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

  if (closeReportModalBtn && reportModal) {
    closeReportModalBtn.addEventListener('click', () => {
      reportModal.classList.add('hidden');
      document.body.style.overflow = '';
    });

    reportModal.addEventListener('click', (e) => {
      if (e.target === reportModal) {
        reportModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  // -------------------------------------------------------------
  // 6. Lead Inquiry Form & Consultation Request Handler
  // -------------------------------------------------------------
  const leadForm = document.getElementById('consultation-lead-form');
  const formSuccessToast = document.getElementById('form-success-toast');
  const uploadInput = document.getElementById('drawing-upload');
  const uploadLabel = document.getElementById('upload-status-text');

  // File upload change feedback
  if (uploadInput && uploadLabel) {
    uploadInput.addEventListener('change', () => {
      if (uploadInput.files.length > 0) {
        const fileNames = Array.from(uploadInput.files).map(f => f.name).join(', ');
        uploadLabel.textContent = `Attached: ${fileNames}`;
        uploadLabel.classList.add('text-blue-400');
      } else {
        uploadLabel.textContent = 'Upload Architectural Drawings / Project Documents (PDF, DWG, ZIP up to 50MB)';
        uploadLabel.classList.remove('text-blue-400');
      }
    });
  }

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('lead-name')?.value || '';
      const phone = document.getElementById('lead-phone')?.value || '';
      const email = document.getElementById('lead-email')?.value || '';
      const pType = document.getElementById('lead-type')?.value || 'General';
      const pStage = document.getElementById('lead-stage')?.value || 'Planning';
      const pDesc = document.getElementById('lead-desc')?.value || '';

      // Collect checked help options
      const helpCheckboxes = document.querySelectorAll('input[name="help_topics"]:checked');
      const helpTopics = Array.from(helpCheckboxes).map(cb => cb.value).join(', ');

      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-flex items-center gap-2">
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Structuring Project Brief...
        </span>
      `;

      // Simulate instantaneous processing & confirmation
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Show Toast Notification
        if (formSuccessToast) {
          formSuccessToast.classList.remove('hidden');
          formSuccessToast.classList.add('animate-fadeIn');

          setTimeout(() => {
            formSuccessToast.classList.add('hidden');
          }, 8000);
        }

        // Reset Form
        leadForm.reset();
        if (uploadLabel) {
          uploadLabel.textContent = 'Upload Architectural Drawings / Project Documents (PDF, DWG, ZIP up to 50MB)';
          uploadLabel.classList.remove('text-blue-400');
        }

        // Scroll smoothly to toast if needed
        formSuccessToast.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 900);
    });
  }

  // -------------------------------------------------------------
  // 7. WhatsApp Quick Connect Link Generator
  // -------------------------------------------------------------
  const whatsappBtns = document.querySelectorAll('.whatsapp-trigger-btn');
  whatsappBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const defaultText = encodeURIComponent(
        "Hello BuildIQ Projects Team, I am looking for a Project Management Consultancy (PMC) partner for my upcoming construction/interior project in Mumbai. Let's discuss scope and coordination."
      );
      // Opens WhatsApp Web or App
      window.open(`https://wa.me/?text=${defaultText}`, '_blank');
    });
  });

  // Re-generate Lucide icons on any dynamic markup changes
  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 100);
});
