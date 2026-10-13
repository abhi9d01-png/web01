import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const featured = [
  { name: 'Good Days', detail: 'A calmer way to plan your week', kind: 'Product design · 2025', color: 'peach', eyebrow: 'A kinder kind of planning', headline: 'Make room for a good day.', note: 'Your week, with a little more breathing room.', tiles: ['Today, gently', 'A small win', 'Make some space'] },
  { name: 'Common Ground', detail: 'Making local discovery feel personal', kind: 'Digital experience · 2024', color: 'sage', eyebrow: 'Find your people', headline: 'Good things are closer.', note: 'Places and people worth getting to know.', tiles: ['Around the corner', 'Saved for later', 'This weekend'] },
  { name: 'Small Hours', detail: 'A little space for better sleep', kind: 'Concept · 2024', color: 'blue', eyebrow: 'An evening ritual', headline: 'Let the day settle.', note: 'Tiny rituals for slower evenings and softer mornings.', tiles: ['Unwind', 'A quiet sound', 'Sleep well'] },
];

const otherWork = [
  { name: 'Field Notes', type: 'Brand & web', year: '2023', summary: 'A home for curious people who like to get outside.' },
  { name: 'Soft Signal', type: 'Interface design', year: '2023', summary: 'A quieter, more thoughtful way to keep in touch.' },
  { name: '100 Days of Play', type: 'Daily practice', year: '2022', summary: 'Small experiments in shape, color, and interaction.' },
];

function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

function ProjectPreview({ project }) {
  if (!project) return <div className="project-preview" aria-hidden="true" />;
  return (
    <div key={project.name} className={`project-preview ${project.color}`} aria-label={`${project.name} project preview`}>
      <div className="preview-backdrop" />
      <div className="preview-browser">
        <div className="preview-chrome"><span /><span /><span /><i>{project.name.toLowerCase().replaceAll(' ', '')}.studio</i></div>
        <div className="preview-screen">
          <span className="preview-eyebrow">{project.eyebrow}</span>
          <strong>{project.headline}</strong>
          <p>{project.note}</p>
          <div className="preview-screen-art"><i /><i /><i /></div>
          <div className="preview-tiles">{project.tiles.map((tile) => <span key={tile}>{tile}</span>)}</div>
        </div>
      </div>
      <div className="preview-phone">
        <div className="phone-island" />
        <span className="preview-eyebrow">{project.name}</span>
        <strong>{project.headline}</strong>
        <div className="phone-art"><i /><i /></div>
        <span className="phone-action">Take a moment <b>↗</b></span>
      </div>
      <div className="preview-note"><span>Selected work</span><b>{project.name}</b><small>{project.kind}</small></div>
    </div>
  );
}

