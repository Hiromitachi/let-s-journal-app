// Dashboard page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Format dates for better display
  const formatDates = () => {
    const dates = document.querySelectorAll('.entry-date');
    dates.forEach(date => {
      if (date.textContent) {
        const formattedDate = new Date(date.textContent).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        date.textContent = formattedDate;
      }
    });
  };
  
  formatDates();
  
  // Add animations to stat cards
  const statCards = document.querySelectorAll('.stat-card');
  if (statCards.length > 0) {
    statCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = 0;
        card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
      }, 100);
    });
  }
  
  // Animate stat values with counting effect
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };
  
  const statValues = document.querySelectorAll('.stat-value');
  statValues.forEach(statValue => {
    const endValue = parseInt(statValue.textContent, 10);
    if (!isNaN(endValue)) {
      statValue.textContent = '0';
      animateValue(statValue, 0, endValue, 1000);
    }
  });
  
  // Add hover effects to mood bars
  const moodBars = document.querySelectorAll('.mood-bar');
  if (moodBars.length > 0) {
    moodBars.forEach(bar => {
      bar.addEventListener('mouseenter', () => {
        bar.style.opacity = '0.8';
      });
      
      bar.addEventListener('mouseleave', () => {
        bar.style.opacity = '1';
      });
    });
  }
});