//configuracion del init de grapesjs

const editor = grapesjs.init({
    container: "#editor",
    storageManager: false,
    showOffsets: 1,
    allowScripts: 1,
    noticeOnUnload: 0,
    storageManager: false,
    
    blockManager: {
      appendTo: "#blocks",
    },
    styleManager: {
      appendTo: "#style-container",
    },
    layerManager: {
      appendTo: "#layers-container",
    },
    traitManager: {
      appendTo: "#trait-container",
    },
    panels: {
      defaults: [
        {
          id: "basic-actions",
          el: ".panel__basic-actions",
          buttons: [
            {
              id: "visibility",
              active: true, // active by default
              className: "btn-toggle-borders",
              label: '<i class="bi bi-border"></i>',
              command: "sw-visibility", // Built-in command
            },
            {
              id: "save",
              active: true, // active by default
              className: "btn-toggle-borders",
              label: '<i class="fa fa-floppy-o"></i>',
              command: "get-proyect", // Built-in command
            },
            {
              id: "view code",
              active: true, // active by default
              className: "",
              label: '<i class="fa fa-file-code-o"></i>',
              command: "open-code", // Built-in command
            },
          ],
        },
        {
          id: "panel-devices",
          el: ".panel__devices",
          buttons: [
            {
              id: "device-desktop",
              label: '<i class="bi bi-laptop"></i>',
              command: "set-device-desktop",
              active: true,
              togglable: false,
            },
            {
              id: "device-mobile",
              label: '<i class="bi bi-phone"></i>',
              command: "set-device-mobile",
              togglable: false,
            },
          ],
        },
      ],
    },
    assetManager: {
      assets: [
        // Especifica la URL de la carpeta que contiene tus imágenes
        'http://localhost/invitacion-autenticacion/archivos/western.png',
        'http://localhost/invitacion-autenticacion/archivos/boho.png',
        'http://localhost/invitacion-autenticacion/archivos/romantic.png',
      ],
      uploadFile: function (e) {
        var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        var formData = new FormData();

        // Agregar archivos al objeto FormData
        for (var i in files) {
          formData.append('files[]', files[i]);
        }

        // Enviar la solicitud POST al controlador de Laravel
        fetch('../upload.php', {
          method: 'POST',
          body: formData,
          headers: {
          }
        })
        .then(response => response.json())
        .then(data => {
          // Agregar el archivo cargado a la lista de activos

          console.log('imagen');
          console.log(data);

          for (let key in data) {

              if (key == 'file') {

                editor.AssetManager.add([
                  {
                    src: 'http://localhost/invitacion-autenticacion/archivos/'+data[key].name,
                    name: data[key].name,
                    type: 'image'
                  }
                ]);


              }
          }

        })
        .catch(error => {
          console.error('Error al cargar el archivo:', error);
        });
      }
    },
    canvas: {
      styles: ['https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css',
                'https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@500&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Meow+Script&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Oooh+Baby&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap" rel="stylesheet',
                'https://fonts.googleapis.com/css2?family=Alata&display=swap',
                'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/assets/owl.carousel.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.1/assets/owl.carousel.css',
                'https://use.fontawesome.com/releases/v5.0.8/css/all.css',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
                ],
      scripts: ['https://code.jquery.com/jquery-3.4.1.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js',
                'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/owl.carousel.min.js'
               ]
    }
  });

  
  editor.Commands.add('set-device-desktop', {
    run: function(editor, sender) {
      
      editor.setDevice('Desktop');
      console.log('desktop');
    }
  });

  editor.Commands.add('set-device-mobile', {
    run: function(editor, sender) {
      
      editor.setDevice('Mobile portrait');
      console.log('mobile');
    }
  });

  editor.Commands.add('open-code', {
    run: function(editor, sender) {

      editor.runCommand('core:open-code')
    }
  });

  var jsondatafinal = {};

  editor.Commands.add('get-proyect', {
    run: async function(editor, sender) {

      const cmp = editor.Components.getComponents();
      var componentesfinal = cmp.toArray();

      htmlString = componentesfinal[0].toHTML();

      const domElement = componentesfinal[0].getEl();
      const style = window.getComputedStyle(domElement)
      console.log(style);

    const url = 'http://127.0.0.1:5000/jsonData'; 

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'html': htmlString })
    };

    // Envía la solicitud POST
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

    }
  });

var stringGrapes = 'data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false"';


var assets = {};

var lista = '';

var idInvitacion = '';


const dc = editor.DomComponents;

