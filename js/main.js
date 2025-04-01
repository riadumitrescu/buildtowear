import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import '../styles/main.scss';

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
gsap.from('.hero__title', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

gsap.from('.hero__subtitle', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: 1
});

gsap.from('.button', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power4.out',
    delay: 1.5
});

// How It Works section animation
gsap.from('.step', {
    scrollTrigger: {
        trigger: '.how-it-works',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power4.out'
});

// Teaser section animation
gsap.from('.teaser__grid > *', {
    scrollTrigger: {
        trigger: '.teaser',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power4.out'
});

// CTA Banner animation
gsap.from('.cta-banner__content', {
    scrollTrigger: {
        trigger: '.cta-banner',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power4.out'
});

// Email form animation
gsap.from('.email-form__container', {
    scrollTrigger: {
        trigger: '.email-form',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power4.out'
});

// Handle form submission
document.querySelector('.email-form__container').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        });
        
        if (response.ok) {
            submitButton.textContent = 'Subscribed!';
            form.reset();
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Subscribe';
            }, 3000);
        } else {
            throw new Error('Subscription failed');
        }
    } catch (error) {
        submitButton.textContent = 'Error';
        submitButton.disabled = false;
    }
});

// Navigation menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}); 