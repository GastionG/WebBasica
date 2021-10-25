$(document).ready(function(){

    var banderaA = false;
    var banderaC = false;

    var cerrado = false;
    var top = true;
    var hoverG = false;
    var clickOn = true;


    var inicio =  $(".Inicio");
    var sobreMi = $(".SobreMi");
    var conocimientos = $(".Conocimientos");
    var contacto = $(".Contacto");

    var pInicio;
    var pSobreMi;
    var pConocimientos;
    var pContacto;

    $(".nav").hide();
    $(".nav").effect("slide",{direction: "up", mode:"show"},1500, ()=>{
        $(".nav .ul li").addClass("standBy", ()=>{
            $(".nav .ul li").removeClass("vel3Li");
        })
    })
    .dequeue().fadeTo(2000, 1, ()=>{

        banderaA = true;
        $("#content").animate({
            opacity: 1
        }, 1000);});

    $(".Inicio").click(function(e){
        if(!cerrado){
            $("html, body").animate({
                scrollTop: 0
            })
        }
        
    });
    $(".SobreMi").click(function(e){
        if(!cerrado){
            $("html, body").animate({
                scrollTop: $("#sobreMi").offset().top
            })
        }
        
    });
    $(".Conocimientos").click(function(e){
        if(!cerrado){
            $("html, body").animate({
                scrollTop: $("#conocimientos").offset().top
            })
        }
        
    });
    $(".Contacto").click(function(e){
        if(!cerrado){
            $("html, body").animate({
                scrollTop: $("#contacto").offset().top
            })
        }
        
    });
    
    var banderaB = true;
    window.onscroll = ()=>{
        if ( $(window).scrollTop() > 100){
            cerrarNav();
            top = false;
            console.log("el top es:" + top);

        }
        if ($(window).scrollTop() < 100){
            desplegarNav(false);
            top = true;
        }
    }

    function cerrarNav(){
        if(!cerrado && !banderaC){
            cerrado = true;
            console.log("cerrado");

            pInicio = inicio.position();
            pSobreMi = sobreMi.position();
            pConocimientos = conocimientos.position();
            pContacto = contacto.position();
            inicio.addClass("vel3Li")
            inicio.animate({
                left: -pInicio.left,
                opacity: 0
            },100);
            sobreMi.addClass("vel3Li")
            sobreMi.animate({
                left: -pSobreMi.left,
                opacity: 0
            }, 300);
            conocimientos.addClass("vel3Li")
            conocimientos.animate({
                left: -pConocimientos.left,
                opacity: 0
            }, 500);
            contacto.addClass("vel3Li")
            contacto.animate({
                left: -pContacto.left,
                opacity: 0,
                cursor: "not-allowed"
            }, 700, ()=>{

                $("#header").animate({
                    top: "-40px"
                }, 200);
                
                banderaC = true;
                if ($(window).scrollTop() < 100){
                    desplegarNav(false);
                }
            });
            $(".menuB").show("fade", 1000);
        }
        
        

    };
    
    function desplegarNav(hover){
        if(cerrado && banderaC){
            cerrado = false;
            console.log("abierto");
            
            pInicio = inicio.position();
            pSobreMi = sobreMi.position();
            pConocimientos = conocimientos.position();
            pContacto = contacto.position();
            
            $("#header").animate({
                top: "0px"
            }, 200, ()=>{
                $(".menuB").hide("fade", 400);
                inicio.animate({
                    left: -pInicio.left,
                    opacity: 1
                },100,()=>{inicio.removeClass("vel3Li")});
                sobreMi.animate({
                    left: -pSobreMi.left,
                    opacity: 1
                }, 300,()=>{sobreMi.removeClass("vel3Li")});
                conocimientos.animate({
                    left: -pConocimientos.left,
                    opacity: 1
                }, 500,()=>{conocimientos.removeClass("vel3Li")});
                contacto.animate({
                    left: -pContacto.left,
                    opacity: 1
                }, 700,()=>{
                    contacto.removeClass("vel3Li");
                    banderaC = false;
                    if (!hover && $(window).scrollTop() > 100){
                        console.log("funciondesplegar");
                        cerrarNav();
                    }
                    if (!hoverG && !top) {
                        cerrarNav();
                    }
                });
            });
            
        }
          
    };

    var grid = $(".vista").get();
    var header =  document.querySelector("#header");

    const observer = new IntersectionObserver((entries)=>{
        for (let entry of entries) {
            if(entry.isIntersecting && banderaA){
                $(entry.target).animate({
                    opacity: 1
                }, 1000);
            }
        }
    }, {threshold: .5});

    for (let caja of grid) {
        observer.observe(caja)
        
    }

    const observerNav = new IntersectionObserver((entries)=>{
        let entry = entries[0];
        if(entry.isIntersecting){
            console.log("AAAAAAAA");
        }
    }, {threshold: 0});

    observerNav.observe(header);

    console.log($("#header").height());
    var headerh = $("#header").height();
    $(".menuB").css("height", headerh).css("width", headerh);


    $(".menuB").hover(()=>{
        if(!top){
            desplegarNav(true);
            hoverG = true;
        }
        
    },()=>{
        
    })
    $("#header").hover(()=>{
        console.log("cabeza");
    }, ()=>{
        if(!top){
            cerrarNav();
            hoverG = false;
        }
    })
    
    
    
});