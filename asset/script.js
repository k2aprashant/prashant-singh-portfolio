$(document).ready(function () {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Active navigation link
    $(window).scroll(function () {
        var scrollPos = $(document).scrollTop();
        $('.navbar-nav .nav-link').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position() && refElement.position().top <= scrollPos + 100 && refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar-nav .nav-link').removeClass("active");
                currLink.addClass("active");
            }
        });
    });

    // Theme toggle
    $('#themeToggle').click(function () {
        const currentTheme = $('html').attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        $('html').attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update icon
        const icon = $(this).find('i');
        if (newTheme === 'dark') {
            icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    $('html').attr('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        $('#themeToggle i').removeClass('fa-moon').addClass('fa-sun');
    }

    // Typed text effect
    const typedText = $('.typed-text');
    const textArray = ['Prashant', 'Laravel Dev', 'Full Stack Dev'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = textArray[textIndex];

        if (isDeleting) {
            typedText.text(currentText.substring(0, charIndex - 1));
            charIndex--;
        } else {
            typedText.text(currentText.substring(0, charIndex + 1));
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();


    // Testimonials slider
    let currentTestimonial = 0;
    const testimonials = $('.testimonial-item');
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        testimonials.removeClass('active');
        testimonials.eq(index).addClass('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }

    // Initialize first testimonial
    showTestimonial(0);

    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);

    // Mobile menu close on link click
    $('.navbar-nav .nav-link').click(function () {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Preloader (if needed)
    $(window).on('load', function () {
        $('.preloader').fadeOut('slow');
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // Project card hover effects
    $('.project-card').hover(
        function () {
            $(this).find('.project-image img').css('transform', 'scale(1.1)');
        },
        function () {
            $(this).find('.project-image img').css('transform', 'scale(1)');
        }
    );

    // Service card hover effects
    $('.service-card').hover(
        function () {
            $(this).find('.service-icon').css('transform', 'scale(1.1) rotate(5deg)');
        },
        function () {
            $(this).find('.service-icon').css('transform', 'scale(1) rotate(0deg)');
        }
    );

    // Floating animation for hero icons
    $('.floating-icon').each(function (index) {
        $(this).css('animation-delay', (index * 0.5) + 's');
    });

    // Initialize tooltips (if using Bootstrap tooltips)
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Initialize popovers (if using Bootstrap popovers)
    $('[data-bs-toggle="popover"]').popover();

    // Custom cursor effect (optional)
    $(document).mousemove(function (e) {
        $('.cursor').css({
            left: e.pageX,
            top: e.pageY
        });
    });

    // Intersection Observer for animations (alternative to scroll events)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });

        $('.fade-in').each(function () {
            observer.observe(this);
        });
    }
});
