/* =========================================================
   GLOW — WEBSITE INTERACTIONS
   ========================================================= */


/* =========================================================
   HERO SLIDESHOW
   ========================================================= */

const slides = [
    {
        title: "Red Sprites",
        description: "Experience Minecraft skies like never before.",
        image: "red-sprites-hero.png"
    },
    {
        title: "Aurora",
        description: "Bring atmospheric skies and immersive light to your world.",
        image: "aurora-hero.png"
    },
    {
        title: "Cinematic",
        description: "Experience beautiful lighting and breathtaking Minecraft worlds.",
        image: "sunset-hero.png"
    }
];

let currentSlide = 0;
let slideTimer;

const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");

const currentBackground =
    document.querySelector(".hero-background-current");

const nextBackground =
    document.querySelector(".hero-background-next");

const sliderDots =
    document.querySelectorAll("#sliderDots button");


function getBackground(image) {

    return `
        linear-gradient(
            90deg,
            rgba(5, 6, 8, 0.88) 0%,
            rgba(5, 6, 8, 0.55) 45%,
            rgba(5, 6, 8, 0.15) 100%
        ),
        url("${image}")
    `;

}


/* Preload all images */

slides.forEach(slide => {

    const image = new Image();

    image.src = slide.image;

});


function showSlide(index) {

    currentSlide =
        (index + slides.length) % slides.length;

    const slide = slides[currentSlide];


    /* Prepare next background */

    nextBackground.style.backgroundImage =
        getBackground(slide.image);


    nextBackground.style.opacity = "1";


    /* Fade text */

    heroTitle.style.opacity = "0";
    heroDescription.style.opacity = "0";


    setTimeout(() => {

        heroTitle.textContent = slide.title;
        heroDescription.textContent = slide.description;

        heroTitle.style.opacity = "1";
        heroDescription.style.opacity = "1";

    }, 200);


    /* After crossfade, make next layer current */

    setTimeout(() => {

        currentBackground.style.backgroundImage =
            getBackground(slide.image);

        currentBackground.style.opacity = "1";

        nextBackground.style.opacity = "0";

    }, 800);


    /* Update dots */

    sliderDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentSlide
        );

    });


    /* Restart timer */

    clearTimeout(slideTimer);

    slideTimer = setTimeout(() => {

        showSlide(currentSlide + 1);

    }, 4000);

}


/* Dot navigation */

sliderDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

    });

});


/* Start slideshow */

ccurrentBackground.style.backgroundImage =
    getBackground(slides[0].image);

sliderDots[0].classList.add("active");

slideTimer = setTimeout(() => {

    showSlide(1);

}, 4000);


/* =========================================================
   SEARCH
   ========================================================= */

const searchButton = document.getElementById("searchButton");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");


/* Open search */

searchButton.addEventListener("click", () => {

    searchOverlay.classList.add("active");

    setTimeout(() => {
        searchInput.focus();
    }, 300);

});


/* Close search */

closeSearch.addEventListener("click", () => {

    searchOverlay.classList.remove("active");

    searchInput.value = "";
    searchResults.innerHTML = "";

});


/* Close search with Escape */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        searchOverlay.classList.remove("active");

        searchInput.value = "";
        searchResults.innerHTML = "";

    }

});


/* =========================================================
   SHADER SEARCH DATA
   ========================================================= */

const shaders = [
    {
        name: "Red Sprites",
        category: "Atmospheric",
        description: "Atmospheric lightning high above the clouds."
    },

    {
        name: "Aurora",
        category: "Atmospheric",
        description: "Immersive aurora effects and atmospheric skies."
    }
];


/* Search */

searchInput.addEventListener("input", () => {

    const query = searchInput.value
        .toLowerCase()
        .trim();

    searchResults.innerHTML = "";

    if (!query) {
        return;
    }

    const results = shaders.filter(shader => {

        return (
            shader.name.toLowerCase().includes(query) ||
            shader.category.toLowerCase().includes(query) ||
            shader.description.toLowerCase().includes(query)
        );

    });


    if (results.length === 0) {

        searchResults.innerHTML = `
            <p style="
                margin-top: 25px;
                color: #9da3ad;
            ">
                No shaders found.
            </p>
        `;

        return;
    }


    results.forEach(shader => {

        const result = document.createElement("div");

        result.style.marginTop = "25px";
        result.style.padding = "20px";
        result.style.border = "1px solid rgba(255,255,255,0.09)";
        result.style.borderRadius = "14px";

        result.innerHTML = `
            <strong>${shader.name}</strong>

            <p style="
                margin-top: 5px;
                color: #9da3ad;
                font-size: 0.85rem;
            ">
                ${shader.description}
            </p>
        `;

        searchResults.appendChild(result);

    });

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".category-card, .shader-card, .feature, .release"
);


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   ADD REVEAL STYLES
   ========================================================= */

const revealStyle = document.createElement("style");

revealStyle.textContent = `

    .reveal {
        opacity: 0;
        transform: translateY(35px);

        transition:
            opacity 0.8s ease,
            transform 0.8s ease;
    }

    .revealed {
        opacity: 1;
        transform: translateY(0);
    }

`;

document.head.appendChild(revealStyle);


/* =========================================================
   PREVENT EMPTY HASH LINKS FROM JUMPING
   ========================================================= */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", event => {
        event.preventDefault();
    });

});
