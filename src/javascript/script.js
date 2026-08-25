$(document).ready(function () {

    // =====================================================
    // MENU MOBILE
    // =====================================================

    $('#mobile_btn').on('click', function () {

        $('#mobile_menu').toggleClass('active');

        $('#mobile_btn')
            .find('i')
            .toggleClass('fa-x');

    });



    // =====================================================
    // NAVEGAÇÃO ENTRE SEÇÕES OTIMIZADA
    // =====================================================

    const sections = $('section');
    const navItems = $('.nav-item');

    let scrollTicking = false;


    $(window).on('scroll', function () {

        if (scrollTicking) return;


        scrollTicking = true;


        requestAnimationFrame(function () {


            const header = $('header');


            const scrollPosition =
                $(window).scrollTop() -
                header.outerHeight();



            let activeSectionIndex = 0;



            if (scrollPosition <= 0) {

                header.css(
                    'box-shadow',
                    'none'
                );

            } else {

                header.css(
                    'box-shadow',
                    '5px 1px 5px rgba(0,0,0,0.1)'
                );

            }





            sections.each(function (i) {


                const sectionTop =
                    $(this).offset().top - 96;



                const sectionBottom =
                    sectionTop +
                    $(this).outerHeight();




                if (

                    scrollPosition >= sectionTop &&

                    scrollPosition < sectionBottom

                ) {


                    activeSectionIndex = i;


                    return false;

                }


            });





            navItems.removeClass('active');


            $(navItems[activeSectionIndex])
                .addClass('active');



            scrollTicking = false;



        });


    });







    // =====================================================
    // ANIMAÇÕES LEVES
    // =====================================================


    if (typeof ScrollReveal !== 'undefined') {



        ScrollReveal().reveal('#cta', {

            origin: 'left',

            duration: 1200,

            distance: '20%'

        });





        ScrollReveal().reveal('#testimonial_chef', {

            origin: 'left',

            duration: 900,

            distance: '20%'

        });





        ScrollReveal().reveal('.feedback', {

            origin: 'right',

            duration: 900,

            distance: '20%'

        });


    }


});









// =====================================================
// TROCA AUTOMÁTICA DOS DEPOIMENTOS
// =====================================================


const testimonialImage =
    document.getElementById('testimonial_chef');



const testimonialImages = [

    'src/images/mulher1.png',

    'src/images/mulher2.png',

    'src/images/mulher3.png',

    'src/images/mulher4.png'

];



let currentImage = 0;




if (testimonialImage) {



    setInterval(function () {



        testimonialImage.classList.add(
            'image-fade'
        );




        setTimeout(function () {



            currentImage++;




            if (
                currentImage >= testimonialImages.length
            ) {

                currentImage = 0;

            }





            testimonialImage.src =
                testimonialImages[currentImage];





            testimonialImage.classList.remove(
                'image-fade'
            );




        },400);




    },5000);


}

// =====================================================
// CATÁLOGO OTIMIZADO
// =====================================================


const catalog =
    document.getElementById('dishes');


const leftArrow =
    document.querySelector(
        '.catalog-arrow.left'
    );


const rightArrow =
    document.querySelector(
        '.catalog-arrow.right'
    );





// =====================================================
// CONTROLE DAS SETAS
// =====================================================


function updateCatalogArrows() {


    if (
        !catalog ||
        !leftArrow ||
        !rightArrow
    ) {

        return;

    }



    const current =
        Math.ceil(
            catalog.scrollLeft
        );



    const maxScroll =
        catalog.scrollWidth -
        catalog.clientWidth;





    // ESQUERDA

    if (current <= 5) {


        leftArrow.style.opacity = "0";


        leftArrow.style.pointerEvents =
            "none";


    } else {


        leftArrow.style.opacity = "1";


        leftArrow.style.pointerEvents =
            "auto";


    }





    // DIREITA


    if (
        current >= maxScroll - 5
    ) {


        rightArrow.style.opacity = "0";


        rightArrow.style.pointerEvents =
            "none";


    } else {


        rightArrow.style.opacity = "1";


        rightArrow.style.pointerEvents =
            "auto";


    }


}









let catalogTicking = false;



if (catalog) {


    updateCatalogArrows();



    catalog.addEventListener(
        'scroll',
        function () {



            if (catalogTicking) {

                return;

            }



            catalogTicking = true;



            requestAnimationFrame(
                function () {


                    updateCatalogArrows();


                    catalogTicking = false;



                }
            );


        }
    );

}





// =====================================================
// MOVIMENTO DAS SETAS
// =====================================================


function scrollCatalog(direction) {


    if (!catalog) {

        return;

    }



    const card =
        catalog.querySelector('.dish');



    if (!card) {

        return;

    }




    const gap =
        parseInt(
            window.getComputedStyle(catalog).gap
        ) || 0;





    const move =
        (card.offsetWidth + gap) * 4;





    let target =
        catalog.scrollLeft +
        (direction * move);





    const maxScroll =
        catalog.scrollWidth -
        catalog.clientWidth;





    if (target < 0) {

        target = 0;

    }



    if (target > maxScroll) {

        target = maxScroll;

    }





    catalog.scrollTo({

        left: target,

        behavior: "smooth"

    });



}











// =====================================================
// ARRASTE MOUSE
// =====================================================


if (catalog) {



    let isDown = false;


    let startX = 0;


    let startScroll = 0;






    catalog.addEventListener(
        'mousedown',
        function (e) {



            isDown = true;



            startX =
                e.pageX;



            startScroll =
                catalog.scrollLeft;



            catalog.style.cursor =
                "grabbing";



        }
    );







    window.addEventListener(
        'mouseup',
        function () {



            isDown = false;



            catalog.style.cursor =
                "grab";



        }
    );







    catalog.addEventListener(
        'mousemove',
        function (e) {



            if (!isDown) {

                return;

            }




            e.preventDefault();





            catalog.scrollLeft =
                startScroll -
                (e.pageX - startX);



        }
    );









    // =================================================
    // TOUCH MOBILE
    // =================================================



    let touchStart = 0;


    let touchScroll = 0;







    catalog.addEventListener(
        'touchstart',
        function (e) {



            touchStart =
                e.touches[0].pageX;



            touchScroll =
                catalog.scrollLeft;



        },
        {
            passive:true
        }
    );








    catalog.addEventListener(
        'touchmove',
        function (e) {



            const x =
                e.touches[0].pageX;





            catalog.scrollLeft =
                touchScroll +
                (touchStart - x);



        },
        {
            passive:true
        }
    );



}