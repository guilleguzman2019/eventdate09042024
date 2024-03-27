<?php
    $componentesJson = $componentes->map(function ($componente) {
        return [
            'id' => $componente->id,
            'nombre' => $componente->nombre,
            'label' => $componente->label,
            'html'   => $componente ->html,
            'style'   => $componente ->style,
            'script'   => $componente ->script,
            'tipo' => $componente->template->name,
            'ComponentHijo' => $componente->hijo,
        ];
    })->toJson();

    $invitacionId = $invitacion -> id ;

    $tipoTemplate = $invitacion ->template -> name;

    $categoria = $invitacion ->template -> category -> nombre ;

    $data = $invitacion -> data ;

    $assets = $invitacion -> assets ;

    $status = $invitacion -> status ;

    $appUrl = env('APP_URL');

    //codigo checkout mercadopago 

    require base_path('/vendor/autoload.php');


    MercadoPago\SDK::setAccessToken('TEST-1336491087316350-092918-c3d18a316ac112ea9873f63aec3035b1-669368816');
    

    $producto = [
        'precio' => 1200,
        'cantidad' => 1,
        'titulo' => 'Remera'
    ];

    $preference = new MercadoPago\Preference();

    $item = new MercadoPago\Item();
    $item->title = 'Invitacion Digital';
    $item->quantity = 1;
    $item->unit_price = 8000;

    $preference->items = array($item);

    $preference->back_urls = array(
      "success" => $appUrl.'/panel/sucess',
      "failure" => $appUrl."/panel/failed",
      "pending" => "http://www.tu-sitio/pending"
    );

    $preference->auto_return = "approved";

    $preference->external_reference = $invitacion -> id;

    $preference->save();


?>

<script>
    var component = {!! $componentesJson !!};

    console.log(component);

    var invitacionId = {!! $invitacionId !!};

    var tipoTemplate = '{!! $tipoTemplate !!}';

    var categoria = '{!! $categoria !!}';

    var token = '{{ csrf_token() }}';

    var jsondata = {!! $data !!};

    var jsonassets = {!! $assets !!};

    console.log(jsonassets);
    console.log(tipoTemplate);
    console.log(categoria);

    var modoBuilder = true ;

    var urlApp = '{!! $appUrl !!}';

</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- font google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@1,500&display=swap" rel="stylesheet">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
    <script src="https://unpkg.com/grapesjs"></script>
    <script src="https://unpkg.com/grapesjs-component-countdown"></script>
    <script src="https://unpkg.com/grapesjs-blocks-basic"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>

    <!-- Owl Carousel CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">

    <script src="//cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>

    <link rel="stylesheet" href="/css/builder.css">

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

