document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section, #showcase");
    const navLinks = document.querySelectorAll("header nav ul li a");
    const backToTopButton = document.getElementById("backToTop");
    const themeToggleBtn = document.getElementById("themeToggle");

    // Check for saved user theme preference on load
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
    }

    // 1. Interactive Navbar Highlighting on Scroll
    function updateActiveNav() {
        let scrollPos = window.scrollY + 200;
        let documentHeight = document.documentElement.scrollHeight;

        if ((window.innerHeight + window.scrollY) >= documentHeight - 50) {
            navLinks.forEach(link => link.parentElement.classList.remove("current"));
            const projectLink = document.querySelector('header nav ul li a[href="#projects"]');
            if (projectLink) {
                projectLink.parentElement.classList.add("current");
            }
            return;
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.parentElement.classList.remove("current");
                    
                    if (link.getAttribute("href") === `#${sectionId}` || (sectionId === "showcase" && link.getAttribute("href").includes("index.html"))) {
                        link.parentElement.classList.add("current");
                    }
                });
            }
        });
    }

    // 2. Scroll Reveal Animation Logic (Triggers up and down)
    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");

        reveals.forEach(element => {
            let windowHeight = window.innerHeight;
            let elementTop = element.getBoundingClientRect().top;
            let elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            } else {
                element.classList.remove("active"); // Removes class when scrolling back up so it can re-animate
            }
        });
    }

    // 3. Back-to-Top Button Visibility & Action
    function handleBackToTop() {
        if (!backToTopButton) return;
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    if (backToTopButton) {
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 4. Dark / Light Mode Toggle Logic with LocalStorage memory
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            if (document.body.classList.contains("dark-mode")) {
                themeToggleBtn.textContent = "☀️";
                localStorage.setItem("theme", "dark");
            } else {
                themeToggleBtn.textContent = "🌙";
                localStorage.setItem("theme", "light");
            }
        });
    }

    // Register combined scroll listener
    window.addEventListener("scroll", () => {
        updateActiveNav();
        revealOnScroll();
        handleBackToTop();
    });

    // Run once on load to catch initial view
    revealOnScroll();
});