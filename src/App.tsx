import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { artifacts, type Artifact } from './content'

const Arrow = ({ direction = 'right' }: { direction?: 'left' | 'right' }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={`icon icon-${direction}`}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

const SoundIcon = ({ playing }: { playing: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="sound-icon">
    <path d="M4 10v4h4l5 4V6L8 10H4Z" />
    {playing && <><path d="M16 9.5a4 4 0 0 1 0 5" /><path d="M18.5 7a7.5 7.5 0 0 1 0 10" /></>}
    {!playing && <path d="m16 9 5 6m0-6-5 6" />}
  </svg>
)

gsap.registerPlugin(ScrollTrigger)

function ArtifactModal({ artifact, onClose, onSelect }: { artifact: Artifact; onClose: () => void; onSelect: (id: string) => void }) {
  const [zoomed, setZoomed] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const index = artifacts.findIndex(({ id }) => id === artifact.id)
  const previous = artifacts[(index + artifacts.length - 1) % artifacts.length]
  const next = artifacts[(index + 1) % artifacts.length]
  const images = [{ src: artifact.image, title: artifact.title, credit: artifact.credit, sourceUrl: artifact.sourceUrl }, ...artifact.gallery]
  const activeImage = images[Math.min(imageIndex, images.length - 1)]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    setImageIndex(0)
    setZoomed(false)
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onSelect(previous.id)
      if (event.key === 'ArrowRight') onSelect(next.id)
      if (event.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>('.artifact-modal button, .artifact-modal a')).filter((element) => !element.hasAttribute('disabled'))
        const first = focusable[0]
        const last = focusable.at(-1)
        if (!first || !last) return
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [artifact.id, next.id, onClose, previous.id, onSelect])

  return (
    <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.section className="artifact-modal" role="dialog" aria-modal="true" aria-labelledby="artifact-title" initial={{ opacity: 0, y: 28, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.985 }} transition={{ duration: 0.32 }} onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeRef} className="modal-close" type="button" onClick={onClose} aria-label="Close artifact details">×</button>
        <div className="modal-art">
          <button className={`art-zoom ${zoomed ? 'is-zoomed' : ''}`} type="button" onClick={() => setZoomed(!zoomed)} aria-label={zoomed ? 'Zoom out of artifact' : 'Zoom into artifact'}>
            <img src={activeImage.src} alt={`${activeImage.title}, ${artifact.year}`} />
            <span>{zoomed ? '− Zoom out' : '+ Inspect detail'}</span>
          </button>
          <p className="art-credit">{activeImage.credit}</p>
          <div className="gallery-switcher" aria-label="Artifact image gallery">
            {images.map((image, imagePosition) => <button key={image.src} className={imagePosition === imageIndex ? 'active' : ''} type="button" onClick={() => { setImageIndex(imagePosition); setZoomed(false) }} aria-label={`View ${image.title}`}><img src={image.src} alt="" /></button>)}
          </div>
        </div>
        <div className="modal-copy">
          <p className="eyebrow" style={{ color: artifact.accent }}>{artifact.era} <span>·</span> {artifact.year}</p>
          <h2 id="artifact-title">{artifact.title}</h2>
          <p className="modal-lede">{artifact.story}</p>
          <dl className="facts">
            <div><dt>Origin</dt><dd>{artifact.region}</dd></div>
            <div><dt>Medium</dt><dd>{artifact.medium}</dd></div>
            <div><dt>Collection</dt><dd>{artifact.collection}</dd></div>
          </dl>
          <div className="curator-notes">
            <article><span>01</span><div><h3>Historical context</h3><p>{artifact.context}</p></div></article>
            <article><span>02</span><div><h3>Look closer</h3><p>{artifact.looking}</p></div></article>
            <article><span>03</span><div><h3>Lasting legacy</h3><p>{artifact.legacy}</p></div></article>
          </div>
          <a className="source-link" href={activeImage.sourceUrl} target="_blank" rel="noreferrer">View source & credit <Arrow /></a>
          <nav className="modal-nav" aria-label="Browse artifacts">
            <button type="button" onClick={() => onSelect(previous.id)}><Arrow direction="left" /><span><small>Previous</small>{previous.title}</span></button>
            <button type="button" onClick={() => onSelect(next.id)}><span><small>Next</small>{next.title}</span><Arrow /></button>
          </nav>
        </div>
      </motion.section>
    </motion.div>
  )
}