</head>
<body>

    <div id="navbar" class="sidenav d-flex flex-column overflow scroll">

        <div class="stickNav">

          <nav class="navbar navbar-light">
            <div class="container-fluid text-center" style="padding: 15px;">
              <div class="d-flex align-items-center" style="display:flex">
                  <div class="p-2">
                      <a href="{{ route('panel.invitaciones')}}">
                          <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                      </a>
                  </div>
                  <a href="/">
                    <img class="logoPanel" src="https://eventdate.es/wp-content/uploads/2022/10/LOGO-EVENTDATE-BLANCO.png">
                  </a>
              </div>
            </div>
          </nav>


          <ul class="nav nav-tabs mt-5" id="myTabs">
            <li class="nav-item">
                <a class="nav-link active" id="tabComponentes" data-bs-toggle="tab" href="#componentes">Componentes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="tabAjustes" data-bs-toggle="tab" href="#ajustes">Ajustes</a>
            </li>
          </ul>
          
        </div>

      
        <div class="tab-content">
            <div class="tab-pane fade show active" id="componentes">
              <div class="blocks-wrp">
                      @verbatim
                      <div class="blocks text-center">

                        <div class="search-box">
                            <input type="text" v-model="searchTerm" class="search-input" placeholder="Buscar componente..">
                        </div>

                        <div class ="listaBlocks">
                          <div v-for="block in filteredBlocks" class="block" :key="block.getId()" @dragstart="onDragStart(block)" @dragend="onDragStop()" draggable>
                            <div class="block-media" v-html="block.getMedia()"></div>
                            <div class="block-label" v-html="block.getLabel()"></div>
                          </div>
                        </div>
                      </div>
                      @endverbatim
              </div>
            </div>

            <div class="tab-pane fade p-2" id="ajustes">

              <div class="my-3 infoComponent text-center">
                <span class="tituloInformacion">No hay ningun componente seleccionado</span>
                <div class="trait">

                </div>
              </div>

              <div class="my-3 infoComponent" style="display:none;">
                <span class="tituloInformacion">Informacion de la Invitacion:</span>
                <div class="d-flex mt-3">
                  <h1 class="infotituloInvitacion text-ligth" for="">Nombre:  </h1>
                  <h1 class="infotituloInvitacion text-ligth">prueba3</h1>
                </div>
                <div class="d-flex mt-3">
                  <h1 class="infotituloInvitacion text-ligth" for="">Estado:  </h1>
                  <h1 class="infotituloInvitacion text-ligth">Pendiente</h1>
                </div>
                <div class="d-flex mt-3">
                  <h1 class="infotituloInvitacion text-ligth" for="">Template:  </h1>
                  <h1 class="infotituloInvitacion text-ligth">Western</h1>
                </div>
                <br>
                <br>
                <button type="button" class="btn btn-primary" id="btnPago">
                  Compartir 🎉
                </button>
              </div>
              
            </div>
            
        </div>

    </div>

    <div class="main-content">
        <nav class=" p-2" style="background-color: #242e42; position: sticky;top: 0; z-index: 99999;">
          <div class="container-fluid">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <a href=""><i class="fa-solid fa-circle-info fa-lg" style="color: #ffffff;"></i></a>
            </div>
            <div class=" d-flex">
              <div class="panel__devices"></div>
              <button  type="button" class="botonPagar px-4" onclick="prueba2()">
                Guardar
              </button>
              <br>
              <!--<button  type="button" class="botonPagar px-4" onclick="prueba3()">
                Limpiar
              </button>-->
              @if($status == 'pendiente')
                <a href="<?php echo $preference->init_point; ?>" class="botonPagar px-4 pt-2">Pagar</a>
              @else
                  <button  type="button" class="botonPagar px-4" onclick="miFuncion()">Compartir</button>
              @endif
            </div>
          </div>
          <!--<button onclick="toggleMainContent()" type="button" class="btn btn-primary" id="">
              Componentes
            </button>-->
            <button id="abrirModalRegalos" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3" style="display:none;">
              Abrir Modal
            </button>
            <button id="abrirModalEvent" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal4" style="display:none;">
              Abrir Modal
            </button>
            <button id="abrirModalGaleria" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal5" style="display:none;">
              Abrir Modal
            </button>
            <button id="abrirModalTestigos" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal6" style="display:none;">
              Abrir Modal
            </button>
            <button id="abrirModalCambiarCara" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal7" style="display:none;">
              Abrir Modal
            </button>
            <button id="ejecutarCodigoPortada" type="button" class="btn btn-primary" style="display:none;">
              Abrir Modal
            </button>
            <!--<button id="ejecutarCodigoPortada" type="button" class="btn btn-success" >
              <i class="fa-solid fa-tree"></i> Invitacion
            </button>
            
            <div class="panel__basic-actions"></div>-->
          </div>
        </nav>

        <div>
          <div id="editor" class="">

          </div>
        </div>
    </div>

    @verbatim
    <!-- Modal instrucciones del component portada -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-bs-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img src="" alt="" width=100%>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de pago mercadopago -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body text-center">
            <h5 class="modal-title" id="modaltituloCompartir">Compartir Invitacion</h5>
            <br>
            <div  id="codigoQR"></div>
            <br>
            <a class="urlInvitacion btn btn-success px-3" target="_blank" href="">Ver Invitacion</a>
          </div>
        </div>
      </div>
    </div>

  
    <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body text-center modalBobyRegalos">
            <div id="app">
              <div class="row">
                  <div class="col-md-4 p-0">
                    <div class="formularioRegalo">

                    <div class="switcher">
                      <input  id="mercadolibre" name="balance" type="radio" value="mercadolibre" class="switcher__input switcher__input--mercadolibre"/>
                      <label for="mercadolibre" class="switcher__label1 mercadolibre">
                        <img src="https://i.postimg.cc/pdWwFSfG/mercado-libre-removebg-preview.png" alt="" style="width: 46px;">
                      </label>
                      <input checked="checked" id="manual" name="balance" type="radio" value="manual" class="switcher__input switcher__input--manual"/>
                      <label for="manual" class="switcher__label2 manual">
                        Manual
                      </label>
                      <span class="switcher__toggle"></span>
                    </div>

                    <div class="formulariofinal">
                      <div @click="selectImage" style="width: 100%; height: 130px; margin-bottom: 7px; background-color: #ccc; cursor: pointer; position: relative; margin-top: 38px;">
                        <i class="fa fa-camera" style="font-size: 28px; color: #333; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
                        <input ref="fileInput" type="file" accept="image/*" name="img" style="display: none;" @change="previewImage">
                        <img v-if="imagePreview" :src="imagePreview" style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0; pointer-events: none;">
                      </div>
                      <input type="text" v-model="titulo" class="inputAddRegalo form-control mb-1" placeholder="Título">
                      <input type="text" v-model="precio" class="inputAddRegalo form-control mb-1" placeholder="precio">
                      <input type="text" v-model="linkRegalo" class="inputAddRegalo form-control" placeholder="Link de regalo">
                      <button v-if="editando" @click="guardarCambiosEditados" class="btnAgregarEvento btn btn-primary btn-sm botonEditar">Guardar cambios</button>
                      <button v-else @click="agregarRegalo" class="btnAgregarEvento btn btn-primary btn-sm botonEditar">Agregar Regalo</button>
                    </div>

                    <div class="formularioMercadolibre mt-4">
                      <input type="text" v-model="urlMeli" class="inputaddMeli form-control mb-1" placeholder="url de Mercadolibre">
                      <button @click="buscarMercadolibre" class="btnBuscarMercadolibre btn btn-primary btn-sm">Buscar</button>
                      <div class="card resultadoMercadolibre mt-4" v-if="productoMercadolibre">
                        <h2 class="cardTituloRegalo">{{ productoMercadolibre.cardTituloRegalo }}</h2>
                        <img :src="productoMercadolibre.cardImgRegalo" alt="Imagen del producto" class="cardImgRegalo">
                        <p class="cardPrecioRegalo">{{ productoMercadolibre.cardPrecioRegalo }}</p>
                        <button @click="agregarProducto" class="btn btn-sm btn-primary">Agregar</button>
                      </div>
                    </div>

                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="divCarousel">
                      <div class="text-center mb-3">
                        <button type="button" @click="scrollCarousel(-100)">←</button>
                        <button type="button" @click="scrollCarousel(100)">→</button>
                      </div>
                      <div class="slider-container">
                        <div class="horizontal-carousel">
                          <div v-if="regalos.length === 0" class="mt-5 text-center">
                            <p class="text-light">No hay regalos disponibles.</p>
                          </div>
                          <div v-else class="carousel-item-regalo" v-for="(regalo, index) in regalos" :key="regalo.id">
                            <div class="card card-regalo p-4">
                              <img :src="regalo.cardImgRegalo" :alt="regalo.titulo" class="cardImgRegalo" style="width: 100%"/>
                              <div class="card-body">
                                <h5 class="cardTituloRegalo">{{ regalo.cardTituloRegalo }}</h5>
                                <h5 class="cardPrecioRegalo mt-3">{{ regalo.cardPrecioRegalo }}</h5>
                                <br/>
                                <a :href="regalo.botonRegalo.src" class="botonRegalo">REGALAR</a>
                              </div>
                            </div>

                            <div class="mt-1">
                              <button @click="eliminarRegalo(index)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                              <button @click="editarRegalo(index)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body text-center ">
            <div class="eventosFinal">
              <div class="row">
                  <div class="col-md-4">

                    <div class="formulariofinalEventos">
                      <div @click="selectImage" style="width: 100%; height: 130px; margin-bottom: 7px; background-color: #ccc; cursor: pointer; position: relative; margin-top: 38px;">
                        <i class="fa fa-camera" style="font-size: 28px; color: #333; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
                        <input ref="fileInput2" type="file" accept="image/*" name="img" style="display: none;" @change="previewImage">
                        <img v-if="imagePreview" :src="imagePreview" style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0; pointer-events: none;">
                      </div>
                      <input type="text" v-model="titulo" class="inputAddRegalo form-control mb-1" placeholder="Título">
                      <input type="date" v-model="fecha" class="inputAddRegalo form-control mb-1" placeholder="fecha">
                      <input type="text" v-model="nombre" class="inputAddRegalo form-control mb-1" placeholder="nombre">
                      <input type="text" v-model="direccion" class="inputAddRegalo form-control mb-1" placeholder="direccion">
                      <input type="text" v-model="linkMaps" class="inputAddRegalo form-control" placeholder="Link de google Maps">

                      <button v-if="editandoEvento" @click="guardarCambiosEditados" class="btnAgregarEvento btn btn-primary btn-sm botonEditar">Guardar cambios</button>
                      <button v-else @click="agregarEvento" class="btnAgregarEvento btn btn-primary btn-sm botonEditar">Agregar Evento</button>
                    </div>

                  </div>
                  <div class="col-md-8">
                    <div class="divCarouselEventos">
                      <div class="text-center mb-3">
                        <button type="button" @click="scrollCarouselEventos(-100)">←</button>
                        <button type="button" @click="scrollCarouselEventos(100)">→</button>
                      </div>

                      <div class="slider-container">
                        <div v-if="eventos.length === 0">
                          <p class="text-light mt-4">No hay eventos disponibles.</p>
                        </div>
                        <div v-else class="horizontal-carousel">
                            <div class="carousel-item-Evento" v-for="(evento, index) in eventos" :key="evento.id">
                              <div class="card p-2">
                                <img :src="evento.cardImagenEvento" class="cardImagenEvento"/>
                                <div class="card-body">
                                  <h5 class="cardTitulo">{{ evento.cardTitulo }}</h5>
                                  <div class="divhorario">
                                    <span>{{ evento.fecha }}</span>
                                  </div>
                                  <h5 class="cardLugar">{{ evento.cardLugar }}</h5>
                                  <span class="cardDireccion">{{ evento.cardDireccion }}</span>
                                  <br/><br/>
                                  <a :href="evento.botonEventos.src" class="botonEventos">VER UBICACION</a>
                                </div>
                              </div>
                              <div class="mt-1">
                                <button @click="eliminarEvento(index)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                <button @click="editarEvento(index)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                              </div>
                            </div>
                        </div>
                      
                      </div>

                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModal5" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body text-center ">
            <div class="galeriaFinal">
              <div class="row">
                  <div class="col-md-4">

                    <div class="formulariofinalEventos">
                      <div @click="selectImage" style="width: 100%; height: 130px; margin-bottom: 7px; background-color: #ccc; cursor: pointer; position: relative; margin-top: 38px;">
                        <i class="fa fa-camera" style="font-size: 28px; color: #333; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
                        <input ref="fileInput3" type="file" accept="image/*" name="img" style="display: none;" @change="previewImage">
                        <img v-if="imagePreview" :src="imagePreview" style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0; pointer-events: none;">
                      </div>

                      <button v-if="editandofoto" @click="guardarCambiosEditados" class="btnAgregarEvento btn btn-primary btn-sm botonEditar">Guardar cambios</button>
                      <button v-else @click="agregarFoto" class="btnAgregarEvento btn btn-primary btn-sm botonEditar">Agregar foto</button>
                    </div>

                  </div>
                  <div class="col-md-8">
                    <div class="divCarouselEventos">
                      <div class="text-center mb-3">
                        <button type="button" @click="scrollCarouselEventos(-100)">←</button>
                        <button type="button" @click="scrollCarouselEventos(100)">→</button>
                      </div>

                      <div class="slider-container">
                        <div v-if="fotos.length === 0">
                          <p class="text-light mt-4">No hay Fotos disponibles.</p>
                        </div>
                        <div v-else class="horizontal-carousel">
                            <div class="carousel-item-galeria" v-for="(foto, index) in fotos" :key="foto.id">
                              <div class="card p-1">
                                <img :src="foto.imgGaleria" class="imgGaleria"/>
                              </div>
                              <div class="mt-1">
                                <button @click="eliminarFoto(index)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                <button @click="editarFoto(index)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                              </div>
                            </div>
                        </div>
                      
                      </div>

                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModal6" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body text-center ">
            <div class="padrinosfinal">
              <div class="row">
                  <div class="col-md-4">

                    <div class="formulariofinalEventos">
                      <div @click="selectImage" style="width: 100%; height: 130px; margin-bottom: 7px; background-color: #ccc; cursor: pointer; position: relative; margin-top: 38px;">
                        <i class="fa fa-camera" style="font-size: 28px; color: #333; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
                        <input ref="fileInputPadrinos" type="file" accept="image/*" name="img" style="display: none;" @change="previewImage">
                        <img v-if="imagePreview" :src="imagePreview" style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0; pointer-events: none;">
                      </div>
                      <input type="text" v-model="nombre" class="inputAddRegalo form-control mb-1" placeholder="Nombre">
                      <input type="text" v-model="parentesco" class="inputAddRegalo form-control mb-1" placeholder="Parentesco">

                      <button v-if="editandoPadrino" @click="guardarCambiosEditados" class="btnAgregarEvento btn btn-primary btn-sm botonEditar">Guardar cambios</button>
                      <button  v-else @click="agregarPadrino" class="btnAgregarEvento btn btn-primary btn-sm botonEditar">Agregar Padrino</button>
                    </div>

                  </div>
                  <div class="col-md-8">
                  <div class="divCarouselEventos">
                      <div class="text-center mb-3">
                        <button type="button" @click="scrollCarouselEventos(-100)">←</button>
                        <button type="button" @click="scrollCarouselEventos(100)">→</button>
                      </div>

                      <div class="slider-container">
                        <div v-if="padrinos.length == 0">
                          <p class="text-light mt-4">No hay Padrinos disponibles.</p>
                        </div>
                        <div v-else class="horizontal-carousel">
                            <div class="carousel-item-Evento" v-for="(padrino, index) in padrinos" :key="padrino.id">
                              <div class="card p-2">
                                <img :src="padrino.cardImg" class="cardImg"/>
                                <div class="card-body">
                                  <h5 class="cardTitulo">{{ padrino.cardNombre }}</h5>
                                  <h5 class="cardLugar">{{ padrino.cardRelacion }}</h5>
                                </div>
                              </div>
                              <div class="mt-1">
                                <button @click="eliminarPadrino(index)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                <button @click="editarPadrino(index)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                              </div>
                            </div>
                        </div>
                      
                      </div>

                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModal7" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:999999">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body text-center ">
          <div class="swapface">
            <h1 class="tituloCambiarCara">Cambiar Cara</h1>
            <div class="d-flex" style="width: 100%;">
              <div  @click="selectImage1" style="width: 100%; height: 130px; margin-bottom: 7px; background-color: #ccc; cursor: pointer; position: relative; margin-top: 38px; margin-right:3px">
                  <i class="fa fa-camera" style="font-size: 28px; color: #333; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
                  <input ref="fileInput4" type="file" accept="image/*" name="img" style="display: none;" @change="previewImage1">
                  <img v-if="imagePreview1" :src="imagePreview1" style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0; pointer-events: none;">
              </div>
              <div  @click="selectImage2" style="width: 100%; height: 130px; margin-bottom: 7px; background-color: #ccc; cursor: pointer; position: relative; margin-top: 38px; margin-right:3px">
                  <i class="fa fa-camera" style="font-size: 28px; color: #333; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
                  <input ref="fileInput5" type="file" accept="image/*" name="img" style="display: none;" @change="previewImage2">
                  <img v-if="imagePreview2" :src="imagePreview2" style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0; pointer-events: none;">
              </div>
            </div>
            <div>
              <button @click="EnviarCaras()" class="btn btn-success text-center mt-3">Enviar</button>
            </div>
            <div class="mt-2" id="loadingIndicator" style="display: none;">
              <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..."  width="10%"/>
              <span class="textoEspere">Espere unos minutos ...</span>
            </div>
            <img class="mt-2 " id="resultadoImg" src="" alt="" width="250px" height="200px">
          </div>
          </div>
        </div>
      </div>
    </div>
    @endverbatim
    <div class="action-button z-depth-1">
      Lista
      <ul class="action-list">
          <li class="action-list-item">
              <span>Portada</span>
          </li>
          <li class="action-list-item">
              <span>Historia</span>
          </li>
      </ul>
    </div>

    <div id="spinner-div">
      <div class="spinner-border text-primary" role="status">
      </div>
    </div>



    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
    
    <script>

      
      function miFuncion() {

        var elementoQR = document.getElementById('codigoQR');
        elementoQR.innerHTML = '';

        var slugInvitacion = '{!!$invitacion -> slug!!}';

        // URL que quieres convertir en un código QR
        var url = `${urlApp}/invitacion/${slugInvitacion}`;

        console.log(url);

        // Instanciar un nuevo objeto QRCode con la URL como texto
        var qr = new QRCode(elementoQR, {
          text: url,
          width: 300,
          height: 300,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
        });


        $(".urlInvitacion").attr("href", url)


        $('#exampleModal2').modal('show');
      }


    </script>
    <!--<script src="script/json.js"></script>-->
    <script src="/script/builder.js"></script>
    <script src="/script/vuejsBuilderRegalo.js"></script>
    <script src="/script/vuejsBuilderEvento.js"></script>
    <script src="/script/vuejsBuilderGaleria.js"></script>
    <script src="/script/vuejsBuilderPadrino.js"></script>
    <script src="/script/vuejsSwapFace.js"></script>
    <script src="/script/vuejsBuilderBlockManager.js"></script>

    <script>

      function prueba2(){

        editor.runCommand('get-proyect');
      }

      function prueba3(){
        editor.runCommand('clean-canva');
      }
    </script>
    
    <script>

      $(document).ready(function() {

        $('.mercadolibre').click(function() {
                $("#mercadolibre").prop("checked", true);
                $("#manual").prop("checked", false);

                $('.formulariofinal').hide();
                $('.formularioMercadolibre').show();
              });

              $('.manual').click(function() {
                $("#mercadolibre").prop("checked", false);
                $("#manual").prop("checked", true);

                $('.formulariofinal').show();
                $('.formularioMercadolibre').hide();
              });
              

      });

    </script>
    <script>
        var iframe = document.querySelector('.gjs-frame');

        // Verificar si el iframe se cargó correctamente
        if (iframe) {
          // Obtener el documento dentro del iframe
          var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

          // Verificar si el documento dentro del iframe se obtuvo correctamente
          if (iframeDocument) {
            // Obtener el body del documento
            var iframeBody = iframeDocument.querySelector('body');

            // Cambiar el fondo del body
            if (iframeBody) {
              iframeBody.style.backgroundColor = 'white'; // Cambia el color de fondo según tu preferencia
              iframeBody.style.overflowY = 'auto';
            } else {
              console.error('No se pudo encontrar el body dentro del iframe.');
            }
          } else {
            console.error('No se pudo acceder al documento dentro del iframe.');
          }
        } else {
          console.error('No se pudo encontrar el iframe.');
        }

        document.addEventListener("DOMContentLoaded", function() {
          var divPlaceholder = document.querySelector('.gjs-placeholder');

          // Verifica si el elemento fue encontrado
          if (divPlaceholder) {
            // Crea un nuevo div contenedor
            var contenedor = document.createElement('div');
            
            // Agrega una clase al div contenedor
            contenedor.classList.add('contenedorSelector');

            // Crea un nuevo elemento span
            var nuevoSpan = document.createElement('span');

            // Agrega una clase al span
            nuevoSpan.classList.add('spanSelector');

            // Agrega algún contenido al span si es necesario
            nuevoSpan.textContent = 'Arrastra aqui el componente';

            // Agrega el span dentro del div contenedor
            contenedor.appendChild(nuevoSpan);

            // Inserta el div contenedor antes del primer hijo del div con la clase .gjs-placeholder.horizontal
            divPlaceholder.insertBefore(contenedor, divPlaceholder.firstChild);
          }else {
              console.error("El elemento .gjs-placeholder.horizontal no fue encontrado en el documento.");
          }
        });
      
    </script>
    <script>
      const transitionTime = 0.3;

      $(document).on('click', (e) => {
          const button = document.querySelector('.action-button.is-open');
          if (button) closeActions(button);
      });

      $('.action-button').on('click', (e) => {
          e.stopPropagation();
          const target = e.currentTarget;
          if ($(target).hasClass('is-open')) return;
          
          openActions(target);
      });


      function closeActions(button) {    
          const list = button.querySelector('.action-list');
          const dimensions = {
              width: list.clientWidth,
              height: list.clientHeight
          }
          
          button.classList.remove('is-open');
          
          requestAnimationFrame(morphList);
          
          function moveButton() {        
              const buttonPosition = 0;
              
              list.style.transition = 'margin-right ' + transitionTime/2 + 's ease';
              button.style.transition = 'margin-right ' + transitionTime/2 + 's ease';
              
              list.style.marginRight = '';
              button.style.marginRight = '';
          }
              
          function morphList() {
              const buttonPosition = (dimensions.width/2) - 30;
              
              button.style.transition = 'all ' + transitionTime + 's ease';
              list.style.transition = 'all ' + transitionTime + 's ease';
              
              button.style.marginRight = buttonPosition + 'px';
              list.style.marginRight = -buttonPosition + 'px';
              
              button.style.width = '';
              button.style.height = '';
              button.style.borderRadius = '';
              button.style.backgroundColor = '';
              
              list.style.opacity = '';
              
              $(list).one('transitionend', moveButton);
          }
      }

      function openActions(button) {    
          const list = button.querySelector('.action-list');
          const dimensions = {
              width: list.clientWidth,
              height: list.clientHeight
          }
          
          button.classList.add('is-open');
          
          requestAnimationFrame(moveButton);
          
          function moveButton() {
              const buttonPosition = (dimensions.width/2) - 30;
              
              list.style.transition = 'margin-right ' + transitionTime/2 + 's ease';
              button.style.transition = 'margin-right ' + transitionTime/2 + 's ease';
              
              list.style.marginRight = -buttonPosition + 'px';
              button.style.marginRight = buttonPosition + 'px';
              
              $(button).one('transitionend', morphButton);
          }
              
          function morphButton() {        
              button.style.transition = 'all ' + transitionTime + 's ease';
              list.style.transition = 'all ' + transitionTime + 's ease';
              
              button.style.marginRight = '0px';
              list.style.marginRight = '0px';
              
              button.style.width = dimensions.width + 'px';
              button.style.height = dimensions.height + 'px';        
              button.style.borderRadius = '0';
              button.style.backgroundColor = 'rgba(255, 152, 0, 0)';
              
              list.style.opacity = '1';
          }
      }
    </script>
</body>
</html>