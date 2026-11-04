/**
 * Jayesh Parihar — Professional Portfolio Scripts
 * Handles navigation, animated counters, skills filtering,
 * case study deep-dive modals, copy-to-clipboard, and contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnimatedCounters();
  initSkillsFilter();
  initCaseStudyModal();
  initLightboxViewer();
  initContactForm();
  initClipboardHelpers();
});

/* ==========================================================================
   1. Navbar & Scroll Behavior
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll appearance
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveSection();
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking any nav link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section scroll spy
  function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        links.forEach(l => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }
}

/* ==========================================================================
   2. Animated Metrics Counters
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const decimals = counter.getAttribute('data-decimals') ? parseInt(counter.getAttribute('data-decimals')) : 0;
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1600; // ms
          const startTime = performance.now();

          function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeOut;

            counter.textContent = prefix + currentVal.toFixed(decimals) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              counter.textContent = prefix + target.toFixed(decimals) + suffix;
            }
          }

          requestAnimationFrame(updateNumber);
        });
      }
    });
  }, { threshold: 0.25 });

  const section = document.querySelector('.achievements-section');
  if (section) observer.observe(section);
}

/* ==========================================================================
   3. Skills Filter Tabs
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.skill-category-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Case Study Deep Dive Modal System
   ========================================================================== */
