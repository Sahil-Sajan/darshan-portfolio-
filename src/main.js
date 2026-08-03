import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastRoot = document.createElement("div");
document.body.appendChild(toastRoot);
createRoot(toastRoot).render(createElement(ToastContainer, { theme: "dark" }));

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrollToPlugin,
  Flip
);

ScrollSmoother.create({
  smooth: 1, 
  effects: true, 
  smoothTouch: 0.1, 
});

let landingText = SplitText.create(".maintext h1", {
  type: "chars",
  mask: "chars",
});
let alagtext = SplitText.create(".alagtext", {
  type: "words",
  mask: "lines",
});

window.addEventListener("load", () => {
  const counter = document.querySelector(".counter");
  const images = document.querySelectorAll("img");
  const underline = document.querySelector(".underline");
  const imageLength = images.length;
  let to_load = 0;
  const tl_loaded = gsap
    .timeline({ paused: true })
    .to(".loadingtext", {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .to(
      ".colordiv",
      {
        y: "-100%",
        duration: 1,
        stagger: {
          each: 0.04,
          from: "edges",
        },
        ease: "expo.inOut",
      },
      "a"
    )
    .from(
      ".scaleImage",
      {
        scale: 2,
        duration: 2.5,
        ease: "expo.out",
      },
      "a"
    )
    .from(
      landingText.chars,
      {
        y: "100%",
        duration: 1.3,
        ease: "power2.out",
        stagger: 0.03,
      },
      "a"
    )
    .from(
      alagtext.words,
      {
        y: "100%",
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.08,
      },
      "a"
    );

  const itemLoaded = () => {
    to_load++;
    const percent = ((to_load / imageLength) * 100).toFixed(0);
    counter.textContent = `${percent}%`;
    underline.style.width = `${percent}%`;
    if (to_load == imageLength) {
      tl_loaded.play(0);
    }
  };

  const preloadImage = (image) => {
    return new Promise((resolve) => {
      image.onload = resolve;
      image.onerror = resolve;
    });
  };

  gsap.set(".loadingtext", {
    autoAlpha: 0,
  });

  const tl_namaste = gsap
    .timeline()
    .from(".namaste", {
      autoAlpha: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(".namaste", {
      delay: 1,
      autoAlpha: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(".loadingtext", {
      autoAlpha: 1,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        chalo();
      },
    });
  const chalo = () => {
    images.forEach((img) => {
      img.src = `${img.dataset.src}`;
      preloadImage(img).then(() => {
        itemLoaded();
      });
    });
  };

  // document.querySelector(".loader").remove();
});

gsap.to(".image-div", {
  scrollTrigger: {
    trigger: ".image-div",
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: true,
  },
});

// navbar animation

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // scrolling down
    gsap.to("nav", {
      y: "-100%",
      duration: 0.5,
      ease: "power2.Out",
    });
  } else {
    // scrolling up
    gsap.to("nav", {
      y: "0%",
      duration: 0.5,
      ease: "power2.Out",
    });
  }
  lastScrollY = window.scrollY;
});

// links hover interaction

const links = document.querySelectorAll(".links");
let linkAnimating = false;

links.forEach((link, index) => {
  const first = link.querySelector("h3:nth-child(1)");
  const second = link.querySelector("h3:nth-child(2)");
  let h3up = SplitText.create(first, { type: "chars" });
  let h3bottom = SplitText.create(second, { type: "chars" });
  link.addEventListener("mouseenter", () => {
    if (linkAnimating === true) return;
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    linkAnimating = true;
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "0%", 
      stagger: -0.025, 
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025, 
      ease: "power3.inOut",
      onComplete: () => {
        linkAnimating = false;
      },
    });
  });
});

// button hover interaction

const buttons = document.querySelectorAll(".buttondiv");
let buttonAnimating = false;

buttons.forEach((button, index) => {
  const first = button.querySelector("h2:nth-child(1)");
  const second = button.querySelector("h2:nth-child(2)");
  let h3up = SplitText.create(first, { type: "chars" });
  let h3bottom = SplitText.create(second, { type: "chars" });
  button.addEventListener("mouseenter", () => {
    if (buttonAnimating === true) return;
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    linkAnimating = true;
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025,
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "0%", 
      stagger: -0.025,
      ease: "power3.inOut",
      onComplete: () => {
        buttonAnimating = false;
      },
    });
  });
});

// project animation

