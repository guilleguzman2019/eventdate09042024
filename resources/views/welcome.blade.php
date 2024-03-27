@php
    $baseUrl = env('APP_URL');
@endphp

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Tu Página</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700&display=swap">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/home.css">
</head>
<body>
    <!-- header-->

    <header class="navbar sticky">
        <a href="#" class="logo">
            <img src="{{ $baseUrl }}/storage/landingPage/LOGO-EVENTDATE-BLANCO.png" width="200px">
        </a>
        <div class="menu-btn">
          <div class="menu-btn__lines"></div>
        </div>
        <ul class="menu-items">

            @auth
                @if(auth()->user()->type == '0')
                    <p class="nombreUser pt-3 mx-2">Bienvenido, {{ auth()->user()->name }}</p>
                    <a href="{{ url('/panel') }}" class="btn btn-dark mx-2">Dashboard</a>
                @else
                    <p class="nombreUser pt-3 mx-2">Bienvenido, {{ auth()->user()->name }}</p>
                    <a href="{{ url('/admin') }}" class="btn btn-dark">Dashboard</a>
                @endif
                    
                @else
                    <div class="m-1">
                        <a href="{{ route('login') }}" class="btn btn-dark">Log in</a>
                    </div>

                @if (Route::has('register'))
                    <div class="m-1">
                        <a href="{{ route('register') }}" class="btn btn-dark">Register</a>
                    </div>
                @endif
            @endauth
        </ul>
    </header>
    
    <main class="main">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-7 d-flex flex-column justify-content-center">
                    <h1 class="tituloHome">Vive la Experiencia de Crear tu Invitación Digital de Bodas</h1>
                    <br>
                    <div class="d-inline text-center">
                        <button class="btn btn-green">
                            <a href="#modelos" onclick="scrollToSection('#modelos')">Ver Modelos</a>
                        </button>
                        <button class="btn btn-green">
                            <a href="#modelos" onclick="scrollToSection('#modelos')">Prueba Gratis</a>
                        </button>
                    </div>
                </div>
                <div class="col-12 col-md-5 d-none d-md-block text-center">
                    <img src="{{ $baseUrl }}/storage/landingPage/PC-EVENTDATA.png" alt="" width="100%">
                </div>
            </div>
        </div>
    </main>

    <div class="overlay"></div>

    
    
    <!--separador-->
    <div style="background-color: #7fc6ba; height: 30px;"></div>

    <!-- seccion modelos -->
    <section id="modelos" class=" d-flex align-items-center modelos text-center">
        <div class="container">
            <h1>Modelos</h1>
            <br>
            <p>Diseños Modernos y Adaptados a todas las Pantallas</p>
            <br>
            <div class="row mt-4">
                <div class="col-md-3 col-6 text-center">
                    <img src="{{ $baseUrl }}/storage/landingPage/Modelos/boho.png" alt="Modelo Western" class="img-modelo">
                    <h5 class="">Boho</h5>
                    <button class="btn btn-green">Ver modelos</button>
                </div>
                <div class="col-md-3 col-6 text-center">
                    <img src="{{ $baseUrl }}/storage/landingPage/Modelos/wester.png" alt="Modelo Western" class="img-modelo">
                    <h5 class="">Western</h5>
                    <button class="btn btn-green">Ver modelos</button>
                </div>
                <div class="col-md-3 col-6 text-center">
                    <img src="{{ $baseUrl }}/storage/landingPage/Modelos/romantic.png" alt="Modelo Western" class="img-modelo">
                    <h5 class="">Romantic</h5>
                    <button class="btn btn-green">Ver modelos</button>
                </div>
                <div class="col-md-3 col-6 text-center">
                    <img src="{{ $baseUrl }}/storage/landingPage/Modelos/chic.png" alt="Modelo Western" class="img-modelo">
                    <h5 class="">Chic</h5>
                    <button class="btn btn-green">Ver modelos</button>
                </div>
            </div>
        </div>
    </section>

    <!--division -->
    <div class="curve-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path class="elementor-shape-fill" d="M500,3C729,2.2,850,62,1000,80v-80L0,0v79.9C150,62,271,2.2,500,3z"></path>
        </svg>
    </div>

    <!--seccion que tiene la invitacion-->
    <section class="custom-section" style="background-color: #f1f1f1;">
        <div class="container text-center">
            <h2>¿Qué secciones tiene la invitación?</h2>
            <br>
            <p>Nos pusimos en tu lugar y creamos todas las secciones que necesitas contemplar para tu boda</p>
            <br>
            <div class="row mt-5">
                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/01.png" alt="Imagen 1" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Portada Impactante</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/02.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Nuestra Historia</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/03.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Galeria Fotos</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/04.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Cuenta Regresiva</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/05.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Ubicación en Google Maps</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/06.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Mural de fotos</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/07.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Codigo Vestimenta</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/08.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Código de Vestimenta</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/09.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Ceremonia Civil</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/010.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Mesa de Regalos</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/011.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Música que no puede faltar</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/012.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Ceremonia Religiosa</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/013.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Testigos y/o Padrinos</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/014.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Transporte Privado</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/015.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Confirmación de Asistencia</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/016.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Música en la Invitación</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/017.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Frase</h5>
                </div>

                <div class="col-md-2 col-6 pb-4">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/018.png" alt="Imagen 2" class="img-fluid">
                    <h5 class="tituloSessiones mt-3">Hospedaje y Transporte</h5>
                </div>

            </div>
        </div>
    </section>

    <!--seccion precio-->
    <section class="price-section text-center">
        <h2 class="text-light">Precio</h2>
        <br>
        <span class="text-light">¡Nuestros precios son económicos de verdad!</span>
        <div class="divprecio" style="">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <div>
                            <h2 class="tituloprecio">$ 2500</h2>
                        </div>
                        <br>
                        <br>
                    </div>
                    <div class="col-md-6">
                        <ul>
                            <li  class="lista">Invitación 100% administrable. ¡Edítala cuantas veces quieras!</li>
                            <li class="lista">Envío ilimitado a través de WhatsApp, Correo Electrónico y Redes Sociales.</li>
                            <li class="lista">Sustentable</li>
                            <li class="lista">18 Secciones totalmente editables</li>
                            <li class="lista">Gestión de ceremonia</li>
                            <li class="lista">Ahorro de tiempo y dinero</li>
                            <li class="lista">Crea tu invitación sin esperas</li>
                            <li class="lista">Invitaciones multiplataforma</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--seccion pasos-->
    <div class="seccion_pasos text-center">
        <h2 class="text-dark">¿Cómo la obtengo?</h2>
        <br>
        <span class="text-dark">Nuestro Sistema es Realmente Simple y Sin esperas. ¡Vos tomás el control de tu Invitación!</span>
        <br>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-4">
                    <div class="paso">
                        <img  class="img_pasos" src="https://eventdate.es/wp-content/uploads/2022/10/dibujo-01.png" alt="Paso 1">
                        <h3>Regístrate en nuestra Plataforma</h3>
                        <p>Y selecciona el modelo de Invitación que más te guste.</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="paso">
                        <img class="img_pasos" src="https://eventdate.es/wp-content/uploads/2022/10/dibujo-02.png" alt="Paso 2">
                        <h3>Comienza a crear tu Invitación</h3>
                        <p>Podrás editar todas las secciones de tu Invitación las veces que quieras.</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="paso">
                        <img class="img_pasos" src="https://eventdate.es/wp-content/uploads/2022/10/dibujo-03.png" alt="Paso 3">
                        <h3>¡Listo! Comparte tu Invitación</h3>
                        <p>Comprá tu Invitación solo si te gusta y compartela con todos tus invitados.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--separador-->
    <div style="background-color: #7fc6ba; height: 30px;"></div>

    <!--seccion preguntas -->
    <section class="question-section text-center" style="padding: 9% 14% 14% 20%;">
        <div class="container">
            <h2>Preguntas Frecuentes</h2>
            <br>
            <div class="mb-5">
                <span class="">¡Es momento de sacarte las dudas!</span>
            </div>

            <div id="accordion">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                ¿Es un Sistema Automatizado o debo enviar mi información para que creen mi invitación?
                            </button>
                        </h5>
                    </div>
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            Es un sistema completamente automático, podrás acceder a tu administrador donde podrás cargar y editar toda la información de tu invitación las veces que quieras, en tiempo real y ¡sin esperas!
                        </div>
                    </div>
                </div>

                <!-- Repite este bloque para cada pregunta y respuesta -->
                <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                ¿Con cuales métodos de pago puedo abonar?
                            </button>
                        </h5>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div class="card-body">
                            Podes crear tu Invitación de forma totalmente gratuita ¡Solo la pagas si te gusta!.
                            Podes pagarlo con tarjeta de crédito, debito o con tu saldo de Paypal.
                        </div>
                    </div>
                </div>

                <!-- Repite este bloque para cada pregunta y respuesta -->
                <!-- Pregunta 3 -->
                <!-- Respuesta 3 -->
                <!-- ... -->

            </div>
        </div>
    </section>

    <div class="footer">
      <h1 class="tituloFooter">Invitación creada</h1>
      <img src="https://eleve11.ar/wp-content/uploads/2023/04/LOGO-EVENTDATE-05.png" alt="" width="200">
    </div>

    <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script>
        function scrollToSection(id) {
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 800);
    }
    </script>
    <script>

        const overlay = document.querySelector(".overlay");
        const body = document.querySelector("body");
        const menuBtn = document.querySelector(".menu-btn");
        const menuItems = document.querySelector(".menu-items");
        const expandBtn = document.querySelectorAll(".expand-btn");

        function toggle() {
            // disable overflow body
            body.classList.toggle("overflow");
            // dark background
            overlay.classList.toggle("overlay--active");
            // add open class
            menuBtn.classList.toggle("open");
            menuItems.classList.toggle("open");
        }

        menuBtn.addEventListener("click", e => {
            e.stopPropagation();
            toggle();
        })

        window.onkeydown = function( event ) {
            const key = event.key; // const {key} = event; in ES6+
            const active = menuItems.classList.contains('open');
            if (key === "Escape" && active) {
                toggle();
            }
        };

        document.addEventListener('click', e => {
            let target = e.target,
                its_menu = target === menuItems || menuItems.contains(target),
                its_hamburger = target === menuBtn,
                menu_is_active = menuItems.classList.contains('open');
            if (!its_menu && !its_hamburger && menu_is_active) {
                toggle();
            }
        });

        // mobile menu expand
        expandBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
        btn.classList.toggle("open");
        });
        });

    </script>
</body>
</html>