const CASE_STUDY_DATA = {
  'telematics-marketplace': {
    title: 'B2B Fleet-Telematics & IoT Marketplace',
    subtitle: 'Commercial Product Case Study • Shipped to Production (Confidential / NDA)',
    badge: 'Live Shipped Product • ₹3.2 Cr Revenue',
    disclaimer: 'Confidentiality Notice: This is live freelance and founding team commercial work protected under NDA. Company and platform brand names have been sanitized to protect client confidentiality.',
    problem: `
      In the B2B fleet-telematics and commercial IoT ecosystem, system integrators (SIs) and fleet operators faced intense procurement friction: opaque pricing with no volume slabs, fragmented hardware manufacturers with unverified compliance (AIS-140/ARAI), complex GST invoicing, and lack of credit terms. Furthermore, after meetings and partner discovery calls, recurring gaps emerged around warranty tracking, trust, and post-purchase checkout.
    `,
    research: `
      <ul>
        <li><strong>Discovery Calls & Partner Feedback:</strong> Conducted 120+ daily outbound dials and dozens of discovery calls with system integrators and fleet operators to diagnose buyer friction.</li>
        <li><strong>Support Ticket Analysis:</strong> Reviewed recurring customer complaints and support tickets; uncovered that deals stalled due to warranty ambiguity, unverified seller credibility, and manual quotation delays.</li>
        <li><strong>Conversion Bottleneck:</strong> Identified that buyers needed instant tiered volume pricing (1-10, 11-100, 101+ units), 1-click GST-compliant invoices, and integrated B2B credit lines to close high-ticket orders without 30-day procurement lag.</li>
      </ul>
    `,
    prioritization: `
      On my own initiative, authored a comprehensive PRD with 12 prioritized requirements (P0/P1), user stories, and acceptance criteria. Prioritized the B2B checkout engine, GST validation, and verified seller badges as P0, while scoping warranty tracking and automated FASTag replenishment as fast-follow iterations.
    `,
    solution: `
      <ul>
        <li><strong>Clickable Prototype to Shipped Design:</strong> Built the first clickable prototype myself; the engineering UI team used this exact reference to build and ship the final production marketplace.</li>
        <li><strong>Tiered Volume Pricing Slabs:</strong> Transparent price drops per quantity tier (e.g. ₹660 -> ₹645 -> ₹630 for fleet scale) directly on product cards.</li>
        <li><strong>GST-Ready B2B Checkout:</strong> Seamless order summary with automated 18% GST calculation, GSTIN verification, and multi-address support.</li>
        <li><strong>Integrated Financing & Credit Line:</strong> Embedded B2B credit line (QUID / Juspay) allowing fleet managers to place bulk orders up to pre-approved credit limits.</li>
        <li><strong>Post-Launch Iterations:</strong> Introduced AI search, improved multi-attribute filters, WhatsApp support bot, and FASTag axle-calculation workflows.</li>
      </ul>
    `,
    metrics: `
      <ul>
        <li><strong>Revenue Impact:</strong> Contributed to closing ~₹3.2 Cr in business revenue over ~6 months (1 of 3 founding team members).</li>
        <li><strong>Largest Enterprise Deal:</strong> Closed an individual ₹66,08,000 deal (~₹66 Lakhs / TT E-Lock 7H enterprise procurement).</li>
        <li><strong>Partner Acquisition:</strong> 50+ system integrators onboarded through consultative demos.</li>
        <li><strong>Account Retention:</strong> 60 active customer accounts supported with 0 cancellations (0% churn).</li>
        <li><strong>A/B Testing:</strong> Ran weekly messaging tests yielding a 35% lift in qualified meetings and 6% lift in reply rates.</li>
      </ul>
    `,
    deliverables: [
      'Self-initiated PRD covering 12 prioritized functional requirements (P0/P1)',
      'First clickable prototype used as the reference by engineering UI team',
      'Production-shipped B2B marketplace: catalog, bulk slabs, GST checkout, credit line',
      'Monetization Sales Dashboard tracking ~₹53L/month run-rate and category revenue',
      'Partner onboarding and discovery-to-close sales enablement framework'
    ],
    links: {
      prototype: null,
      walkthrough: null,
      prd: null
    }
  },

  'fireflies': {
    title: 'Commitment Cards: Fireflies.ai',
    subtitle: 'Academic Capstone Project • 14 Days • Full 9-Step PM Framework',
    badge: 'Product Capstone (Academic Concept)',
    disclaimer: 'Note: This is an academic product concept & capstone created during the Airtribe AI-First PM Program. It was not launched in production.',
    problem: `Fireflies.ai automatically transcribes and extracts action items from team meetings, but sends them as an unstructured broadcast email summary with no assigned owner, status, or deadline. As a result, critical commitments get lost after meetings. Teams struggle with visibility, lack accountability, and face awkward follow-up friction. Baseline data showed that only 28% of extracted commitments reached a resolved state (done, reassigned, or dropped) within 14 days.`,
    research: `
      <ul>
        <li><strong>19 In-Depth User Interviews:</strong> Spoke with 10 sales reps, 6 team leads, and 3 CEOs/founders across 3 companies, focusing on one real meeting commitment per interviewee.</li>
        <li><strong>Hands-on Dogfooding:</strong> Tested Fireflies.ai live on a real client call to identify friction in extraction accuracy and post-meeting distribution.</li>
        <li><strong>Root Cause Discovery:</strong> Commitments failed most at visibility (8 of 19 cases) and ownership assignment (4 of 19 cases). When tasks depended on cross-functional colleagues, status was completely opaque.</li>
        <li><strong>Competitive & Stakeholder Mapping:</strong> Analyzed Otter.ai, Fellow, Asana, and Slack to identify the white space: actionable post-meeting accountability without feeling like surveillance.</li>
      </ul>
    `,
    prioritization: `
      Generated 14 feature ideas and ranked them using the RICE framework (Reach, Impact, Confidence, Effort). Chose 2 primary solutions and explicitly documented <strong>what NOT to build</strong> (no invasive closure auto-detection, no punitive individual manager rankings, no forced calendar blocks, and no duplicate full-scale PM tool).
    `,
    solution: `
      Designed <strong>Commitment Cards</strong>:
      <ul>
        <li><strong>Context-Rich Card:</strong> Displays task title, assigned owner, due date, source transcript quote, and 1-click audio snippet for context verification.</li>
        <li><strong>Owner Consent Flow:</strong> Explicit 3-way choice: <em>Accept</em>, <em>Not Mine</em>, or <em>Reassign</em> to avoid unilateral burden.</li>
        <li><strong>Cross-Functional Transparency:</strong> 'Waiting on' tag and 'I am blocked' flag. Provides a public reply link so external stakeholders can respond without creating an account.</li>
        <li><strong>Digest & Team View:</strong> One clean daily summary email, 1-click status actions (Done / Reassign / Drop), and a team dashboard focused on team velocity with zero individual surveillance metrics.</li>
      </ul>
    `,
    metrics: `
      <ul>
        <li><strong>North Star Metric:</strong> 14-day commitment resolution rate (target: 28% → 45% over 6 months).</li>
        <li><strong>Supporting Metrics:</strong> Owner acceptance rate (>70%), Time to first action (<24 hrs), Cards created with explicit due dates (>80%), Blocked items cleared within 48 hrs.</li>
        <li><strong>Guardrail Metrics:</strong> Daily digest mute rate (<5%), Drop misuse rate (<8%), "Not mine" rate (<12%), Zero surveillance/micromanagement complaints.</li>
      </ul>
    `,
    deliverables: [
      'Comprehensive PRD with 12 prioritized requirements, user stories & acceptance criteria',
      'Before / After UX flow diagrams & edge-case mapping',
      'Interactive 6-screen concept prototype built in Lovable',
      '17-slide executive pitch deck & ~15-minute recorded walkthrough',
      'OKR alignment table and risk mitigation roadmap'
    ],
    links: {
      prototype: 'https://prototype-jayeshparihar-fireflies.lovable.app/',
      walkthrough: 'https://docs.google.com/videos/d/1QSgAdmdterJbTSX83XRY1lEwKf9WvQEogKgqtLzk15k/play?usp=sharing',
      prd: 'assets/resumes/Fireflies_Commitment_Cards_PRD.pdf'
    }
  },

  'vitafit': {
    title: 'VitaFit: Retention Strategy & Streak Recovery',
    subtitle: 'Product Strategy & Retention Analysis • Airtribe Program',
    badge: 'Product Strategy Case Study',
    disclaimer: 'Note: Academic retention case study focusing on product mechanics and behavioral psychology. No confidential user data.',
    problem: `
      In health and fitness apps, habit formation is notoriously fragile. VitaFit's retention curve showed a severe drop-off between Day 14 and Day 21—a critical window where initial motivation wanes and long-term habits are not yet solidified. Losing users here significantly hurt customer lifetime value (LTV) and organic word-of-mouth growth.
    `,
    research: `
      <ul>
        <li><strong>Cohort & Retention Curve Analysis:</strong> Deconstructed user cohort data to identify when and why users churned.</li>
        <li><strong>Two Root Causes Discovered:</strong>
          <br>1. <em>The Broken Streak Churn Effect:</em> Missing a single workout destroyed users' 10+ day streak, causing psychological defeat and app abandonment.
          <br>2. <em>Friction in Catch-Up:</em> Lack of low-friction 'recovery sessions' made getting back on track feel overwhelming.
        </li>
        <li><strong>Behavioral Psychology Modeling:</strong> Applied behavioral design principles (Tiny Habits, Loss Aversion, Forgiving Milestones) to design an empathetic retention loop.</li>
      </ul>
    `,
    prioritization: `
      Prioritized a lightweight <em>Streak Recovery & Smart Pause</em> feature over a complex social feed or gamified marketplace, maximizing retention impact per engineering sprint.
    `,
    solution: `
      <ul>
        <li><strong>Streak Recovery Mechanics:</strong> Gave users 1 free 'Grace Day' per month and a 10-minute micro-workout alternative to protect their progress.</li>
        <li><strong>Smart Proactive Alerts:</strong> Context-aware nudges sent at the user's preferred workout window rather than spammy blast notifications.</li>
        <li><strong>Forgiving Progress Loops:</strong> Shifted focus from rigid consecutive days to weekly consistency targets (e.g., '4 out of 7 days completed').</li>
      </ul>
    `,
    metrics: `
      <ul>
        <li><strong>Primary Target:</strong> Lift Day 14 to Day 28 retention rate by +12%.</li>
        <li><strong>Supporting Metrics:</strong> Streak recovery adoption rate, recovery workout completion rate (>65%), 30-day active sessions.</li>
        <li><strong>Testing Plan:</strong> 5% beta rollout followed by a 6-week randomized A/B test with strict ship/no-ship guardrails.</li>
      </ul>
    `,
    deliverables: [
      'End-to-end PRD covering user stories, edge cases, and notification copy specs',
      'Retention curve breakdown and cohort drop-off mapping',
      'A/B testing rollout strategy with hypothesis and sample size calculations',
      'Go / No-Go decision framework and risk guardrails'
    ],
    links: {
      prototype: null,
      walkthrough: null,
      prd: null,
      drive: 'https://drive.google.com/drive/folders/1rIzEcnZ0xjpjdly0ufFX32RzvtFI2Ymj?usp=sharing'
    }
  },

  'zomato': {
    title: 'Zomato: Ordering Funnel Analysis & Metrics Framework',
    subtitle: 'Product Analytics & Funnel Optimization • Airtribe Program',
    badge: 'Analytics & Product Metrics Case Study',
    disclaimer: 'Note: Synthesized product analytics exercise based on public user journeys. Does not claim access to internal confidential Zomato telemetry.',
    problem: `
      On food delivery apps, high top-of-funnel traffic often suffers from checkout abandonment and conversion leakage. The challenge was to identify which stages of the 7-stage ordering funnel leaked the highest transaction value, diagnose why drop-offs occurred, and construct an actionable metric tree to prioritize product fixes.
    `,
    research: `
      <ul>
        <li><strong>7-Stage Funnel Mapping:</strong> Mapped the end-to-end journey: App Open → Restaurant Search/Browse → Menu View → Cart Add → Address & Delivery Selection → Payment → Order Confirmation.</li>
        <li><strong>Leakage Diagnosis:</strong> Identified the two biggest conversion bottlenecks:
          <br>1. <em>Menu Paralyzation & Customization Fatigue:</em> Too many choices and opaque mandatory add-ons causing cart abandons.
          <br>2. <em>Checkout Surprise Friction:</em> Delivery fee and surge pricing shocks revealed only at the final payment step.
        </li>
      </ul>
    `,
    prioritization: `
      Built an Impact vs. Effort prioritization matrix evaluating 8 proposed interventions, separating quick wins (transparent cart pricing, smart re-order chips) from heavy infrastructural projects.
    `,
    solution: `
      <ul>
        <li><strong>Upfront Fee Transparency:</strong> Displayed estimated delivery fee and ETA directly on restaurant listing cards.</li>
        <li><strong>1-Tap Smart Reorder:</strong> Surfaced past favorite items at top of menu for high-frequency repeat buyers.</li>
        <li><strong>Simplified Customization Modal:</strong> Pre-selected popular defaults to cut decision fatigue by 40%.</li>
        <li><strong>Metric Tree Architecture:</strong> Connected all 8 initiatives back to a single Quality-Based North Star metric.</li>
      </ul>
    `,
    metrics: `
      <ul>
        <li><strong>North Star Metric:</strong> Weekly Satisfied Order Frequency (SOF) per transacting user.</li>
        <li><strong>Funnel Metrics:</strong> Search-to-Cart Conversion, Cart-to-Payment Completion Rate, Time-to-Order (open to confirmation).</li>
        <li><strong>Guardrails:</strong> Order cancellation rate, refund/support tickets, delivery partner wait times.</li>
      </ul>
    `,
    deliverables: [
      'Comprehensive 7-stage funnel diagnostic report',
      'North Star Metric tree connecting L1 and L2 inputs across 8 product initiatives',
      'Impact vs. Effort prioritization matrix with engineering trade-offs',
      'Wireframe recommendations for cart transparency and 1-tap re-ordering'
    ],
    links: {
      prototype: null,
      walkthrough: null,
      prd: null,
      drive: 'https://drive.google.com/drive/folders/1Mhw-GRTe4l4HuhK_TYTQovmaXfUU87gH?usp=sharing'
    }
  },

  'quickbite': {
    title: 'QuickBite: System Design & Scalability Architecture',
    subtitle: 'System Thinking & Scalability (5K to 2M Users) • Airtribe Program',
    badge: 'System Design & Technical Product Case Study',
    disclaimer: 'Note: Academic system design case study demonstrating architectural trade-offs, capacity planning, and product requirements. Not a production deployment.',
    problem: `
      A hyper-growth on-demand delivery platform needed an architectural and product scaling strategy to grow from 5,000 to 2,000,000 active daily users without premature over-engineering, while maintaining ultra-low latency for order dispatch and live driver telemetry tracking.
    `,
    research: `
      <ul>
        <li><strong>Capacity Sizing & Load Calculations:</strong> Sized peak concurrent write load at ~5,800 driver location updates per second during dinner rush hours.</li>
        <li><strong>Failure Mode Analysis:</strong> Evaluated catastrophic bottlenecks: database lockups during order spikes, notification queue lag, and GPS tracking battery drain.</li>
        <li><strong>Architectural Philosophy:</strong> Balanced speed of iteration vs. long-term fault tolerance. Rejected microservices at early stage to avoid distributed systems overhead.</li>
      </ul>
    `,
    prioritization: `
      Defined clear quantitative triggers (requests/sec and DB CPU thresholds) for when to decouple monolithic components into dedicated services.
    `,
    solution: `
      <ul>
        <li><strong>Modular Monolith Foundation:</strong> Clean domain-separated boundaries within a single codebase during initial 100K user phase.</li>
        <li><strong>In-Memory Caching & Geohashing:</strong> Utilized Redis for ephemeral live driver coordinates to protect the primary transactional PostgreSQL database.</li>
        <li><strong>Asynchronous Event Queues:</strong> Implemented message queuing for non-blocking notifications, receipt generation, and analytics logging.</li>
        <li><strong>Graceful Degradation:</strong> Designed product fallbacks (reduced GPS polling interval under low battery or spotty cellular connectivity).</li>
      </ul>
    `,
    metrics: `
      <ul>
        <li><strong>Target Latency:</strong> P99 API response time < 150ms for order placement.</li>
        <li><strong>Availability Target:</strong> 99.95% system uptime during peak meal rush windows.</li>
        <li><strong>Data Freshness:</strong> Driver location map refresh < 3 seconds.</li>
      </ul>
    `,
    deliverables: [
      'Capacity planning model and peak throughput sizing calculations',
      'System architecture diagrams (User, Driver, Merchant, Dispatcher workflows)',
      'Phased scaling roadmap with triggers for microservice extraction',
      'Product SLA and error-budget definitions with engineering trade-offs'
    ],
    links: {
      prototype: null,
      walkthrough: null,
      prd: null,
      drive: 'https://drive.google.com/drive/folders/1hetLCQZM70tPiogdgZEg6RabS2j36DfJ?usp=sharing'
    }
  }
};

