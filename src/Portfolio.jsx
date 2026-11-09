import { useEffect, useRef, useState } from "react";
// Profile photo. File lives at src/assest/profile.jpeg
// To change or remove it, swap this import (or set profilePic = null).
import profilePic from "./assest/profile.jpeg";
// CV file lives at src/assest/Kavitha-G-SEO-Analyst.pdf
import resumeFile from "./assest/Kavitha-G-SEO-Analyst.pdf";

/* =====================================================================
   CONFIG — edit Kavitha's details here
   ===================================================================== */
const LINKS = {
  email: "kavitha66173@gmail.com",
  phoneDisplay: "+91 88254 99391",
  phoneDial: "+918825499391",
  whatsapp: "https://wa.me/918825499391",
  whatsappWork:
    "https://wa.me/918825499391?text=" +
    encodeURIComponent("Hi Kavitha, I'd like to talk about SEO for my website."),
  linkedin: "https://www.linkedin.com/in/kavithagovindhan/",
  resume: resumeFile,
};

const ROLES = [
  "SEO Analyst",
  "AEO & GEO Specialist",
  "SEO Team Lead",
  "Search Intent Strategist",
];

const NAV = [
  ["about", "About"],
  ["experience", "Experience"],
  ["work", "Results"],
  ["services", "Hiring"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

const MARQUEE = [
  "SEO", "AEO", "GEO", "Rank Tracking", "Technical Audits",
  "Search Intent", "Guest Posting", "Search Console", "GA4", "AI Video",
];

/* Live rank-tracking portfolio, by position band */
const DIST = {
  total: 1442,
  bands: [
    { label: "Positions 1–3", count: 210 },
    { label: "4 – 10", count: 181 },
    { label: "11 – 20", count: 142 },
    { label: "21 – 50", count: 281 },
    { label: "51 – 100", count: 193 },
    { label: "Beyond 100", count: 435 },
  ],
};

const EXPERIENCE = [
  {
    years: "Feb 2023 — Nov 2026",
    org: "i3 Matrix",
    role: "SEO Analyst, then Team Lead",
    points: [
      "Led the SEO team for 1.8 years — planning the month's work, reviewing analysts' output, training new joiners and presenting results to clients.",
      "Owned 30+ websites end to end, from implementation through to monthly analysis.",
      "Tracked and reported 1,400+ keywords across 50+ country sites: 390 in the top 10, 210 of those in the top 3, 533 in the top 20.",
      "Ran off-page SEO across multiple categories — 130+ guest posts placed, around 90% of them indexed.",
      "Rewrote page content around real search intent and restructured it for AEO and GEO: schema, question-led sections, clear entities.",
      "Built and optimised client LinkedIn pages for 100+ leads, and grew one page to 2,800 followers organically in two months.",
      "Ran Instagram and Facebook for client sites including AI-generated video, and reported monthly in Search Console and GA4.",
    ],
  },
  {
    years: "Jul — Dec 2022",
    org: "Besttech Digital Solutions, Chennai",
    role: "SEO & Digital Marketing Intern",
    points: [
      "Built a blog from scratch and optimised its posts.",
      "Handled off-page SEO: prospecting, outreach and link placements.",
      "Hired into a full-time role at the end of the internship.",
    ],
  },
];

/* Result cards — anonymised, no client names or domains */
const RESULTS = [
  {
    metric: "390",
    hue: 45,
    context: "Rank tracking · 1,442 keywords",
    title: "Keywords holding the top 10",
    desc: "Across 50+ country sites in one client group, with 210 of them sitting in the top 3 and 533 inside the top 20.",
    tags: ["Rankings", "Ongoing"],
    feature: true,
  },
  {
    metric: "+116%",
    hue: 38,
    context: "Search Console · year on year",
    title: "Organic clicks on a training sub-site",
    desc: "Measured over a 28-day window against the same period the previous year.",
    tags: ["Clicks"],
  },
  {
    metric: "90%",
    hue: 50,
    context: "Off-page · 130+ placements",
    title: "Guest posts that actually indexed",
    desc: "Prospecting, outreach and placement across multiple categories, tracked through to indexation rather than publication.",
    tags: ["Link building"],
  },
  {
    metric: "2.8k",
    hue: 32,
    context: "LinkedIn · 2 months",
    title: "Followers grown organically",
    desc: "No paid promotion, alongside 100+ leads from page content and direct outreach.",
    tags: ["Social", "Lead gen"],
  },
];

const NDA_NOTE =
  "Client names, domains and Search Console screenshots stay under NDA. Full detail available in interview.";

const SKILLS = [
  {
    icon: "search",
    title: "Search",
    sub: "The groundwork that moves keywords up and keeps them there",
    items: ["Technical audits", "Keyword research", "On-page SEO", "Internal linking", "Rank tracking", "Off-page & guest posting"],
  },
  {
    icon: "chat",
    title: "AEO & GEO",
    sub: "Structuring pages so AI answers quote them, not just list them",
    items: ["Answer engine optimisation", "Generative engine optimisation", "Schema markup", "Search intent mapping", "FAQ & entity structure"],
  },
  {
    icon: "play",
    title: "Social & Content",
    sub: "Keeping the publishing rhythm without a production budget",
    items: ["LinkedIn pages", "Instagram", "Facebook", "AI video", "Canva", "WordPress"],
  },
];

const SERVICES = [
  {
    icon: "search",
    title: "SEO audits and fixes",
    desc: "Crawl, Search Console and GA4 review, then the technical and on-page corrections that unblock a site.",
    points: ["Indexing & crawl issues", "Speed and Core Web Vitals", "On-page structure", "Internal linking"],
  },
  {
    icon: "chat",
    title: "AEO and GEO rewrites",
    desc: "Pages rebuilt around the question behind the keyword, structured so answer engines can lift them.",
    points: ["Question-led sections", "Schema markup", "Entity clarity", "Snippet targeting"],
  },
  {
    icon: "chart",
    title: "Reporting that gets read",
    desc: "Monthly positions, clicks and impressions in plain language, with next month's actions attached.",
    points: ["Search Console & GA4", "Rank tracking", "Plain-language summaries", "Action plans"],
  },
  {
    icon: "code",
    title: "Off-page and guest posting",
    desc: "Prospecting and outreach across categories, tracked through to indexation rather than placement.",
    points: ["Prospecting", "Outreach", "Placements", "Indexation tracking"],
  },
  {
    icon: "image",
    title: "Social and LinkedIn",
    desc: "Company pages built and grown, plus Instagram and Facebook with AI-generated video.",
    points: ["Page setup", "Content calendars", "AI video", "Lead generation"],
  },
  {
    icon: "pin",
    title: "Team and delivery",
    desc: "Running an analyst team and the schedule around it, so 30+ sites stay consistent.",
    points: ["Team leadership", "Training juniors", "Client reporting", "Office coordination"],
  },
];

const PROCESS = [
  ["Audit", "Crawl, Search Console and GA4 review to find what is holding the site back — indexing, speed, structure, thin content."],
  ["Fix", "Technical and on-page corrections first, prioritised by impact. Content on a broken foundation never ranks."],
  ["Rewrite for intent", "Target pages rebuilt around the question behind the keyword, then structured for snippets and AI answers."],
  ["Measure", "Monthly tracking of positions, clicks and impressions, reported in plain language."],
  ["Scale", "Once a page type works, the pattern rolls across the site. That is how 50+ sites stay consistent."],
];

const HIRING = [
  ["Experience", "3.8 years in agency search, 1.8 of them leading a team"],
  ["Scale", "30+ websites and 1,400+ tracked keywords at once"],
  ["Edge", "Already working in AEO and GEO, not catching up to it"],
  ["Availability", "Immediate — remote, hybrid or on-site"],
];

const I = {
  linkedin: () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5 2.5 2.5 0 0 0 4.98 3.5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.1c0-1.22-.02-2.8-1.9-2.8-1.9 0-2.2 1.35-2.2 2.7V21H9z" /></svg>),
  github: () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg>),
  instagram: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>),
  facebook: () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>),
  whatsapp: () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.15L2 22l4.95-1.3A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 0 1 6.86 12.4l-.2.32.68 2.49-2.56-.67-.31.18A8.1 8.1 0 1 1 12.04 3.8zm-3.1 3.9c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.76 2.8 4.35 3.82 2.15.85 2.59.68 3.06.63.47-.04 1.5-.61 1.72-1.21.21-.6.21-1.1.15-1.21-.06-.1-.23-.17-.48-.29-.25-.12-1.5-.74-1.73-.82-.23-.09-.4-.13-.56.12-.17.25-.65.82-.79.98-.15.17-.29.19-.54.07-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.55-1.37-.76-1.87-.2-.49-.4-.42-.55-.43h-.48z" /></svg>),
  mail: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>),
  phone: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" /></svg>),
  arrow: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  up: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>),
  code: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>),
  search: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>),
  image: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="9" cy="9" r="2" /><path d="m21 15-4.5-4.5L5 21" /></svg>),
  play: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="15" height="14" rx="3" /><path d="m17 10 5-3v10l-5-3" /></svg>),
  pin: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>),
  chat: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" /></svg>),
  chart: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></svg>),
};