function App() {
  const [playing, setPlaying] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState(null);
  const touchSelection = React.useRef(false);

  function projectEvents(project) {
    return {
      onPointerEnter: (event) => { if (event.pointerType === 'mouse') setActiveProject(project); },
      onFocus: () => setActiveProject(project),
      onTouchStart: () => { touchSelection.current = true; },
      onClick: (event) => {
        if (!touchSelection.current) return;
        touchSelection.current = false;
        if (activeProject?.name !== project.name) {
          event.preventDefault();
          setActiveProject(project);
        }
      },
    };
  }

  return (
    <main>
      <header className="topbar wrap">
        <a className="wordmark" href="#top" aria-label="Abhir, home">A<span>✳</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Say hello <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="desk-collage" aria-hidden="true">
          <img className="desk-object collage-base" src="/photo/hero-collage.png" alt="" />
          <img className="desk-object coffee-object" src="/photo/cup_stain-removebg-preview.png" alt="" />
          <img className="desk-object film-object" src="/photo/cmaera_rol-removebg-preview.png" alt="" />
          <img className="desk-object lighter-object" src="/photo/lighter-removebg-preview.png" alt="" />
        </div>
        <div className="hero-center">
          <h1>Abhir</h1>
          <p className="hero-role">Product Design</p>
          <p className="hero-motto"><em>Verb &amp; Noun</em></p>
          <p className="hero-copy">a thoughtful process of crafting experiences that engage people,<br className="desktop-break"/> shape clarity, and spark delights.</p>
          <div className="hero-tools" aria-label="Creative tools">
            <span title="Coffee">▤</span><span title="Ideas">♧</span><span title="Sketching">✎</span>
          </div>
        </div>
        <div className="vinyl-player" aria-label="Decorative music player">
          <div className="record"><div className="record-label"/><span className="record-hole"/></div>
          <span className="player-wave">▮〰</span><span className="player-artist">Souleance</span>
          <span className="player-track">Jazz et thé vert</span><span className="player-progress"><i/></span>
          <span className="player-time">1:36 / 3:32</span>
        </div>
        <img className="folder-sticker" src="/photo/fille_icon-removebg-preview.png" alt="" />
        <div className="airdrop-card" aria-hidden="true"><b>AirDrop</b><small>Abhir would like to share a photo</small><div/><footer><span>Decline</span><span>Accept</span></footer></div>
        <div className="paint-toolbar" aria-hidden="true">
          <span>✥</span><span>▧</span><span>▱</span><span>◈</span><span>✎</span><span>◉</span><span>◒</span><span>⌕</span><span>✐</span><span>▰</span><span>╱</span><span>〰</span><span>▱</span><span>▰</span><span>◯</span><span>▭</span>
        </div>
        <span className="pixel-pointer" aria-hidden="true"/>
        <a className="scroll-cue" href="#work" aria-label="Scroll to work"><span>⌄</span><span>⌄</span></a>
      </section>

      <section className="work-section wrap" id="work">
        <SectionLabel>Recently made <span aria-hidden="true">▶</span></SectionLabel>
        <div className="project-showcase" onPointerLeave={(event) => { if (event.pointerType === 'mouse') setActiveProject(null); }}>
          <div className="featured-grid">
            {featured.map((item, index) => (
              <a className={`feature-card ${item.color} ${activeProject?.name === item.name ? 'is-active' : ''}`} href="#contact" key={item.name} {...projectEvents(item)}>
                <div className={`artwork art-${index + 1}`} aria-hidden="true">
                  <span className="art-shape shape-one" /><span className="art-shape shape-two" />
                  <span className="art-caption">{['take it easy', 'find your people', 'rest is part of it'][index]}</span>
                </div>
                <div className="card-meta"><span>{item.name}</span><span>{item.kind}</span></div>
                <p>{item.detail}<span aria-hidden="true"> ↗</span></p>
              </a>
            ))}
          </div>
          <ProjectPreview project={activeProject} />
        </div>
      </section>

      <section className="other-section wrap">
        <SectionLabel>Other work <span aria-hidden="true">⁕</span></SectionLabel>
        <div className="work-list">
          {otherWork.map((item, index) => (
            <a className="work-row" href="#contact" key={item.name}>
              <span className="row-index">0{index + 1}</span>
              <span className="row-main"><strong>{item.name}</strong><span>{item.summary}</span></span>
              <span className="row-type">{item.type}</span>
              <span className="row-year">{item.year}</span>
              <span className="row-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="about-section wrap" id="about">
        <div><SectionLabel>A little about me <span aria-hidden="true">⌘</span></SectionLabel></div>
        <div className="about-body">
          <p className="about-lead">Hi, I’m Abhir — a designer and curious maker who likes turning tangled ideas into clear, delightful experiences.</p>
          <p>I care about the small details that make a product feel considered: the words, the rhythm, the moment when something just makes sense.</p>
          <p>This page is a work in progress. I’m gathering the projects and stories that feel most like me, and I’m glad you stopped by.</p>
          <p className="signoff">I make things with care <span aria-hidden="true">☺</span></p>
          <div className="contact-links" id="contact">
            <div><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
            <a href="mailto:hello@example.com">E-mail: hello@example.com ↗</a>
          </div>
        </div>
      </section>

      <footer className="footer wrap">
        <div className="player">
          <button className="play-button" type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? 'Ⅱ' : '▶'}</button>
          <div className="track"><span className="track-title">A little background music</span><span className="track-artist">A playlist for making things</span></div>
          <span className="track-time">{playing ? 'playing' : '0:00'} <span className="track-line" /></span>
        </div>
        <div className="footer-note"><span>Made slowly, with intention.</span><span>© 2025 Abhir</span></div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