function initCaseStudyModal() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalContainer = document.querySelector('.modal-container');
  const closeBtn = document.querySelector('.modal-close-btn');
  const exploreBtns = document.querySelectorAll('[data-open-case]');

  if (!modalBackdrop || !modalContainer) return;

  exploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseId = btn.getAttribute('data-open-case');
      const data = CASE_STUDY_DATA[caseId];
      if (!data) return;

      renderCaseModal(data);
      openModal();
    });
  });

  function openModal() {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  function renderCaseModal(data) {
    document.getElementById('modal-case-title').textContent = data.title;
    document.getElementById('modal-case-subtitle').textContent = data.subtitle;
    document.getElementById('modal-case-badge').textContent = data.badge;

    // Disclaimer
    const disclaimerEl = document.getElementById('modal-case-disclaimer');
    if (disclaimerEl) {
      disclaimerEl.textContent = data.disclaimer;
    }

    // Problem
    document.getElementById('modal-case-problem').innerHTML = `<p class="modal-text">${data.problem}</p>`;

    // Research
    document.getElementById('modal-case-research').innerHTML = data.research;

    // Solution
    document.getElementById('modal-case-solution').innerHTML = data.solution;

    // Prioritization / Approach
    const prioEl = document.getElementById('modal-case-prioritization');
    if (prioEl) prioEl.innerHTML = `<p class="modal-text">${data.prioritization}</p>`;

    // Metrics
    document.getElementById('modal-case-metrics').innerHTML = data.metrics;

    // Deliverables
    const deliverablesList = document.getElementById('modal-case-deliverables');
    if (deliverablesList) {
      deliverablesList.innerHTML = data.deliverables.map(item => `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${item}</li>`).join('');
    }

    // Modal Links Footer
    const footerActions = document.getElementById('modal-footer-actions');
    let actionsHtml = '';

    if (data.links.prototype) {
      actionsHtml += `<a href="${data.links.prototype}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> Explore Live Prototype</a>`;
    }
    if (data.links.walkthrough) {
      actionsHtml += `<a href="${data.links.walkthrough}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg> Watch Walkthrough</a>`;
    }
    if (data.links.prd) {
      actionsHtml += `<a href="${data.links.prd}" download class="btn btn-secondary btn-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download Capstone PRD</a>`;
    }
    if (data.links.drive) {
      actionsHtml += `<a href="${data.links.drive}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> View Drive Artifacts</a>`;
    }

    if (!actionsHtml) {
      actionsHtml = `<span style="font-size:0.85rem; color:var(--text-muted);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Work conducted under Non-Disclosure Agreement (NDA). Detailed workflows and specs available upon discussion.</span>`;
    }

    footerActions.innerHTML = actionsHtml;
  }
}

