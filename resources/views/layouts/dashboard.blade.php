<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>

    <!--css owl-->

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.1/assets/owl.carousel.css">

    <!--fonts google-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Pixelify+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" rel="stylesheet">

    <!--css boostrap-->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"  crossorigin="anonymous">

    <!--iconos fontawesome-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css">

    <!--icons materialicons-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <!--icons fontawesome-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!--dependencias codemirror -->

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/codemirror.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/theme/material.css">

    <!--scripts-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="/css/admin.css">
    <link rel="stylesheet" href="/css/crear.css">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
      .CodeMirror {
              font-family: monospace;
              height: 500px;
              color: black;
              width: 100%;
          }
        .CodeMirror-code{

          color:white;
        }
    </style>
    <style>
      .horizontal-carousel {
          display: flex;
          overflow-x: hidden; /* Oculta la barra de desplazamiento horizontal */
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch; /* Propiedad específica para un desplazamiento suave en iOS */
          scroll-behavior: smooth; /* Hace que el scroll sea más suave */
        }

        .carousel-item1 {
          flex: 0 0 auto;
          scroll-snap-align: start;
          margin-right: 3px;
          width: 126px;
          height: 300px;
          position: relative;
        }

        .carousel-image {
          width: 200px; /* Ajusta el ancho de la imagen según sea necesario */
        }

        .checkmark{

          position: absolute;
          width: 20px;
          height: 20px;
          top: 242px;
          right: 51px;
          font-size: 20px;
          color: #ffffff00;
          pointer-events: auto;
          cursor: pointer;
          background-color: transparent;
          border: 3px solid black;
          padding: 5px;
          z-index: 9999999;

        }

        .checkmark.selected::before {
          content: '\2713'; /* Unicode character for checkmark */
          font-size: 25px;
          font-weight: 600;
          color: black;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }


        .tag-button{

          background-color: #435d7d !important;
          color: white;
          margin-right: 5px;
        }

        
    </style>
</head>
<body>
  <div class="wrapper">
    @yield('navbar')
    <div class="main">
      @yield('content')
    </div>
  </div>

      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>


      <!-- Dependencias de Vue.js -->
      <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

      <!--owl js-->

      <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.1/owl.carousel.min.js"></script>

      <!-- Bootstrap JS -->
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

      <!-- codemirror -->

      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/codemirror.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/mode/xml/xml.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/mode/css/css.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/mode/javascript/javascript.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/mode/htmlmixed/htmlmixed.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/keymap/sublime.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/addon/edit/closebrackets.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/addon/fold/xml-fold.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/addon/edit/closetag.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/addon/comment/comment.js"></script>
      <script>
        document.addEventListener("DOMContentLoaded", function() {
            const sidebarToggle = document.querySelector('.sidebar-toggle');

            const sidebar = document.querySelector('#sidebar');

            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('collapsed');
            });
        });
      </script>


      @yield('script')
      

</body>
</html>