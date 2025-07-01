function fadeIn(el) {
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-up');
  
    elements.forEach((el) => {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fadeIn(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
  
      observer.observe(el);
    });
  });

  function fadeDown(el) {
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-down');
  
    elements.forEach((el) => {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fadeDown(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
  
      observer.observe(el);
    });
  });

  function zoomIn(el) {
    el.style.transform = 'scale(1)';
    el.style.opacity = '1';
  }

  document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.zoom-in');

    elements.forEach((el) => {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            zoomIn(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  });

  