const bm = editor.BlockManager;

  if(component.nombre == 'portada'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var cssfinal = component.style.replace(/&amp;/g, '&');


    const cssActualizado = cssfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    // add block
    bm.add( component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Portada',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
      }
    });

    // add component type
    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado,
            attributes: { id: component.nombre+'-'+component.tipo },
            styles: cssActualizado,
            void: false,
            droppable:false,
          }
      },
      view: {
        init () {
          this.listenTo(this.model, 'active', this.onActive)
          this.listenTo(this.model, 'change:src', this.updateImage)
        },
        events: {
          dblclick: 'onActive'
        },
        onActive (ev) {
    
          if (ev) {
            editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
          }
          
        },
        updateImage (model, url) {
          if (url) {
            const style = model.getStyle()
    
            alert(url);

            assets[model.ccid] = url

            console.log(assets);

            //haga una api rest a un json para 
    
            model.setStyle({
              'background-image': style['background-color'] || `url("${url}")`,
              'background-size': 'cover',
              'background-position': 'center center',
              'background-repeat': 'no-repeat',
              'height': '100vh',
              'position':'relative',
              'display':'flex',
              'flex-direction':'column',
              'justify-content':'center',
              'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)'
    
            })
          }
        }
      }
    });

  }
  if(component.nombre == 'historia'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');


    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    // add block
    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Historia',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado,
            styles: component.style,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component.nombre+'-'+component.tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })
    

  }
  if(component.nombre == 'hashtag'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Hashtag',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
      }
    });

    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults:{
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado,
            styles: component.style,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component.nombre+'-'+component.tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

  }
  if(component.nombre == 'vestimenta'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Vestimenta',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
        
      }
    });

    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults:  {
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado,
            styles: component.style,
            void: false,
            droppable: false,
            attributes: { id: component.nombre+'-'+component.tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

  }
  if(component.nombre == 'eventos'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: "Eventos",
      content: {
            type: component.nombre+'-'+component.tipo
      }
    });

    dc.addType(component.nombre+'-'+component.tipo, {
      model: {
        defaults: {
          components: htmlActualizado ,
          styles: component.style,
          attributes: { id: component.nombre+'-'+component.tipo },
          void: false,
          droppable: false,
          hoverable: false,
          layerable: false,
          highlightable: false,
          traits: [
            
            {
              type: "number",
              name: "cantidadEvent",
              label: "N° de Eventos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            $('.eventos_western').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              autoplay: true,
              autoplayHoverPause: true,
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
            
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "eventos",
          };
        }
      },
    
      view: {
        init({ model }) {
          this.listenTo(model, "change:cantidadEvent", this.onActive);
          this.listenTo(model, "change:cantidadEvent", this.updateScript);
          this.listenTo(model, "change:cantidadEvent", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadEvent");
    
          html = `<div class="eventos" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                    <div class="container" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                      <div class="row text-xs-center" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                        <div class="col-md-12 text-center m-0 p-0" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                          <div class="carousel-wrap" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                            <div class="owl-carousel eventos_western" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="card p-4" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                        <img class="card-img-top" src="https://eleve11.ar/wp-content/uploads/jet-engine-forms/1/2022/09/registro-civi-3-1024x768.jpeg" alt="Card image cap">
                        <div class="card-body" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                          <h5 class="card-title">CEREMONIA</h5>
                          <div class="divhorario" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                            <span>30/12/2023 19:00hs</span>
                          </div>
                          <h5 class="card-lugar">REGISTRO CIVIL CENTRAL</h5>
                          <span class="card-text">Blvr. Chacabuco 737, Córdoba</span>
                          <br>
                          <br>
                          <a href="#" class="botonhashtag">VER UBICACION</a>
                        </div>
                      </div>`;
    
          };
    
          html += ` </div>
                    </div>
                </div>
              </div>
            </div>
            </div>`
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
  
    
          var css = `.eventos{
    
                      padding: 4% 1% 4% 1%;
                    
                  }
    
                  .owl-carousel{
                    display: flex !important;  // to override display:bloc i added !important
                    flex-direction: row;   
                    justify-content: center;  // to center you carousel
                }`;

          var style = model.getStyle();
    
          const content = model.setStyle(style);
    
    
        }
    
    
      },
    });


    var htmlfinal2 = component.ComponentHijo.html.replace(/&amp;/g, '&');

    const htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });


    if (jsondata['eventos-Western'] && jsondata['eventos-Western'].listado) {
        
      var cantidad = jsondata['eventos-Western'].listado ;

      html =`<div class="owl-carousel eventos_western" >`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        html += `<div class="card p-4">
        <img src="${valor['card-img-top']}" alt="Card image cap" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">${valor['card-title']}</h5>
          <div class="divhorario">
            <span>${valor['default']}</span>
          </div>
          <h5 class="card-lugar">${valor['card-lugar']}</h5>
          <span class="card-text">${valor['card-text']}</span>
          <br/>
          <br/>
          <a href="#" class="botonhashtag">${valor['botonhashtag']}</a>
        </div>
      </div>`;
    });
                                      
                                                                  
      html += '</div>';

    }

    dc.addType(component.ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2 ,
          styles: component.ComponentHijo.style,
          droppable: false,
          attributes: { id: component.ComponentHijo.nombre },
          traits: [
            
            {
              type: "number",
              name: "cantidadEvent",
              label: "N° de Eventos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            $('.eventos_western').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              autoplay: true,
              autoplayHoverPause: true,
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
            
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "eventos",
          };
        }
      },
    
      view: {
        init({ model }) {
          this.listenTo(model, "change:cantidadEvent", this.onActive);
          this.listenTo(model, "change:cantidadEvent", this.updateScript);
          this.listenTo(model, "change:cantidadEvent", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadEvent");
    
          html = `
                          <div class="carousel-wrap" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                            <div class="owl-carousel eventos_western" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="card p-4" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                        <img class="card-img-top" src="https://eleve11.ar/wp-content/uploads/jet-engine-forms/1/2022/09/registro-civi-3-1024x768.jpeg" alt="Card image cap">
                        <div class="card-body" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                          <h5 class="card-title">CEREMONIA</h5>
                          <div class="divhorario" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                            <span>30/12/2023 19:00hs</span>
                          </div>
                          <h5 class="card-lugar">REGISTRO CIVIL CENTRAL</h5>
                          <span class="card-text">Blvr. Chacabuco 737, Córdoba</span>
                          <br>
                          <br>
                          <a href="#" class="botonhashtag">VER UBICACION</a>
                        </div>
                      </div>`;
    
          };
    
          html += ` </div>
                    </div>`
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
  
    
          var css = `.eventos{
    
                      padding: 4% 1% 4% 1%;
                    
                  }
    
                  .owl-carousel{
                    display: flex !important;  // to override display:bloc i added !important
                    flex-direction: row;   
                    justify-content: center;  // to center you carousel
                }`;

          var style = model.getStyle();
    
          const content = model.setStyle(style);
    
    
        }
    
    
      },
    });

  }
  if(component.nombre == 'contador'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Contador',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado ,
            styles: component.style ,
            void: false,
            droppable: false
          }
        
      },
      view: {
        init () {
          this.listenTo(this.model, 'active', this.onActive)
          this.listenTo(this.model, 'change:src', this.updateImage)
        },
        events: {
          dblclick: 'onActive'
        },
        onActive (ev) {
    
          if (ev) {
            editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
          }
          
        },
        updateImage (model, url) {
          if (url) {
            const style = model.getStyle()
    
            console.log(url);
    
            model.setStyle({
              'background-image':`url("${url}")`,
              'padding': '60px 0px 40px 0px',
              'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)'
            })
          }
        }
      }
    })

    let c = {

      // Default style
      defaultStyle: true,
    
      // Default start time, eg. '2018-01-25 00:00'
      startTime: '',
    
      // Text to show when the countdown is ended
      endText: 'Expira',
    
      // Date input type, eg, 'date', 'datetime-local'
      dateInputType: 'date',
    
      // Countdown class prefix
      countdownClsPfx: 'countdown',
    
      // Countdown label
      labelCountdown: 'Countdown',
    
      // Countdown category label
      labelCountdownCategory: 'Extra',
    
      // Days label text used in component
      labelDays: 'Dias',
    
      // Hours label text used in component
      labelHours: 'Horas',
    
      // Minutes label text used in component
      labelMinutes: 'Minutos',
    
      // Seconds label text used in component
      labelSeconds: 'Segundos',
    };
    
    const domc = editor.DomComponents;
    const defaultType99 = domc.getType('default');
    const textType = domc.getType('text');
    const defaultModel = defaultType99.model;
    const defaultView99 = defaultType99.view;
    const textModel = textType.model;
    const textView = textType.view;
    const pfx = c.countdownClsPfx;
    const COUNTDOWN_TYPE = 'countdown';

    var cssWestern = `<style>
                      .${pfx} {
                        text-align: center;
                        
                      }

                      .${pfx}-block {
                        display: inline-block;
                        margin: 0 25px;
                        padding: 10px;
                      }

                      .${pfx}-digit {
                        font-size: 4rem;
                      }

                      .${pfx}-endtext {
                        font-size: 5rem;
                      }

                      .${pfx}-cont,
                      .${pfx}-block {
                        display: inline-block;
                        font-family: "Noto Serif Display", Sans-serif !important;
                        font-style: italic;
                        color:white !important;
                      }
                    </style>`;

    var cssBoho = `<style>
                    .${pfx} {
                      text-align: center;
                      
                    }

                    .${pfx}-block {
                      display: inline-block;
                      margin: 0 25px;
                      padding: 10px;
                    }

                    .${pfx}-digit {
                      font-size: 4rem;
                      font-weight: 700;
                    }

                    .${pfx}-endtext {
                      font-size: 5rem;
                    }

                    .${pfx}-label {

                      olor: #FFFFFF;
                      font-family: "Montserrat", Sans-serif;
                      font-size: 18px;
                      font-weight: 700;
                      text-transform: capitalize;
                    }

                    .${pfx}-cont,
                    .${pfx}-block {
                      display: inline-block;
                      font-family: "Meow Script", Sans-serif !important;
                      font-style: italic;
                      color:white !important;
                    }
                  </style>`;
    
    domc.addType('countdownWestern', {
    
      model: {
        defaults: {
          ...defaultModel.prototype.defaults,
          startfrom: c.startTime,
          endText: c.endText,
          droppable: false,
          styles: cssWestern,
          traits: [{
            label: 'Start',
            name: 'startfrom',
            changeProp: 1,
            type: c.dateInputType,
          },{
            label: 'End text',
            name: 'endText',
            changeProp: 1,
          }],
          script: function() {
            
            var startfrom = '{[ startfrom ]}';
            var endTxt = '{[ endText ]}';
            console.log(startfrom);
            console.log(endTxt);
            var countDownDate = new Date(startfrom).getTime();
            var countdownEl = this.querySelector('[data-js=countdown]');
            var endTextEl = this.querySelector('[data-js=countdown-endtext]');
            var dayEl = this.querySelector('[data-js=countdown-day]');
            var hourEl = this.querySelector('[data-js=countdown-hour]');
            var minuteEl = this.querySelector('[data-js=countdown-minute]');
            var secondEl = this.querySelector('[data-js=countdown-second]');
            var oldInterval = this.gjs_countdown_interval;
            if(oldInterval) {
              oldInterval && clearInterval(oldInterval);
            }
    
            var setTimer = function (days, hours, minutes, seconds) {
              dayEl.innerHTML = days < 10 ? '0' + days : days;
              hourEl.innerHTML = hours < 10 ? '0' + hours : hours;
              minuteEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
              secondEl.innerHTML = seconds < 10 ? '0' + seconds : seconds ;
            }
    
            var moveTimer = function() {
              var now = new Date().getTime();
              var distance = countDownDate - now;
              var days = Math.floor(distance / 86400000);
              var hours = Math.floor((distance % 86400000) / 3600000);
              var minutes = Math.floor((distance % 3600000) / 60000);
              var seconds = Math.floor((distance % 60000) / 1000);
    
              setTimer(days, hours, minutes, seconds);
    
              /* If the count down is finished, write some text */
              if (distance < 0) {
                clearInterval(interval);
                endTextEl.innerHTML = endTxt;
                countdownEl.style.display = 'none';
                endTextEl.style.display = '';
              }
            };
    
            if (countDownDate) {
              var interval = setInterval(moveTimer, 1000);
              this.gjs_countdown_interval = interval;
              endTextEl.style.display = 'none';
              countdownEl.style.display = '';
              moveTimer();
            } else {
              setTimer(0, 0, 0, 0);
            }
          }
        },
      }, 
        isComponent(el) {
          if(el.getAttribute &&
            el.getAttribute('data-gjs-type') == COUNTDOWN_TYPE) {
            return {
              type: COUNTDOWN_TYPE
            };
          }
        },
    
        view:{
        init() {
          this.listenTo(this.model, 'change:startfrom change:endText', this.updateScript);
          const comps = this.model.get('components');
    
          // Add a basic countdown template if it's not yet initialized
          if (!comps.length) {
            comps.reset();
            comps.add(`
              <span data-js="countdown" class="${pfx}-cont" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-day" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelDays}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-hour" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelHours}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-minute" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelMinutes}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-second" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelSeconds}</div>
                </div>
              </span>
              <span data-js="countdown-endtext" class="${pfx}-endtext"></span>
            `);
          }
    
        }
      },
    });

    domc.addType('countdownBoho', {
    
      model: {
        defaults: {
          ...defaultModel.prototype.defaults,
          startfrom: c.startTime,
          endText: c.endText,
          droppable: false,
          styles: cssBoho,
          traits: [{
            label: 'Start',
            name: 'startfrom',
            changeProp: 1,
            type: c.dateInputType,
          },{
            label: 'End text',
            name: 'endText',
            changeProp: 1,
          }],
          script: function() {
            
            var startfrom = '{[ startfrom ]}';
            var endTxt = '{[ endText ]}';
            console.log(startfrom);
            console.log(endTxt);
            var countDownDate = new Date(startfrom).getTime();
            var countdownEl = this.querySelector('[data-js=countdown]');
            var endTextEl = this.querySelector('[data-js=countdown-endtext]');
            var dayEl = this.querySelector('[data-js=countdown-day]');
            var hourEl = this.querySelector('[data-js=countdown-hour]');
            var minuteEl = this.querySelector('[data-js=countdown-minute]');
            var secondEl = this.querySelector('[data-js=countdown-second]');
            var oldInterval = this.gjs_countdown_interval;
            if(oldInterval) {
              oldInterval && clearInterval(oldInterval);
            }
    
            var setTimer = function (days, hours, minutes, seconds) {
              dayEl.innerHTML = days < 10 ? '0' + days : days;
              hourEl.innerHTML = hours < 10 ? '0' + hours : hours;
              minuteEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
              secondEl.innerHTML = seconds < 10 ? '0' + seconds : seconds ;
            }
    
            var moveTimer = function() {
              var now = new Date().getTime();
              var distance = countDownDate - now;
              var days = Math.floor(distance / 86400000);
              var hours = Math.floor((distance % 86400000) / 3600000);
              var minutes = Math.floor((distance % 3600000) / 60000);
              var seconds = Math.floor((distance % 60000) / 1000);
    
              setTimer(days, hours, minutes, seconds);
    
              /* If the count down is finished, write some text */
              if (distance < 0) {
                clearInterval(interval);
                endTextEl.innerHTML = endTxt;
                countdownEl.style.display = 'none';
                endTextEl.style.display = '';
              }
            };
    
            if (countDownDate) {
              var interval = setInterval(moveTimer, 1000);
              this.gjs_countdown_interval = interval;
              endTextEl.style.display = 'none';
              countdownEl.style.display = '';
              moveTimer();
            } else {
              setTimer(0, 0, 0, 0);
            }
          }
        },
      }, 
        isComponent(el) {
          if(el.getAttribute &&
            el.getAttribute('data-gjs-type') == COUNTDOWN_TYPE) {
            return {
              type: COUNTDOWN_TYPE
            };
          }
        },
    
        view:{
        init() {
          this.listenTo(this.model, 'change:startfrom change:endText', this.updateScript);
          const comps = this.model.get('components');
    
          // Add a basic countdown template if it's not yet initialized
          if (!comps.length) {
            comps.reset();
            comps.add(`
              <span data-js="countdown" class="${pfx}-cont" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-day" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelDays}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-hour" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelHours}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-minute" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelMinutes}</div>
                </div>
                <div class="${pfx}-block" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                  <div data-js="countdown-second" class="${pfx}-digit" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false"></div>
                  <div class="${pfx}-label" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">${c.labelSeconds}</div>
                </div>
              </span>
              <span data-js="countdown-endtext" class="${pfx}-endtext"></span>
            `);
          }
    
        }
      },
    });

  }
  if(component.nombre == 'galeria'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label ,
      category: "Galeria",
      content: {
            type: component.nombre+'-'+component.tipo
      }
    });

    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado ,
            styles: component.style ,
            attributes: { id: component.nombre+'-'+component.tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

    html = component.ComponentHijo.html ;

    var htmlfinal2 = component.ComponentHijo.html.replace(/&amp;/g, '&');

    const htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    if (jsondata['galeria-Western'] && jsondata['galeria-Western'].listado) {

      
      var cantidad = jsondata['galeria-Western'].listado ;

      html =`<div class="carousel-wrap">
      <div class="owl-carousel galeria owl-theme">`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        html += `<div class="item">
        <img class="imgGaleria" src="${valor['imgGaleria']}" class="img"/>
      </div>`;
    });
                                      
                                                                  
      html += '</div></div>';         
      

    }

    dc.addType(component.ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2,
          styles: component.ComponentHijo.style,
          droppable: false,
          attributes: { id: component.ComponentHijo.nombre },
          traits: [
            
            {
              type: "number",
              name: "cantidadEvent",
              label: "N° de Fotos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            const cantidadEvent = "{[ cantidadEvent ]}";
    
    
            var carousel = $('.galeria');
    
            carousel.on('initialized.owl.carousel', async (event) => {
    
              var items = event.item.count;
    
              var currentItems = carousel.find('.owl-item');
    
              console.log("Todos los elementos:", currentItems);
    
            });
    
            $('.galeria').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              autoplay: false,
              autoplayHoverPause: false,
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
            });
    
     
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "Galeria2",
          };
        }
      },
    
      view:{
        init({ model }) {
          this.listenTo(model, "change:cantidadEvent", this.onActive);
          this.listenTo(model, "change:cantidadEvent", this.updateScript);
          this.listenTo(model, "change:cantidadEvent", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadEvent");
    
          html = `<div class="carousel-wrap">
          <div class="owl-carousel galeria owl-theme">`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="item">
            <img class="imgGaleria" src="https://eleve11.ar/wp-content/uploads/jet-engine-forms/1/2022/09/Sin-titulo-1_Mesa-de-trabajo-1-576x1024.jpg" class="img"/>
          </div>`;
    
          };
    
          html += ` </div>
                    </div>`
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
    
          var css = `#galeria{
    
                    padding: 4% 6% 4% 6%;
                    background-color: #D7B7A2;
                  
                }
                .owl-carousel{
                  display: flex !important;  // to override display:bloc i added !important
                  flex-direction: row;   
                  justify-content: center;  // to center you carousel
              }`;
    
          //const content = model.setStyle(css);
    
    
        }
    
    
      },
    });

  }
  if(component.nombre == 'canciones'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Canciones',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: 'Canciones',
            components: htmlActualizado,
            styles: component.style,
            void: false,
            droppable: false,
            attributes: { id: component.nombre+'-'+component.tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })
  }
  if(component.nombre == 'transporte'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Transporte',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado ,
            styles: component.style ,
            void: false,
            droppable: false,
            attributes: { id: component.nombre+'-'+component.tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })
  }
  if(component.nombre == 'confirmacion'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Confirmacion',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado,
            styles: component.style,
            void: false,
            droppable: false,
            attributes: { id: component.nombre+'-'+component.tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })
  }
  if(component.nombre == 'mensaje'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Mensaje',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado ,
            styles: component.style ,
            void: false,
            droppable: false,
            attributes: { id: component.nombre+'-'+component.tipo },
          }
      },
      view: {
        init () {
          this.listenTo(this.model, 'active', this.onActive)
          this.listenTo(this.model, 'change:src', this.updateImage)
        },
        events: {
          dblclick: 'onActive'
        },
        onActive (ev) {
    
          if (ev) {
            editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
          }
          
        },
        updateImage (model, url) {
          if (url) {
            const style = model.getStyle()
    
            console.log(url);

            assets[model.ccid] = url

            console.log(assets);
    
            model.setStyle({
              'background-image':`url("${url}")`,
              'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)',
            })
          }
        }
      }
    })

  }
  if(component.nombre == 'regalos'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    const script = function() {
    
      $(document).ready(function() {

        $('.yang').click(function() {
    
          $("#yang").prop("checked", true);
          $("#yin").prop("checked", false);
         
          $('.contenregalo').show();           
            
          $('.datosbancarios').hide(); 
            
        });
      
        $('.yin').click(function() {
    
          $("#yang").prop("checked", false);
          $("#yin").prop("checked", true);
              
          $('.contenregalo').hide();           
            
          $('.datosbancarios').show(); 
            
        });
      });
    
    };

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label,
      category: 'Regalos',
      content: {
        type: component.nombre+'-'+component.tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component.nombre+'-'+component.tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component.nombre+'-'+component.tipo,
            components: htmlActualizado ,
            styles: component.style ,
            script,
            attributes: { id: component.nombre+'-'+component.tipo },
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

    var htmlfinal2 = component.ComponentHijo.html.replace(/&amp;/g, '&');

    var htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });


    if (jsondata['regalos-Western'] && jsondata['regalos-Western'].listado) {

      
      var cantidad = jsondata['regalos-Western'].listado ;

      htmlActualizado2 =`<div class="carousel-wrap re contenregalo pt-4" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false" style="display:none;">
                                    <div class="owl-carousel regalos2" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        htmlActualizado2 += `<div class="card p-4" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
        <img class="card-img-top" src="${valor['card-img-top']}" alt="Card image cap">
        <div class="card-body" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
          <h5 class="card-title">${valor['card-title']}</h5>
          <span class="card-text">${valor['card-text']}</span>
          <h5 class="cardprecio mt-3">${valor['cardprecio']}</h5>
          <br>
          <a href="" class="botonhashtag">${valor['botonhashtag']}</a>
        </div>
      </div>`;
    });
                                      
                                                                  
    htmlActualizado2 += '</div></div>';         
      

    }

    dc.addType(component.ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2 ,
          styles: component.ComponentHijo.style,
          droppable: false,
          traits: [
            
            {
              type: "number",
              name: "cantidadRegalos",
              label: "N° de Regalos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            const cantidadEvent = "{[ cantidadRegalos ]}";
    
            $('.regalos2').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              autoplay: true,
              autoplayHoverPause: true,
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
            
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "listaregalos",
          };
        }
      },
    
      view: {
        init({ model }) {
          this.listenTo(model, "change:cantidadRegalos", this.onActive);
          this.listenTo(model, "change:cantidadRegalos", this.updateScript);
          this.listenTo(model, "change:cantidadRegalos", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadRegalos");
    
          html = `<div class="carousel-wrap re contenregalo pt-4" style="display:none;" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                    <div class="owl-carousel regalos2" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="card p-4" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                      <img class="card-img-top" src="https://eleve11.ar/wp-content/uploads/jet-engine-forms/1/2022/09/D_NQ_NP_885930-MLA47397157459_092021-O.webp" alt="Card image cap">
                      <div class="card-body" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-highlightable="false" data-gjs-droppable="false">
                        <h5 class="card-title">LAMPARA COLGANTE</h5>
                        <span class="card-text">Lampara Campana Colgante 40cm Nórdica Escandinaba Madera</span>
                        <h5 class="cardprecio mt-3">$36452</h5>
                        <br>
                        <a href="" class="botonhashtag">REGALAR</a>
                      </div>
                    </div>`;
    
          };
    
          html += `</div>
                  </div>`
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
    
          console.log('hola');
    
          var css = `.owl-carousel{
                      display: flex !important;  // to override display:bloc i added !important
                      flex-direction: row;   
                      justify-content: center;  // to center you carousel
                    }
          
                    .card{
    
                      height: 550px;
                    }
          
                    .card-img-top{
    
                      height: 250px !important;
                    }`;
    
          const content = model.setStyle(css);
    
    
        }
    
    
      },
    });

  }
  if(component.nombre == 'testigos'){

    var htmlfinal = component.html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component.nombre+'-'+component.tipo, {
      label: component.label ,
      category: "Testigos",
      content: {
            type: component.nombre+'-'+component.tipo
      }
    });

    dc.addType(component.nombre+'-'+component.tipo, {
      model: {
        defaults: {
          components: htmlActualizado,
          styles: component.style,
          void: false,
          droppable: false,
          attributes: { id: component.nombre+'-'+component.tipo },
          traits: [
            
            {
              type: "number",
              name: "cantidadTestigos",
              label: "N° de testigos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            const cantidadEvent = "{[ cantidadTestigos ]}";
    
    
            var carousel = $('.galeria');
    
            carousel.on('initialized.owl.carousel', async (event) => {
    
              var items = event.item.count;
    
              var currentItems = carousel.find('.owl-item');
    
              console.log("Todos los elementos:", currentItems);
    
            });
    
            $('.padrinos').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              autoplay: false,
              autoplayHoverPause: false,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 2
                },
                1000: {
                  items: 2
                }
              }
            });
    
     
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "Galeria2",
          };
        }
      },
    
      view:{
        init({ model }) {
          this.listenTo(model, "change:cantidadTestigos", this.onActive);
          this.listenTo(model, "change:cantidadTestigos", this.updateScript);
          this.listenTo(model, "change:cantidadTestigos", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadTestigos");
    
          html = `<section id="testigos">
                    <div class="container-fluid">
                      <div class="row text-xs-center">
                        <div class="col-12 text-center">
                          <h1 class="titulopadrinos">Testigos</h1>
                          <div class="carousel-wrap"  >
                                <div class="owl-carousel padrinos" >`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="text-center">
                        <img class="card-img-padrinos" src="https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/09/radek-homola-TYPU7klExAw-unsplash.jpg" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-name-padrino text-dark">Laura</h5>
                          <span class="card-relacion text-dark">Hermana</span>
                          <br>
                        </div>
                      </div>`;
    
          };
    
          html += ` </div>
                    </div>

                  </div>
                </div>
              </div>
          </section>`;
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
    
          var css = `.testigos{
  
            padding: 4% 30% 4% 30%;
            background-color: #f8f9fa!important;
            }
          
            @media only screen and (max-width: 768px) {
          
              .testigos{
              
                padding: 12% 10% 14% 10%;
              
              }
              
              }
          
          
            
          
              @media only screen and (max-width: 768px){
                .titulopadrinos {
                font-size: 30px;
                width: 100% !important;
                  }
              }
      
              .card-img-padrinos{
        
                width: 176px !important;
                border-radius: 50% !important;
                margin: 0 auto;
              }
          
              .card-name-padrino{
          
                font-family: "Montserrat", Sans-serif;
                font-size: 18px;
              }
          
              .card-relacion{
          
                font-family: "Montserrat", Sans-serif;
                font-weight: 600;
                font-size: 16px;
              }`;
    
          const content = model.setStyle(css);
    
    
        }
    
    
      },
    });


    var htmlfinal2 = component.ComponentHijo.html.replace(/&amp;/g, '&');

    const htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    console.log(component.ComponentHijo.nombre);

    if (jsondata['testigos-Western'] && jsondata['testigos-Western'].listado) {
        
      var cantidad = jsondata['testigos-Western'].listado ;

      html = `<div class="carousel-wrap"  >
                                <div class="owl-carousel padrinos" >`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        html += `<div class=" text-card card-testigo">
        <img src="${valor['card-img-padrinos']}" alt="Card image cap" class="card-img-padrinos"/>
                  <div class="card-body">
                    <h5 class="card-name-padrino text-dark">${valor['card-name-padrino']}
                    </h5>
                    <span class="card-relacion text-dark">${valor['card-relacion']}</span>
                    <br/>
                  </div>
      </div>`;
    });
                                      
                                                                  
      html += '</div></div>';

    }

    dc.addType(component.ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2,
          styles: component.ComponentHijo.style,
          void: false,
          droppable: false,
          attributes: { id: component.ComponentHijo.nombre },
          traits: [
            
            {
              type: "number",
              name: "cantidadTestigos",
              label: "N° de testigos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
          ],
          script: function () {
    
            const cantidadEvent = "{[ cantidadTestigos ]}";
    
    
            var carousel = $('.galeria');
    
            carousel.on('initialized.owl.carousel', async (event) => {
    
              var items = event.item.count;
    
              var currentItems = carousel.find('.owl-item');
    
              console.log("Todos los elementos:", currentItems);
    
            });
    
            $('.padrinos').owlCarousel({
              loop: false,
              margin: 10,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
              autoplay: false,
              autoplayHoverPause: false,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 2
                },
                1000: {
                  items: 2
                }
              }
            });
    
     
          },
        },
      },
    
      isComponent: (el) => {
        if (el.className && el.className.includes("swiper-container")) {
          return {
            type: "Galeria2",
          };
        }
      },
    
      view:{
        init({ model }) {
          this.listenTo(model, "change:cantidadTestigos", this.onActive);
          this.listenTo(model, "change:cantidadTestigos", this.updateScript);
          this.listenTo(model, "change:cantidadTestigos", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadTestigos");
    
          html = `<div class="carousel-wrap"  >
                                <div class="owl-carousel padrinos" >`;
    
          for (i=1; i<=cantidad; i++) {
    
            html += `<div class="text-center card-testigo">
                        <img class="card-img-padrinos" src="https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/09/radek-homola-TYPU7klExAw-unsplash.jpg" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-name-padrino text-dark">Laura</h5>
                          <span class="card-relacion text-dark">Hermana</span>
                          <br>
                        </div>
                      </div>`;
    
          };
    
          html += ` </div>
                    </div>`;
    
          
          const content = model.components(html);
    
        },
    
        onStyle (model){
    
          var css = `
        
              @media only screen and (max-width: 768px){
                .titulopadrinos {
                font-size: 30px;
                width: 100% !important;
                  }
              }
      
              .card-img-padrinos{
        
                width: 176px !important;
                border-radius: 50% !important;
                margin: 0 auto;
              }
          
              .card-name-padrino{
          
                font-family: "Montserrat", Sans-serif;
                font-size: 18px;
              }
          
              .card-relacion{
          
                font-family: "Montserrat", Sans-serif;
                font-weight: 600;
                font-size: 16px;
              }`;
    
          //const content = model.setStyle(css);
    
    
        }
    
    
      },
    });

  }
  if(component.nombre == 'divisor'){

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: component[i].label ,
      category: "divisor",
      content: {
            type: component[i].nombre+'-'+component[i].tipo
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: component[i].html,
            styles: component[i].style,
            void: false,
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: ''
        }
      }
    })

  }



//para cerrar los collapse de las blocks

const categories = editor.BlockManager.getCategories();
categories.each(category => {
	category.set('open', false).on('change:open', opened => {
		opened.get('open') && categories.each(category => {
            category !== opened && category.set('open', false)
        })
	})
})

//add fonts google al styler

let styleManager = editor.StyleManager;
let typographySector = styleManager.getSector('typography');
let fontProperty = styleManager.getProperty('typography', 'font-family');
console.log(fontProperty);
let list = fontProperty.get('options');
list.push({ value: 'Playfair Display', name: 'Playfair Display' });
list.push({ value: 'Noto Serif Display', name: 'Noto Serif Display' });
list.push({ value: 'Meow Script', name: 'Meow Script' });
list.push({ value: 'Montserrat', name: 'Montserrat' });
list.push({ value: 'Oooh Baby', name: 'Oooh Baby' });
list.push({ value: 'Playfair Display SC', name: 'Playfair Display SC' });
list.push({ value: 'Alata', name: 'Alata' });
fontProperty.set('options', list);
styleManager.render();


//add font style 

let styleManager1 = editor.StyleManager;
const property = styleManager1.addProperty('typography', {
  label: 'font style',
  property: 'font-style',
  type: 'select',
  default: 'normal',
  options: [
   { id: 'normal', label: 'normal' },
   { id: 'italic', label: 'italic' },
  ],
}, { at: 0 });

//agregar id a portada




if(jsondata != null){

  Object.keys(jsondata).forEach(function (clave) {

    const valor = jsondata[clave];
    console.log(`${clave}: ${JSON.stringify(valor)}`);
  
    editor.addComponents({
      type: clave
    });
  
  });


}