/* =====================================================================
   HELPERS & HOOKS
   ===================================================================== */
const NAV_OFFSET = 70;
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

// Adds .in to every .rv element as it scrolls into view
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".pf .rv:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function useTypewriter(words, enabled) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!enabled) return undefined;
    let w = 0;
    let c = 0;
    let deleting = false;
    let t;
    const step = () => {
      const word = words[w];
      if (!deleting) {
        c += 1;
        setText(word.slice(0, c));
        if (c === word.length) {
          deleting = true;
          t = setTimeout(step, 1700);
          return;
        }
        t = setTimeout(step, 65);
      } else {
        c -= 1;
        setText(word.slice(0, c));
        if (c === 0) {
          deleting = false;
          w = (w + 1) % words.length;
          t = setTimeout(step, 350);
          return;
        }
        t = setTimeout(step, 32);
      }
    };
    t = setTimeout(step, 900);
    return () => clearTimeout(t);
  }, [words, enabled]);
  return text;
}

/* =====================================================================
   SMALL COMPONENTS
   ===================================================================== */

// Word-by-word masked text reveal
function SplitText({ text, as: Tag = "h2", className = "", gradient = false, delay = 0 }) {
  return (
    <Tag className={`split rv ${gradient ? "grad" : ""} ${className}`} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span className="w" key={i} aria-hidden="true">
          <span style={{ transitionDelay: `${delay + i * 0.07}s` }}>{w}</span>
        </span>
      ))}
    </Tag>
  );
}

// Letter-by-letter hero reveal (plays when the loader finishes)
function Letters({ text, start = 0 }) {
  return text.split("").map((ch, i) => (
    <span className="ch" key={i} aria-hidden="true">
      <span style={{ animationDelay: `${start + i * 0.05}s` }}>{ch === " " ? "\u00A0" : ch}</span>
    </span>
  ));
}

// Count-up number
function Counter({ to, suffix = "" }) {
  const dec = !Number.isInteger(to) ? 1 : 0;
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1700;
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          setN(+(to * (1 - Math.pow(1 - p, 3))).toFixed(dec));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, dec]);
  return <span ref={ref}>{n.toFixed(dec)}{suffix}</span>;
}

// Element that pulls toward the cursor
function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const leave = () => {
    ref.current.style.transform = "";
  };
  return (
    <span className="magnetic" ref={ref} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </span>
  );
}

// Button label that rolls up on hover
function Roll({ children }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

/* =====================================================================
   LOADER
   ===================================================================== */
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Loader({ onDone }) {
  const [reduce] = useState(prefersReducedMotion);
  const [p, setP] = useState(reduce ? 100 : 0);
  const [gone, setGone] = useState(reduce);
  useEffect(() => {
    if (reduce) {
      onDone(true);
      return undefined;
    }
    let v = 0;
    let t;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 8) + 3);
      setP(v);
      if (v >= 100) {
        clearInterval(id);
        t = setTimeout(() => {
          setGone(true);
          onDone(true);
        }, 380);
      }
    }, 55);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [onDone, reduce]);

  return (
    <div className={`loader ${gone ? "gone" : ""}`} aria-hidden={gone}>
      <div className="loader-inner">
        <div className="loader-mark">Kavitha <span>G</span></div>
        <div className="loader-bar"><i style={{ transform: `scaleX(${p / 100})` }} /></div>
        <div className="loader-meta">
          <span>Loading portfolio</span>
          <span>{p}%</span>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   CUSTOM CURSOR (desktop only)
   ===================================================================== */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const over = (e) => {
      const hit = e.target.closest && e.target.closest("a, button, .card");
      if (ring.current) ring.current.classList.toggle("hover", !!hit);
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      root.classList.remove("has-cursor");
    };
  }, []);
  return (
    <>
      <div ref={dot} className="c-dot" />
      <div ref={ring} className="c-ring"><i /></div>
    </>
  );
}

/* =====================================================================
   NAV
   ===================================================================== */
