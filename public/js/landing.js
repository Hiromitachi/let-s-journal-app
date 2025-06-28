// Landing page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Testimonial slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  
  if (testimonialSlider) {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    
    if (testimonials.length > 1) {
      let currentIndex = 0;
      
      // Initial setup - hide all except first
      testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
          testimonial.style.display = 'none';
        }
      });
      
      // Function to show next testimonial
      function showNextTestimonial() {
        testimonials[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].style.display = 'block';
        
        // Add fade-in animation
        testimonials[currentIndex].style.animation = 'fadeIn 0.5s ease-in-out';
      }
      
      // Set interval for auto-rotation
      setInterval(showNextTestimonial, 5000);
    }
  }
  
  // Feature card animations
  const featureCards = document.querySelectorAll('.feature-card');
  
  if (featureCards.length > 0) {
    // Create intersection observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    // Set initial state and observe each card
    featureCards.forEach((card, index) => {
      card.style.opacity = 0;
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.transitionDelay = `${index * 0.1}s`;
      
      observer.observe(card);
    });
  }
});