function ArtifactChapter({ artifact, index, onSelect }: { artifact: Artifact; index: number; onSelect: (id: string) => void }) {
  const [insightOpen, setInsightOpen] = useState(false)

  return (
    <article data-artifact id={`artifact-${artifact.id}`} data-index={index} className={`timeline-item era-${artifact.theme} ${index % 2 ? 'reverse' : ''}`}>
      <div className="period-print" aria-hidden="true" style={{ backgroundImage: `url(${artifact.gallery[0].src})` }} />
      <div className="scene-aura" aria-hidden="true" />
      <p className="era-watermark" aria-hidden="true">{artifact.era.split(' ')[0]}</p>
      <div className="item-marker"><span>{String(index + 1).padStart(2, '0')}</span><i style={{ background: artifact.accent }} /></div>
      <div className="artifact-stage">
        <button className="artifact-image" type="button" onClick={() => onSelect(artifact.id)} aria-label={`Open ${artifact.title} gallery details`}>
          <img src={artifact.image} alt={artifact.title} loading={index > 1 ? 'lazy' : 'eager'} style={{ objectPosition: artifact.imagePosition }} />
          <span className="image-frame" />
          <span className="image-open">Enter the full gallery <Arrow /></span>
        </button>
        {artifact.companionImage && <button className="companion-image" type="button" onClick={() => onSelect(artifact.id)} aria-label={`View ${artifact.companionAlt} in the ${artifact.title} gallery`}>
          <img src={artifact.companionImage} alt={artifact.companionAlt} loading="lazy" />
          <span>Collection view</span>
        </button>}
        {artifact.gallery.length > 1 && <button className="gallery-stamp" type="button" onClick={() => onSelect(artifact.id)} aria-label={`Open supporting images for ${artifact.title}`}><img src={artifact.gallery[1].src} alt="" /><span>Archive print</span></button>}
        <button className={`study-point ${insightOpen ? 'is-open' : ''}`} type="button" onClick={() => setInsightOpen(!insightOpen)} aria-expanded={insightOpen}>
          <span>{insightOpen ? '×' : '01'}</span><b>{insightOpen ? 'Close note' : 'Study point'}</b>
        </button>
        <AnimatePresence>{insightOpen && <motion.aside className="insight-card" initial={{ opacity: 0, scale: .92, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 10 }}><small>LOOK CLOSER</small><p>{artifact.looking}</p></motion.aside>}</AnimatePresence>
      </div>
      <div className="item-copy">
        <p className="eyebrow" style={{ color: artifact.accent }}>{artifact.era}</p>
        <p className="item-year">{artifact.year}</p>
        <p className="chapter-line">{artifact.chapter}</p>
        <h2>{artifact.title}</h2>
        <p className="item-story">{artifact.story}</p>
        <div className="item-meta"><span>{artifact.region}</span><span>{artifact.medium}</span></div>
        <button className="gallery-button" type="button" onClick={() => onSelect(artifact.id)}>Enter the gallery <Arrow /></button>
      </div>
    </article>
  )
}

