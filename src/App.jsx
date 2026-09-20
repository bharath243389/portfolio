import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './App.css'
import './Hero.css'
import './Projects.css'
import './About.css'
import './Experience.css'
import './Skills.css'
import './Toolkit.css'
import './Resume.css'
import './Contact.css'
import { portfolio } from './data/portfolio.js'

const A = '/assets/'
const isPlaceholder = (value) => typeof value === 'string' && value.startsWith('[') && value.endsWith(']')
const skillCategories = portfolio.skills.map((skill, i) => ({
  id: skill.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  label: skill.category,
  bearing: String(Math.round((360 / portfolio.skills.length) * i)).padStart(3, '0') + '°',
  items: skill.items,
}))
const voyage = [
  ...portfolio.experience.map((job, i) => ({
    code: 'ISLAND 0' + (i + 1),
    period: job.dates,
    role: job.role + ' · ' + job.company,
    copy: job.description,
    tag: i === 0 ? 'Current port' : 'Previous port',
    current: i === 0,
    kind: 'experience',
  })),
  { code: 'ISLAND 0' + (portfolio.experience.length + 1), period: portfolio.education.status, role: portfolio.education.degree + ' · ' + portfolio.education.institution, copy: 'Where the voyage began.', tag: 'Origin port', kind: 'education' },
]
const links = ['home', 'about', 'projects', 'experience', 'skills', 'toolkit', 'resume', 'contact']
// Plays a <video> only while it's on screen (and never at all under reduced-motion),
// so we don't end up with several clips decoding/playing at once off-screen.
function useInViewVideo(reduced) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) el.play().catch(() => {}); else el.pause() })
    }, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])
  return ref
}
const MotionDiv = motion.div
const MotionLi = motion.li
const Mark = () => <span aria-hidden="true">✦</span>
function Heading({ eyebrow, title, copy }) { return <header className="heading"><p className="eyebrow"><Mark /> {eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</header> }
function VoyageStop({ stop, index, reduced }) {
  return <MotionLi className={'voyage-stop ' + (stop.current ? 'current' : '')} initial={reduced ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: .6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}>
    <div className="voyage-marker">{stop.current ? <Mark /> : '0' + (index + 1)}</div>
    <div className="voyage-card">
      <p className="voyage-coords">{stop.code}<span>{stop.period}</span></p>
      <h3>{stop.role}</h3>
      <p>{stop.copy}</p>
      <span className="voyage-tag">{stop.tag}</span>
    </div>
  </MotionLi>
}
function SkillCategory({ category, index, reduced }) {
  return <MotionDiv className="skill-category" initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: .55, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}>
    <div className="skill-category-head"><span className="skill-bearing">{category.bearing}</span><h3>{category.label}</h3></div>
    {category.items
      ? <ul className="skill-tags">{category.items.map((item) => <li key={item}>{item}</li>)}</ul>
      : <p className="skill-category-note">{category.note}</p>}
  </MotionDiv>
}
function ToolGauge({ category, index, reduced }) {
  const deg = parseInt(category.bearing, 10) || 0
  return <MotionDiv className="tool-gauge" initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: .55, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}>
    <div className="tool-gauge-dial"><span className="tool-gauge-needle" style={{ transform: 'translateX(-50%) rotate(' + deg + 'deg)' }} aria-hidden="true" /><span className="tool-gauge-bearing">{category.bearing}</span></div>
    <h3>{category.label}</h3>
    {category.items
      ? <ul className="tool-pins">{category.items.map((item) => <li key={item}>{item}</li>)}</ul>
      : <p className="skill-category-note">{category.note}</p>}
  </MotionDiv>
}
function ProjectCard({ project }) {
  return <article className={'wanted-card ' + (project.number === 1 ? 'wanted-featured' : '')}>
    <div className="wanted-image"><img src={A + project.image} alt="" loading="lazy" /><span className="wanted-stamp">CASE<br />STUDY</span></div>
    <div className="wanted-copy"><p className="wanted-kicker">Bounty #00{project.number}</p><h3>{project.title}</h3><p className="wanted-description">{project.description}</p><div className="wanted-meta"><span><b>Impact</b><span className={isPlaceholder(project.impact) ? 'placeholder' : undefined}>{project.impact}</span></span><span><b>Stack</b>{project.technologies.map((technology) => <i key={technology}>{technology}</i>)}</span></div><div className="project-actions">{project.github ? <a href={project.github} target="_blank" rel="noreferrer">GitHub</a> : <button type="button" disabled title="Add your GitHub URL">GitHub <small>add link</small></button>}{project.live ? <a href={project.live} target="_blank" rel="noreferrer">Live demo</a> : <button type="button" disabled title="Add your live demo URL">Live demo <small>add link</small></button>}</div></div>
  </article>
}
export default function App() {
  const [open, setOpen] = useState(false); const [active, setActive] = useState('home'); const reduced = useReducedMotion()
  useEffect(() => { const observer = new IntersectionObserver((entries) => { const item = entries.find((e) => e.isIntersecting); if (item) setActive(item.target.id) }, { rootMargin: '-35% 0px -55% 0px' }); links.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) }); return () => observer.disconnect() }, [])
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); setOpen(false) }
  const heroVideoRef = useInViewVideo(reduced)
  const experienceVideoRef = useInViewVideo(reduced)
  const contactVideoRef = useInViewVideo(reduced)
  return <main><a className="skip" href="#content">Skip to content</a>
    <header className="site-header"><button className="brand" onClick={() => go('home')} aria-label="Go to the beginning"><i>✦</i> PORTFOLIO <span>/</span> LOGBOOK</button><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-nav">{open ? 'Close' : 'Voyage'} <span aria-hidden="true">{open ? '×' : '☰'}</span></button><nav id="site-nav" className={open ? 'open' : ''} aria-label="Primary navigation">{links.map((link, i) => <button className={active === link ? 'active' : ''} onClick={() => go(link)} key={link}><b>0{i + 1}</b>{link}</button>)}</nav></header>
    <section id="home" className="hero" aria-labelledby="hero-title"><video ref={heroVideoRef} className="hero-video" muted loop playsInline preload="auto" poster={A + 'glass-luffy.png'}><source src={A + 'hero.mp4'} type="video/mp4" /></video><div className="hero-wash" /><div className="grain" /><div className="hero-chart" aria-hidden="true"><span>GRAND LINE</span><i /><i /><i /></div><div className="compass-rose" aria-hidden="true">✦<small>N · E · S · W</small></div><div className="hero-log" aria-hidden="true"><b>PORT</b><strong>05</strong><span>WELCOME<br />ABOARD</span></div><MotionDiv className="hero-content" initial={reduced ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [0.16, 1, 0.3, 1] }}><p className="eyebrow"><Mark /> Welcome aboard · Developer portfolio</p><h1 id="hero-title">Set sail.<br /><em>Build. Create.<br />Explore.</em></h1><p className="hero-copy">A cinematic, detail-led portfolio for <strong>{portfolio.name}</strong> — a developer turning ambitious ideas into useful digital products.</p><div className="hero-actions"><button className="button gold" onClick={() => go('projects')}>Explore the log <span>↘</span></button><button className="text-button" onClick={() => go('contact')}>Start a voyage <span>→</span></button></div></MotionDiv><button className="hero-caption" onClick={() => go('about')} aria-label="Continue to the about section"><span>LOG 01 · GRAND LINE COORDINATES</span><i /> CONTINUE THE VOYAGE</button></section>
    <div id="content"><section id="about" className="section about"><span className="about-coords" aria-hidden="true">N 18° · W 63°</span>
      <MotionDiv className="about-visual" initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>
        <div className="about-image">
          <img src={A + 'profile.png'} alt={'Portrait of ' + portfolio.name} loading="lazy" />
          <div className="about-image-frame" aria-hidden="true" />
          <span className="about-tag"><i /> On deck</span>
        </div>
        <div className="about-accent" aria-hidden="true"><img src={A + 'luffy-close.png'} alt="" loading="lazy" /></div>
        <span className="about-route" aria-hidden="true" />
      </MotionDiv>
      <MotionDiv className="about-copy" initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1], delay: .12 }}>
        <Heading eyebrow="Captain’s log" title="Developer first. Storyteller by instinct." />
        <p className="body-copy">I’m <strong>{portfolio.name}</strong>, an <strong>{portfolio.role}</strong> based in <strong>{portfolio.location}</strong>. {portfolio.bio}</p>
        <dl className="facts"><div><dt>Role</dt><dd>{portfolio.role}</dd></div><div><dt>Location</dt><dd>{portfolio.location}</dd></div><div><dt>Education</dt><dd>{portfolio.education.degree}</dd></div></dl>
        <span className="facts-route" aria-hidden="true" />
        <div className="about-log"><img src={A + 'moon.jpeg'} alt="" aria-hidden="true" loading="lazy" /><span className="about-log-mark" aria-hidden="true">✦</span><div className="about-log-content"><b>Ship’s motto</b><p>“Build from scratch. Explore boldly. Keep moving forward.”</p></div><span className="about-log-coords" aria-hidden="true">LOG 01 · GRAND LINE</span></div>
      </MotionDiv>
    </section>
      <section id="projects" className="section projects"><div className="projects-intro"><Heading eyebrow="Selected coordinates" title="Work worth sailing toward." copy="Shipped projects, built from first principles rather than assembled from templates." /><p className="projects-count">0{portfolio.projects.length}<br /><span>Case files</span></p></div><div className="wanted-grid">{portfolio.projects.map((project) => <ProjectCard project={project} key={project.title} />)}</div></section>
      <section id="experience" className="section experience"><div className="experience-intro"><Heading eyebrow="The voyage" title="Experience, charted like a route." copy="Every stop on the map is a real chapter — plotted in order, not gamified." /><div className="experience-compass" aria-hidden="true">✦<small>COURSE PLOTTED</small></div></div><div className="voyage-route-wrap"><MotionDiv className="voyage-line" aria-hidden="true" initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} /><ol className="voyage-route">{voyage.map((stop, i) => <VoyageStop stop={stop} index={i} reduced={reduced} key={stop.code} />)}</ol></div><div className="experience-porthole" aria-hidden="true"><video ref={experienceVideoRef} muted loop playsInline preload="none"><source src={A + 'strawhat-luffy.mp4'} type="video/mp4" /></video></div></section>
      <section id="skills" className="section skills"><div className="skills-art" role="img" aria-label="Compass dial"><svg className="compass-svg" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" /><circle cx="100" cy="100" r="66" fill="none" stroke="currentColor" strokeWidth="1" opacity=".3" /><g opacity=".85"><path d="M100 14 L110 100 L100 122 L90 100 Z" fill="currentColor" /><path d="M100 186 L110 100 L100 78 L90 100 Z" fill="currentColor" opacity=".55" /><path d="M14 100 L100 90 L122 100 L100 110 Z" fill="currentColor" opacity=".55" /><path d="M186 100 L100 90 L78 100 L100 110 Z" fill="currentColor" opacity=".55" /></g><circle cx="100" cy="100" r="6" fill="currentColor" /><text x="100" y="34" textAnchor="middle" fontSize="13" fontFamily="'DM Mono'" fill="currentColor">N</text><text x="100" y="174" textAnchor="middle" fontSize="13" fontFamily="'DM Mono'" fill="currentColor">S</text><text x="30" y="105" textAnchor="middle" fontSize="13" fontFamily="'DM Mono'" fill="currentColor">W</text><text x="170" y="105" textAnchor="middle" fontSize="13" fontFamily="'DM Mono'" fill="currentColor">E</text></svg></div><div><Heading eyebrow="Navigation kit" title="A practical, growing skill set." copy="Plotted like a chart — each bearing is a category, filled in with real skills as they're added." /><div className="skill-chart">{skillCategories.map((category, i) => <SkillCategory category={category} index={i} reduced={reduced} key={category.id} />)}</div></div></section>
      <section id="toolkit" className="section toolkit"><div className="toolkit-intro"><Heading eyebrow="Ship’s instruments" title="The Captain’s Toolkit." copy="The real equipment behind every build — read like gauges on the bridge, not a spec sheet." /><div className="toolkit-hub" aria-hidden="true"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="4" /><circle cx="60" cy="60" r="14" fill="none" stroke="currentColor" strokeWidth="3" /><g stroke="currentColor" strokeWidth="4"><line x1="60" y1="60" x2="110" y2="60" /><line x1="60" y1="60" x2="95.4" y2="95.4" /><line x1="60" y1="60" x2="60" y2="110" /><line x1="60" y1="60" x2="24.6" y2="95.4" /><line x1="60" y1="60" x2="10" y2="60" /><line x1="60" y1="60" x2="24.6" y2="24.6" /><line x1="60" y1="60" x2="60" y2="10" /><line x1="60" y1="60" x2="95.4" y2="24.6" /></g><g fill="currentColor"><circle cx="118" cy="60" r="5" /><circle cx="101" cy="101" r="5" /><circle cx="60" cy="118" r="5" /><circle cx="19" cy="101" r="5" /><circle cx="2" cy="60" r="5" /><circle cx="19" cy="19" r="5" /><circle cx="60" cy="2" r="5" /><circle cx="101" cy="19" r="5" /></g></svg></div></div><div className="toolkit-grid">{skillCategories.map((category, i) => <ToolGauge category={category} index={i} reduced={reduced} key={category.id} />)}</div></section>
      <section id="resume" className="section resume"><div className="resume-card"><p className="eyebrow"><Mark /> Captain’s record</p><h2>Resume</h2><div className="resume-grid">
        <div className="resume-block"><h3>Education</h3><ul>{voyage.filter((stop) => stop.kind === 'education').map((stop) => <li key={stop.code}><b>{stop.role}</b><span>{stop.period}</span></li>)}</ul></div>
        <div className="resume-block"><h3>Experience</h3><ul>{voyage.filter((stop) => stop.kind === 'experience').map((stop) => <li key={stop.code}><b>{stop.role}</b><span>{stop.period}</span></li>)}</ul></div>
        <div className="resume-block"><h3>Skills</h3><ul className="resume-chip-list">{skillCategories.map((category) => <li key={category.id}>{category.label}</li>)}</ul></div>
        <div className="resume-block"><h3>Projects</h3><ul>{portfolio.projects.map((project) => <li key={project.title}><b>{project.title}</b></li>)}</ul></div>
      </div><div className="resume-cta"><a className="button outline" href={portfolio.resumeUrl} target="_blank" rel="noreferrer">View / download resume <span>↓</span></a></div></div><div className="resume-panel" aria-hidden="true"><svg className="resume-route" viewBox="0 0 300 640" preserveAspectRatio="none"><path d="M46 54 C 140 130, 70 230, 168 308 S 268 440, 196 580" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" /><circle cx="46" cy="54" r="4" fill="currentColor" /><circle cx="196" cy="580" r="4" fill="currentColor" /></svg><span className="resume-panel-mark">N</span><div className="resume-seal"><span>VERIFIED</span><i>✦</i><small>CAPTAIN’S RECORD</small></div><div className="resume-meta"><span>FILE · 001</span><span>STATUS · ACTIVE</span><span>08°46′N · 078°08′E</span></div></div></section>
      <section id="contact" className="contact"><video ref={contactVideoRef} className="contact-video" muted loop playsInline preload="none" poster={A + 'luffy-laugh.jpeg'} aria-hidden="true"><source src={A + 'freedom-pose.mp4'} type="video/mp4" /></video><div className="contact-wash" /><div className="contact-stars" aria-hidden="true" /><svg className="contact-silhouette" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0,60 C150,10 300,90 450,55 C600,20 750,95 900,50 C1000,20 1100,70 1200,45 L1200,120 L0,120 Z" /></svg><MotionDiv className="contact-content" initial={reduced ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}><p className="eyebrow"><Mark /> The next horizon</p><h2>Ready to set sail?</h2><p>Have a role, project, or idea in mind? Reach out below.</p><a className="button gold" href={'mailto:' + portfolio.email}>{portfolio.email} <span>↗</span></a><div className="contact-links">{portfolio.github ? <a className="contact-link" href={portfolio.github} target="_blank" rel="noreferrer">GitHub</a> : <button type="button" className="contact-link" disabled title="Add your GitHub URL">GitHub <small>add link</small></button>}{portfolio.linkedin ? <a className="contact-link" href={portfolio.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : <button type="button" className="contact-link" disabled title="Add your LinkedIn URL">LinkedIn <small>add link</small></button>}</div><p className="contact-note">Prefer email for the fastest reply.</p></MotionDiv></section></div><footer className="site-footer"><span>© {portfolio.name} · {new Date().getFullYear()}</span><span>Built for the long voyage.</span></footer></main>
}
