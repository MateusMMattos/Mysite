document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("main, section[id]");

  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove("active-link");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active-link");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => {
    sectionObserver.observe(sec);
  });

  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  const elementsToReveal = document.querySelectorAll(".reveal");
  elementsToReveal.forEach((element) => {
    revealObserver.observe(element);
  });

  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add("dark-mode");
      if (themeToggle) themeToggle.checked = true;
    } else {
      body.classList.remove("dark-mode");
      if (themeToggle) themeToggle.checked = false;
    }
  }

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        applyTheme('dark');
        localStorage.setItem("theme", "dark");
      } else {
        applyTheme('light');
        localStorage.setItem("theme", "light");
      }
    });
  }

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(contactForm);
      const button = contactForm.querySelector("button[type='submit']");
      const buttonText = button.innerText;
      
      button.disabled = true;
      button.innerText = "Enviando...";

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.innerText = "Mensagem enviada com sucesso! Obrigado.";
            formStatus.className = "success";
          }
          contactForm.reset();
        } else {
          throw new Error("Houve um problema ao enviar o formulário.");
        }
      } catch (error) {
        if (formStatus) {
          formStatus.innerText = "Erro ao enviar. Tente novamente mais tarde.";
          formStatus.className = "error";
        }
      } finally {
        button.disabled = false;
        button.innerText = buttonText;
        setTimeout(() => {
          if (formStatus) formStatus.innerText = "";
        }, 5000);
      }
    });
  }

  const projectData = {
    "1": {
      img: "./src/img/siteadvogado.png",
      title: "Leal & Mattos Advocacia - Landing Page de Geração de Leads",
      description: "Landing page profissional desenvolvida para o escritório Leal & Mattos Advocacia, com foco total em Geração de Leads para uma tese jurídica específica.",
      stack: ["HTML", "CSS", "JavaScript", "React", "Node.js", "PostgreSQL"],
      liveUrl: "https://mateusmmattos.github.io/Sitegustavo/",
      repoUrl: "https://github.com/MateusMMattos/Sitegustavo"
    },
    "2": {
      img: "https://placehold.co/600x400/1C2E35/FFFFFF?text=Landing+Page",
      title: "Landing Page App (Conceito)",
      description: "Página de captura focada em máxima conversão para um aplicativo mobile. O design foi criado com A/B testing em mente, destacando os principais benefícios do app e direcionando o usuário para um CTA claro (download na App Store / Play Store).",
      stack: ["HTML", "CSS", "JavaScript", "Figma"],
      liveUrl: "#",
      repoUrl: "#"
    },
    "3": {
      img: "https://placehold.co/600x400/f4f4f4/1C2E35?text=E-commerce",
      title: "E-commerce de Roupas (Conceito)",
      description: "Loja virtual completa com integração com os Correios para cálculo de frete, checkout transparente via Stripe/PagSeguro e um painel de administrador para gestão de estoque e pedidos.",
      stack: ["React", "Next.js", "Styled-Components", "Stripe API"],
      liveUrl: "#",
      repoUrl: "#"
    }
  };

  const modal = document.getElementById("portfolio-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalStack = document.getElementById("modal-stack");
  const modalLinkLive = document.getElementById("modal-link-live");
  const modalLinkRepo = document.getElementById("modal-link-repo");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const projectCards = document.querySelectorAll(".project");

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modal) return;

    modalImg.src = data.img;
    modalTitle.innerText = data.title;
    modalDescription.innerText = data.description;
    
    modalLinkLive.href = data.liveUrl;
    modalLinkRepo.href = data.repoUrl;

    modalStack.innerHTML = "";
    data.stack.forEach(tech => {
      const techTag = document.createElement("span");
      techTag.innerText = tech;
      modalStack.appendChild(techTag);
    });
    
    modal.classList.add("open");
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = 'auto';
  }

  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      openModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

});