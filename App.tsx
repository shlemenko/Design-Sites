import React, { useState, useEffect } from 'react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTear, setShowTear] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Tear effect on significant scroll changes
      const scrollDelta = Math.abs(totalScroll - lastScrollY);
      if (scrollDelta > 100) {
        setShowTear(true);
        setTimeout(() => setShowTear(false), 300);
      }
      setLastScrollY(totalScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const services = [
    {
      number: '01',
      title: 'Брендинг',
      desc: 'Создаем визуальные идентичности, которые разрывают шаблоны и остаются в памяти.'
    },
    {
      number: '02',
      title: 'Web Design',
      desc: 'Цифровые esperienze на грани искусства и функциональности.'
    },
    {
      number: '03',
      title: 'Арт-дирекшн',
      desc: 'Полный контроль над визуальной коммуникацией вашего бренда.'
    },
    {
      number: '04',
      title: 'Motion',
      desc: 'Анимация и движение как способ рассказать вашу историю.'
    }
  ];

  const projects = [
    {
      name: 'NEON VOID',
      category: 'Брендинг / Web',
      image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=1600&q=80'
    },
    {
      name: 'CRIMSON',
      category: 'Арт-дирекшн',
      image: 'https://images.unsplash.com/photo-1507643179173-617d654551a3?w=1600&q=80'
    },
    {
      name: 'STATIC NOISE',
      category: 'Web / Motion',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&q=80'
    }
  ];

  return (
    <>
      {/* Noise & Scanlines */}
      <div className="noise-overlay"></div>
      <div className="scanlines"></div>
      
      {/* Scroll Progress */}
      <div 
        className="scroll-progress"
        style={{ width: `${scrollProgress * 100}%` }}
      />
      
      {/* Tear Strip */}
      <div className={`tear-strip ${showTear ? 'visible' : ''}`}></div>
      
      {/* Corner Brackets */}
      <div className="corner-bracket top-left"></div>
      <div className="corner-bracket bottom-right"></div>
      
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="logo">Tommy<span>Agency</span></div>
        <div className="nav-links">
          <a href="#services" className="nav-link">Услуги</a>
          <a href="#projects" className="nav-link">Проекты</a>
          <a href="#about" className="nav-link">О нас</a>
          <a href="#contact" className="nav-link">Контакты</a>
        </div>
        <a href="mailto:hello@tommyagency.ru" className="nav-link text-ui" style={{ letterSpacing: '0.6px' }}>
          hello@tommyagency.ru
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="text-display-xl hero-title glitch-color">
            TOMMY AGENCY
          </h1>
          <p className="hero-subtitle">
            Digital Design Studio — Moscow
          </p>
          <p className="text-heading" style={{ fontWeight: 300, opacity: 0.8 }}>
            МЫ СОЗДАЕМ<br />
            <span style={{ color: 'var(--crimson-heat)' }}>ВИЗУАЛЬНЫЙ ХАОС</span><br />
            ИЗ КРАСОТЫ
          </p>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span className="marquee-item">BRANDING</span>
          <span className="marquee-item">•</span>
          <span className="marquee-item">WEB DESIGN</span>
          <span className="marquee-item">•</span>
          <span className="marquee-item">ART DIRECTION</span>
          <span className="marquee-item">•</span>
          <span className="marquee-item">MOTION</span>
          <span className="marquee-item">•</span>
          <span className="marquee-item">BRANDING</span>
          <span className="marquee-item">•</span>
          <span className="marquee-item">WEB DESIGN</span>
          <span className="marquee-item">•</span>
          <span className="marquee-item">ART DIRECTION</span>
          <span className="marquee-item">•</span>
          <span className="marquee-item">MOTION</span>
          <span className="marquee-item">•</span>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="services">
        <span className="section-label">// Услуги</span>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-number">{service.number}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="deco-line"></div>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <span className="section-label">// Избранные проекты</span>
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <img 
              src={project.image} 
              alt={project.name}
              className="project-image"
            />
            <div className="project-info">
              <h2 className="project-name">{project.name}</h2>
              <span className="project-category">{project.category}</span>
            </div>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-text">
          <span className="section-label">// О агентстве</span>
          <h2 className="text-heading-lg about-heading">
            МЫ —<br />
            <span style={{ color: 'var(--crimson-heat)' }}>НОВОЕ</span><br />
            ПОКОЛЕНИЕ
          </h2>
          <p className="about-paragraph">
            Tommy Agency — это дизайн-студия полного цикла, работающая на стыке искусства, технологий и культурного кода поколения Z.
          </p>
          <p className="about-paragraph">
            Мы не следуем трендам — мы создаем визуальный язык будущего, смешивая эстетику Y2K, швейцарскую типографику и цифровой глитч.
          </p>
          <div className="stat-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Проектов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12</div>
              <div className="stat-label">Наград</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Лет</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Идей</div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
            alt="About Tommy Agency"
            style={{
              width: '100%',
              height: '600px',
              objectFit: 'cover',
              filter: 'grayscale(100%) contrast(1.2)',
              borderRadius: '8px'
            }}
          />
        </div>
      </section>

      <div className="deco-line"></div>

      {/* Contact CTA */}
      <section id="contact" className="contact-cta">
        <h2 className="contact-heading glitch">
          LET'S<br />
          TALK
        </h2>
        <a href="mailto:hello@tommyagency.ru" className="contact-btn">
          Начать проект
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <div className="footer-logo">Tommy<span style={{ color: 'var(--crimson-heat)' }}>Agency</span></div>
          <div className="footer-copy">© 2024 Tommy Agency. All rights reserved.</div>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Telegram</a>
          <a href="#" className="footer-link">Behance</a>
          <a href="#" className="footer-link">Instagram</a>
          <a href="#" className="footer-link">Dribbble</a>
        </div>
        <div className="footer-copy">
          Moscow, Russia<br />
          tommyagency.ru
        </div>
      </footer>
    </>
  );
}