const projects = [
  {
    title: "SentinelKids",
    link: "https://sentinelkids.com/en",
    year: 2025,
    tagline: "Real-time parental control, built for the modern family.",
    description: `SentinelKids is a comprehensive parental control platform built with React Native, Node.js, MongoDB, Firebase, and WebSockets.

    The platform comprises a mobile app for children, a web dashboard for parents, and an admin portal — all connected via real-time activity monitoring and push notifications.

    The core challenge was designing a real-time architecture that handles continuous device data streams while keeping the UI responsive and intuitive for non-technical users.`,
    techStack: ["React Native", "Node.js", "MongoDB", "Firebase", "WebSockets"],
    highlights: [
      "Real-time activity monitoring across multiple devices",
      "Push notifications via Firebase Cloud Messaging",
      "Multi-role architecture: parent, child, and admin portals",
    ],
    recognition: [
      "Part of 5 production platforms delivered at Samarix",
      "Demonstrates real-time mobile and web architecture",
    ],
  },
  {
    title: "JayaHub",
    link: "https://jayakhub.com",
    year: 2025,
    tagline: "A complete restaurant ecosystem — from order to delivery.",
    description: `JayaHub is a full restaurant management ecosystem built on the MERN stack with PostgreSQL, Socket.io, Redis, Stripe, and Firebase.

    The platform includes a customer ordering app, a rider delivery app with live GPS tracking, and a restaurant web portal — all synchronized in real time.

    Engineering live order tracking across three separate interfaces while maintaining data consistency was the core challenge — solved through Socket.io event rooms and Redis caching for performance.`,
    techStack: ["MERN Stack", "PostgreSQL", "Socket.io", "Redis", "Stripe", "Firebase"],
    highlights: [
      "Live GPS tracking for riders with real-time order updates",
      "Multi-role platform: customer, rider, and restaurant portals",
      "Stripe payment integration with full order management",
    ],
    recognition: [
      "Production-deployed restaurant ecosystem",
      "Real-time architecture powering live delivery tracking",
    ],
  },
  {
    title: "Hospital Management",
    link: "https://roosbrothers1865.com/en",
    year: 2025,
    tagline: "Healthcare at scale — real-time, multilingual, and cloud-native.",
    description: `A full-scale hospital management system built with Node.js, PostgreSQL, Apache Kafka, Redis, Socket.io, Stripe, Twilio, Firebase, and MCP Server.

    The system includes a patient mobile app, a web platform, a doctor portal, and an admin dashboard — deployed across Hostinger, Render, and Azure with AWS Lambda for background jobs.

    The most complex piece was integrating Kafka for event-driven processing, MCP server for real-time multi-language translation, and Twilio for SMS — all while maintaining sub-second response times under load.`,
    techStack: ["Node.js", "PostgreSQL", "Kafka", "Redis", "Socket.io", "Stripe", "Twilio", "Azure"],
    highlights: [
      "Real-time multi-language translation via MCP server",
      "Kafka-driven event processing for medical data streams",
      "CI/CD pipelines with GitHub Actions across multiple cloud providers",
    ],
    recognition: [
      "Enterprise-scale system with 4 interconnected portals",
      "Deployed across Hostinger, Render, and Azure with AWS Lambda",
    ],
  },
  {
    title: "Listr",
    link: "https://listr.live/en",
    year: 2025,
    tagline: "Generate leads, connect every channel, close faster.",
    description: `Listr is a lead-generation platform built with Node.js, n8n, MCP Server, PostgreSQL, and React.

    Users generate and manage leads through integrations with platforms like Facebook and TikTok, with n8n workflows automating follow-ups and data pipelines while the MCP server integration enables AI-powered query handling.`,
    techStack: ["Node.js", "n8n", "MCP Server", "PostgreSQL", "React"],
    highlights: [
      "Facebook and TikTok integrations for lead generation",
      "n8n workflow automation for lead pipelines",
      "MCP server integration for AI-powered query handling",
    ],
    recognition: [
      "Lead-gen platform integrating major social ad channels",
      "Demonstrates modern workflow automation with n8n and MCP",
    ],
  },
];

gsap.set(".projectoverlay .colordivs", {
  y: "100%",
});

const projectBox = document.querySelectorAll(".projectBox");
const previews = document.querySelectorAll(".projectPreview");

const projectsOverlay = document.querySelector(".projects-overlay");
const flipTarget = document.querySelector(".projectflip .project-img");
const closeBtn = document.querySelector(".closeBtn");

const heading = document.querySelector(".infoverview .heading");
const right = document.querySelector(".infoverview .right-part");

