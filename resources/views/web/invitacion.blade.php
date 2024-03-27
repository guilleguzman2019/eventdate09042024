<?php

  $componentes = $componentes;


  $data = $invitacion -> data ;

  $assets = $invitacion -> assets ;

  $id = $invitacion -> id ;

  $slug = $invitacion -> slug ;

  $appUrl = env('APP_URL');

?>

<script>

  var token = '{{ csrf_token() }}';

  var idInvitacion = {!! $id !!};

  var jsondata = {!! $data !!};

  var assets = {!! $assets !!};

  var slug = '{!! $slug !!}';

  var modoBuilder = false ;

  var urlApp = '{!! $appUrl !!}';

  console.log(assets);
  console.log(jsondata);

  console.log(idInvitacion);


</script>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitacion-western</title>

    <!-- Font family -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@500&display=swap">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@500&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Meow+Script&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oooh+Baby&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alata&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&amp;display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Birthstone&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bigelow+Rules&display=swap">



    <!-- Enlace al archivo CSS de Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css">

    <!-- Enlace al archivo CSS de Owl Carousel -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">

    <!--font awesome-->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <style>
      .footer {
          background-image: linear-gradient(45deg, #FF6660 0%, #2D2CE5 100%);
          padding: 30px;
          text-align: center;
          color: #fff;
      }

      .tituloFooter {
          color: #FFFFFF;
          font-family: "Montserrat", Sans-serif;
          font-size: 18px;
          font-weight: 300;
      }
    </style>

  
    <script>

        var nuevoEstilo = document.createElement('style');

        var jsonassets = assets;

        @foreach ($componentes as $componente)

          var tipoComponent = `{!! $componente->template ->name !!}`;

          var bloqueEspecifico = `#portada-${tipoComponent} {background-image: url("${jsonassets['portada-'+tipoComponent+'-mobile']}");}`;

          var bloqueEspecificoMensaje = `#mensaje-${tipoComponent} {background-image: url("${jsonassets['portada-'+tipoComponent+'-mobile']}");}`;

          var bloqueEspecificoContador = `#contador-${tipoComponent} {background-image: url("${jsonassets['portada-'+tipoComponent+'-mobile']}");}`;

          var bloqueEspecificoHashtag = `#hashtag-${tipoComponent} {background-image: url("${jsonassets['portada-'+tipoComponent+'-mobile']}");}`;

          var bloqueEspecificoCanciones = `#canciones-${tipoComponent} {background-image: url("${jsonassets['portada-'+tipoComponent+'-mobile']}");}`;

          var reglasDeEstilo =  `{!! $componente->style !!}`;


          nuevoEstilo.innerHTML += reglasDeEstilo;

        @endforeach

        document.head.appendChild(nuevoEstilo);

    </script>

</head>
</head>
<body>

    <script>

      var jsondata = jsondata;

      var stringGrapes = '';

      var miArray = ['eventos', 'galeria','regalos', 'padrinos', 'testigos'];

      var formArray = ['confirmacion', 'canciones','transporte'];

      @if(count($componentes) !== 0)

        @foreach ($componentes as $componente)

                  var nombreComponent = `{!! $componente->nombre !!}`;

                  var tipoComponent = `{!! $componente->template ->name !!}`;

                  var bloqueEspecifico = `#portada-${tipoComponent} {background-image: url("${jsonassets['portada-'+tipoComponent+'-mobile']}");}`;

                  if (miArray.includes(nombreComponent)) {

                    var lista = `<div class="owl-carousel {!! $componente->nombre !!}">`;

                    var arrayListado = jsondata[`{!! $componente->nombre !!}` + '-' + `{!! $componente->template ->name !!}`].listado;

                    if( arrayListado != undefined){

                      arrayListado.forEach(function(elemento) {

                              if( `{!! $componente->nombre !!}` == 'eventos'){

                                lista += `<div class="card card-eventos p-4">
                                                      <img src="${elemento['cardImagenEvento']}" alt="Card image cap" class="cardImagenEvento"/>
                                                      <div class="card-body">
                                                        <h5 class="cardTitulo">${elemento['cardTitulo']}
                                                        </h5>
                                                        <div class="divhorario">
                                                          <span>30/12/2023 19:00hs</span>
                                                        </div>
                                                        <h5 class="cardLugar">${elemento['cardLugar']}
                                                        </h5>
                                                        <span class="cardDireccion">${elemento['cardDireccion']}</span>
                                                        <br/>
                                                        <br/>
                                                        <a href="#" class="botonEventos">${elemento['botonEventos'].text}</a>
                                                      </div>
                                                    </div>`;
                              }

                              if( `{!! $componente->nombre !!}` == 'galeria'){

                                lista += `<div class="item">
                                                        <img src="${elemento['imgGaleria']}" class="imgGaleria"/>
                                                      </div>`;
                              }

                              if( `{!! $componente->nombre !!}` == 'regalos'){

                                lista += `<div class="card card-regalo p-4">
                                            <img src="${elemento['cardImgRegalo']}" alt="Card image cap" class="cardImgRegalo"/>
                                            <div class="card-body">
                                              <h5 class="cardTituloRegalo">${elemento['cardTituloRegalo']}
                                              </h5>
                                              <span class="cardDescRegalo"></span>
                                              <h5 class="cardPrecioRegalo mt-3">${elemento['cardPrecioRegalo']}
                                              </h5>
                                              <br/>
                                              <a href="${elemento['botonRegalo'].src}" class="botonRegalo">${elemento['botonRegalo'].text}</a>
                                            </div>
                                          </div>`;
                              }

                              if( `{!! $componente->nombre !!}` == 'testigos'){

                                lista += `<div class="text-center card-testigo" ${stringGrapes}>
                                            <img class="cardImg" src="${elemento['cardImg']}" alt="Card image cap">
                                            <div class="card-body" ${stringGrapes}>
                                              <h5 class="cardNombre text-dark">${elemento['cardNombre']}</h5>
                                              <span class="cardRelacion text-dark">${elemento['cardRelacion']}</span>
                                              <br>
                                            </div>
                                          </div>`;
                              }

                      });


                    }

                    lista += `</div>`;

                  }

                  if(nombreComponent == 'contador'){

                    var scriptElement = document.createElement('script');

                    var contenido = `document.addEventListener('DOMContentLoaded', function() {
                                    function habilitarScript() {
                                      // Obtiene el script por su ID
                                      var scriptElement = document.getElementById('countdownScript');

                                      if (scriptElement) {
                                        // Habilita el script
                                        scriptElement.disabled = false;

                                        console.log('Script habilitado con éxito.');
                                      } else {
                                        console.error('El elemento de script no fue encontrado.');
                                      }
                                    }
                                  });`

                    scriptElement.textContent = contenido;

                    document.body.appendChild(scriptElement);

                    var contador = `<span data-js="countdown" class="countdown-cont">
                                      <div class="countdown-block">
                                        <div data-js="countdown-day" class="countdown-digit">00</div>
                                        <div class="countdown-label">Dias</div>
                                      </div>
                                      <div class="countdown-block">
                                        <div data-js="countdown-hour" class="countdown-digit">00</div>
                                        <div class="countdown-label">Horas</div>
                                      </div>
                                      <div class="countdown-block">
                                        <div data-js="countdown-minute" class="countdown-digit">00</div>
                                        <div class="countdown-label">Minutos</div>
                                      </div>
                                      <div class="countdown-block">
                                        <div data-js="countdown-second" class="countdown-digit">00</div>
                                        <div class="countdown-label">Segundos</div>
                                      </div>
                                    </span>
                                    <span data-js="countdown-endtext" class="countdown-endtext"></span>`;

                  }

                  var nuevoDiv = document.createElement('div');

                  nuevoDiv.id = "{{ $componente->nombre . '-' . $componente->template->name }}";

                  nuevoDiv.innerHTML = `{!! $componente->html !!}`;

                  document.body.appendChild(nuevoDiv);

        @endforeach
      
      @else
            
        var nuevoDiv = document.createElement('div');
        var nuevoH1 = document.createElement('h5');

        nuevoDiv.id = 'nuevoDivId'; // Puedes asignar un ID según tus necesidades

        // Agrega clases de Bootstrap para centrar vertical y horizontalmente
        nuevoDiv.classList.add('d-flex', 'align-items-center', 'justify-content-center');

        nuevoDiv.style.height = '51vh';

        nuevoH1.innerHTML = `Tenes que agregar componentes  😁
                              <a href=`${urlApp}/panel/builder/${slug}`>Empezar a Construir tu Invitacion</a>`;

        nuevoDiv.appendChild(nuevoH1);
        document.body.appendChild(nuevoDiv);

      @endif

    </script>
    <div class="footer">
      <h1 class="tituloFooter">Invitación creada</h1>
      <img src="https://eleve11.ar/wp-content/uploads/2023/04/LOGO-EVENTDATE-05.png" alt="" width="200">
    </div>


    <!-- Enlace al archivo JavaScript de Bootstrap (requiere jQuery y Popper.js) -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Enlace al archivo JavaScript de Owl Carousel -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>

    <script>
    
        /*  carousel de eventos*/

        $(document).ready(function(){
            $('.eventos').owlCarousel({
              loop: false,
              margin: 15,
              nav: true,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 1
                },
                1000: {
                  items: 2
                }
              }
            })
        });

        /*  carousel de padrinos*/

        $(document).ready(function(){

          $('.testigos').owlCarousel({
            loop: false,
            margin: 5,
            nav: true,
            responsive: {
              0: {
                items: 1
              },
              600: {
                items: 1
              },
              1000: {
                items: 2
              }
            }
          })
        });


        /*  carousel de fotos*/

        $(document).ready(function(){
            $('.galeria').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 3
                },
                1000: {
                  items: 3
                }
              }
            })
        });

        /*  carousel de regalos*/

        $(document).ready(function(){
            $('.regalos').owlCarousel({
                loop:false,
                margin:7,
                nav: true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:3
                    }
                }
            })
        });

        /*  js de regalos*/

        $('.yang').click(function() {
    
          $("#yang").prop("checked", true);
          $("#yin").prop("checked", false);
        
          $('.contenregalo').show();           
            
          $('.datosBancariosRegalos').hide(); 
            
        });

        $('.yin').click(function() {

          $("#yang").prop("checked", false);
          $("#yin").prop("checked", true);
              
          $('.contenregalo').hide();           
            
          $('.datosBancariosRegalos').show(); 
            
        });

        var acc = document.querySelector('.labelDatosRegalos');
        var panel = document.querySelector('.panel');
    
        if (panel) {
          acc.addEventListener('click', function () {
              panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
          });
        }
  
    </script>
    <script id="countdownScript" type="text/javascript" disabled>

      var endDate = new Date('2024-01-31T00:00:00Z');

      if (assets['contador']) {
        var endDate = new Date(assets['contador'].startfrom);
        var textFin = assets['contador'].endTxt;
      }

      function updateCountdown() {
        const now = new Date();
        const timeDifference = endDate - now;

        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          document.querySelector('[data-js="countdown-day"]').textContent = formatNumber(days);
          document.querySelector('[data-js="countdown-hour"]').textContent = formatNumber(hours);
          document.querySelector('[data-js="countdown-minute"]').textContent = formatNumber(minutes);
          document.querySelector('[data-js="countdown-second"]').textContent = formatNumber(seconds);

          // Actualizar cada segundo
          setTimeout(updateCountdown, 1000);
        } else {
          // Ocultar el contador y mostrar el texto de finalización
          document.querySelector('[data-js="countdown"]').style.display = 'none';
          document.querySelector('[data-js="countdown-endtext"]').textContent = textFin;
        }
      }

      function formatNumber(number) {
        return number < 10 ? '0' + number : number;
      }

      // Iniciar el contador
      updateCountdown();
    </script>

    <script>
    
      $("#formularioCanciones").submit(function(event) {

        event.preventDefault();

          var formData = {
          nombre: $("input[name=nombre]").val(),
          autor: $("input[name=autor]").val(),
          link: $("input[name=link]").val(),
          id : $("input[name=idInvitacion1]").val()
          };

          $.ajax({
          type: "POST",
          url: "/panel/songs",
          data: formData,
          headers: {
              'X-CSRF-TOKEN': token
            },
          dataType: "json",
          encode: true
          }).done(function(data) {

            $("input[name=nombre]").val('');
            $("input[name=autor]").val('');
            $("input[name=link]").val('');
            $("input[name=idInvitacion1]").val('');
          
          });

      });

      $("#formularioTransporte").submit(function(event) {

        event.preventDefault();

          var formData = {
          nombre: $("input[name=nombreTransporte]").val(),
          cantidad: $("input[name=cantidad]").val(),
          id : $("input[name=idInvitacion2]").val()
          };

          $.ajax({
          type: "POST",
          url: "/panel/transport",
          data: formData,
          headers: {
              'X-CSRF-TOKEN': token
            },
          dataType: "json",
          encode: true
          }).done(function(data) {

            $("input[name=nombreTransporte]").val('');
            $("input[name=cantidad]").val('');
            $("input[name=idInvitacion2]").val('');
          
          });

      });

      $("#formularioConfirmacion").submit(function(event) {

        event.preventDefault();

        var opcionesRadio = document.getElementsByName('inlineRadioOptions');

        var valorSeleccionado = '';

        for (var i = 0; i < opcionesRadio.length; i++) {
                if (opcionesRadio[i].checked) {
                    // Obtener el valor del radio button seleccionado
                    valorSeleccionado = opcionesRadio[i].value;
                    console.log("Valor seleccionado: " + valorSeleccionado);
                    break; // Terminar el bucle una vez que se encuentra el seleccionado
                }
            }
        
            var formData = {
            asiste: valorSeleccionado,
            nombre: $("input[name=nombreConfirmacion]").val(),
            dato: $("input[name=dato]").val(),
            id : $("input[name=idInvitacion3]").val()
          };

          $.ajax({
          type: "POST",
          url: "/panel/confirmation",
          data: formData,
          headers: {
              'X-CSRF-TOKEN': token
            },
          dataType: "json",
          encode: true
          }).done(function(data) {

            $("input[name=nombreConfirmacion]").val('');
            $("input[name=dato]").val('');
            $("input[name=idInvitacion3]").val('');
          
          });

        

      });


  
    </script>

</body>
</html>


