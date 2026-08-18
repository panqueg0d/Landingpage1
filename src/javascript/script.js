$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});

const testimonialImage = document.getElementById('testimonial_chef');

const testimonialImages = [
    'src/images/mulher1.png',
    'src/images/mulher2.png',
    'src/images/mulher3.png',
    'src/images/mulher4.png'
];

let currentImage = 0;

setInterval(() => {

    testimonialImage.classList.add('image-fade');

    setTimeout(() => {

        currentImage++;

        if (currentImage >= testimonialImages.length) {
            currentImage = 0;
        }

        testimonialImage.src = testimonialImages[currentImage];

        testimonialImage.classList.remove('image-fade');

    }, 500);

}, 5000);

/* =====================================================
   CATÁLOGO MOBILE - TROCA AUTOMÁTICA
===================================================== */

const mobileCatalogProducts =
    document.querySelectorAll('#dishes .dish');

let mobileCatalogPage = 0;

const productsPerMobilePage = 4;

const mobileCatalogInterval = 10000;


function updateMobileCatalog() {

    /* Desktop mantém comportamento normal */

    if (window.innerWidth > 600) {

        mobileCatalogProducts.forEach((product) => {
            product.classList.remove('mobile-visible');

            product.style.display = '';
        });

        return;
    }


    const totalProducts =
        mobileCatalogProducts.length;


    const totalPages =
        Math.ceil(
            totalProducts /
            productsPerMobilePage
        );


    if (mobileCatalogPage >= totalPages) {
        mobileCatalogPage = 0;
    }


    const start =
        mobileCatalogPage *
        productsPerMobilePage;


    const end =
        start +
        productsPerMobilePage;


    mobileCatalogProducts.forEach(
        (product, index) => {

            product.style.display = '';

            product.classList.remove(
                'mobile-visible'
            );


            if (
                index >= start &&
                index < end
            ) {

                product.classList.add(
                    'mobile-visible'
                );
            }
        }
    );
}


function nextMobileCatalogPage() {

    if (window.innerWidth > 600) {
        return;
    }


    const totalPages =
        Math.ceil(
            mobileCatalogProducts.length /
            productsPerMobilePage
        );


    mobileCatalogPage =
        (mobileCatalogPage + 1)
        % totalPages;


    updateMobileCatalog();
}


/* PRIMEIRA EXIBIÇÃO */

updateMobileCatalog();


/* TROCA A CADA 10 SEGUNDOS */

setInterval(
    nextMobileCatalogPage,
    mobileCatalogInterval
);


/* ATUALIZA AO GIRAR OU REDIMENSIONAR */

window.addEventListener(
    'resize',
    () => {

        mobileCatalogPage = 0;

        updateMobileCatalog();
    }
);