/* ==========================================================================
   5. Contact Form Validation & Submission Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const alertBox = document.getElementById('contact-status-alert');

  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');
  const submitBtn = document.getElementById('form-submit-btn');

  // Input listeners for real-time validation removal
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('invalid');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Name validation
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('invalid');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('invalid');
    }

    // Message validation
    if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
      messageInput.classList.add('invalid');
      isValid = false;
    } else {
      messageInput.classList.remove('invalid');
    }

    if (!isValid) {
      showToast('Please fix the highlighted fields in the form.');
      return;
    }

    // Form is valid!
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Preparing Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const subject = encodeURIComponent(subjectInput.value.trim() || 'Portfolio Inquiry');
      const body = encodeURIComponent(`Hi Jayesh,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`);

      const mailtoUrl = `mailto:pariharjayesh1092@gmail.com?subject=${subject}&body=${body}`;

      if (alertBox) {
        alertBox.className = 'form-status-alert success';
        alertBox.innerHTML = `
          <strong>Message Prepared!</strong><br>
          Your message is formatted and ready. <a href="${mailtoUrl}" class="text-cyan" style="font-weight:700; text-decoration:underline;">Click here to send directly via your email app</a>, or check your clipboard—we've copied your message for convenience.
        `;
        alertBox.style.display = 'block';
      }

      // Automatically copy to clipboard for convenience
      navigator.clipboard.writeText(`From: ${nameInput.value.trim()} (${emailInput.value.trim()})\nSubject: ${subjectInput.value.trim()}\n\n${messageInput.value.trim()}`);

      showToast('Message formatted! Opening mail client...');

      // Trigger mail client
      window.location.href = mailtoUrl;

      // Reset form
      form.reset();
    }, 600);
  });
}

/* ==========================================================================
   6. Clipboard & Toast Helpers
   ========================================================================== */
