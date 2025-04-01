import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize smooth scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('main'),
    smooth: true,
    lerp: 0.05,
    multiplier: 0.5
});

// Gallery data
const galleryItems = [
    {
        id: 1,
        title: "The Code Poet",
        creator: "Sarah Chen",
        category: "code",
        description: "A minimalist design featuring elegant code snippets that tell the story of a developer's journey.",
        image: "/assets/gallery/code-poet.jpg",
        storyLink: "/stories/code-poet.html"
    },
    {
        id: 2,
        title: "Digital Dreams",
        creator: "Marcus Rodriguez",
        category: "design",
        description: "A bold, geometric pattern inspired by digital art and user interface design.",
        image: "/assets/gallery/digital-dreams.jpg",
        storyLink: "/stories/digital-dreams.html"
    },
    {
        id: 3,
        title: "Sound Waves",
        creator: "Luna Patel",
        category: "music",
        description: "An abstract representation of sound waves and musical notes in motion.",
        image: "/assets/gallery/sound-waves.jpg",
        storyLink: "/stories/sound-waves.html"
    },
    {
        id: 4,
        title: "Brush Strokes",
        creator: "Alex Thompson",
        category: "art",
        description: "A wearable canvas showcasing the artist's signature brush stroke technique.",
        image: "/assets/gallery/brush-strokes.jpg",
        storyLink: "/stories/brush-strokes.html"
    }
];

// Populate gallery grid
function populateGallery(items = galleryItems) {
    const container = document.querySelector('.gallery-grid__container');
    container.innerHTML = '';

    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = item.category;
        galleryItem.innerHTML = `
            <div class="gallery-item__image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-item__overlay">
                    <h3 class="gallery-item__title">${item.title}</h3>
                    <p class="gallery-item__creator">${item.creator}</p>
                </div>
            </div>
        `;

        galleryItem.addEventListener('click', () => openLightbox(item));
        container.appendChild(galleryItem);
    });

    // Animate items
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power4.out'
    });
}

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter items
        const filter = button.dataset.filter;
        const filteredItems = filter === 'all' 
            ? galleryItems 
            : galleryItems.filter(item => item.category === filter);

        // Animate out current items
        gsap.to('.gallery-item', {
            duration: 0.3,
            opacity: 0,
            y: 20,
            stagger: 0.05,
            onComplete: () => {
                populateGallery(filteredItems);
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.querySelector('.lightbox');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxTitle = document.querySelector('.lightbox__title');
const lightboxDescription = document.querySelector('.lightbox__description');
const lightboxLink = document.querySelector('.lightbox__link');

function openLightbox(item) {
    lightboxImage.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    lightboxLink.href = item.storyLink;

    gsap.to(lightbox, {
        duration: 0.3,
        opacity: 1,
        display: 'flex',
        ease: 'power4.out'
    });

    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    gsap.to(lightbox, {
        duration: 0.3,
        opacity: 0,
        display: 'none',
        ease: 'power4.out'
    });

    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Initialize gallery
populateGallery(); 