projectBox.forEach((box, index) => {
  box.addEventListener("click", () => {
    const originalParent = previews[index];

    const project = projects[index];
    heading.innerHTML = `<h3
                class="projecttitle text-[14vw] md:text-[7.6vw] leading-[1] text-white"
              >
                ${project.title}
              </h3>
              <div class="subheading flex items-center gap-[3vw] md:gap-[2vw]">
                <div class="year">
                  <h2
                    class="projectyear text-white text-[4vw] leading-[1.1] md:text-[2vw]"
                  >
                   ${project.year}
                  </h2>
                </div>
                <div class="shortdescription">
                  <h4
                    class="projectshorttag text-white text-[3vw] leading-[1] md:text-[1.3vw]"
                  >
                     ${project.tagline}
                  </h4>
                </div>
              </div>
              <div class="livelink mt-[3vw] md:mt-[1vw]">
                <a target="_blank" href= ${project.link}>
                  <div
                    class="buttondiv w-fit border border-white cursor-pointer px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw] bg-[#242A23]"
                  >
                    <div class="links cursor-pointer h-[1rem] overflow-hidden">
                      <h2
                        class="text-white text-[4vw] md:text-[1.3vw] leading-[1]"
                      >
                        live link
                      </h2>
                      <h2
                        class="text-white text-[4vw] md:text-[1.3vw] leading-[1]"
                      >
                        live link
                      </h2>
                    </div>
                  </div>
                </a>
              </div>
          `;
    right.innerHTML = `<div class="right-part-wrapper px-[2vw]">
              <div class="description">
                <h2 class="text-white text-[5.5vw] md:text-[2.5vw]">
                  description
                </h2>
                <h4
                  class="text-[2.5vw] md:text-[1.2vw] mt-[1.3vw] text-white leading-[1.2]"
                >
                  ${project.description}
                </h4>
              </div>
              <div
                class="techstackandhighlights mt-[4vw] md:mt-[2vw] h-[25vh] md:h-[20vh] w-full flex md:flex-row flex-col"
              >
                <div
                  class="techstack flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full md:w-[35%]"
                >
                  <h2 class="text-white text-[4.5vw] md:text-[1.8vw]">
                    tech Stack
                  </h2>
                  <div class="tech flex mt-[1.5vw] flex-col gap-[0.2vw]">
                  ${project.techStack
                    .map(
                      (tech) =>
                        `<h4 class="text-white text-[2.5vw] md:text-[0.8vw] leading-[1.1]">${tech}</h4>`
                    )
                    .join("")}
                    
                  </div>
                </div>
                <div
                  class="highlights flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full w-[65%]"
                >
                  <h2 class="text-white text-[4.5vw] md:text-[1.8vw]">
                    highlights
                  </h2>
                  <div
                    class="tech flex mt-[1.5vw] flex-col gap-[1vw] md:gap-[0.4vw]"
                  >
                   ${project.highlights
                     .map(
                       (h) =>
                         `<h4 class="text-white text-[2.5vw] md:text-[1vw] leading-[1.1]">${h}</h4>`
                     )
                     .join("")}
                  </div>
                </div>
              </div>
            </div>`;

    const previewImgDiv = previews[index].querySelector(".project-img");

    let title = SplitText.create(".projecttitle", {
      type: "chars",
      mask: "chars",
    });
    let year = SplitText.create(".projectyear", {
      type: "chars",
      mask: "chars",
    });
    let tag = SplitText.create(".projectshorttag", {
      type: "words",
      mask: "words",
    });

    gsap.set([title.chars, year.chars, tag.words], {
      y: "100%",
    });

    gsap.set(
      [
        ".closeBtn",
        ".livelink",
        ".description h2",
        ".techstackandhighlights h2",
        ".right-part-wrapper",
      ],
      {
        autoAlpha: 0,
      }
    );

    
    function closeProject() {
      
      closeBtn.removeEventListener("click", closeProject);

      const state = Flip.getState(previewImgDiv);

      gsap
        .timeline() // Flip animation (move image back to original box)
        .to(
          [
            ".closeBtn",
            ".livelink",
            ".description h2",
            ".techstackandhighlights h2",
            ".right-part-wrapper",
          ],
          {
            autoAlpha: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "a"
        )
        .to(
          [title.chars, year.chars, tag.words],
          {
            y: "100%",
            stagger: 0.05,
            duration: 1.4,
            ease: "expo.out",
          },
          "a"
        )
        .add(() => {
          originalParent.appendChild(previewImgDiv);
          Flip.from(state, {
            delay: 0.8,
            duration: 1.2,
            ease: "power3.inOut",
            absolute: true,
            scale: true,
          }, "a");
        })
        .to(".projectoverlay .colordivs", {
          y: "-100%",
          duration: 1,
          stagger: {
            each: 0.07,
            from: "edges",
          },
          ease: "power2.inOut",
          onComplete: () => {
            projectsOverlay.classList.add("hidden");
            gsap.set(".projectoverlay .colordivs", {
              y: "100%",
            });
          },
        });
    }

    
    const state = Flip.getState(previewImgDiv);

    // Make overlay visible
    projectsOverlay.classList.remove("hidden");

    // Add close event listener (once)
    closeBtn.addEventListener("click", closeProject);

    gsap
      .timeline()
      // Flip image into overlay target
      .add(() => {
        flipTarget.appendChild(previewImgDiv);
        Flip.from(state, {
          delay: 0.8,
          duration: 1,
          ease: "power3.inOut",
          absolute: true,
          scale: true,
        });
      })
      .to(".projectoverlay .colordivs", {
        y: "0%",
        duration: 1,
        stagger: {
          each: 0.07,
          from: "edges",
        },
        ease: "power2.inOut",
      })
      .to(
        [
          ".closeBtn",
          ".livelink",
          ".description h2",
          ".techstackandhighlights h2",
          ".right-part-wrapper",
        ],
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "a"
      )
      .to(
        [title.chars, year.chars, tag.words],
        {
          y: "0%",
          stagger: 0.05,
          duration: 1.4,
          ease: "expo.out",
        },
        "a"
      );
  });

  box.addEventListener("mouseenter", () => {
    const image = previews[index].querySelector(".project-img img");
    gsap.to(previews[index], {
      "--moveX": "0%", // reveal the preview
      duration: 1.2,
      ease: "expo.out",
    });
    gsap.to(image, {
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
    });
  });

  box.addEventListener("mouseleave", () => {
    const image = previews[index].querySelector(".project-img img");
    gsap.to(previews[index], {
      "--moveX": "100%", // hide again
      duration: 1,
      ease: "expo.out",
    }); // optional speed adjustment
    gsap.to(image, {
      scale: 1.2,
      duration: 1,
      ease: "expo.out",
    });
  });

  window.addEventListener("scroll", () => {
    gsap.to(previews, {
      "--moveX": "100%", // hide again
      duration: 1,
      ease: "expo.out",
    });
  });
});

// nav

const about = document.querySelector("#aboutlink");
const project = document.querySelector("#projectlink");
const exp = document.querySelector("#explink");
const contact = document.querySelector("#contactlink");

about.addEventListener("click", () => {
  gsap.to(window, { duration: 0.8, scrollTo: "#about", ease: "power2.out" });
});
project.addEventListener("click", () => {
  gsap.to(window, { duration: 0.8, scrollTo: "#projects", ease: "power2.out" });
});
exp.addEventListener("click", () => {
  gsap.to(window, { duration: 0.8, scrollTo: "#experience", ease: "power2.out" });
});
contact.addEventListener("click", () => {
  gsap.to(window, { duration: 0.8, scrollTo: "#contact", ease: "power2.out" });
});

// ── Contact form: confirm send + persist to sessionStorage ──
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", () => {
  const entry = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value,
    sentAt: new Date().toISOString(),
  };
  const history = JSON.parse(sessionStorage.getItem("sentMessages") || "[]");
  history.push(entry);
  sessionStorage.setItem("sentMessages", JSON.stringify(history));

  toast.success("Message sent!");
});

