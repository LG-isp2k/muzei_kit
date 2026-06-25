(function() {
    var navLinks = document.querySelectorAll('.nav-vintage a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    var btn = document.querySelector('.btn-vintage');
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.getElementById('history');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    var sections = document.querySelectorAll('.section');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(function(section) {
        observer.observe(section);
    });

    var track = document.getElementById('sliderTrack');
    
    if (track) {
        var slides = track.querySelectorAll('.slide');
        var prevBtn = document.getElementById('prevBtn');
        var nextBtn = document.getElementById('nextBtn');
        var dotsContainer = document.getElementById('sliderDots');

        var currentIndex = 0;
        var totalSlides = slides.length;

        if (totalSlides > 0 && dotsContainer) {
            slides.forEach(function(_, i) {
                var dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', function() { goToSlide(i); });
                dotsContainer.appendChild(dot);
            });

            var dots = dotsContainer.querySelectorAll('.dot');

            function goToSlide(index) {
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;
                currentIndex = index;
                track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
                dots.forEach(function(dot, i) {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', function() { goToSlide(currentIndex - 1); });
                nextBtn.addEventListener('click', function() { goToSlide(currentIndex + 1); });
            }

            // клавиши ← →
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
                if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
            });

            // авто-слайдер
            var autoplay = setInterval(function() { goToSlide(currentIndex + 1); }, 5000);
            var sliderContainer = document.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', function() { clearInterval(autoplay); });
                sliderContainer.addEventListener('mouseleave', function() {
                    autoplay = setInterval(function() { goToSlide(currentIndex + 1); }, 5000);
                });
            }

            console.log('📸 Слайдер содержит ' + totalSlides + ' фото');
        }
    } else {
        console.log('⚠️ Слайдер #sliderTrack не найден на странице');
    }

    function createParticles() {
        var container = document.createElement('div');
        container.className = 'particles-container';
        document.body.appendChild(container);

        for (var i = 0; i < 30; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (15 + Math.random() * 25) + 's';
            particle.style.animationDelay = (Math.random() * 20) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = 0.1 + Math.random() * 0.2;
            container.appendChild(particle);
        }
    }
    createParticles();

    var cards = document.querySelectorAll('.owner-card');
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / 20;
            var rotateY = (centerX - x) / 20;
            this.style.transform = 'perspective(500px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    console.log('🏛️ Колледж Информационных Технологий · музей · загружен');
})();
