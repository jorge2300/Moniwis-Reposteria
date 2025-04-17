



  document.addEventListener("DOMContentLoaded", function() {
    // Elementos del carrusel
    const menuToggle = document.getElementById("menu-toggle");
    const sideMenu = document.getElementById("side-menu");
    const closeMenu = document.getElementById("close-menu");
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    

    menuToggle.addEventListener("click", () => {
        sideMenu.classList.add("open");
      });
    
      closeMenu.addEventListener("click", () => {
        sideMenu.classList.remove("open");
      });

      
    let currentSlide = 0;
    const intervalTime = 5000; // 5 segundos
    let slideInterval;
  
    // Función para mostrar un slide específico
    function showSlide(index) {
      // Oculta todos los slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Desactiva todos los indicadores
      indicators.forEach(indicator => {
        indicator.classList.remove('active');
      });
      
      // Muestra el slide actual y activa su indicador
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      currentSlide = index;
    }
  
    // Función para ir al siguiente slide
    function nextSlide() {
      const newIndex = (currentSlide + 1) % slides.length;
      showSlide(newIndex);
    }
  
    // Función para ir al slide anterior
    function prevSlide() {
      const newIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    }
  
    // Event listeners
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
        resetInterval();
      });
    });
  
    // Auto slide
    function startInterval() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
  
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }
  
    // Inicialización
    showSlide(0); // Mostrar el primer slide al cargar
    startInterval(); // Iniciar el auto slide
  });


  