function initClipboardHelpers() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast('Unable to copy automatically.');
      });
    });
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--accent-cyan); flex-shrink:0;">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 14 14"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Add spinning keyframe dynamically
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

/* ==========================================================================
   7. Lightbox / Image Zoom Viewer
   ========================================================================== */
function initLightboxViewer() {
  let backdrop = document.querySelector('.lightbox-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'lightbox-backdrop';
    backdrop.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close-btn" aria-label="Close image viewer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img class="lightbox-img" src="" alt="Enlarged preview">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  const imgEl = backdrop.querySelector('.lightbox-img');
  const captionEl = backdrop.querySelector('.lightbox-caption');
  const closeBtn = backdrop.querySelector('.lightbox-close-btn');

  function openLightbox(src, caption) {
    imgEl.src = src;
    captionEl.textContent = caption || '';
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeLightbox();
    }
  });

  // Attach click listener to all gallery image boxes and thumbnail cards
  const boxes = document.querySelectorAll('.gallery-image-box, .gallery-thumb-box');
  boxes.forEach(box => {
    box.addEventListener('click', () => {
      const img = box.querySelector('img');
      const caption = box.querySelector('.img-caption span')?.textContent || box.querySelector('.thumb-title')?.textContent || img.alt;
      if (img && img.src) {
        openLightbox(img.src, caption);
      }
    });
  });
}