// ── Experience section animations ──

// Heading slide-up
const expTitleSplit = SplitText.create(".exp-title", { type: "chars", mask: "chars" });
gsap.from(expTitleSplit.chars, {
  scrollTrigger: { trigger: ".exp-title", start: "top 85%", toggleActions: "play none none none" },
  y: "110%",
  duration: 0.9,
  stagger: 0.025,
  ease: "power3.out",
});

const skillsTitleSplit = SplitText.create(".skills-title", { type: "chars", mask: "chars" });
gsap.from(skillsTitleSplit.chars, {
  scrollTrigger: { trigger: ".skills-title", start: "top 85%", toggleActions: "play none none none" },
  y: "110%",
  duration: 0.9,
  stagger: 0.02,
  ease: "power3.out",
});

// Job entries — each entry slides up and fades in
gsap.utils.toArray(".exp-entry").forEach((entry, i) => {
  gsap.from(entry, {
    scrollTrigger: { trigger: entry, start: "top 88%", toggleActions: "play none none none" },
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.05,
    ease: "power3.out",
  });
});

// Bullet points stagger inside each entry
gsap.utils.toArray(".exp-entry").forEach((entry) => {
  const bullets = entry.querySelectorAll(".exp-bullet");
  gsap.from(bullets, {
    scrollTrigger: { trigger: entry, start: "top 80%", toggleActions: "play none none none" },
    x: -20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  });
});

// Skill tags pop in with stagger per row
gsap.utils.toArray(".skill-row").forEach((row) => {
  const tags = row.querySelectorAll(".skill-tag");
  gsap.from(tags, {
    scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none none" },
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.06,
    ease: "back.out(1.4)",
  });
});