function Nav({ active, scrolled, hidden }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""} ${hidden && !open ? "hidden" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="brand" onClick={go("top")}>
            Kavitha <span>G</span>
          </a>
          <nav className="nav-links" aria-label="Main">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={go(id)} className={`nav-link ${active === id ? "active" : ""}`}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn btn-primary btn-sm nav-cta" onClick={go("contact")}>
            <Roll>Let's talk</Roll>
          </a>
          <button
            className={`nav-toggle ${open ? "open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div className={`mmenu ${open ? "open" : ""}`} aria-hidden={!open}>
        {NAV.map(([id, label], i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={go(id)}
            className={`mm-link ${active === id ? "active" : ""}`}
            style={{ "--i": i }}
            tabIndex={open ? 0 : -1}
          >
            {label}
          </a>
        ))}
        <div className="mm-foot" style={{ "--i": NAV.length }}>
          <a href={`mailto:${LINKS.email}`} tabIndex={open ? 0 : -1}>{LINKS.email}</a>
        </div>
      </div>
    </>
  );
}

/* =====================================================================
   HERO
   ===================================================================== */
function Hero({ loaded }) {
  const typed = useTypewriter(ROLES, loaded);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    e.currentTarget.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  return (
    <section className="hero" id="top" onMouseMove={onMove}>
      <div className="hero-bg" aria-hidden="true">
        <div className="grid-lines" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="wrap hero-inner">
        <p className="pill hero-fade" style={{ "--d": "0s" }}>
          <span className="live" /> Open to full-time roles · freelance available
        </p>

        <h1 className="hero-name" aria-label="Kavitha G">
          <span className="line"><Letters text="Kavitha" start={0.1} /></span>
          <span className="line line-2"><Letters text="G" start={0.6} /></span>
        </h1>

        <div className="hero-sub">
          <p className="typer hero-fade" style={{ "--d": "0.9s" }}>
            I'm an <b>{typed}</b><span className="caret" />
          </p>
          <div className="hero-right">
            <p className="hero-blurb hero-fade" style={{ "--d": "1.05s" }}>
              I run search for 30+ websites — rank tracking, technical fixes and content rewritten
              around real search intent, structured so AI answers quote the page instead of
              skipping it.
            </p>
            <div className="hero-actions hero-fade" style={{ "--d": "1.2s" }}>
              <Magnetic>
                <a href="#work" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToId("work"); }}>
                  <Roll>See the numbers</Roll>
                  <span className="arr">{I.arrow()}</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href={LINKS.resume} className="btn btn-ghost" download="Kavitha-G-SEO-Analyst.pdf">
                  <Roll>Download CV</Roll>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="hero-foot hero-fade" style={{ "--d": "1.35s" }}>
          <span className="hf-label">3.8 years in search · 1.8 of them leading a team</span>
          <div className="socials">
            <a className="soc" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{I.linkedin()}</a>
            <a className="soc" href={`mailto:${LINKS.email}`} aria-label="Email">{I.mail()}</a>
            <a className="soc" href={`tel:${LINKS.phoneDial}`} aria-label="Phone">{I.phone()}</a>
            <a className="soc" href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{I.whatsapp()}</a>
          </div>
        </div>
      </div>

      <button className="scroll-cue hero-fade" style={{ "--d": "1.5s" }} onClick={() => scrollToId("about")} aria-label="Scroll down">
        <span className="mouse"><i /></span>
      </button>
    </section>
  );
}

/* =====================================================================
   MARQUEE
   ===================================================================== */
function Marquee() {
  const row = (reverse) => (
    <div className={`marquee ${reverse ? "rev" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {[...MARQUEE, ...MARQUEE].map((m, i) => (
          <span className="marquee-item" key={i}>
            {m}
            <span className="star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="marquee-wrap">
      {row(false)}
      {row(true)}
    </div>
  );
}

/* =====================================================================
   ABOUT
   ===================================================================== */
function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="portrait rv">
          <div className="p-wrap">
            <div className="p-inner">
              {profilePic ? (
                <img src={profilePic} alt="Kavitha G" loading="lazy" />
              ) : (
                <div className="monogram">KG</div>
              )}
            </div>
          </div>
          <div className="float-badge fb-1">
            <span className="fb-ic">{I.search()}</span>
            <span>390 keywords in the top 10</span>
          </div>
          <div className="float-badge fb-2">
            <span className="fb-ic">{I.chart()}</span>
            <span>130+ guest posts placed</span>
          </div>
        </div>

        <div>
          <p className="kicker rv">Who I am</p>
          <SplitText text="An analyst who owns the numbers, not just the audit." className="title" />
          <p className="body rv" style={{ "--d": "0.1s" }}>
            I started on implementation — technical fixes, on-page work, content updates — and grew
            into leading the team that delivered it, which I did for 1.8 years.
          </p>
          <p className="body rv" style={{ "--d": "0.2s" }}>
            Most of my work has been agency-side, running 30+ websites at once: auditing them,
            fixing them, rewriting content around what people actually search for, and reporting on
            what moved. What interests me now is where search is going — I structure pages for AEO
            and GEO so they get quoted by AI answers, not only listed in a results page.
          </p>
          <div className="stats">
            <div className="stat rv" style={{ "--d": "0.1s" }}>
              <div className="stat-num"><Counter to={3.8} /></div>
              <div className="stat-cap">Years in search</div>
            </div>
            <div className="stat rv" style={{ "--d": "0.2s" }}>
              <div className="stat-num"><Counter to={30} suffix="+" /></div>
              <div className="stat-cap">Websites handled</div>
            </div>
            <div className="stat rv" style={{ "--d": "0.3s" }}>
              <div className="stat-num"><Counter to={1.8} /></div>
              <div className="stat-cap">Years leading a team</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   EXPERIENCE
   ===================================================================== */
function Experience() {
  const lineRef = useRef(null);
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return undefined;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height));
      el.style.setProperty("--fill", p.toFixed(3));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="section line-top" id="experience">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker rv">The path here</p>
          <SplitText text="Experience" className="title" />
        </div>
        <div className="timeline" ref={lineRef}>
          {EXPERIENCE.map((x, i) => (
            <div className="tl-item rv" key={i}>
              <div className="tl-meta">
                <div className="tl-years">{x.years}</div>
                <div className="tl-org">{x.org}</div>
              </div>
              <div className="tl-card">
                <h3 className="tl-role">{x.role}</h3>
                <ul className="tl-points">
                  {x.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   WORK
   ===================================================================== */
function ResultCard({ w }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - py) * 6}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };
  return (
    <article className="card" onMouseMove={onMove} onMouseLeave={onLeave} style={{ "--h": w.hue }}>
      <div className="card-visual">
        <div className="rlabel">
          <span className="rdot" />
          {w.context}
        </div>
        <div className="cv-mark">{w.metric}</div>
      </div>
      <div className="card-body">
        <div className="card-top">
          <div className="tags">
            {w.tags.map((t) => (
              <span className={`tag ${t === "Ongoing" ? "tag-live" : ""}`} key={t}>{t}</span>
            ))}
          </div>
        </div>
        <h3 className="card-title">{w.title}</h3>
        <p className="card-desc">{w.desc}</p>
      </div>
    </article>
  );
}

function Distribution() {
  const max = Math.max(...DIST.bands.map((b) => b.count));
  return (
    <div className="dist rv">
      <div className="dist-head">
        <h3>Where the portfolio ranks today</h3>
        <span>{DIST.total.toLocaleString("en-IN")} tracked keywords · 50+ country sites</span>
      </div>
      <ul className="dist-rows">
        {DIST.bands.map((b, i) => (
          <li key={b.label} style={{ "--i": i }}>
            <span className="dist-l">{b.label}</span>
            <span className="dist-track">
              <i style={{ width: `${(b.count / max) * 100}%` }} />
            </span>
            <span className="dist-c">{b.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Work() {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker rv">Proof</p>
          <SplitText text="The numbers, with clients kept anonymous." className="title" />
        </div>

        <Distribution />

        <div className="work-grid">
          {RESULTS.map((w, i) => (
            <div className={`work-cell rv ${w.feature ? "feature" : ""}`} key={w.title} style={{ "--d": `${(i % 2) * 0.1}s` }}>
              <ResultCard w={w} />
            </div>
          ))}
        </div>

        <p className="nda rv">{NDA_NOTE}</p>
      </div>
    </section>
  );
}

/* =====================================================================
   SKILLS
   ===================================================================== */
function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker rv">What I do</p>
          <SplitText text="Three skill sets, one job: be the result." className="title" />
        </div>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div className="skill-panel rv" key={s.title} style={{ "--d": `${i * 0.12}s` }}>
              <div className="sp-ic">{I[s.icon]()}</div>
              <h3 className="sp-title">{s.title}</h3>
              <p className="sp-sub">{s.sub}</p>
              <div className="chips">
                {s.items.map((it, j) => (
                  <span className="chip rv" key={it} style={{ "--d": `${0.2 + j * 0.05}s` }}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   SERVICES / HIRING
   ===================================================================== */
function Services() {
  return (
    <section className="section line-top" id="services">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker rv">For hiring teams</p>
          <SplitText text="What I own, day to day." className="title" />
        </div>

        <div className="svc-grid">
          {SERVICES.map((sv, i) => (
            <div className="svc rv" key={sv.title} style={{ "--d": `${(i % 3) * 0.08}s` }}>
              <div className="svc-ic">{I[sv.icon]()}</div>
              <h3 className="svc-title">{sv.title}</h3>
              <p className="svc-desc">{sv.desc}</p>
              <ul className="svc-list">
                {sv.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="process">
          <h3 className="process-title rv">How a site gets fixed</h3>
          <ol className="steps">
            {PROCESS.map(([t, d], i) => (
              <li className="step rv" key={t} style={{ "--d": `${i * 0.1}s` }}>
                <span className="step-n">Step {i + 1}</span>
                <h4 className="step-t">{t}</h4>
                <p className="step-d">{d}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="hiring rv">
          <dl className="hire-facts">
            {HIRING.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="offer rv">
          <div>
            <h3 className="offer-title">Hiring for an SEO role?</h3>
            <p className="offer-sub">
              The CV has the full history. For freelance work — an audit, an AEO overhaul or a
              monthly retainer — WhatsApp is quicker.
            </p>
          </div>
          <Magnetic strength={0.25}>
            <a className="btn btn-primary btn-lg" href={LINKS.resume} download="Kavitha-G-SEO-Analyst.pdf">
              <Roll>Download CV</Roll>
              <span className="arr">{I.arrow()}</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   CONTACT
   ===================================================================== */
function Contact() {
  const tiles = [
    { icon: I.mail, label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}` },
    { icon: I.phone, label: "Phone", value: LINKS.phoneDisplay, href: `tel:${LINKS.phoneDial}` },
    { icon: I.whatsapp, label: "WhatsApp", value: LINKS.phoneDisplay, href: LINKS.whatsappWork, ext: true },
    { icon: I.linkedin, label: "LinkedIn", value: "Connect", href: LINKS.linkedin, ext: true },
  ];
  return (
    <section className="section contact" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="wrap">
        <p className="kicker rv">Get in touch</p>
        <SplitText text="Let's talk about" as="h2" className="cta-title" />
        <SplitText text="the role." as="p" className="cta-title" gradient delay={0.2} />

        <div className="contact-row">
          <div className="contact-left rv">
            <p className="body">
              Email is best for roles, WhatsApp for project work. I reply quickly to both.
            </p>
            <Magnetic strength={0.25}>
              <a className="btn btn-primary btn-lg" href={`mailto:${LINKS.email}?subject=${encodeURIComponent("Role enquiry for Kavitha G")}`}>
                <Roll>Send an email</Roll>
                <span className="arr">{I.arrow()}</span>
              </a>
            </Magnetic>
          </div>
          <div className="tiles">
            {tiles.map((t, i) => (
              <a
                key={t.label}
                className="tile rv"
                href={t.href}
                style={{ "--d": `${i * 0.06}s` }}
                {...(t.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="tile-ic">{t.icon()}</span>
                <span className="tile-txt">
                  <span className="tile-l">{t.label}</span>
                  <span className="tile-v">{t.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   FOOTER
   ===================================================================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-big" aria-hidden="true">Kavitha G</div>
      <div className="wrap footer-row">
        <span>© {new Date().getFullYear()} Kavitha G — SEO Analyst</span>
        <div className="socials">
          <a className="soc" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{I.linkedin()}</a>
          <a className="soc" href={`mailto:${LINKS.email}`} aria-label="Email">{I.mail()}</a>
          <a className="soc" href={`tel:${LINKS.phoneDial}`} aria-label="Phone">{I.phone()}</a>
          <a className="soc" href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{I.whatsapp()}</a>
        </div>
      </div>
    </footer>
  );
}

/* =====================================================================
   ROOT
   ===================================================================== */
export default function KavithaPortfolio() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const barRef = useRef(null);
  const active = useActiveSection();
  useReveal();

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
  }, [loaded]);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      setScrolled(y > 20);
      setHidden(y > last && y > 400);
      setShowTop(y > 900);
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`pf ${loaded ? "is-loaded" : ""}`}>
      <style>{CSS}</style>
      <Loader onDone={setLoaded} />
      <Cursor />
      <div className="progress" ref={barRef} />
      <Nav active={active} scrolled={scrolled} hidden={hidden} />
      <main>
        <Hero loaded={loaded} />
        <Marquee />
        <About />
        <Experience />
        <Work />
        <Services />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <button className={`to-top ${showTop ? "show" : ""}`} onClick={() => scrollToId("top")} aria-label="Back to top">
        {I.up()}
      </button>
    </div>
  );
}

/* =====================================================================
   STYLES (embedded — no separate CSS file needed)
   ===================================================================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@400;500;600;700;800&display=swap');

:root{
  color-scheme: dark;
  --bg:#070707; --surface:#0E0D0C; --card:#131211; --glass:rgba(24,22,20,.62);
  --text:#F4F1E9; --text-soft:#B6B0A4; --muted:#857F74;
  --gold:#FFC53D; --gold-2:#FFDE8A; --amber:#E08A00; --orange:#FF8A2B;
  --grad:linear-gradient(110deg,#FFC53D 0%,#FFE9A8 42%,#FF8A2B 72%,#FFC53D 100%);
  --glow:rgba(255,197,61,.45);
  --line:rgba(255,205,110,.15); --line-2:rgba(255,255,255,.06);
  --display:'Sora',system-ui,sans-serif;
  --sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  --ease:cubic-bezier(.2,.85,.15,1);
  --wrap:1200px; --gutter:clamp(20px,5vw,64px); --section-y:clamp(80px,12vw,160px);
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:auto}
body{margin:0;background:var(--bg);color:var(--text);font-family:var(--sans);font-size:16.5px;line-height:1.65;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden}
.pf{position:relative;text-align:left;overflow-x:clip;background:var(--bg);color:var(--text);font-family:var(--sans);line-height:1.65}
.pf ::selection{background:var(--gold);color:#0A0806}
.pf a{color:inherit;text-decoration:none}
.pf ul,.pf ol{margin:0;padding:0;list-style:none}
.pf img{max-width:100%;display:block}
:where(.pf) :where(h1,h2,h3,h4,p){margin:0;font-weight:inherit}
.pf button{font-family:inherit;color:inherit}
.pf svg{width:18px;height:18px;flex:none}
.pf :focus-visible{outline:2px solid var(--gold-2);outline-offset:3px;border-radius:6px}
.wrap{width:100%;max-width:var(--wrap);margin:0 auto;padding-inline:var(--gutter);position:relative;z-index:1}

/* ---------- loader ---------- */
.loader{position:fixed;inset:0;z-index:1000;background:#050505;display:grid;place-items:center;transition:transform 1.1s cubic-bezier(.77,0,.18,1)}
.loader.gone{transform:translateY(-100%);pointer-events:none}
.loader-inner{width:min(340px,72vw)}
.loader-mark{font-family:var(--display);font-weight:700;font-size:clamp(2.2rem,7vw,3.2rem);letter-spacing:-.04em;margin-bottom:24px}
.loader-mark span{color:var(--gold)}
.loader-bar{height:2px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden}
.loader-bar i{display:block;height:100%;background:var(--grad);transform-origin:left;transition:transform .2s linear}
.loader-meta{display:flex;justify-content:space-between;margin-top:14px;font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}

/* ---------- cursor ---------- */
.c-dot,.c-ring{position:fixed;top:0;left:0;pointer-events:none;z-index:1001;display:none}
.has-cursor .c-dot,.has-cursor .c-ring{display:block}
.has-cursor,.has-cursor *{cursor:none !important}
.c-dot{width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:#fff}
.c-ring{width:38px;height:38px;margin:-19px 0 0 -19px}
.c-ring i{display:block;width:100%;height:100%;border-radius:50%;border:1px solid rgba(255,214,120,.6);transition:transform .35s var(--ease),background .35s,border-color .35s}
.c-ring.hover i{transform:scale(1.8);background:rgba(255,197,61,.14);border-color:transparent}

/* ---------- progress ---------- */
.progress{position:fixed;top:0;left:0;right:0;height:2px;background:var(--grad);transform-origin:left;transform:scaleX(0);z-index:200}

/* ---------- buttons ---------- */
.btn{position:relative;isolation:isolate;overflow:hidden;display:inline-flex;align-items:center;gap:10px;font-size:15px;font-weight:500;padding:15px 28px;border-radius:50px;border:1px solid transparent;cursor:pointer;transition:color .4s var(--ease),border-color .4s,box-shadow .4s}
.btn::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;transform:translateY(102%);transition:transform .5s var(--ease)}
.btn:hover::before{transform:translateY(0)}
.btn-primary{background:var(--amber);color:#0A0806;font-weight:600;box-shadow:0 14px 36px -14px var(--glow)}
.btn-primary::before{background:linear-gradient(110deg,#FFD66B,#FFA338)}
.btn-primary:hover{box-shadow:0 18px 44px -14px var(--glow)}
.btn-ghost{color:var(--text);border-color:var(--line);background:rgba(255,255,255,.02)}
.btn-ghost::before{background:var(--gold)}
.btn-ghost:hover{color:#070707;border-color:var(--gold)}
.btn-sm{padding:10px 20px;font-size:14px}
.btn-lg{padding:18px 32px;font-size:16px}
.btn .arr{display:inline-flex;transition:transform .4s var(--ease)}
.btn:hover .arr{transform:translateX(4px)}
.roll{display:inline-flex;flex-direction:column;height:1.35em;line-height:1.35em;overflow:hidden}
.roll>span{display:block;transition:transform .5s var(--ease)}
.btn:hover .roll>span{transform:translateY(-100%)}
.magnetic{display:inline-block;transition:transform .45s var(--ease)}

/* ---------- nav ---------- */
.nav{position:fixed;top:0;left:0;right:0;z-index:150;border-bottom:1px solid transparent;transition:transform .5s var(--ease),background .35s,border-color .35s}
.nav.scrolled{background:rgba(7,7,7,.76);-webkit-backdrop-filter:blur(16px) saturate(160%);backdrop-filter:blur(16px) saturate(160%);border-bottom-color:var(--line-2)}
.nav.hidden{transform:translateY(-100%)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;height:74px}
.brand{font-family:var(--display);font-weight:700;font-size:1.4rem;letter-spacing:-.03em}
.brand span{color:var(--gold)}
.nav-links{display:flex;gap:2px;padding:5px;border:1px solid var(--line);border-radius:50px;background:rgba(16,15,14,.6);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.nav-link{font-size:14px;color:var(--text-soft);padding:8px 16px;border-radius:50px;transition:color .3s,background .3s}
.nav-link:hover{color:#fff}
.nav-link.active{color:#fff;background:rgba(255,197,61,.18)}
.nav-toggle{display:none;position:relative;width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:rgba(16,15,14,.65);cursor:pointer}
.nav-toggle span{position:absolute;left:14px;right:14px;height:1.5px;background:#fff;border-radius:2px;transition:transform .45s var(--ease),top .45s var(--ease)}
.nav-toggle span:nth-child(1){top:19px}
.nav-toggle span:nth-child(2){top:26px}
.nav-toggle.open span:nth-child(1){top:22px;transform:rotate(45deg)}
.nav-toggle.open span:nth-child(2){top:22px;transform:rotate(-45deg)}
.mmenu{display:none}

/* ---------- hero ---------- */
.hero{position:relative;min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:120px 0 90px;overflow:hidden}
.hero-bg{position:absolute;inset:0;pointer-events:none}
.grid-lines{position:absolute;inset:0;background-image:linear-gradient(rgba(255,205,110,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,205,110,.07) 1px,transparent 1px);background-size:72px 72px;-webkit-mask-image:radial-gradient(ellipse 80% 70% at 60% 35%,#000 25%,transparent 75%);mask-image:radial-gradient(ellipse 80% 70% at 60% 35%,#000 25%,transparent 75%)}
.orb{position:absolute;border-radius:50%;filter:blur(70px);transition:transform 1.2s var(--ease)}
.orb-1{width:560px;height:560px;top:-160px;right:-120px;background:#E08A00;opacity:.28;transform:translate(calc(var(--px,0) * -60px),calc(var(--py,0) * -60px));animation:breathe 9s ease-in-out infinite alternate}
.orb-2{width:420px;height:420px;bottom:-140px;left:-140px;background:#FF8A2B;opacity:.15;transform:translate(calc(var(--px,0) * 50px),calc(var(--py,0) * 50px));animation:breathe 11s ease-in-out infinite alternate-reverse}
@keyframes breathe{to{scale:1.18}}
.hero-inner{width:100%}

.hero-fade{opacity:0;translate:0 24px;transition:opacity 1s var(--ease),translate 1s var(--ease);transition-delay:var(--d,0s)}
.is-loaded .hero-fade{opacity:1;translate:0 0}

.pill{display:inline-flex;align-items:center;gap:10px;font-size:13.5px;color:var(--text-soft);padding:8px 16px 8px 12px;border:1px solid var(--line);border-radius:50px;background:rgba(255,197,61,.07);margin-bottom:30px}
.live{position:relative;width:8px;height:8px;border-radius:50%;background:#34E3A0}
.live::after{content:"";position:absolute;inset:0;border-radius:50%;background:#34E3A0;animation:ping 1.8s cubic-bezier(0,0,.2,1) infinite}
@keyframes ping{75%,100%{transform:scale(2.8);opacity:0}}

.hero-name{font-family:var(--display);font-weight:700;font-size:clamp(3.6rem,15vw,12rem);line-height:.86;letter-spacing:-.055em;margin-bottom:clamp(28px,4vw,44px)}
.hero-name .line{display:block;white-space:nowrap}
.ch{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em}
.ch>span{display:inline-block;transform:translateY(112%) rotate(7deg);transform-origin:0 100%}
.is-loaded .ch>span{animation:chUp 1.1s var(--ease) forwards}
@keyframes chUp{to{transform:translateY(0) rotate(0)}}
.line-2 .ch>span{background:var(--grad);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent}
.is-loaded .line-2 .ch>span{animation:chUp 1.1s var(--ease) forwards,shine 6s linear 1.6s infinite}
@keyframes shine{to{background-position:200% center}}

.hero-sub{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5vw,80px);align-items:end}
.typer{font-family:var(--display);font-size:clamp(1.35rem,3vw,2.1rem);font-weight:500;letter-spacing:-.02em;line-height:1.25;color:var(--text-soft);min-height:2.6em}
.typer b{color:var(--gold-2);font-weight:600}
.caret{display:inline-block;width:3px;height:.95em;margin-left:5px;vertical-align:-.1em;background:var(--orange);border-radius:2px;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.hero-blurb{color:var(--text-soft);font-size:1.06rem;max-width:46ch;margin-bottom:36px}
.hero-actions{display:flex;flex-wrap:wrap;gap:14px}
.hero-foot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:18px;margin-top:clamp(48px,7vw,84px);padding-top:24px;border-top:1px solid var(--line-2)}
.hf-label{font-size:13.5px;color:var(--muted)}
.socials{display:flex;gap:10px}
.soc{width:42px;height:42px;display:grid;place-items:center;border-radius:50%;border:1px solid var(--line);color:var(--text-soft);background:rgba(255,255,255,.02);transition:color .3s,border-color .3s,background .3s,translate .3s var(--ease)}
.soc:hover{color:#FFC53D;border-color:var(--gold);background:rgba(255,197,61,.16);translate:0 -3px}
.soc svg{width:17px;height:17px}

.scroll-cue{position:absolute;bottom:26px;left:50%;margin-left:-14px;background:none;border:0;padding:0;cursor:pointer;z-index:2}
.mouse{display:block;width:28px;height:44px;border:1.5px solid rgba(182,176,164,.45);border-radius:20px;position:relative}
.mouse i{position:absolute;left:50%;top:9px;width:3px;height:8px;margin-left:-1.5px;border-radius:3px;background:var(--gold-2);animation:wheel 1.8s var(--ease) infinite}
@keyframes wheel{0%{opacity:0;transform:translateY(-4px)}30%{opacity:1}100%{opacity:0;transform:translateY(12px)}}

/* ---------- marquee ---------- */
.marquee-wrap{position:relative;z-index:1;border-block:1px solid var(--line-2);background:var(--surface);padding:10px 0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent);mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.marquee{overflow:hidden;padding:10px 0}
.marquee-track{display:flex;width:max-content;animation:marq 38s linear infinite}
.marquee.rev .marquee-track{animation-direction:reverse;animation-duration:46s}
.marquee-wrap:hover .marquee-track{animation-play-state:paused}
.marquee-item{display:inline-flex;align-items:center;gap:30px;padding-right:30px;font-family:var(--display);font-weight:600;font-size:clamp(1.6rem,3.6vw,2.6rem);letter-spacing:-.03em;white-space:nowrap}
.marquee .star{color:var(--gold);font-size:.55em}
.marquee.rev .marquee-item{color:transparent;-webkit-text-stroke:1px rgba(182,176,164,.4)}
.marquee.rev .star{-webkit-text-stroke:0;color:var(--orange)}
@keyframes marq{to{transform:translateX(-50%)}}

/* ---------- sections & type ---------- */
.section{position:relative;padding:var(--section-y) 0}
.line-top{border-top:1px solid var(--line-2)}
.sec-head{margin-bottom:clamp(40px,6vw,76px)}
.kicker{display:inline-flex;align-items:center;gap:12px;font-size:13px;font-weight:500;color:var(--gold-2);margin-bottom:20px}
.kicker::before{content:"";width:30px;height:1px;background:var(--grad)}
.title{font-family:var(--display);font-weight:600;font-size:clamp(2.3rem,6vw,4.4rem);line-height:1.02;letter-spacing:-.04em;max-width:16ch}
.body{color:var(--text-soft);max-width:60ch;margin-top:22px}

.split .w{display:inline-block;overflow:hidden;vertical-align:top;margin-right:.24em;padding-bottom:.1em;margin-bottom:-.1em}
.split .w>span{display:inline-block;transform:translateY(108%);transition:transform 1.1s var(--ease)}
.split.in .w>span{transform:translateY(0)}
.split.grad .w>span{background:var(--grad);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shine 6s linear infinite}

.rv:not(.split){opacity:0;translate:0 36px;transition:opacity 1s var(--ease),translate 1s var(--ease);transition-delay:var(--d,0s)}
.rv.in:not(.split){opacity:1;translate:0 0}

/* ---------- about ---------- */
.about-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(48px,7vw,110px);align-items:center}
.portrait{position:relative;width:100%;max-width:400px;justify-self:center}
.p-wrap{position:relative;aspect-ratio:4/5;padding:2px;border-radius:28px;overflow:hidden;background:var(--line)}
.p-wrap::before{content:"";position:absolute;inset:-60%;background:conic-gradient(from 0deg,transparent 0 55%,#FFC53D 70%,#FF8A2B 82%,transparent 94%);animation:spin 6s linear infinite}
@keyframes spin{to{transform:rotate(1turn)}}
.p-inner{position:relative;height:100%;border-radius:26px;overflow:hidden;background:#0C0B0A}
.p-inner img{width:100%;height:100%;object-fit:cover;scale:1.08;transition:scale 1.4s var(--ease)}
.portrait:hover .p-inner img{scale:1}
.monogram{height:100%;display:grid;place-items:center;font-family:var(--display);font-weight:700;font-size:clamp(5rem,12vw,8rem);letter-spacing:-.05em;background:radial-gradient(circle at 30% 20%,rgba(255,197,61,.3),transparent 60%),#0C0B0A;color:transparent;-webkit-text-stroke:1.5px rgba(255,214,120,.7)}
.float-badge{position:absolute;display:flex;align-items:center;gap:10px;padding:10px 16px 10px 10px;border-radius:16px;background:rgba(14,13,12,.85);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border:1px solid var(--line);font-size:13.5px;font-weight:500;white-space:nowrap;box-shadow:0 24px 50px -24px #000;animation:bob 5s ease-in-out infinite}
.fb-1{top:12%;right:-14%}
.fb-2{bottom:12%;left:-14%;animation-delay:-2.5s}
.fb-ic{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(135deg,#FFC53D,#FF8A2B);color:#0A0806}
.fb-ic svg{width:17px;height:17px}
@keyframes bob{50%{transform:translateY(-12px)}}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:44px}
.stat{padding:22px 20px;border-radius:20px;border:1px solid var(--line);background:var(--glass)}
.stat-num{font-family:var(--display);font-weight:700;font-size:clamp(2.2rem,4vw,3.2rem);line-height:1;letter-spacing:-.04em;background:linear-gradient(110deg,#FFDE8A,#FF8A2B);-webkit-background-clip:text;background-clip:text;color:transparent}
.stat-cap{font-size:13px;color:var(--muted);margin-top:10px}

/* ---------- experience ---------- */
.timeline{--pad:clamp(30px,5vw,60px);position:relative;padding-left:var(--pad)}
.timeline::before,.timeline::after{content:"";position:absolute;left:5px;top:6px;bottom:0;width:2px;border-radius:2px}
.timeline::before{background:var(--line)}
.timeline::after{background:linear-gradient(180deg,#FFC53D,#FF8A2B);transform:scaleY(var(--fill,0));transform-origin:top;box-shadow:0 0 14px var(--glow)}
.tl-item{position:relative;display:grid;grid-template-columns:220px 1fr;gap:clamp(16px,4vw,48px);padding-bottom:clamp(40px,6vw,64px)}
.tl-item:last-child{padding-bottom:0}
.tl-item::before{content:"";position:absolute;left:calc(var(--pad) * -1);top:6px;width:12px;height:12px;border-radius:50%;background:var(--bg);border:2px solid var(--gold);box-shadow:0 0 0 5px rgba(255,197,61,.12),0 0 16px var(--glow);z-index:1}
.tl-years{font-family:var(--display);font-weight:600;font-size:1.05rem;color:var(--gold-2);margin-bottom:6px}
.tl-org{font-size:14px;color:var(--muted)}
.tl-card{padding:clamp(22px,3vw,32px);border-radius:22px;border:1px solid var(--line);background:var(--glass);transition:border-color .4s,background .4s,translate .4s var(--ease)}
.tl-card:hover{border-color:rgba(255,214,120,.4);background:rgba(32,28,22,.7);translate:6px 0}
.tl-role{font-family:var(--display);font-weight:600;font-size:clamp(1.35rem,2.6vw,1.8rem);letter-spacing:-.02em;line-height:1.15;margin-bottom:16px}
.tl-points{display:grid;gap:11px}
.tl-points li{position:relative;padding-left:22px;color:var(--text-soft);font-size:.97rem}
.tl-points li::before{content:"";position:absolute;left:0;top:.72em;width:8px;height:2px;border-radius:2px;background:var(--grad)}

/* ---------- ranking distribution ---------- */
.dist{position:relative;z-index:1;margin-bottom:clamp(26px,3.4vw,40px);padding:clamp(22px,3vw,32px);
  border:1px solid var(--line);border-radius:24px;background:var(--glass);
  -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.dist-head{display:flex;flex-wrap:wrap;gap:8px 20px;align-items:baseline;justify-content:space-between;
  padding-bottom:18px;border-bottom:1px solid var(--line-2)}
.dist-head h3{font-family:var(--display);font-weight:600;font-size:1.15rem;letter-spacing:-.02em}
.dist-head span{font-size:13.5px;color:var(--muted)}
.dist-rows{display:grid;gap:12px;margin-top:22px}
.dist-rows li{display:grid;grid-template-columns:126px 1fr 54px;align-items:center;gap:16px;font-size:14px}
.dist-l{color:var(--text-soft)}
.dist-track{position:relative;height:10px;border-radius:6px;background:rgba(255,255,255,.05);overflow:hidden}
.dist-track i{position:absolute;inset:0 auto 0 0;display:block;border-radius:6px;background:var(--grad);
  background-size:200% auto;transform-origin:left;animation:distIn .9s var(--ease) both,shine 7s linear infinite;
  animation-delay:calc(var(--i) * .08s),0s;box-shadow:0 0 18px -6px var(--glow)}
.dist-rows li:nth-child(n+4) .dist-track i{background:rgba(255,197,61,.22);box-shadow:none;animation:distIn .9s var(--ease) both;animation-delay:calc(var(--i) * .08s)}
@keyframes distIn{from{transform:scaleX(0)}}
.dist-c{text-align:right;font-family:var(--display);font-weight:600;font-variant-numeric:tabular-nums}

/* ---------- result card label ---------- */
.rlabel{position:absolute;top:18px;left:18px;right:18px;display:flex;align-items:center;gap:10px;
  padding:9px 14px;border-radius:12px;background:rgba(5,5,5,.5);border:1px solid rgba(255,255,255,.07);
  -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font-size:12.5px;color:var(--text-soft);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rdot{width:8px;height:8px;border-radius:50%;flex:none;background:var(--gold);box-shadow:0 0 10px var(--glow)}
.nda{margin-top:clamp(22px,3vw,32px);font-size:13.5px;color:var(--muted);max-width:72ch;
  padding-left:16px;border-left:2px solid rgba(255,197,61,.45)}

/* ---------- hiring facts ---------- */
.hiring{margin-top:clamp(44px,6vw,72px);border:1px solid var(--line);border-radius:24px;overflow:hidden}
.hire-facts{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line-2)}
.hire-facts div{background:var(--card);padding:22px clamp(20px,2.6vw,28px)}
.hire-facts dt{font-size:13px;color:var(--gold-2);margin-bottom:6px}
.hire-facts dd{margin:0;font-size:15.5px;color:var(--text)}
@media (max-width:760px){
  .hire-facts{grid-template-columns:1fr}
  .dist-rows li{grid-template-columns:100px 1fr 44px;gap:10px;font-size:13px}
}

/* ---------- work ---------- */
.work{background:var(--surface);border-block:1px solid var(--line-2);overflow:hidden}
.work::before{content:"";position:absolute;width:600px;height:600px;right:-200px;top:10%;border-radius:50%;background:#E08A00;opacity:.08;filter:blur(90px);pointer-events:none}
.work-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(18px,2.4vw,28px)}
.work-cell.feature{grid-column:1/-1}
.card{position:relative;display:block;height:100%;border-radius:26px;border:1px solid var(--line);background:var(--card);overflow:hidden;transform:perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .6s var(--ease),border-color .4s,box-shadow .4s}
.card:hover{transition:transform .15s linear,border-color .4s,box-shadow .4s;border-color:rgba(255,214,120,.45);box-shadow:0 40px 80px -40px rgba(0,0,0,.9),0 0 60px -24px var(--glow)}
.card::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(460px circle at var(--mx,50%) var(--my,50%),rgba(255,214,120,.13),transparent 45%);opacity:0;transition:opacity .4s}
.card:hover::after{opacity:1}
.card-visual{position:relative;height:clamp(190px,22vw,250px);overflow:hidden;border-bottom:1px solid var(--line-2);background:radial-gradient(120% 120% at 0% 0%,hsl(var(--h) 90% 56% / .55),transparent 55%),radial-gradient(90% 100% at 100% 100%,hsl(calc(var(--h) - 25) 90% 55% / .35),transparent 60%),#0C0B0A}
.chrome{position:absolute;top:18px;left:18px;right:18px;display:flex;align-items:center;gap:7px;padding:9px 13px;border-radius:12px;background:rgba(5,5,5,.55);border:1px solid rgba(255,255,255,.07);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.chrome i{width:9px;height:9px;border-radius:50%;flex:none}
.chrome i:nth-child(1){background:#FF5F57}
.chrome i:nth-child(2){background:#FEBC2E}
.chrome i:nth-child(3){background:#28C840}
.chrome span{margin-left:8px;font-size:12px;color:var(--text-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cv-mark{position:absolute;right:-4px;bottom:-.2em;font-family:var(--display);font-weight:700;font-size:clamp(5.5rem,13vw,10rem);line-height:1;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:1.5px rgba(244,241,233,.32);transition:translate .9s var(--ease),-webkit-text-stroke-color .5s}
.card:hover .cv-mark{translate:-14px -10px;-webkit-text-stroke-color:rgba(255,214,120,.9)}
.card-body{padding:26px 26px 28px}
.card-top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tag{font-size:12px;font-weight:500;color:var(--gold-2);padding:5px 12px;border-radius:50px;border:1px solid rgba(255,197,61,.28);background:rgba(255,197,61,.08)}
.tag-live{color:#34E3A0;border-color:rgba(52,227,160,.3);background:rgba(52,227,160,.08)}
.card-go{flex:none;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--line);color:var(--text-soft);transform:rotate(-45deg);transition:transform .5s var(--ease),background .4s,border-color .4s,color .4s}
.card:hover .card-go{transform:rotate(0);background:var(--amber);border-color:var(--amber);color:#fff}
.card-title{font-family:var(--display);font-weight:600;font-size:clamp(1.4rem,2.6vw,1.95rem);line-height:1.1;letter-spacing:-.03em;margin-bottom:10px}
.card-desc{color:var(--text-soft);font-size:.96rem;max-width:54ch}
.feature .card{display:grid;grid-template-columns:1.15fr 1fr}
.feature .card-visual{height:auto;min-height:320px;border-bottom:0;border-right:1px solid var(--line-2)}
.feature .card-body{display:flex;flex-direction:column;justify-content:center;padding:clamp(28px,4vw,48px)}
.feature .card-title{font-size:clamp(1.7rem,3.4vw,2.6rem)}

/* ---------- skills ---------- */
.skills-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.skill-panel{position:relative;overflow:hidden;padding:clamp(28px,4vw,44px);border-radius:28px;border:1px solid var(--line);background:var(--glass)}
.skill-panel::before{content:"";position:absolute;width:280px;height:280px;top:-140px;right:-100px;border-radius:50%;background:#FFC53D;opacity:.14;filter:blur(60px);transition:opacity .5s}
.skill-panel:hover::before{opacity:.3}
.sp-ic{position:relative;width:56px;height:56px;border-radius:16px;display:grid;place-items:center;background:linear-gradient(135deg,#FFC53D,#FF8A2B);color:#fff;margin-bottom:24px;box-shadow:0 14px 30px -12px var(--glow)}
.sp-ic svg{width:24px;height:24px}
.sp-title{font-family:var(--display);font-weight:600;font-size:1.7rem;letter-spacing:-.03em;margin-bottom:8px}
.sp-sub{color:var(--muted);font-size:14.5px;margin-bottom:28px;max-width:40ch}
.chips{display:flex;flex-wrap:wrap;gap:10px}
.chip{font-size:14px;color:var(--text-soft);padding:10px 18px;border-radius:50px;border:1px solid var(--line);background:rgba(255,255,255,.02);transition:opacity 1s var(--ease),translate .5s var(--ease),color .3s,border-color .3s,background .3s}
.chip:hover{color:#fff;border-color:var(--gold);background:rgba(255,197,61,.14)}

/* ---------- services ---------- */
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.svc{position:relative;overflow:hidden;padding:clamp(26px,3.5vw,38px);border-radius:26px;border:1px solid var(--line);background:var(--glass);transition:opacity 1s var(--ease),translate 1s var(--ease),border-color .4s,box-shadow .4s}
.svc::after{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:var(--grad);transform:scaleX(0);transform-origin:left;transition:transform .7s var(--ease)}
.svc:hover{border-color:rgba(255,214,120,.4);box-shadow:0 0 60px -28px var(--glow)}
.svc:hover::after{transform:scaleX(1)}
.svc-ic{width:52px;height:52px;border-radius:15px;display:grid;place-items:center;color:var(--gold-2);background:rgba(255,197,61,.12);border:1px solid rgba(255,197,61,.25);margin-bottom:22px;transition:background .4s,color .4s,border-color .4s}
.svc:hover .svc-ic{background:linear-gradient(135deg,#FFC53D,#FF8A2B);color:#fff;border-color:transparent}
.svc-ic svg{width:22px;height:22px}
.svc-title{font-family:var(--display);font-weight:600;font-size:1.45rem;letter-spacing:-.02em;line-height:1.2;margin-bottom:10px}
.svc-desc{color:var(--text-soft);font-size:.97rem;margin-bottom:22px;max-width:46ch}
.svc-list{display:grid;grid-template-columns:1fr;gap:10px}
.svc-list-2{grid-template-columns:1fr 1fr;gap:10px 18px}
.svc-feature{grid-column:1/-1;display:grid;grid-template-columns:1.15fr 1fr;gap:clamp(24px,4vw,52px);align-items:center}
.svc-media{position:relative;aspect-ratio:16/9;border-radius:18px;overflow:hidden;border:1px solid var(--line);background:#05070C;box-shadow:0 30px 60px -30px #000,0 0 50px -24px var(--glow)}
.svc-media video{display:block;width:100%;height:100%;object-fit:cover;background:#05070C}
.svc-link{display:inline-flex;align-items:center;gap:8px;margin-top:24px;font-size:14.5px;font-weight:500;color:var(--gold-2);transition:color .3s}
.svc-link span{display:inline-flex;transition:transform .4s var(--ease)}
.svc-link:hover{color:#fff}
.svc-link:hover span{transform:translateX(4px)}
.svc-list li{position:relative;padding-left:24px;font-size:14px;color:var(--text-soft)}
.svc-list li::before{content:"";position:absolute;left:5px;top:.32em;width:5px;height:10px;border:solid #34E3A0;border-width:0 2px 2px 0;transform:rotate(45deg)}

.process{margin-top:clamp(64px,8vw,110px)}
.process-title{font-family:var(--display);font-weight:600;font-size:clamp(1.6rem,3vw,2.3rem);letter-spacing:-.03em;margin-bottom:34px}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.step{position:relative;padding-top:26px;border-top:1px solid var(--line)}
.step::before{content:"";position:absolute;top:-1px;left:0;width:44px;height:2px;background:var(--grad);transition:width .7s var(--ease)}
.step:hover::before{width:100%}
.step-n{display:block;font-size:13px;font-weight:600;color:var(--gold-2);margin-bottom:12px}
.step-t{font-family:var(--display);font-weight:600;font-size:1.3rem;letter-spacing:-.02em;margin-bottom:8px}
.step-d{font-size:14.5px;color:var(--text-soft)}

.offer{position:relative;overflow:hidden;margin-top:clamp(56px,7vw,96px);display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap;padding:clamp(28px,4vw,50px);border-radius:28px;border:1px solid rgba(255,214,120,.3);background:radial-gradient(120% 160% at 0% 0%,rgba(37,99,235,.38),transparent 55%),var(--card)}
.offer::after{content:"";position:absolute;width:300px;height:300px;right:-80px;bottom:-160px;border-radius:50%;background:#FF8A2B;opacity:.14;filter:blur(70px);pointer-events:none}
.offer>*{position:relative;z-index:1}
.offer-title{font-family:var(--display);font-weight:600;font-size:clamp(1.6rem,3.4vw,2.5rem);letter-spacing:-.03em;line-height:1.1;margin-bottom:10px}
.offer-sub{color:var(--text-soft);max-width:52ch}

/* ---------- contact ---------- */
.contact{overflow:hidden;border-top:1px solid var(--line-2)}
.contact-glow{position:absolute;width:800px;height:800px;left:50%;top:-300px;margin-left:-400px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,.35),transparent 62%);filter:blur(30px);pointer-events:none}
.cta-title{font-family:var(--display);font-weight:700;font-size:clamp(2.6rem,8.5vw,6.6rem);line-height:.98;letter-spacing:-.05em}
.contact-row{display:grid;grid-template-columns:1fr 1.25fr;gap:clamp(32px,5vw,80px);margin-top:clamp(48px,7vw,84px);align-items:start}
.contact-left .body{margin:0 0 30px;font-size:1.06rem}
.tiles{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.tile{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:20px;border:1px solid var(--line);background:var(--glass);min-width:0;transition:opacity 1s var(--ease),translate .5s var(--ease),border-color .35s,background .35s}
.tile:hover{border-color:rgba(255,214,120,.5);background:rgba(22,33,56,.7)}
.tile-ic{flex:none;width:44px;height:44px;border-radius:13px;display:grid;place-items:center;color:var(--gold-2);background:rgba(255,197,61,.12);border:1px solid rgba(255,197,61,.25);transition:background .35s,color .35s,border-color .35s}
.tile:hover .tile-ic{background:linear-gradient(135deg,#FFC53D,#FF8A2B);color:#fff;border-color:transparent}
.tile-txt{display:flex;flex-direction:column;min-width:0}
.tile-l{font-size:12px;color:var(--muted)}
.tile-v{font-size:14.5px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* ---------- footer ---------- */
.footer{position:relative;overflow:hidden;padding:clamp(40px,6vw,70px) 0 34px;border-top:1px solid var(--line-2)}
.footer-big{font-family:var(--display);font-weight:700;font-size:clamp(3.4rem,15vw,12rem);line-height:.82;letter-spacing:-.06em;text-align:center;white-space:nowrap;user-select:none;color:transparent;-webkit-text-stroke:1px rgba(255,205,110,.22);margin-bottom:clamp(30px,5vw,56px);transition:-webkit-text-stroke-color .6s}
.footer-big:hover{-webkit-text-stroke-color:rgba(255,214,120,.7)}
.footer-row{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:18px;font-size:13.5px;color:var(--muted)}

/* ---------- back to top ---------- */
.to-top{position:fixed;right:22px;bottom:calc(22px + env(safe-area-inset-bottom,0px));z-index:140;width:50px;height:50px;border-radius:50%;display:grid;place-items:center;color:#fff;cursor:pointer;border:1px solid var(--line);background:rgba(11,16,25,.85);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);opacity:0;translate:0 18px;pointer-events:none;transition:opacity .4s,translate .4s var(--ease),background .3s}
.to-top.show{opacity:1;translate:0 0;pointer-events:auto}
.to-top:hover{background:var(--amber)}

/* ---------- responsive ---------- */
@media (max-width:1024px){
  .nav-cta{display:none}
  .svc-grid,.skills-grid{grid-template-columns:repeat(2,1fr)}
  .skills-grid .skill-panel:last-child{grid-column:1/-1}
}
@media (max-width:900px){
  body{font-size:16px}
  .nav-links{display:none}
  .nav-toggle{display:block}
  .mmenu{display:flex;position:fixed;inset:0;z-index:140;flex-direction:column;justify-content:center;padding:100px var(--gutter) 40px;background:#050505;clip-path:circle(0px at calc(100% - 46px) 37px);visibility:hidden;transition:clip-path .8s cubic-bezier(.77,0,.18,1),visibility 0s linear .8s}
  .mmenu.open{clip-path:circle(150% at calc(100% - 46px) 37px);visibility:visible;transition:clip-path .8s cubic-bezier(.77,0,.18,1),visibility 0s}
  .mm-link{display:block;padding:6px 0;font-family:var(--display);font-weight:600;font-size:clamp(2.4rem,10vw,3.6rem);letter-spacing:-.04em;line-height:1.1;color:var(--text);opacity:0;translate:0 34px;transition:opacity .5s,translate .6s var(--ease),color .3s}
  .mm-link.active{color:var(--gold-2)}
  .mm-foot{margin-top:34px;font-size:14px;color:var(--muted);opacity:0;transition:opacity .5s}
  .mmenu.open .mm-link,.mmenu.open .mm-foot{opacity:1;translate:0 0;transition-delay:calc(.3s + var(--i) * .06s)}

  .hero{padding-top:110px}
  .hero-sub{grid-template-columns:1fr;gap:18px}
  .about-grid,.skills-grid,.contact-row,.work-grid,.svc-grid,.svc-feature{grid-template-columns:1fr}
  .skills-grid .skill-panel:last-child{grid-column:auto}
  .steps{grid-template-columns:1fr 1fr;gap:28px 22px}
  .portrait{max-width:320px}
  .fb-1{right:-6%}
  .fb-2{left:-6%}
  .stats{gap:10px}
  .stat{padding:18px 14px}
  .tl-item{grid-template-columns:1fr;gap:12px}
  .feature .card{display:block}
  .feature .card-visual{min-height:0;height:clamp(200px,48vw,260px);border-right:0;border-bottom:1px solid var(--line-2)}
}
@media (max-width:560px){
  .tiles{grid-template-columns:1fr}
  .steps,.svc-list-2{grid-template-columns:1fr}
  .stat-cap{font-size:12px}
  .hero-foot{flex-direction:column;align-items:flex-start}
  .scroll-cue{display:none}
  .float-badge{font-size:12px;padding:8px 12px 8px 8px}
  .fb-ic{width:28px;height:28px}
}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
  .rv:not(.split),.hero-fade{opacity:1;translate:0 0}
  .split .w>span,.ch>span{transform:none}
  .marquee-track{animation:none}
}
`;