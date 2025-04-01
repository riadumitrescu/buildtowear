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

// Update ScrollTrigger on scroll
scroll.on('scroll', ScrollTrigger.update);

// Tell ScrollTrigger to use these proxy methods
ScrollTrigger.scrollerProxy('main', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
});

// Hero section animation
gsap.from('.story-hero__title', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

gsap.from('.story-hero__creator', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: 1
});

// Image animations
gsap.from('.story-content__image--front', {
    scrollTrigger: {
        trigger: '.story-content__image',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power4.out'
});

gsap.from('.story-content__image--back', {
    scrollTrigger: {
        trigger: '.story-content__image',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

// Text section animations
const sections = document.querySelectorAll('.story-content__section');
sections.forEach((section, index) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power4.out',
        delay: index * 0.2
    });
});

// QR code animation
gsap.from('.story-content__qr', {
    scrollTrigger: {
        trigger: '.story-content__qr',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    scale: 0.9,
    opacity: 0,
    ease: 'power4.out'
});

// Navigation animations
gsap.from('.story-navigation__link', {
    scrollTrigger: {
        trigger: '.story-navigation',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 20,
    opacity: 0,
    stagger: 0.2,
    ease: 'power4.out'
});

// Image hover effect
const images = document.querySelectorAll('.story-content__image img');
images.forEach(image => {
    image.addEventListener('mouseenter', () => {
        gsap.to(image, {
            duration: 0.3,
            scale: 1.02,
            ease: 'power2.out'
        });
    });
    
    image.addEventListener('mouseleave', () => {
        gsap.to(image, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });
}); 