function App() {
  const [activeId, setActiveId] = useState(artifacts[0].id)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timelineRef = useRef<HTMLElement>(null)
  const horizontalTriggerRef = useRef<ScrollTrigger | null>(null)
  const reduceMotion = useReducedMotion()
  const selected = artifacts.find(({ id }) => id === selectedId) ?? null

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveId(visible.target.id.replace('artifact-', ''))
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] })
    const sections = document.querySelectorAll<HTMLElement>('[data-artifact]')
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const timeline = timelineRef.current
    if (!timeline || reduceMotion) return
    const track = timeline.querySelector<HTMLElement>('.timeline-track')
    const panels = gsap.utils.toArray<HTMLElement>('.timeline-item', timeline)
    if (!track || panels.length < 2) return

    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 821px)', () => {
        const horizontal = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top top',
            end: () => `+=${window.innerWidth * (panels.length - 1)}`,
            pin: true,
            scrub: 0.9,
            snap: { snapTo: 1 / (panels.length - 1), duration: { min: 0.15, max: 0.42 }, ease: 'power2.out' },
            invalidateOnRefresh: true,
            onUpdate: (self) => setActiveId(artifacts[Math.round(self.progress * (panels.length - 1))].id),
          },
        })
        horizontalTriggerRef.current = horizontal.scrollTrigger ?? null

        panels.forEach((panel) => {
          const stage = panel.querySelector<HTMLElement>('.artifact-stage')
          const copy = panel.querySelector<HTMLElement>('.item-copy')
          const aura = panel.querySelector<HTMLElement>('.scene-aura')
          const watermark = panel.querySelector<HTMLElement>('.era-watermark')
          gsap.fromTo(stage, { y: 65, rotation: -1.5, scale: .94 }, { y: -24, rotation: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: horizontal, start: 'left 88%', end: 'right 16%', scrub: true } })
          gsap.fromTo(copy, { y: 95, autoAlpha: .25 }, { y: -15, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: horizontal, start: 'left 84%', end: 'right 22%', scrub: true } })
          gsap.fromTo(aura, { rotation: -28, scale: .7 }, { rotation: 28, scale: 1.18, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: horizontal, start: 'left 94%', end: 'right 5%', scrub: true } })
          gsap.fromTo(watermark, { xPercent: -18, autoAlpha: .15 }, { xPercent: 15, autoAlpha: .7, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: horizontal, start: 'left 95%', end: 'right 5%', scrub: true } })
        })
        return () => { horizontalTriggerRef.current = null }
      })
      return () => media.revert()
    }, timeline)
    return () => context.revert()
  }, [reduceMotion])

  const goTo = (id: string) => {
    const index = artifacts.findIndex((artifact) => artifact.id === id)
    const trigger = horizontalTriggerRef.current
    if (trigger && window.innerWidth > 820) {
      const destination = trigger.start + ((trigger.end - trigger.start) * index) / (artifacts.length - 1)
      window.scrollTo({ top: destination, behavior: reduceMotion ? 'auto' : 'smooth' })
      return
    }
    document.getElementById(`artifact-${id}`)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
  }
  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) } else { await audio.play(); setPlaying(true) }
  }
  const selectArtifact = (id: string) => { setSelectedId(id); setActiveId(id) }

  return (
    <main>
      <audio ref={audioRef} loop preload="none" src="/audio/viriboni.ogg" onEnded={() => setPlaying(false)} />
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-grain" />
        <header className="masthead">
          <a className="wordmark" href="#top" aria-label="Kala Yatra home"><span>कला</span> Yātrā</a>
          <button className={`sound-toggle ${playing ? 'is-playing' : ''}`} type="button" onClick={toggleAudio} aria-pressed={playing}><SoundIcon playing={playing} /><span>{playing ? 'Sound on' : 'Ambient sound'}</span></button>
        </header>
        <div className="hero-copy" id="top">
          <motion.p className="hero-script" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>कला यात्रा</motion.p>
          <motion.h1 id="page-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08 }}>A living timeline<br /><em>of Indian art.</em></motion.h1>
          <motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>Eight artefacts. Five millennia. One unfolding visual language.</motion.p>
          <a className="begin-link" href="#timeline"><span>Begin the yatra</span><i>↓</i></a>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-gallery" aria-hidden="true">
          <img src="/images/dancing-girl.jpg" alt="" />
          <img src="/images/nataraja.jpg" alt="" />
          <img src="/images/bharat-mata.jpg" alt="" />
        </div>
        <p className="hero-edition">A DIGITAL EXHIBITION · 2026</p>
      </section>

      <section className="timeline-intro" id="timeline">
        <p className="section-number">01 — 08</p>
        <div><p className="eyebrow">THE JOURNEY</p><h2>From bronze to<br /><em>brushstroke.</em></h2></div>
        <p>Travel through the objects, images and ideas that shaped the subcontinent’s art history. Every marker opens a closer encounter.</p>
      </section>

      <aside className="progress-rail" aria-label="Timeline navigation">
        <div className="rail-line" />
        {artifacts.map((artifact, index) => <button key={artifact.id} className={activeId === artifact.id ? 'active' : ''} type="button" onClick={() => goTo(artifact.id)} aria-label={`Go to ${artifact.title}`}><span>{String(index + 1).padStart(2, '0')}</span><i style={{ background: artifact.accent }} /></button>)}
      </aside>

      <section className="timeline" ref={timelineRef}>
        <div className="timeline-track">
          {artifacts.map((artifact, index) => <ArtifactChapter key={artifact.id} artifact={artifact} index={index} onSelect={selectArtifact} />)}
        </div>
      </section>

      <section className="legacy" aria-labelledby="legacy-title">
        <p className="eyebrow">THE THREAD CONTINUES</p>
        <h2 id="legacy-title">Nothing here is<br /><em>left behind.</em></h2>
        <p>Each era carries a technique, belief or visual rhythm forward: bronze becomes movement; stone becomes story; line becomes atmosphere; painting becomes an idea of India.</p>
        <div className="legacy-path" aria-hidden="true"><span>craft</span><i>→</i><span>devotion</span><i>→</i><span>memory</span><i>→</i><span>modernity</span></div>
      </section>

      <section className="index-section" aria-labelledby="index-title">
        <div className="index-heading"><p className="eyebrow">EXPLORE AGAIN</p><h2 id="index-title">The complete<br />journey.</h2></div>
        <ol className="era-index">{artifacts.map((artifact, index) => <li key={artifact.id}><button type="button" onClick={() => goTo(artifact.id)}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{artifact.year}</small><strong>{artifact.title}</strong></div><Arrow /></button></li>)}</ol>
      </section>

      <footer>
        <p className="wordmark"><span>कला</span> Yātrā</p>
        <p>Educational digital exhibition. Artwork information is summarised from collection records and art-history references.</p>
        <a href="https://smarthistory.org/challenges-opportunities-and-approaches-for-studying-south-asian-art/" target="_blank" rel="noreferrer">Historical chronology reference ↗</a>
      </footer>

      <AnimatePresence>{selected && <ArtifactModal artifact={selected} onClose={() => setSelectedId(null)} onSelect={selectArtifact} />}</AnimatePresence>
    </main>
  )
}

export default App
