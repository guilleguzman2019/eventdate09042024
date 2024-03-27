//configuracion del init de grapesjs

const editor = grapesjs.init({
    container: "#editor",
    storageManager: false,
    showOffsets: 1,
    allowScripts: 1,
    showOffsets: false,
    showOffsetsSelected: false,
    noticeOnUnload: 0,
    blockManager: {

      custom: true,
      //appendTo: '.blocks',
      
    },
    traitManager:{
      appendTo: '.trait',
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
            {
              id: "clean canva",
              active: true, // active by default
              className: "",
              label: '<i class="fa fa-trash-o"></i>',
              command: "clean-canva", // Built-in command
            },
          ],
        },
        {
          id: "panel-devices",
          el: ".panel__devices",
          buttons: [
            {
              id: "device-desktop",
              label: '<i class="fa-solid fa-laptop"></i>',
              command: "set-device-desktop",
              active: true,
              togglable: false,
            },
            {
              id: "device-mobile",
              label: '<i class="fa-solid fa-mobile-screen-button"></i>',
              command: "set-device-mobile",
              togglable: false,
            },
          ],
        },
      ],
    },
    assetManager: {

      uploadFile: function (e) {
        var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        var formData = new FormData();

        // Agregar archivos al objeto FormData
        for (var i in files) {
          formData.append('files[]', files[i]);
        }

        formData.append('folder', 'ImgPortadas');

        fetch('/panel/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'X-CSRF-TOKEN': token
          }
        })
        .then(response => response.json())
        .then(data => {
          // Agregar el archivo cargado a la lista de activos

          console.log('imagen');
          console.log(data.data);

          editor.AssetManager.add([
            {
              src: `${urlApp}/storage/uploads/ImgPortadas/`+data.data['nombre_imagen'],
              name: data.data['nombre_imagen'],
              type: 'image'
            }
          ]);

        })
        .catch(error => {
          console.error('Error al cargar el archivo:', error);
        });

        
      }

      
    },
    canvas: {
      styles: [ 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css',
                'https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@500&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Meow+Script&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Oooh+Baby&display=swap" rel="stylesheet"',
                'https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap" rel="stylesheet',
                'https://fonts.googleapis.com/css2?family=Alata&amp;display=swap',
                'https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap',
                'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&amp;display=swap',
                'https://fonts.googleapis.com/css2?family=Birthstone&display=swap',
                'https://fonts.googleapis.com/css2?family=Bigelow+Rules&display=swap',
                'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/assets/owl.carousel.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.1/assets/owl.carousel.css',
                 'https://use.fontawesome.com/releases/v5.15.4/css/all.css'
                ],
      scripts: ['https://code.jquery.com/jquery-3.4.1.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js',
                'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/owl.carousel.min.js'
               ]
    }
  });

  window.editor = editor ;

  

  
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

  editor.Commands.add('clean-canva', {
    run: function(editor, sender) {

      editor.runCommand('core:canvas-clear');
      listaComponenteNoRepect = [];
    }
  });

  var stringGrapes = 'data-gjs-draggable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false"';


  var jsondatafinal = {};

  var lista = '';

  var contador = '';

  var idInvitacion = '';

  editor.Commands.add('get-proyect', {

    run: async function(editor, sender) {

      var spinner = document.getElementById('spinner-div');

      spinner.style.display = 'block';

      jsondatafinal = {};

      console.log(JSON.stringify(assets));

      var startfrom = localStorage.getItem('startfrom');
      var endTxt = localStorage.getItem('endTxt');

      assets['contador'] =  { startfrom : startfrom , endTxt : endTxt}

      var jsonObject2 = {
        id: invitacionId,
        tipo: 'assets',
        data: assets,
    };

    console.log(jsonObject2);

      // send data to assets controller
      fetch('/panel/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
        },
        body: JSON.stringify(jsonObject2),
      })
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta del servidor
          console.log(data);
          spinner.style.display = 'none';
        })
        .catch(error => {
          console.error('Error al enviar la solicitud:', error);
          spinner.style.display = 'none';
        });

      const cmp = editor.Components.getComponents();
    var componentesfinal = cmp.toArray();

    console.log(componentesfinal);

    async function procesarComponente(i) {
      if (i < componentesfinal.length) {

        console.log(componentesfinal);
        var htmlString = componentesfinal[i].toHTML();

        try {
          const response = await fetch('http://138.197.126.186/parseHtml', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({'html_string': htmlString}),
          });

          const data = await response.json();
          console.log('Respuesta del servidor:', data);

          var keys = Object.keys(data);
          var clave = keys[0];
          var valor = data[clave];

          jsondatafinal[clave] = valor;
      

          // Llamada recursiva para procesar el siguiente componente
          await procesarComponente(i + 1);
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      } else {
        // Todos los componentes han sido procesados, imprimir el resultado
        console.log(jsondatafinal);

        var jsonObject = {
          id: invitacionId,
          tipo: 'data',
          data: jsondatafinal
      };

      fetch('/panel/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
        },
        body: JSON.stringify(jsonObject),
      })
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta del servidor
          console.log(data);
        })
        .catch(error => {
          console.error('Error al enviar la solicitud:', error);
        });

        // Convertir el array de objetos a una cadena JSON y guardarlo en el localStorage
        var jsondataString = JSON.stringify(jsondatafinal);
        localStorage.setItem("jsondata", jsondataString);

        // Puedes asignar jsondatafinal directamente si es necesario
        jsondata = jsondatafinal;
      }
    }

    await procesarComponente(0);


    }
  });
  

  var assets = {};

  // Verificar sino assets está vacío
  if (Object.keys(jsonassets).length !== 0) {
     
    assets = jsonassets;
  
  }

  console.log(assets);



const dc = editor.DomComponents;

const bm = editor.BlockManager;

const deviceManager = editor.Devices;


const templatedatos = {
  Bodas: {
    Portada: {
      titulo: 'Martin y Laura',
      texto: 'Nos Casamos !!'
    },
    Historia: {
      titulo: 'Nuestra historia',
      texto: 'Una propuesta, un Sí y una decisión que tomamos juntos. Nuestro amor ha crecido en nosotros, ha madurado y florecido, a veces sencillo, otras caótico pero siempre maravilloso. Así comienza una nueva etapa en nuestras vidas. Somos aventureros, dedicados, fuertes de carácter; los desafíos que hemos enfrentado nos han ayudado a crecer y madurar; debemos agradecer a esos retos porque con ellos nos hemos dado cuenta que juntos podemos lograr lo que nos proponemos. Tan sólo podemos decir que nuestra vida en estos momentos se encuentra completa y estamos listos para compartir el resto de nuestros días juntos.'
    },
    Hashtag: {
      titulo: 'Durante nuestra boda utiliza el hashtag',
      hashtag: '#BODAMARTIN&LAURA',
      textoBoton:'Ver Mural',
      linkBoton: '#'
    },
    Regalos: {
      titulo: 'Mesa de Regalo',
      texto: 'Tu presencia es nuestro mejor regalo, pero si quieres bendecirnos con algún bien material, aquí te dejamos una lista de regalos que nos gustaría recibir, o bien, también puedes colaborar con nuestra Luna de Miel.',
      datosBancarios:'TITULAR: MATIAS NICOLAS SANCHEZ CBU: 1430001713011714940016 ALIAS: TUERCA.TRUCO.MANIJA Nº DE CUENTA: 1301171494001 CUIT: 23-36988681-9',
      labelDatos: 'Ver Datos',
      labelRegalos: 'Ver Lista',
    },
  },
  Cumple: {
    Portada: {
      titulo: 'Simon',
      texto: 'Hoy es mi cumple !!'
    },
    Hashtag: {
      titulo: 'Durante nuestra boda utiliza el hashtag',
      hashtag: '#CUMPLESIMON',
      textoBoton:'Ver Mural',
      linkBoton: '#'
    },
    Regalos: {
      titulo: 'Mesa de Regalo',
      texto: 'TU PRESENCIA ES MI MAYOR REGALO, PERO SI QUIERES HACERME UN PRESENTE PUEDES HACERLOS POR ESTOS MEDIOS.',
      datosBancarios:'TITULAR: MATIAS NICOLAS SANCHEZ CBU: 1430001713011714940016 ALIAS: TUERCA.TRUCO.MANIJA Nº DE CUENTA: 1301171494001 CUIT: 23-36988681-9',
      labelDatos: 'DATOS BANCARIOS',
    },
    Lugar:{
      titulo: 'Dirección',
      nombre:'KEKÉ BY PACARÁ DOS',
      direccion:'CAMINO 14, T4103 TAFÍ VIEJO, TUCUMÁN',
      textoBoton:'VER UBICACION',
      linkBoton:'#'
    }
  },
  Funeraria: {
    Portada: {
      titulo: '',
      fecha: '',
      texto: '',
      mensaje: ''
    },
    Regalos: {
      texto: 'Tu presencia es nuestro mejor regalo, pero si quieres bendecirnos con algún bien material, aquí te dejamos una lista de regalos que nos gustaría recibir, o bien, también puedes colaborar con nuestra Luna de Miel.',
      datosBancarios:'TITULAR: MATIAS NICOLAS SANCHEZ CBU: 1430001713011714940016 ALIAS: TUERCA.TRUCO.MANIJA Nº DE CUENTA: 1301171494001 CUIT: 23-36988681-9',
      labelDatos: 'Ver Datos',
    },
    DressInsta:{
      tituloVelorio: 'Velorio',
      nombreVelorio: 'NOMBRE DE LA SALA VELATORIA',
      diaHoraVelorio: '30 DE AGOSTO 12:OO HS A 00:00HS',
      calleVelorio: 'NOMBRE DE LA CALLE 0000',
      textoBotonVelorio: 'Ver Ejemplo',
      linkBotonVelorio: '#',

      tituloSepelio: 'Sepelio',
      nombreSepelio: 'NOMBRE DE LA SALA VELATORIA',
      diaHoraSepelio: '30 DE AGOSTO 12:OO HS A 00:00HS',
      calleSepelio: 'NOMBRE DE LA CALLE 0000',
      textoBotonSepelio: 'Ver Ejemplo',
      linkBotonSepelio: '#',
    }
  },
  Quince:{
    Portada: {
      titulo: 'Jimena ',
      texto: 'Hoy es mi cumple !!',
      fecha: ''
    },
    Regalos: {
      titulo: 'Mesa de Regalo',
      texto: 'TU PRESENCIA ES MI MAYOR REGALO, PERO SI QUIERES HACERME UN PRESENTE PUEDES HACERLOS POR ESTOS MEDIOS.',
      datosBancarios:'TITULAR: MATIAS NICOLAS SANCHEZ CBU: 1430001713011714940016 ALIAS: TUERCA.TRUCO.MANIJA Nº DE CUENTA: 1301171494001 CUIT: 23-36988681-9',
      labelDatos: 'DATOS BANCARIOS',
    },
    DressInsta:{
      tituloDressCode: 'DRESS CODE',
      textoDressCode: 'Una ayuda para tu vestuario.',
      textoBotonDressCode: 'Ver Ejemplo',

      tituloInstagram: 'INSTAGRAM WALL',
      hashtagaInstagram: '#15NICOLE',
      textoInstagram: 'Durante la fiesta utiliza el hashtag.',
      textoBotonInstagram: 'Ver Ejemplo',
      linkBotonInstagram: '#',
    },
    Lugar:{
      titulo: 'LA CAYETANA',
      direccion:'RÍO NEGRO 4000, X5000 CÓRDOBA',
      hora:'20:00 HS',
      textoBoton:'UBICACION',
      linkBoton:'#'
    }
  },
  Soltero:{
    Portada: {
      titulo: 'DESPEDIDA DE SOLTERO',
      texto: 'MARTIN',
    },
    Regalos: {
      titulo: 'Mesa de Regalo',
      texto: 'Tu presencia es nuestro mejor regalo, pero si quieres bendecirnos con algún bien material, aquí te dejamos una lista de regalos que nos gustaría recibir, o bien, también puedes colaborar con nuestra Luna de Miel.',
      datosBancarios:'TITULAR: MATIAS NICOLAS SANCHEZ CBU: 1430001713011714940016 ALIAS: TUERCA.TRUCO.MANIJA Nº DE CUENTA: 1301171494001 CUIT: 23-36988681-9',
      labelDatos: 'Ver Datos',
    },
    DressInsta:{
      tituloCuando: 'CUANDO',
      diaCuando: '30 DE SEPTIEMBRE DE 2028',
      horaCuando: '24:00 HS',
      textoBotonCuando: 'Ver Ejemplo',
      linkBotonCuando: '#',

      tituloDonde: 'DONDE??',
      nombreDonde: 'PASEO GLOW 2',
      lugarDonde: 'CRUZ DEL EJE CAPITAL',
      textoBotonDonde: 'Ver Ejemplo',
      linkBotonDonde: '#',
    }
  },
  Empresarial:{
    Portada: {
      titulo: 'reparaciones de aire acondicionados',
      texto: 'Somos especialistas en la reparacion y mantenimiento de aires.',
      textoBoton:'Hablame por whatsapp',
      linkBoton: '#',
      ajustesImagen: ''
    },
  }
};

var srcFotos = {
  HarryPotter: urlApp + '/storage/uploads/ImgFotos/harryFoto.jpg',
  Blue: urlApp + '/storage/uploads/ImgFotos/blueFoto.jpg',
  Western: urlApp + '/storage/uploads/ImgFotos/westernFoto.jpg',
  Boho: urlApp + '/storage/uploads/ImgFotos/bohoFoto.jpg',
  Chic: urlApp + '/storage/uploads/ImgFotos/chicFoto.jpg',
  Romantic: urlApp + '/storage/uploads/ImgFotos/romanticFoto.jpg',
  Diva: urlApp + '/storage/uploads/ImgFotos/divaFoto.jpg',
  Plata: urlApp + '/storage/uploads/ImgFotos/plataFoto.jpg',
  ServicioTecnico: urlApp + '/storage/uploads/ImgFotos/servicioFoto.jpg'
};


for (var i = 0; i < component.length; i++) {


  if(component[i].nombre == 'portada'){

    var nombreComponente = component[i].nombre.charAt(0).toUpperCase() + component[i].nombre.slice(1);

    var htmlfinalPortada = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalPortada.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var cssfinal = component[i].style.replace(/&amp;/g, '&');

    var bloqueEspecifico = `#portada-${component[i].tipo} {background-image: url("${jsonassets['portada-' + component[i].tipo + '-mobile']}");}`;

    const cssActualizado = cssfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return assets ? eval(p1) : '';
    });


    var labelfianl = component[i].label.trim();

    // add block
    bm.add( component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    portada
                    </div>`,
      category: 'Portada',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
      }
    });

    //create dinamyc trait 

    var trait = [
      {
        type: 'NombreComponent',
        name: 'NombreComponent',
        label: 'Nombre del Componente',
      },
    ];

    for (const key in templatedatos[categoria][nombreComponente]) {

      if (templatedatos[categoria][nombreComponente].hasOwnProperty(key)) {

        var type = 'text';

        if(key.includes('ajustes')){

          type = 'cambiarTamañoImagen'

        }
        const value = templatedatos[categoria][nombreComponente][key];
        
        const textoSeparado = key.replace(/([A-Z])/g, ' $1').trim();

        trait.push({
          type: type,
          name: key + nombreComponente, // Agregar 'Portada' al final de la clave
          label: textoSeparado,
          value: '',
          changeProp: 1,
        });
      }
    }


    var trait2 = [
            {
              type: 'button',
              label: '',
              text: 'Cambiar Fondo',
              name: 'cambiarFondo',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              console.log(componente);

              componente.view.openAsset();

              }
          
            },
            {
              type: 'button',
              label: '',
              name: 'resetValores',
              text: 'Resetear',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.view.resetearValores();

              }
            },
            {
              type: 'button',
              label: '',
              text: 'Eliminar',
              name: 'eliminarComponent',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.remove();

              let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);

              listaComponenteNoRepect.splice(indice, 1);

              console.log(listaComponenteNoRepect);

              var divTrait = document.querySelector('.gjs-trt-traits');

              // Limpiar el contenido del div
              divTrait.innerHTML = '';


              }
          
            },
            {
              type: 'button',
              label: '',
              name: 'subirComponente',
              text: 'Subir',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';

                //var longitud = editor.getWrapper().components.length  ;

                var arrayComponentes = editor.getWrapper().components();

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                if(ubicacion != 0){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion -1});
                }

              }
            },
            {
              type: 'button',
              label: '',
              name: 'BajarComponente',
              text: 'Bajar',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';


                var arrayComponentes = editor.getWrapper().components();

                var longitud = arrayComponentes.length  ;

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                console.log(ubicacion);
                console.log(longitud);

                if(ubicacion < longitud){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion +1});
                }

              }
            }];

    if(tipoTemplate == 'HarryPotter'){

      nuevoElemento = {
        type: 'button',
        label: '',
        text: 'Cambiar Cara',
        name: 'cambiarCara',
        full: true, // Full width button
        command: editor => {

        
          var parentDocument = parent.document;
      
          var botonRegalos2 = parentDocument.getElementById("abrirModalCambiarCara");

          botonRegalos2.click();
        }
    
      }
      
      trait2.unshift(nuevoElemento);
      
    }

    const traitfinal = trait.concat(trait2);

    // end create dinamyc trait 

    // add component type

    var componenteTipo = component[i].nombre+'-'+component[i].tipo ;

    
    dc.addType(componenteTipo, {
      extend: 'default',
      model: {
        defaults: {
            components: htmlActualizado,
            attributes: { id: componenteTipo },
            tipo: component[i].tipo,
            styles: cssActualizado,
            void: false,
            badgable:false,
            NombreComponent:component[i].nombre,
            traits: traitfinal,
            droppable: false,
            hoverable: false,
            layerable: true,
            highlightable: false,
          }
      },
      view: {
        init () {
          this.listenTo(this.model, 'active', this.onActive)
          this.listenTo(this.model, 'change:src', this.updateImage)

          this.listenTo(this.model, 'change:width', this.updateDimension)
          this.listenTo(this.model, 'change:height', this.updateDimension)
          this.listenTo(this.model, 'change:srcimg', this.updateDimension)

          const keys = Object.keys(templatedatos[categoria].Portada);

          // Escuchar cambios en las claves y renderizar
          keys.forEach(key => {
            this.listenTo(this.model, `change:${key}Portada`, this.renderizar);
          });

          

        },
        events: {
          //dblclick: 'onActive',
          'click .btnClickPorta': 'onActive',
          'click .btnClickPortaMobile': 'onActive',
          click: 'openTrait'
        },
        onActive (env) {
    
          if (env) {
            editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
          }
          
        },
        openAsset(){
          editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
        },

        updateDimension(){

          var componenteTipo = this.model.attributes.type;

          const width = this.model.get(`width`);
          const height = this.model.get(`height`);
          const srcimg = this.model.get(`srcimg`);


          if(!jsondata[componenteTipo] || !jsondata[componenteTipo][`imgPortada`]){

            if(typeof jsondata[componenteTipo] === 'undefined'){

              jsondata[componenteTipo] = [];
            }

            if(typeof jsondata[componenteTipo]['imgPortada'] === 'undefined'){

              jsondata[componenteTipo]['imgPortada'] = { width: '300px', height: '300px', src: 'https://i.postimg.cc/FR7BMJLP/3.png'};

            }

          }

          if (width !== undefined) {

            var trimmedwidth = width.trim();

            if(jsondata[componenteTipo] && jsondata[componenteTipo][`imgPortada`]){

              jsondata[componenteTipo][`imgPortada`]['width'] = trimmedwidth;
            }
            else{

              jsondata[componenteTipo] = [];
              jsondata[componenteTipo]['imgPortada'] = { width: '300px', height: '300px', src: 'https://i.postimg.cc/FR7BMJLP/3.png'};
              jsondata[componenteTipo][`imgPortada`]['width'] = trimmedwidth;

            }

          }
          if (height !== undefined) {

            var trimmedheight = height.trim();

            if(jsondata[componenteTipo] && jsondata[componenteTipo][`imgPortada`]){

              jsondata[componenteTipo][`imgPortada`]['height'] = trimmedheight;
            }
            else{

              jsondata[componenteTipo] = [];
              jsondata[componenteTipo]['imgPortada'] = { width: '300px', height: '300px', src: 'https://i.postimg.cc/FR7BMJLP/3.png'};
              jsondata[componenteTipo][`imgPortada`]['height'] = trimmedheight;

            }

          }
          if (srcimg !== undefined) {

            var trimmedsrc = srcimg.trim();

            if(jsondata[componenteTipo] && jsondata[componenteTipo][`imgPortada`]){

              jsondata[componenteTipo][`imgPortada`]['src'] = trimmedsrc;
            }
            else{

              jsondata[componenteTipo] = [];
              jsondata[componenteTipo]['imgPortada'] = { width: '300px', height: '300px', src: 'https://i.postimg.cc/FR7BMJLP/3.png'};
              jsondata[componenteTipo][`imgPortada`]['src'] = trimmedsrc;

            }

          }

          console.log(jsondata);

          var htmlActualizado = htmlfinalPortada.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);

        },

        renderizar(){

          var componenteTipo = this.model.attributes.type;

          const keys = Object.keys(templatedatos[categoria].Portada);

          console.log(keys);

          keys.forEach(key => {

            if(!key.includes('ajustes')){

              const variablePortada = this.model.get(`${key}Portada`);

              if (variablePortada !== undefined) {

                var trimmedTituloPortada = variablePortada.trim();


                if(!jsondata[componenteTipo] || !jsondata[componenteTipo][`textoBotonPortada`]){

                  if(typeof jsondata[componenteTipo] === 'undefined'){
      
                    jsondata[componenteTipo] = [];
                  }
      
                  if(typeof jsondata[componenteTipo]['textoBotonPortada'] === 'undefined'){
      
                    jsondata[componenteTipo]['textoBotonPortada'] = {text: 'Contactame por whatsapp', src:'#'};
      
                  }

                  console.log(jsondata);
      
                }

                if(key === 'textoBoton'){

                  jsondata[componenteTipo]['textoBotonPortada']['text'] = trimmedTituloPortada;
                }
                else if(key === 'linkBoton'){

                  jsondata[componenteTipo]['textoBotonPortada']['src'] = trimmedTituloPortada;

                }
                else{

                  jsondata[componenteTipo][`${key}Portada`] = trimmedTituloPortada;
                }


              }

            }

          });

          
          var htmlActualizado = htmlfinalPortada.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);

        },

        openTrait(ev){

          var elemento = document.querySelector('.nohayComponent');

            if (elemento) {
                elemento.style.display = 'none';
            }

          var botonPortada = document.getElementById("tabAjustes");

          // Simular un clic en el botón
          botonPortada.click();

        },
        resetearValores(model) {

          var componenteTipo = this.model.attributes.type;

          for (const key in templatedatos[categoria].Portada) {
            if (templatedatos[categoria].Portada.hasOwnProperty(key)) {
              const value = templatedatos[categoria].Portada[key];
              
              // Establecer el valor en this.model
              this.model.set(`${key}Portada`, '');
              
              // Verificar si jsondata existe y establecer la propiedad correspondiente
              if (jsondata && jsondata[componenteTipo]) {

                console.log(key)

                if(key.includes('textoBoton')){

                  if(typeof jsondata[componenteTipo][`${key}Portada`] == 'undefined'){

                    jsondata[componenteTipo][`${key}Portada`] = [];
                  }

                  jsondata[componenteTipo][`${key}Portada`].text = value;
                }
                else if(key.includes('linkBoton')){

                  let str = key;
                  let nuevoStr = str.replace("link", "texto");

                  if(typeof jsondata[componenteTipo][`${nuevoStr}Portada`] == 'undefined'){

                    jsondata[componenteTipo][`${nuevoStr}Portada`] = [];
                  }

                  jsondata[componenteTipo][`${nuevoStr}Portada`].src = value;
                }
                else{

                  jsondata[componenteTipo][`${key}Portada`] = value;

                }

              }
            }
          }


          var htmlActualizado = htmlfinalPortada.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);
          
        },
        updateImage (model, url) {

          var componenteTipo = this.model.attributes.tipo;

          const selected = deviceManager.getSelected();

          console.log(url);

          if (url) {
            const style = model.getStyle()

            if(selected.id =='desktop'){

              assets[model.ccid + '-desktop'] = url;

            }

            else{

              assets[model.ccid + '-mobile'] = url;
            }

            var stylefinal = {
              'background-image': `url("${url}")`,
              'background-size': 'cover',
              'background-position': 'center center',
              'background-repeat': 'no-repeat',
              'height': '100vh',
              'position':'relative',
              'display':'flex',
              'flex-direction':'column',
              'justify-content':'center',
              'align-items':'center',
              'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)'
    
            }

            if(tipoTemplate == 'HarryPotter'){

              stylefinal = {

                'background-image': `url("${url}")`,
                'background-size': 'cover',
                'background-position': 'center center',
                'background-repeat': 'no-repeat',
                'height': '100vh',
                'position':'relative',
                'display':'flex',
                'flex-direction':'column',
                'justify-content':'end',
                'align-items':'center',
                'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)'
                
            
              }
            
            }

            cambiarMensaje = ['Western', 'Boho', 'Chic', 'Romantic', 'Plata'];

            cambiarContador = ['Western', 'Boho', 'Chic', 'Blue'];

            cambiarHashtag = ['Romantic'];

            cambiarCanciones = ['Diva'];

            if(cambiarMensaje.includes(componenteTipo)){

              var selectorfinal = '#mensaje-'+componenteTipo;
              var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];

              componente3.view.renderfinal(url);
            }

            if(cambiarContador.includes(componenteTipo)){

              var selectorContador = '#contador-'+componenteTipo;
              var componenteContador = editor.DomComponents.getWrapper().find(selectorContador)[0];

              componenteContador.view.renderfinal(url);

            }

            if(cambiarHashtag.includes(componenteTipo)){

              var selectorHashtag = '#hashtag-'+componenteTipo;
              var componenteHashtag = editor.DomComponents.getWrapper().find(selectorHashtag)[0];

              componenteHashtag.view.renderfinal(url);

            }

            if(cambiarCanciones.includes(componenteTipo)){

              var selectorCanciones = '#canciones-'+componenteTipo;
              var componenteCanciones = editor.DomComponents.getWrapper().find(selectorCanciones)[0];

              componenteCanciones.view.renderfinal(url);

            }

            model.setStyle(stylefinal);
          }
        }
      }
    });

  }

  if(component[i].nombre == 'historia'){

    var nombreComponente = component[i].nombre.charAt(0).toUpperCase() + component[i].nombre.slice(1);

    var htmlfinalhistoria = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalhistoria.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    //create trait dymanic 

    var trait = [
      {
        type: 'NombreComponent',
        name: 'NombreComponent',
        label: 'Nombre del Componente',
      },
    ];

    for (const key in templatedatos[categoria][nombreComponente]) {
      if (templatedatos[categoria][nombreComponente].hasOwnProperty(key)) {
        const value = templatedatos[categoria][nombreComponente][key];
        // Agregar objetos al array con type: 'text' y los valores dinámicos de name y label
        trait.push({
          type: 'text',
          name: key + nombreComponente, // Agregar 'Portada' al final de la clave
          label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar la primera letra de la clave
          value: '',
          changeProp: 1,
        });
      }
    }

    var trait2 = [
            {
              type: 'button',
              label: '',
              name: 'resetValores',
              text: 'Resetear',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.view.resetearValores();

              }
            },
            {
              type: 'button',
              label: '',
              text: 'Eliminar',
              name: 'eliminarComponent',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.remove();

              let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);

              listaComponenteNoRepect.splice(indice, 1);

              console.log(listaComponenteNoRepect);

              var divTrait = document.querySelector('.gjs-trt-traits');

              // Limpiar el contenido del div
              divTrait.innerHTML = '';


              }
          
            },
            {
              type: 'button',
              label: '',
              name: 'subirComponente',
              text: 'Subir',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';

                //var longitud = editor.getWrapper().components.length  ;

                var arrayComponentes = editor.getWrapper().components();

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                if(ubicacion != 0){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion -1});
                }

              }
            },
            {
              type: 'button',
              label: '',
              name: 'BajarComponente',
              text: 'Bajar',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';


                var arrayComponentes = editor.getWrapper().components();

                var longitud = arrayComponentes.length  ;

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                console.log(ubicacion);
                console.log(longitud);

                if(ubicacion < longitud){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion +1});
                }

              }
            }];

    const traitfinal = trait.concat(trait2);

    // end create trait dymanic 

    var labelfianl = component[i].label.trim();

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    Historia
                    </div>`,
      category: 'Historia',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    var componenteTipo = component[i].nombre+'-'+component[i].tipo ;

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            NombreComponent:component[i].nombre,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: true,
            highlightable: false,
            attributes: { id :componenteTipo },
            traits: traitfinal,
             
          }
      },
      view: {
        init () {

          const keys = Object.keys(templatedatos[categoria].Historia);

          // Escuchar cambios en las claves y renderizar
          keys.forEach(key => {
            this.listenTo(this.model, `change:${key}Historia`, this.renderizar);
          });
          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },

        renderizar(){

          var componenteTipo = this.model.attributes.type;

          const keys = Object.keys(templatedatos[categoria].Historia);

          keys.forEach(key => {

            const variableHistoria = this.model.get(`${key}Historia`);

            if (variableHistoria !== undefined) {
              const trimmedTituloHistoria = variableHistoria.trim();
              if (trimmedTituloHistoria !== '') {

                if(jsondata[componenteTipo]){
  
                  jsondata[componenteTipo][`${key}Historia`] = trimmedTituloHistoria;
                }
                else{
    
                  jsondata[componenteTipo] = [];
                  jsondata[componenteTipo][`${key}Historia`] = trimmedTituloHistoria;
    
                }

              }
            }
          });

          var htmlActualizado = htmlfinalhistoria.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);
        },

        openTrait(ev){

          var elemento = document.querySelector('.nohayComponent');

            if (elemento) {
                elemento.style.display = 'none';
            }

          var botonhistoria = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonhistoria.click();
  
        },
        resetearValores(model) {

          var componenteTipo = this.model.attributes.type;

          for (const key in templatedatos[categoria].Historia) {
            if (templatedatos[categoria].Historia.hasOwnProperty(key)) {
              const value = templatedatos[categoria].Historia[key];
              
              // Establecer el valor en this.model
              this.model.set(`${key}Historia`, '');
              
              // Verificar si jsondata existe y establecer la propiedad correspondiente
              if (jsondata && jsondata[componenteTipo]) {
                jsondata[componenteTipo][`${key}Historia`] = value;
              }
            }
          }

          var htmlActualizado = htmlfinalhistoria.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
          
        },

      },

    })
    

  }

  if(component[i].nombre == 'hashtag'){

    var htmlfinalhashtag = component[i].html.replace(/&amp;/g, '&');

    var htmlActualizado = htmlfinalhashtag.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var cssfinalHashtag = component[i].style.replace(/&amp;/g, '&');

    var bloqueEspecificoHashtag = `#hashtag-${component[i].tipo} {background-image: url("${jsonassets['portada-' + component[i].tipo + '-mobile']}");}`;

    const cssActualizadoHashtag = cssfinalHashtag.replace(/\${([^}]+)}/g, (match, p1) => {
      return assets ? eval(p1) : '';
    });

    //create trait dymanic 

    var trait = [
      {
        type: 'NombreComponent',
        name: 'NombreComponent',
        label: 'Nombre del Componente',
      },
    ];

    for (const key in templatedatos[categoria].Hashtag) {
      if (templatedatos[categoria].Hashtag.hasOwnProperty(key)) {
        const value = templatedatos[categoria].Hashtag[key];
        
        const textoSeparado = key.replace(/([A-Z])/g, ' $1').trim();

        trait.push({
          type: 'text',
          name: key + 'Hashtag', // Agregar 'Portada' al final de la clave
          label: textoSeparado,
          value: '',
          changeProp: 1,
        });
      }
    }

    var trait2 = [
            {
              type: 'button',
              label: '',
              name: 'resetValores',
              text: 'Resetear',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.view.resetearValores();

              }
            },
            {
              type: 'button',
              label: '',
              text: 'Eliminar',
              name: 'eliminarComponent',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.remove();

              let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);

              listaComponenteNoRepect.splice(indice, 1);

              console.log(listaComponenteNoRepect);

              var divTrait = document.querySelector('.gjs-trt-traits');

              // Limpiar el contenido del div
              divTrait.innerHTML = '';


              }
          
            },
            {
              type: 'button',
              label: '',
              name: 'subirComponente',
              text: 'Subir',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';

                //var longitud = editor.getWrapper().components.length  ;

                var arrayComponentes = editor.getWrapper().components();

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                if(ubicacion != 0){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion -1});
                }

              }
            },
            {
              type: 'button',
              label: '',
              name: 'BajarComponente',
              text: 'Bajar',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';


                var arrayComponentes = editor.getWrapper().components();

                var longitud = arrayComponentes.length  ;

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                console.log(ubicacion);
                console.log(longitud);

                if(ubicacion < longitud){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion +1});
                }

              }
            }];

    const traitfinal = trait.concat(trait2);

    // end create trait dymanic 

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    Hashtag
                    </div>`,
      category: 'Hashtag',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults:{
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: cssActualizadoHashtag,
            NombreComponent:component[i].nombre,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: true,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits: traitfinal,
          }
      },
      view: {
        init () {

          const keys = Object.keys(templatedatos[categoria].Hashtag);

          // Escuchar cambios en las claves y renderizar
          keys.forEach(key => {
            this.listenTo(this.model, `change:${key}Hashtag`, this.renderizar);
          });

        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },
        openTrait(ev){
  
          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
        renderizar(){

          var componenteTipo = this.model.attributes.type;

          console.log(componenteTipo);

          const keys = Object.keys(templatedatos[categoria].Hashtag);

          keys.forEach(key => {

            const variableHashtag = this.model.get(`${key}Hashtag`);

            console.log(variableHashtag);

            if (variableHashtag !== undefined) {
              const trimmedTituloHashtag = variableHashtag.trim();

              
              if (trimmedTituloHashtag !== '') {

                if(!jsondata[componenteTipo] || !jsondata[componenteTipo]['BotonHashtag']){

                  if(typeof jsondata[componenteTipo] == 'undefined'){
  
                    jsondata[componenteTipo] = [];
                  }
  
                  if(typeof jsondata[componenteTipo]['BotonHashtag'] == 'undefined'){
  
                    jsondata[componenteTipo]['BotonHashtag'] = {src: '#', text: 'Ver Instagram'}
                  }
                }

                if(key.includes('textoBoton')){

                  jsondata[componenteTipo]['BotonHashtag']['text'] = trimmedTituloHashtag;
                }
                else if(key.includes('linkBoton')){

                  jsondata[componenteTipo]['BotonHashtag']['src'] = trimmedTituloHashtag;

                }
                else{

                  jsondata[componenteTipo][`${key}Hashtag`] = trimmedTituloHashtag;
                }
  
                

              }
            }
          });

          var htmlActualizado = htmlfinalhashtag.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);
  
        },
        resetearValores(model) {

          var componenteTipo = this.model.attributes.type;

          for (const key in templatedatos[categoria].Hashtag) {
            if (templatedatos[categoria].Hashtag.hasOwnProperty(key)) {
              const value = templatedatos[categoria].Hashtag[key];
              
              // Establecer el valor en this.model
              this.model.set(`${key}Hashtag`, '');
              
              // Verificar si jsondata existe y establecer la propiedad correspondiente
              if (jsondata && jsondata[componenteTipo]) {
                jsondata[componenteTipo][`${key}Hashtag`] = value;
              }
            }
          }

          jsondata[componenteTipo]['BotonHashtag'] = {text: 'ver Mural', src:'#'};

          

          var htmlActualizadohashtag = htmlfinalhashtag.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
  
          const content = this.model.components(htmlActualizadohashtag);
          
        },
        renderfinal(url){

          var stylefinal = {
            "background-color": "rgb(255, 255, 255)",
            "padding-top": "4%",
            "padding-right": "4%",
            "padding-bottom": "4%",
            "padding-left": "4%",
            "display": "flex",
            "flex-direction": "column",
            "align-items": "center",
            "justify-content": "center",
            "align-content": "center",
            'background-image': `url("${url}")`,
            "background-repeat": "repeat",
            "background-position-x": "50%",
            "background-position-y": "50%",
            "background-attachment": "scroll",
            "background-size": "cover",
            "position": "relative"
          }

          this.model.setStyle(stylefinal)

        }
      }
    })

  }

  if(component[i].nombre == 'canciones'){

    var htmlfinalcanciones = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalcanciones.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var cssfinalCanciones = component[i].style.replace(/&amp;/g, '&');

    var bloqueEspecificoCanciones = `#canciones-${component[i].tipo} {background-image: url("${jsonassets['portada-' + component[i].tipo + '-mobile']}");}`;

    const cssActualizadoCanciones = cssfinalCanciones.replace(/\${([^}]+)}/g, (match, p1) => {
      return assets ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    Canciones
                    </div>`,
      category: 'Canciones',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: 'Canciones',
            components: htmlActualizado,
            styles: cssActualizadoCanciones,
            NombreComponent:component[i].nombre,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type:'text',
                name: 'tituloCancion',
                label: 'Titulo',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'textoCancion',
                label: 'Texto',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'labelNombre',
                label: 'label Nombre Cancion',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'labelAutor',
                label: 'label Autor',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'labelLink',
                label: 'label Link',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'textoBoton',
                label: 'Texto Boton',
                changeProp: 1,
                value: ''
              },
              {
                type: 'button',
                label: '',
                name: 'resetValores',
                text: 'Resetear',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.view.prueba();
  
                }
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.remove();
  
                 let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);
  
                 listaComponenteNoRepect.splice(indice, 1);
  
                 console.log(listaComponenteNoRepect);
  
                 var divTrait = document.querySelector('.gjs-trt-traits');
  
                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';
  
  
                }
            
              },
              {
                type: 'button',
                label: '',
                name: 'subirComponente',
                text: 'Subir',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
                  //var longitud = editor.getWrapper().components.length  ;
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  if(ubicacion != 0){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion -1});
                  }
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'BajarComponente',
                text: 'Bajar',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  var longitud = arrayComponentes.length  ;
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  console.log(ubicacion);
                  console.log(longitud);
  
                  if(ubicacion < longitud){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion +1});
                  }
  
                }
              }
            ]
          }
      },
      view: {
        init () {

          this.listenTo(this.model, 'change:tituloCancion', this.renderizar)
          this.listenTo(this.model, 'change:textoCancion', this.renderizar)
          this.listenTo(this.model, 'change:labelNombre', this.renderizar)
          this.listenTo(this.model, 'change:labelAutor', this.renderizar)
          this.listenTo(this.model, 'change:labelLink', this.renderizar)
          this.listenTo(this.model, 'change:textoBoton', this.renderizar)
          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },
        renderizar(){

          var componenteTipo = this.model.attributes.type;

          var tituloCancion = this.model.get("tituloCancion");
          var textoCancion = this.model.get("textoCancion");
          var labelNombre = this.model.get("labelNombre");
          var labelAutor = this.model.get("labelAutor");
          var labelLink = this.model.get("labelLink");
          var textoBoton = this.model.get("textoBoton");
  

          if(tituloCancion !== undefined){
  
            tituloCancion = tituloCancion.trim();
  
            if(tituloCancion != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].tituloCancion = tituloCancion;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].tituloCancion = tituloCancion;
  
  
              }
  
            }
  
          }
  
          if(textoCancion !== undefined){
  
            textoCancion = textoCancion.trim();
  
            if(textoCancion != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].textocanciones = textoCancion;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].textocanciones = textoCancion;
  
  
              }
  
            }
  
          }

          if(labelNombre !== undefined){
  
            labelNombre = labelNombre.trim();
  
            if(labelNombre != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].labelform1= labelNombre;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].labelform1 = labelNombre;
  
  
              }
  
            }
  
          }

          if(labelAutor !== undefined){
  
            labelAutor = labelAutor.trim();
  
            if(labelAutor != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].labelform2 = labelAutor;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].labelform2 = labelAutor;
  
  
              }
  
            }
  
          }

          if(labelLink !== undefined){
  
            labelLink = labelLink.trim();
  
            if(labelLink != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].labelform3 = labelLink;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].labelform3 = labelLink;
  
  
              }
  
            }
  
          }

          if(textoBoton !== undefined){
  
            textoBoton = textoBoton.trim();
  
            if(textoBoton != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].botonCancion = textoBoton;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].botonCancion = textoBoton;
  
  
              }
  
            }
  
          }
  
          var htmlActualizado = htmlfinalcanciones.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
  
        },
        openTrait(ev){
  
          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
        prueba(model) {

          var componenteTipo = this.model.attributes.type;

          this.model.set('tituloCancion', '');
          this.model.set('textoCancion', '');
          this.model.set('labelNombre', '');
          this.model.set('labelAutor', '');
          this.model.set('labelLink', '');
          this.model.set('textoBoton', '');

          if(jsondata && jsondata[componenteTipo].tituloCancion){

            jsondata[componenteTipo].tituloCancion = '¿Qué canciones para esa noche?';
          }
          if(jsondata && jsondata[componenteTipo].textocanciones){

            jsondata[componenteTipo].textocanciones = '¡Ayúdanos sugiriendo las canciones !';
          }
          if(jsondata && jsondata[componenteTipo].labelform1){

            jsondata[componenteTipo].labelform1 = 'Nombre de la cancion';
          }
          if(jsondata && jsondata[componenteTipo].labelform2){

            jsondata[componenteTipo].labelform2 = 'Autor';
          }
          if(jsondata && jsondata[componenteTipo].labelform3){

            jsondata[componenteTipo].labelform3 = 'Link de youtube, etc';
          }
          if(jsondata && jsondata[componenteTipo].botonCancion){

            jsondata[componenteTipo].botonCancion = 'Enviar';
          }

          var htmlActualizado = htmlfinalcanciones.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
          
        },
        renderfinal(url){

            var stylefinal = {
              "position": "relative",
              'background-image': `url("${url}")`,
              "background-position-x": "center",
              "background-position-y": "center",
              "background-repeat": "no-repeat",
              "background-size": "cover",
              "min-height": "500px",
              "display": "flex",
              "flex-direction": "column",
              "justify-content": "center",
              "align-items": "center",
              "color": "rgb(255, 255, 255)",
              "text-align": "center"
            }

          this.model.setStyle(stylefinal)

        }
      }
    })
  }

  if(component[i].nombre == 'eventos'){

    console.log(component[i].ComponentHijo);


    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    eventos
                    </div>`,
      category: 'Eventos',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            NombreComponent:component[i].nombre,
            droppable: false,
            hoverable: false,
            layerable: true,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type: 'button',
                label: '',
                text: 'Nuevo Evento',
                name: 'nuevoEvento',
                full: true, // Full width button
                command: editor => {

                  var parentDocument = parent.document;
      
                  var botonRegalos2 = parentDocument.getElementById("abrirModalEvent");
  
                  botonRegalos2.click();
                  
  
                }
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.remove();
  
                 let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);
  
                 listaComponenteNoRepect.splice(indice, 1);
  
                 console.log(listaComponenteNoRepect);
  
                 var divTrait = document.querySelector('.gjs-trt-traits');
  
                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';
  
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'subirComponente',
                text: 'Subir',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
                  //var longitud = editor.getWrapper().components.length  ;
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  if(ubicacion != 0){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion -1});
                  }
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'BajarComponente',
                text: 'Bajar',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  var longitud = arrayComponentes.length  ;
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  console.log(ubicacion);
                  console.log(longitud);
  
                  if(ubicacion < longitud){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion +1});
                  }
  
                }
              }
            ]
          }
      },
      view: {
        init () {
          
        },
        events: {
          click: 'openTrait'
        },
        openTrait(ev){

          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
      }
    })

  
    var htmlfinal2 = component[i].ComponentHijo.html.replace(/&amp;/g, '&');

    var htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var NombreTipo = component[i].nombre+'-'+component[i].tipo ;

    if (jsondata[NombreTipo] && jsondata[NombreTipo].listado) {
        
      var cantidad = jsondata[NombreTipo].listado ;

      htmlActualizado2 =`<button class="btnClickEvent mt-3 mb-3" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false">Agregar Nuevos Eventos </button>
      <div class="owl-carousel eventos" ${stringGrapes}>`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        htmlActualizado2 += `<div class="card card-eventos p-4" ${stringGrapes}>
        <img src="${valor['cardImagenEvento']}"  class="cardImagenEvento" ${stringGrapes}/>
        <div class="card-body" ${stringGrapes}>
          <h5 class="cardTitulo" ${stringGrapes}>${valor['cardTitulo']}</h5>
          <div class="divhorario" ${stringGrapes}>
            <span ${stringGrapes}>${valor['default']}</span>
          </div>
          <h5 class="cardLugar" ${stringGrapes}>${valor['cardLugar']}</h5>
          <span class="cardDireccion" ${stringGrapes}>${valor['cardDireccion']}</span>
          <br/>
          <br/>
          <a href="${valor['botonEventos'].src}" class="botonEventos" ${stringGrapes}>${valor['botonEventos'].text}</a>
        </div>
      </div>`;
    });
                                      
                                                                  
    htmlActualizado2 += '</div>';

    }

    dc.addType(component[i].ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2 ,
          styles: component[i].ComponentHijo.style,
          edicion:false,
          droppable: false,
          hoverable: false,
          highlightable:false,
          attributes: { id: component[i].ComponentHijo.nombre },
          traits: [
            /*
            {
              type: "number",
              name: "cantidadEvent",
              label: "Numero de Eventos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
            
            { type: 'custom-info' }*/
          ],
          script: function () {
    
            $('.eventos').owlCarousel({
              loop: false,
              margin: 15,
              nav: true,
              navText: [
                "<i class='fa fa-caret-left'></i>",
                "<i class='fa fa-caret-right'></i>"
              ],
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
            })

            $(document).ready(function() {

              $('.btnClickEvent').click(function() {

                console.log('hola');

                var parentDocument = parent.document;

                var botonRegalos2 = parentDocument.getElementById("abrirModalEvent");

                botonRegalos2.click();
              });
            
            });
            
          },
        },
      },
    
      isComponent: (el) => {
        
      },
    
      view: {
        init({ model }) {
          this.listenTo(model, "change:cantidadEvent", this.onActive);
          this.listenTo(model, "change:cantidadEvent", this.updateScript);
          this.listenTo(model, "change:cantidadEvent", this.onStyle);

          this.listenTo(model, "change:edicion", this.onActive);
          this.listenTo(model, "change:edicion", this.onStyle);
          this.listenTo(model, "change:edicion", this.updateScript);
        },

        events: {
          click: 'openTrait'
        },

        openTrait(){

          var boton2 = document.getElementById("tabAjustes");

          // Simular un clic en el botón
          boton2.click();

        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadEvent");

          var tipotemplatefinal = 'eventos-'+tipoTemplate;

          console.log(tipotemplatefinal);

          console.log(jsondata);

          var listadeEventos = jsondata[tipotemplatefinal].listado;

          console.log(listadeEventos);

          let html = `<button class="btnClickEvent mt-3 mb-3" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false">Agregar Nuevos Eventos </button>
            <div class="carousel-wrap" ${stringGrapes}>
              <div class="owl-carousel eventos" ${stringGrapes}>`;

          listadeEventos.forEach(evento => {

          html += `<div class="card card-eventos p-4" ${stringGrapes}>
                          <img class="cardImagenEvento" src="${evento.cardImagenEvento}" ${stringGrapes}>
                          <div class="card-body" ${stringGrapes}>
                            <h5 class="cardTitulo" ${stringGrapes}>${evento.cardTitulo}</h5>
                            <div class="divhorario" ${stringGrapes}>
                              <span ${stringGrapes}>${evento.default}</span>
                            </div>
                            <h5 class="cardLugar" ${stringGrapes}>${evento.cardLugar}</h5>
                            <span class="cardDireccion" ${stringGrapes}>${evento.cardDireccion}</span>
                            <br>
                            <br>
                            <a href="${evento.botonEventos.src}" class="botonEventos" ${stringGrapes}>${evento.botonEventos.text}</a>
                          </div>
                        </div>`;
          });

          html += ` </div>
                    </div>`;
          
          const content = model.components(html);

          var edicionfinal = this.model.get("edicion");

          if(edicionfinal){

            model.set('edicion', false);

          }
    
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

  if(component[i].nombre == 'contador'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var cssfinal = component[i].style.replace(/&amp;/g, '&');


    const cssActualizado = cssfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    contador
                    </div>`,
      category: 'Contador',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            NombreComponent:component[i].nombre,
            void: false,
            droppable: false,
            highlightable:false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                label: 'Fecha del evento',
                name: 'startfrom',
                changeProp: 1,
                type: 'date',
              },
              {
                label: 'Texto cuando termine la espera',
                name: 'endText',
                changeProp: 1,
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.remove();
  
                 let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);
  
                 listaComponenteNoRepect.splice(indice, 1);
  
                 console.log(listaComponenteNoRepect);
  
                 var divTrait = document.querySelector('.gjs-trt-traits');
  
                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'subirComponente',
                text: 'Subir',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
                  //var longitud = editor.getWrapper().components.length  ;
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  if(ubicacion != 0){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion -1});
                  }
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'BajarComponente',
                text: 'Bajar',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  var longitud = arrayComponentes.length  ;
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  console.log(ubicacion);
                  console.log(longitud);
  
                  if(ubicacion < longitud){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion +1});
                  }
  
                }
              }
            ]
          }
        
      },
      view: {
        init () {
          this.listenTo(this.model, 'active', this.onActive)
          this.listenTo(this.model, 'change:src', this.updateImage)

          this.listenTo(this.model, 'change:startfrom', this.changeData)
          this.listenTo(this.model, 'change:endText', this.changeData)
        },
        events: {
          //dblclick: 'onActive',
          click: 'openTrait'
        },
        openTrait(ev){

          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
        onActive (ev) {
    
          if (ev) {
            editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
          }
          
        },
        updateImage (model, url) {

          const selected = deviceManager.getSelected();

          console.log(selected.id);

          console.log(url);

          if (url) {

            const style = model.getStyle()

            if(selected.id =='desktop'){

              assets[model.ccid + '-desktop'] = url;

            }

            else{

              assets[model.ccid + '-mobile'] = url;
            }

            console.log(assets);
    
            model.setStyle({
              'background-image':`url("${url}")`,
              'padding': '60px 0px 40px 0px',
              'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)'
            })
          }
        },
        changeData(){

          var startfrom = this.model.get(`startfrom`);

          var endText = this.model.get(`endText`);

          if(typeof startfrom != 'undefined'){

            var selectorfinal = '#countdownWestern';
          
            var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
          
            if (componente3) {
              componente3.set('startfrom', startfrom);
            }

          }

          if(typeof endText != 'undefined'){

            var selectorfinal = '#countdownWestern';
          
            var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
          
            if (componente3) {
              componente3.set('endText', endText);
            }

          }


        },
        renderfinal(url){

          var stylefinal = {
            "padding-top": "60px",
            "padding-right": "0px",
            "padding-bottom": "40px",
            "padding-left": "0px",
            'background-image': `url("${url}")`,
            "background-attachment": "fixed",
            "background-origin": "initial",
            "background-clip": "initial",
            "background-color": "initial",
            "background-size": "cover",
            "background-position-x": "center",
            "background-position-y": "center",
            "background-repeat": "no-repeat",
            "position":"relative"
        };

        this.model.setStyle(stylefinal)

        }
      }
    })

    var startTime = '2024-07-25 00:00';

    var endTxt = 'Termino la espera';

    if(assets['contador'] && assets['contador'].startfrom){

      startTime = assets['contador'].startfrom

    }

    if(assets['contador'] && assets['contador'].endTxt ){

      endTxt = assets['contador'].endTxt

    }

    let c = {

      // Default style
      defaultStyle: true,
    
      // Default start time, eg. '2018-01-25 00:00'
      startTime: startTime,
    
      // Text to show when the countdown is ended
      endText: endTxt,
    
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

    console.log(c.startTime)
    
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
          startfrom: c.startTime,
          endText: c.endText,
          droppable: false,
          badgable:false,
          hoverable:false,
          styles: cssActualizado,
          highlightable:false,
          attributes: { id: 'countdownWestern' },
          traits: [{
            label: 'Fecha del evento',
            name: 'startfrom',
            changeProp: 1,
            type: c.dateInputType,
          },{
            label: 'Texto cuando termine la espera',
            name: 'endText',
            changeProp: 1,
          }],
          script: function() {

            var startfrom = '{[ startfrom ]}';
            var endTxt = '{[ endText ]}';
            console.log(startfrom);
            localStorage.setItem('startfrom', startfrom);
            localStorage.setItem('endTxt', endTxt);
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
    
        },

        events:{
          click: 'OpenTrait'
        },
        OpenTrait(){

          var boton5 = document.getElementById("tabAjustes");

          // Simular un clic en el botón
          boton5.click();
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

  if(component[i].nombre == 'mensaje'){

    var htmlfinalMensaje = component[i].html.replace(/&amp;/g, '&');


    const htmlActualizado = htmlfinalMensaje.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var cssfinalMensaje = component[i].style.replace(/&amp;/g, '&');

    var bloqueEspecificoMensaje = `#mensaje-${component[i].tipo} {background-image: url("${jsonassets['portada-' + component[i].tipo + '-mobile']}");}`;

    const cssActualizadoMensaje = cssfinalMensaje.replace(/\${([^}]+)}/g, (match, p1) => {
      return assets ? eval(p1) : '';
    });



    var labelfianl = component[i].label.trim();
  
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    mensaje
                    </div>`,
      category: 'Mensaje',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: cssActualizadoMensaje ,
            actualizar: false,
            NombreComponent:component[i].nombre,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type:'text',
                name: 'mensaje',
                label: 'Dedicatoria',
                changeProp: 1,
                value: ''
              },
              {
                type: 'button',
                label: '',
                name: 'resetValores',
                text: 'Resetear',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.view.resetearValores();
  
                }
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.remove();
  
                 let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);
  
                 listaComponenteNoRepect.splice(indice, 1);
  
                 console.log(listaComponenteNoRepect);
  
                 var divTrait = document.querySelector('.gjs-trt-traits');
  
                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';
  
  
                }
            
              },
              {
                type: 'button',
                label: '',
                name: 'subirComponente',
                text: 'Subir',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
                  //var longitud = editor.getWrapper().components.length  ;
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  if(ubicacion != 0){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion -1});
                  }
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'BajarComponente',
                text: 'Bajar',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  var longitud = arrayComponentes.length  ;
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  console.log(ubicacion);
                  console.log(longitud);
  
                  if(ubicacion < longitud){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion +1});
                  }
  
                }
              }
            ]
          }
      },
      view: {
        init () {
          this.listenTo(this.model, 'active', this.onActive)
          this.listenTo(this.model, 'change:src', this.updateImage)

          this.listenTo(this.model, 'change:actualizar', this.renderfinal)

          this.listenTo(this.model, 'change:mensaje', this.renderizar)
        },
        events: {
          //dblclick: 'onActive',
          click: 'openTrait'
        },
        renderizar(){

          var componenteTipo = this.model.attributes.type;

          var mensaje = this.model.get("mensaje");

          if(mensaje !== undefined){
  
            mensaje = mensaje.trim();
  
            if(mensaje != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].textodedicatoria = mensaje;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].textodedicatoria = mensaje;
  
  
              }
  
            }
  
          }
  
  
          var htmlActualizado = htmlfinalMensaje.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
  
        },
        resetearValores(model) {

          var componenteTipo = this.model.attributes.type;

          this.model.set('mensaje', '');

          if(jsondata && jsondata[componenteTipo].textodedicatoria){

            jsondata[componenteTipo].textodedicatoria = 'Vayan poniendose sus mejores trajes que estos novios se casan';
          }
  
          const content = this.model.components(htmlActualizado);
          
        },
        openTrait(ev){
  
          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
        onActive (ev) {
    
          if (ev) {
            editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
          }
          
        },
        updateImage (model, url) {

          const selected = deviceManager.getSelected();

          console.log(selected.id);

          if (url) {

            const style = model.getStyle()

            if(selected.id =='desktop'){

              assets[model.ccid + '-desktop'] = url;

            }

            else{

              assets[model.ccid + '-mobile'] = url;
            }


            console.log(assets);
    
            model.setStyle({
              'background-image':`url("${url}")`,
              'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)',
              'background-size': 'cover',
              'background-position': 'center center',
              'background-repeat': 'no-repeat',
            })
          }
        },
        renderfinal(url){

          
            var stylefinal = {
              "width": "100%",
              "height": "200px",
              'background-image': `url("${url}")`,
              "background-attachment": "fixed",
              "background-origin": "initial",
              "background-clip": "initial",
              "background-color": "initial",
              "box-shadow": "rgba(7, 7, 7, 0.3) 0px 0px 0px 2000px inset",
              "background-size": "cover",
              "background-position-x": "center",
              "background-position-y": "center",
              "background-repeat": "no-repeat"
          };

          this.model.setStyle(stylefinal)
          

        }
      }
    })

  }

  if(component[i].nombre == 'confirmacion'){

    var htmlfinalConfirmacion = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalConfirmacion.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    confirmacion
                    </div>`,
      category: 'Confirmacion',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            void: false,
            droppable: false,
            NombreComponent:component[i].nombre,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type:'text',
                name: 'tituloConfirmacion',
                label: 'Titulo',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'textoConfirmacion',
                label: 'Texto',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'labelSiPuedo',
                label: 'label Si',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'labelNoPuedo',
                label: 'label No',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'textoBoton',
                label: 'Texto Boton',
                changeProp: 1,
                value: ''
              },
              {
                type: 'button',
                label: '',
                name: 'resetValores',
                text: 'Resetear',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.view.resetearValores();
  
                }
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.remove();
  
                 let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);
  
                 listaComponenteNoRepect.splice(indice, 1);
  
                 console.log(listaComponenteNoRepect);
  
                 var divTrait = document.querySelector('.gjs-trt-traits');
  
                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';
  
  
                }
            
            },
            {
              type: 'button',
              label: '',
              name: 'subirComponente',
              text: 'Subir',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';

                //var longitud = editor.getWrapper().components.length  ;

                var arrayComponentes = editor.getWrapper().components();

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                if(ubicacion != 0){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion -1});
                }

              }
            },
            {
              type: 'button',
              label: '',
              name: 'BajarComponente',
              text: 'Bajar',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';


                var arrayComponentes = editor.getWrapper().components();

                var longitud = arrayComponentes.length  ;

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                console.log(ubicacion);
                console.log(longitud);

                if(ubicacion < longitud){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion +1});
                }

              }
            }
            ]
          }
      },
      view: {
        init () {

          this.listenTo(this.model, 'change:tituloConfirmacion', this.renderizar)
          this.listenTo(this.model, 'change:textoConfirmacion', this.renderizar)
          this.listenTo(this.model, 'change:labelSiPuedo', this.renderizar)
          this.listenTo(this.model, 'change:labelNoPuedo', this.renderizar)
          this.listenTo(this.model, 'change:textoBoton', this.renderizar)
          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },

        renderizar(){

          var componenteTipo = this.model.attributes.type;

          var tituloConfirmacion = this.model.get("tituloConfirmacion");
          var textoConfirmacion = this.model.get("textoConfirmacion");
          var labelSiPuedo = this.model.get("labelSiPuedo");
          var labelNoPuedo = this.model.get("labelNoPuedo");
          var textoBoton = this.model.get("textoBoton");
  
        
          if(tituloConfirmacion !== undefined){
  
            tituloConfirmacion = tituloConfirmacion.trim();
  
            if(tituloConfirmacion != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].tituloconfirmacion = tituloConfirmacion;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].tituloconfirmacion = tituloConfirmacion;
  
  
              }
  
            }
  
          }

          if(textoConfirmacion !== undefined){
  
            textoConfirmacion = textoConfirmacion.trim();
  
            if(textoConfirmacion != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].textoconfirmacion = textoConfirmacion;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].textoconfirmacion = textoConfirmacion;
  
  
              }
  
            }
  
          }

          if(labelSiPuedo !== undefined){
  
            labelSiPuedo = labelSiPuedo.trim();
  
            if(labelSiPuedo != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].label1 = labelSiPuedo;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].label1 = tituloConfirmacion;
  
  
              }
  
            }
  
          }

          if(labelNoPuedo !== undefined){
  
            labelNoPuedo = labelNoPuedo.trim();
  
            if(labelNoPuedo != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].label2 = labelNoPuedo;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].label2 = labelNoPuedo;
  
  
              }
  
            }
  
          }

          if(textoBoton !== undefined){
  
            textoBoton = textoBoton.trim();
  
            if(textoBoton != ''){

              console.log('entro al boton');
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].botonConfirmacion = textoBoton;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].botonConfirmacion = textoBoton;
  
  
              }
  
            }
  
          }
  

          var htmlActualizado = htmlfinalConfirmacion.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
  
        },
        resetearValores(){

          var componenteTipo = this.model.attributes.type;

          this.model.set('tituloConfirmacion', '');
          this.model.set('textoConfirmacion', '');
          this.model.set('labelSiPuedo', '');
          this.model.set('labelNoPuedo', '');
          this.model.set('textoBoton', '');

          if(jsondata && jsondata[componenteTipo].tituloconfirmacion){

            jsondata[componenteTipo].tituloconfirmacion = 'Confirmacion';
          }

          if(jsondata && jsondata[componenteTipo].textoconfirmacion){

            jsondata[componenteTipo].textoconfirmacion = 'Para poder participar de todo esto, es necesario que confirmes tu asistencia cuanto antes. La fecha límite es el 20 de Marzo del 2023. Completa el siguiente formulario para confirmar tu asistencia.';
          }

          if(jsondata && jsondata[componenteTipo].label1){

            jsondata[componenteTipo].label1 = 'Si puedo';
          }

          if(jsondata && jsondata[componenteTipo].label2){

            jsondata[componenteTipo].label2 = 'No puedo';
          }

          if(jsondata && jsondata[componenteTipo].botonConfirmacion){

            jsondata[componenteTipo].botonConfirmacion = 'Confirmacion';
          }

          var htmlActualizado = htmlfinalConfirmacion.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);
        },
        openTrait(ev){
  
          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
      }
    })
  }

  if(component[i].nombre == 'regalos'){

    var htmlfinalregalos = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalregalos.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    //create trait dymanic 

    var trait = [
      {
        type: 'NombreComponent',
        name: 'NombreComponent',
        label: 'Nombre del Componente',
      },
    ];

    for (const key in templatedatos[categoria].Regalos) {
      if (templatedatos[categoria].Regalos.hasOwnProperty(key)) {
        const value = templatedatos[categoria].Regalos[key];
        
        const textoSeparado = key.replace(/([A-Z])/g, ' $1').trim();

        trait.push({
          type: 'text',
          name: key + 'Regalos', // Agregar 'Portada' al final de la clave
          label: textoSeparado,
          value: '',
          changeProp: 1,
        });
      }
    }

    var trait2 = [
            {
              type: 'button',
              label: '',
              name: 'NuevoRegalo',
              text: 'Nuevo Regalo',
              full: true, // Full width button
              command: editor => {

                var parentDocument = parent.document;

                var botonRegalos2 = parentDocument.getElementById("abrirModalRegalos");

                botonRegalos2.click();

              }
            },
            {
              type: 'button',
              label: '',
              name: 'resetValores',
              text: 'Resetear',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.view.resetearValores();

              }
            },
            {
              type: 'button',
              label: '',
              text: 'Eliminar',
              name: 'eliminarComponent',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.remove();

              let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);

              listaComponenteNoRepect.splice(indice, 1);

              console.log(listaComponenteNoRepect);

              var divTrait = document.querySelector('.gjs-trt-traits');

              // Limpiar el contenido del div
              divTrait.innerHTML = '';


              }
          
            },
            {
              type: 'button',
              label: '',
              name: 'subirComponente',
              text: 'Subir',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';

                //var longitud = editor.getWrapper().components.length  ;

                var arrayComponentes = editor.getWrapper().components();

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                if(ubicacion != 0){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion -1});
                }

              }
            },
            {
              type: 'button',
              label: '',
              name: 'BajarComponente',
              text: 'Bajar',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';


                var arrayComponentes = editor.getWrapper().components();

                var longitud = arrayComponentes.length  ;

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                console.log(ubicacion);
                console.log(longitud);

                if(ubicacion < longitud){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion +1});
                }

              }
            }];

    const traitfinal = trait.concat(trait2);

    // end create trait dymanic 


    const script = function() {
      
      $(document).ready(function() {

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
    
        acc.addEventListener('click', function () {
            panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
        });
    

      });
    };

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    regalos
                    </div>`,
      category: 'Regalos',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            script,
            hoverable: false,
            layerable: true,
            highlightable: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            NombreComponent:component[i].nombre,
            traits: traitfinal,
          }
      },
      view: {
        init () {

        
          const keys = Object.keys(templatedatos[categoria].Regalos);

          keys.forEach(key => {
            this.listenTo(this.model, `change:${key}Regalos`, this.renderizar);
            this.listenTo(this.model, `change:${key}Regalos`, this.updateScript);
          });
          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },
        renderizar(){

          var componenteTipo = this.model.attributes.type;

          const keys = Object.keys(templatedatos[categoria].Regalos);

          keys.forEach(key => {

            const variableRegalos = this.model.get(`${key}Regalos`);

            if (variableRegalos !== undefined) {
              const trimmedTituloRegalos = variableRegalos.trim();
              if (trimmedTituloRegalos !== '') {

                if(jsondata[componenteTipo]){
  
                  jsondata[componenteTipo][`${key}Regalos`] = trimmedTituloRegalos;
                }
                else{
    
                  jsondata[componenteTipo] = [];
                  jsondata[componenteTipo][`${key}Regalos`] = trimmedTituloRegalos;
    
                }

              }
            }
          });
  
  
          var htmlActualizado = htmlfinalregalos.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
  
        },

        resetearValores(){

          var componenteTipo = this.model.attributes.type;

          for (const key in templatedatos[categoria].Regalos) {
            if (templatedatos[categoria].Regalos.hasOwnProperty(key)) {
              const value = templatedatos[categoria].Regalos[key];
              
              // Establecer el valor en this.model
              this.model.set(`${key}Regalos`, '');
              
              // Verificar si jsondata existe y establecer la propiedad correspondiente
              if (jsondata && jsondata[componenteTipo]) {
                jsondata[componenteTipo][`${key}Regalos`] = value;
              }
            }
          }


          var htmlActualizado = htmlfinalregalos.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);


        },
        openTrait(ev){
  
          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
      }
    })

    var htmlfinal2 = component[i].ComponentHijo.html.replace(/&amp;/g, '&');

    var htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var NombreTipo = component[i].nombre+'-'+component[i].tipo ;


    if (jsondata[NombreTipo] && jsondata[NombreTipo].listado) {


      
      var cantidad = jsondata[NombreTipo].listado ;

      htmlActualizado2 =`<button class="btnClickRegalos mt-3 mb-3" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false">Agregar Nuevos Regalos </button>
                        <div class="owl-carousel regalos2" ${stringGrapes}>`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        htmlActualizado2 += `<div class="card card-regalo p-4" ${stringGrapes}>
        <img class="cardImgRegalo" src="${valor['cardImgRegalo']}" alt="Card image cap" ${stringGrapes}>
        <div class="card-body" ${stringGrapes}>
          <h5 class="cardTituloRegalo" ${stringGrapes}>${valor['cardTituloRegalo']}</h5>
          <span class="cardDescRegalo" ${stringGrapes}></span>
          <h5 class="cardPrecioRegalo mt-3" ${stringGrapes}>${valor['cardPrecioRegalo']}</h5>
          <br>
          <a href="${valor['botonRegalo'].src}" class="botonRegalo" ${stringGrapes}>${valor['botonRegalo'].text}</a>
        </div>
      </div>`;
    });
                                      
                                                                  
    htmlActualizado2 += '</div></div>';         
      

    }

    dc.addType(component[i].ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2 ,
          styles: component[i].ComponentHijo.style,
          edicion:false,
          droppable: false,
          draggable:false,
          highlightable:false,
          hoverable: false,
          attributes: { id: component[i].ComponentHijo.nombre },
          traits: [
            /*
            {
              type: "number",
              name: "cantidadRegalos",
              label: "N° de Regalos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },
    
            {
              type: 'listaRegalos'
            }
            */
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

            //boton click regalos

            $(document).ready(function() {

              $('.btnClickRegalos').click(function() {

                console.log('hola');

                var parentDocument = parent.document;

                var botonRegalos2 = parentDocument.getElementById("abrirModalRegalos");

                botonRegalos2.click();
              });
            
            });

            
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

          this.listenTo(model, "change:edicion", this.onActive);
          this.listenTo(model, "change:edicion", this.onStyle);
          this.listenTo(model, "change:edicion", this.updateScript);
        },

        events:{
          dblclick: 'OpenTrait'
        },
        OpenTrait(){

          //var boton4 = document.getElementById("trait-tab");

          // Simular un clic en el botón
          //boton4.click();

          //var botonRegalos = document.getElementById("abrirModalRegalos");

          //botonRegalos.click();

        
        },
        onActive (model) {

          var componenteTipo = this.model.attributes.type;
    
          var cantidad = this.model.get("cantidadRegalos");

          var tipotemplatefinal = 'regalos-'+tipoTemplate;

          var listadeRegalos = jsondata[tipotemplatefinal].listado;
    
          html = `<button class="btnClickRegalos mt-3 mb-3" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false">Agregar Nuevos Regalos </button>
                    <div class="owl-carousel regalos2" ${stringGrapes}>`;
    
          listadeRegalos.forEach(regalo => {
    
            html += `<div class="card card-regalo p-4" ${stringGrapes}>
                      <img class="cardImgRegalo" src="${regalo.cardImgRegalo}" alt="Card image cap" ${stringGrapes}>
                      <div class="card-body" ${stringGrapes}>
                        <h5 class="cardTituloRegalo" ${stringGrapes}>${regalo.cardTituloRegalo}</h5>
                        <h5 class="cardPrecioRegalo mt-3" ${stringGrapes}>${regalo.cardPrecioRegalo}</h5>
                        <br>
                        <a href="${regalo.botonRegalo.src}" class="botonRegalo" ${stringGrapes}>REGALAR</a>
                      </div>
                    </div>`;
    
                  });
    
          html += `</div>
                  </div>`
    
          
          const content = model.components(html);

          var edicionfinal = this.model.get("edicion");

          if(edicionfinal){

            model.set('edicion', false);

          }
    
        },
    
        onStyle (model){
    
          console.log('hola');
    
          var css = `.owl-carousel{
                      display: flex !important;  // to override display:bloc i added !important
                      flex-direction: row;   
                      justify-content: center;  // to center you carousel
                    }`;
    
          const content = model.setStyle(css);
    
    
        }
    
    
      },
    });

  }

  if(component[i].nombre == 'galeria'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    galeria
                    </div>` ,
      category: "Galeria",
      content: {
            type: component[i].nombre+'-'+component[i].tipo
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            NombreComponent:component[i].nombre,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type: 'button',
                label: '',
                text: 'Nueva Foto',
                name: 'AgregarFoto',
                full: true, // Full width button
                command: editor => {

                  var parentDocument = parent.document;
      
                  var botonRegalos2 = parentDocument.getElementById("abrirModalGaleria");
      
                  botonRegalos2.click();
  
                }
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.remove();
  
                 let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);
  
                 listaComponenteNoRepect.splice(indice, 1);
  
                 console.log(listaComponenteNoRepect);
  
                 var divTrait = document.querySelector('.gjs-trt-traits');
  
                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';
  
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'subirComponente',
                text: 'Subir',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
                  //var longitud = editor.getWrapper().components.length  ;
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  if(ubicacion != 0){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion -1});
                  }
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'BajarComponente',
                text: 'Bajar',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  var longitud = arrayComponentes.length  ;
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  console.log(ubicacion);
                  console.log(longitud);
  
                  if(ubicacion < longitud){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion +1});
                  }
  
                }
              }
            ]
          }
      },
      view: {
        init () {
          
        },
        events: {
          click: 'openTrait'
        },

        openTrait(){

          var botonPortada = document.getElementById("tabAjustes");

          // Simular un clic en el botón
          botonPortada.click();

        },
      }
    })

    var fotoUrl = srcFotos[tipoTemplate];

    var htmlfinal2 = component[i].ComponentHijo.html.replace(/&amp;/g, '&');

    var htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var NombreTipo = component[i].nombre+'-'+component[i].tipo ;


    if (jsondata[NombreTipo] && jsondata[NombreTipo].listado) {

      
      var cantidad = jsondata[NombreTipo].listado ;

      htmlActualizado2 =`<button class="btnClickFoto mt-3 mb-3" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false">Agregar Nueva Foto </button>
      <div class="carousel-wrap" ${stringGrapes}>
      <div class="owl-carousel galeria owl-theme" ${stringGrapes}>`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        htmlActualizado2 += `<div class="item" ${stringGrapes}>
        <img class="imgGaleria" src="${valor['imgGaleria']}" class="img" ${stringGrapes}/>
      </div>`;
    });
                                      
                                                                  
    htmlActualizado2 += '</div></div>';         
      

    }


    dc.addType(component[i].ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2,
          styles: component[i].ComponentHijo.style,
          edicion:false,
          droppable: false,
          draggable:false,
          highlightable:false,
          hoverable: false,
          attributes: { id: component[i].ComponentHijo.nombre },
          traits: [
            /*
            
            {
              type: "number",
              name: "cantidadEvent",
              label: "N° de Fotos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },

            {
              type: "number",
              name: "cantidadEventPorPagina",
              label: "N° de Fotos por pagina",
              placeholder: '0-100',
              min: 1, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },*/
          ],
          script: function () {
    
            const cantidadEvent = "{[ cantidadEvent ]}";

            var cantidadEventporPagina = "{[ cantidadEventPorPagina ]}";

            if(cantidadEventporPagina == ''){

              cantidadEventporPagina = 3 ;
            }

            console.log(cantidadEventporPagina);
    
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
                  items: cantidadEventporPagina
                },
                1000: {
                  items: cantidadEventporPagina
                }
              }
            });

            $(document).ready(function() {

              $('.btnClickFoto').click(function() {


                var parentDocument = parent.document;

                var botonRegalos2 = parentDocument.getElementById("abrirModalGaleria");

                botonRegalos2.click();
              });
            
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

          this.listenTo(model, "change:edicion", this.onActive);
          this.listenTo(model, "change:edicion", this.updateScript);
          this.listenTo(model, "change:edicion", this.onStyle);

          this.listenTo(model, "change:cantidadEventPorPagina", this.updateScript);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadEvent");

          var tipotemplatefinal = 'galeria-'+tipoTemplate;

          var listagaleria = jsondata[tipotemplatefinal].listado;

          console.log(listagaleria);
    

          var html = `<button class="btnClickFoto mt-3 mb-3" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false">Agregar Nueva Foto </button>
          <div class="carousel-wrap" ${stringGrapes}>
          <div class="owl-carousel galeria owl-theme" ${stringGrapes}>`;

          listagaleria.forEach(function(foto) {
            html += `<div class="item" ${stringGrapes}>
                      <img class="imgGaleria" src="${foto.imgGaleria}" class="img" ${stringGrapes}/>
                    </div>`;
          });

          html += `</div>
                    </div>`;
    
          
          const content = model.components(html);

          var edicionfinal = this.model.get("edicion");

          if(edicionfinal){

            model.set('edicion', false);

          }
    
        },
    
        onStyle (model){
    
          var css = `
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

  if(component[i].nombre == 'testigos'){

    var htmlfinalTestigos = component[i].html.replace(/&amp;/g, '&');


    const htmlActualizado = htmlfinalTestigos.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    testigos
                    </div>` ,
      category: "Testigos",
      content: {
            type: component[i].nombre+'-'+component[i].tipo
      }
    });

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            styles: component[i].style ,
            NombreComponent:component[i].nombre,
            droppable: false,
            hoverable: false,
            layerable: true,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type:'text',
                name: 'tituloTestigos',
                label: 'Titulo',
                changeProp: 1,
                value: ''
              },
              {
                type: 'button',
                label: '',
                name: 'resetValores',
                text: 'Resetear',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.view.resetearValores();
  
                }
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.remove();
  
                 let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);
  
                 listaComponenteNoRepect.splice(indice, 1);
  
                 console.log(listaComponenteNoRepect);
  
                 var divTrait = document.querySelector('.gjs-trt-traits');
  
                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';
  
                }
            },
            {
              type: 'button',
              label: '',
              name: 'subirComponente',
              text: 'Subir',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';

                //var longitud = editor.getWrapper().components.length  ;

                var arrayComponentes = editor.getWrapper().components();

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                if(ubicacion != 0){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion -1});
                }

              }
            },
            {
              type: 'button',
              label: '',
              name: 'BajarComponente',
              text: 'Bajar',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';


                var arrayComponentes = editor.getWrapper().components();

                var longitud = arrayComponentes.length  ;

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                console.log(ubicacion);
                console.log(longitud);

                if(ubicacion < longitud){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion +1});
                }

              }
            }
            ]
          }
      },
      view: {
        init () {

          this.listenTo(this.model, 'change:tituloTestigos', this.renderizar)
          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },
        renderizar(){

          var componenteTipo = this.model.attributes.type;

          var tituloTestigos = this.model.get("tituloTestigos");
  
  
          if(tituloTestigos !== undefined){
  
            tituloTestigos = tituloTestigos.trim();
  
            if(tituloTestigos != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].titulopadrinos = tituloTestigos;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].titulopadrinos = tituloTestigos;
  
  
              }
  
            }
  
          }

  
          var htmlActualizado = htmlfinalTestigos.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
  
        },
        resetearValores(){

          var componenteTipo = this.model.attributes.type;

          this.model.set('tituloTestigos', '');

          if(jsondata && jsondata[componenteTipo].titulopadrinos){

            jsondata[componenteTipo].titulopadrinos = 'Testigos';
          }

          var htmlActualizado = htmlfinalTestigos.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);

        },
        openTrait(ev){

          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
      }
    })

    var htmlfinal2 = component[i].ComponentHijo.html.replace(/&amp;/g, '&');

    var htmlActualizado2 = htmlfinal2.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var NombreTipo = component[i].nombre+'-'+component[i].tipo ;


    if (jsondata[NombreTipo] && jsondata[NombreTipo].listado) {
        
      var cantidad = jsondata[NombreTipo].listado ;

      htmlActualizado2 = `<button class="btnClickTestigos mt-3 mb-3" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false">Agregar Nuevos Testigos </button>
                          <div class="owl-carousel padrinos" ${stringGrapes}>`;
      
    
      cantidad.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);

        htmlActualizado2 += `<div class=" text-card card-testigo" ${stringGrapes}>
                              <img src="${valor['cardImg']}" alt="Card image cap" class="cardImg" ${stringGrapes}/>
                                        <div class="card-body" ${stringGrapes}>
                                          <h5 class="cardNombre text-dark" ${stringGrapes}>${valor['cardNombre']}
                                          </h5>
                                          <span class="cardRelacion text-dark" ${stringGrapes}>${valor['cardRelacion']}</span>
                                          <br/>
                                        </div>
                            </div>`;
    });
                                      
                                                                  
    htmlActualizado2 += '</div>';

    }

    dc.addType(component[i].ComponentHijo.nombre, {
      model: {
        defaults: {
          components: htmlActualizado2,
          styles: component[i].ComponentHijo.style,
          edicion:false,
          void: false,
          droppable: false,
          hoverable: false,
          highlightable:false,
          attributes: { id: component[i].ComponentHijo.nombre },
          traits: [/*
            
            {
              type: "number",
              name: "cantidadTestigos",
              label: "N° de testigos",
              placeholder: '0-100',
              min: 0, // Minimum number value
              max: 100, // Maximum number value
              changeProp: 1,
            },*/
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

            $(document).ready(function() {

              $('.btnClickTestigos').click(function() {


                var parentDocument = parent.document;

                var botonRegalostestigo = parentDocument.getElementById("abrirModalTestigos");

                botonRegalostestigo.click();
              });
            
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

          this.listenTo(model, "change:edicion", this.onActive);
          this.listenTo(model, "change:edicion", this.updateScript);
          this.listenTo(model, "change:edicion", this.onStyle);
        },
        onActive (model) {
    
          var cantidad = this.model.get("cantidadTestigos");

          var tipotemplatefinal = 'testigos-'+tipoTemplate;

          var listatestigos = jsondata[tipotemplatefinal].listado;

          console.log(listatestigos);
    
          html = `<button class="btnClickTestigos mt-3 mb-3" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false"  data-gjs-highlightable="false" data-gjs-droppable="false">Agregar Nuevos testigo </button>
          <div class="carousel-wrap" ${stringGrapes}>
                                <div class="owl-carousel padrinos" ${stringGrapes}>`;

          listatestigos.forEach(function(testigo) {

                html += `<div class="text-center card-testigo" ${stringGrapes}>
                <img class="cardImg" src="${testigo.cardImg}" alt="Card image cap" ${stringGrapes}>
                <div class="card-body" ${stringGrapes}>
                  <h5 class="cardNombre text-dark" ${stringGrapes}>${testigo.cardNombre}</h5>
                  <span class="cardRelacion text-dark" ${stringGrapes}>${testigo.cardRelacion}</span>
                  <br>
                </div>
              </div>`;

          });
    
          html += ` </div>
                    </div>`;
    
          
          const content = model.components(html);

          var edicionfinal = this.model.get("edicion");

          if(edicionfinal){

            model.set('edicion', false);

          }
    
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

  if(component[i].nombre == 'vestimenta'){


    var htmlfinalVestimenta = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalVestimenta.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    Vestimenta
                    </div>`,
      category: 'Vestimenta',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    const script = function() {
      
    };

    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults:  {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            NombreComponent:component[i].nombre,
            ImagenModal:'',
            script,
            traits: [
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type:'text',
                name: 'tituloVestimenta',
                label: 'Titulo',
                changeProp: 1,
              },
              {
                type: 'select',
                label: 'Lista de Vestimenta',
                name: 'tipoVestimenta',
                options: [
                  {value: 'formal', name: 'formal'},
                  {value: 'sport', name: 'sport'},
                ],		
                changeProp: 1
              },
              {
                type:'text',
                name: 'textoBoton',
                label: 'Texto Boton',
                changeProp: 1,
              },
              {
                type:'cargarImagen',
                name: 'cambiarimagen',
                label:'Cambiar Imagen del modal',
              },
              {
                type: 'button',
                label: '',
                name: 'resetValores',
                text: 'Resetear',
                full: true, // Full width button
                command: editor => {

                 var componente =  editor.getSelected();

                 //var elHtml = componente.view.el;

                 componente.view.resetearValores();

                }
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {

                 var componente =  editor.getSelected();

                 componente.remove();

                 var divTrait = document.querySelector('.gjs-trt-traits');

                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';


                }
              },
              {
                type: 'button',
                label: '',
                name: 'subirComponente',
                text: 'Subir',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
                  //var longitud = editor.getWrapper().components.length  ;
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  if(ubicacion != 0){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion -1});
                  }
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'BajarComponente',
                text: 'Bajar',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  var longitud = arrayComponentes.length  ;
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  console.log(ubicacion);
                  console.log(longitud);
  
                  if(ubicacion < longitud){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion +1});
                  }
  
                }
              }
              
            ],
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
          }
      },
      view: {
       
        init({model}) {

          this.listenTo(model, 'change:tipoVestimenta', this.onActive1)
          this.listenTo(model, 'change:tipoVestimenta', this.updateScript);

          this.listenTo(model, 'change:tituloVestimenta', this.renderizar);
          this.listenTo(model, 'change:textoBoton', this.renderizar);

          this.listenTo(model, 'change:ImagenModal', this.cambiarImagenModal);

        },

        events: {
          
          click : 'openTrait',
        },

        renderizar(){

          var componenteTipo = this.model.attributes.type;

          var tituloVestimenta = this.model.get("tituloVestimenta");
          var textoBoton = this.model.get("textoBoton");

          if(tituloVestimenta !== undefined){

            tituloVestimenta = tituloVestimenta.trim();

            if(tituloVestimenta != ''){

              if(jsondata[componenteTipo]){

                jsondata[componenteTipo].tituloVestimenta = tituloVestimenta;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].tituloVestimenta = tituloVestimenta;
  
  
              }

            }

          }

          if(textoBoton !== undefined){

            textoBoton = textoBoton.trim();

            if(textoBoton != ''){

              if(jsondata[componenteTipo]){

                jsondata[componenteTipo].botonVestimenta = textoBoton;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].botonVestimenta = textoBoton;
  
  
              }

            }

          }

          var htmlActualizado = htmlfinalVestimenta.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);
          
        },

        onActive1 (model) {

          var componenteTipo = this.model.attributes.type;

           var vestimenta = this.model.get("tipoVestimenta");

           if(typeof jsondata[componenteTipo] == 'undefined'){

            jsondata[componenteTipo] = [];
           }

           jsondata[componenteTipo].vestimenta = vestimenta;

            var htmlfinal = htmlfinalVestimenta.replace(/&amp;/g, '&');

            const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
              return jsondata ? eval(p1) : '';
            });

            console.log(htmlActualizado);

            const content = model.components(htmlActualizado);
        },

        openTrait(ev){

          console.log('hola mundo');

          var boton = document.getElementById("tabAjustes");

          // Simular un clic en el botón
          boton.click();

        },
        resetearValores(model) {

          var componenteTipo = this.model.attributes.type;

          this.model.set('tituloVestimenta', '');

          this.model.set('tipoVestimenta', 'CASUAL-CHIC');

          this.model.set('textoBoton', '');

          if(jsondata && jsondata[componenteTipo].tituloVestimenta){


            jsondata[componenteTipo].tituloVestimenta = 'Codigo de Vestimenta';
          }

          if(jsondata && jsondata[componenteTipo].vestimenta){


            jsondata[componenteTipo].vestimenta = 'CASUAL-CHIC';
          }

          if(jsondata && jsondata[componenteTipo].botonVestimenta){


            jsondata[componenteTipo].botonVestimenta = 'Ver Vestimenta';
          }

          if(jsondata && jsondata[componenteTipo].imgVestimenta){


            jsondata[componenteTipo].imgVestimenta = 'https://cloudfront-us-east-1.images.arcpublishing.com/sdpnoticias/CLB7QMKYIBFYRPZ5UOHYUQHZRY.jpg';
          }

          var htmlActualizado = htmlfinalVestimenta.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);

          const previewImage = document.querySelector('#preview-image');
          previewImage.setAttribute('src', '');

          
        },
        cambiarImagenModal(){

          var componenteTipo = this.model.attributes.type;

          var ImagenModal = this.model.get("ImagenModal");


          if(!jsondata[componenteTipo] || !jsondata[componenteTipo]['imgVestimenta']){

            if(typeof jsondata[componenteTipo] == 'undefined'){

              jsondata[componenteTipo] = [];

            }

            if(typeof jsondata[componenteTipo]['imgVestimenta'] == 'undefined'){

              jsondata[componenteTipo]['imgVestimenta'] = { src : '#'};
              
            }
          }

          jsondata[componenteTipo].imgVestimenta.src = ImagenModal;


          var htmlActualizado = htmlfinalVestimenta.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          console.log(htmlActualizado);

          const content = this.model.components(htmlActualizado);

        }
      }
    })

  }

  if(component[i].nombre == 'transporte'){

    var htmlfinalTransporte = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalTransporte.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    transporte
                    </div>`,
      category: 'Transporte',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            NombreComponent:component[i].nombre,
            styles: component[i].style ,
            void: false,
            droppable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type:'text',
                name: 'tituloTransporte',
                label: 'Titulo',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'textoTransporte',
                label: 'Texto',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'labelNombre',
                label: 'Label Nombre Completo',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'labelCantidad',
                label: 'Label Cantidad de Personas',
                changeProp: 1,
                value: ''
              },
              {
                type:'text',
                name: 'textoBoton',
                label: 'Texto Boton',
                changeProp: 1,
                value: ''
              },
              {
              type: 'button',
              label: '',
              name: 'resetValores',
              text: 'Resetear',
              full: true, // Full width button
              command: editor => {

               var componente =  editor.getSelected();

               //var elHtml = componente.view.el;

               componente.view.resetearValores();

              }
            },
            {
              type: 'button',
              label: '',
              text: 'Eliminar',
              name: 'eliminarComponent',
              full: true, // Full width button
              command: editor => {

               var componente =  editor.getSelected();

               componente.remove();

               let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);

               listaComponenteNoRepect.splice(indice, 1);

               var divTrait = document.querySelector('.gjs-trt-traits');

               // Limpiar el contenido del div
               divTrait.innerHTML = '';


              }
            },
            {
              type: 'button',
              label: '',
              name: 'subirComponente',
              text: 'Subir',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';

                //var longitud = editor.getWrapper().components.length  ;

                var arrayComponentes = editor.getWrapper().components();

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                if(ubicacion != 0){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion -1});
                }

              }
            },
            {
              type: 'button',
              label: '',
              name: 'BajarComponente',
              text: 'Bajar',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';


                var arrayComponentes = editor.getWrapper().components();

                var longitud = arrayComponentes.length  ;

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                console.log(ubicacion);
                console.log(longitud);

                if(ubicacion < longitud){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion +1});
                }

              }
            }]
          }
      },
      view: {
        init () {

          this.listenTo(this.model, 'change:tituloTransporte', this.renderizar)
          this.listenTo(this.model, 'change:textoTransporte', this.renderizar)
          this.listenTo(this.model, 'change:labelNombre', this.renderizar)
          this.listenTo(this.model, 'change:labelCantidad', this.renderizar)
          this.listenTo(this.model, 'change:textoBoton', this.renderizar)
          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },
        renderizar(){

          var componenteTipo = this.model.attributes.type;

          var tituloTransporte = this.model.get("tituloTransporte");
          var textoTransporte = this.model.get("textoTransporte");
          var labelNombre = this.model.get("labelNombre");
          var labelCantidad = this.model.get("labelCantidad");
          var textoBoton = this.model.get("textoBoton");

  
          if(tituloTransporte !== undefined){
  
            tituloTransporte = tituloTransporte.trim();
  
            if(tituloTransporte != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].tituloTransporte = tituloTransporte;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].tituloTransporte = tituloTransporte;
  
  
              }
  
            }
  
          }
  
          if(textoTransporte !== undefined){
  
            textoTransporte = textoTransporte.trim();
  
            if(textoTransporte != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].textoTransporte = textoTransporte;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].textoTransporte = textoTransporte;
  
  
              }
  
            }
  
          }

          if(labelNombre !== undefined){
  
            labelNombre = labelNombre.trim();
  
            if(labelNombre != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].labelform1 = labelNombre;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].labelform1 = labelNombre;
  
  
              }
  
            }
  
          }

          if(labelCantidad !== undefined){
  
            labelCantidad = labelCantidad.trim();
  
            if(labelCantidad != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].labelform2 = labelCantidad;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].labelform2 = labelCantidad;
  
  
              }
  
            }
  
          }

          if(textoBoton !== undefined){
  
            textoBoton = textoBoton.trim();
  
            if(textoBoton != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].botonTransporte = textoBoton;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].botonTransporte = textoBoton;
  
  
              }
  
            }
  
          }

  
          var htmlActualizado = htmlfinalTransporte.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
  
        },
        resetearValores(model) {

          var componenteTipo = this.model.attributes.type;

          this.model.set('tituloTransporte', '');
          this.model.set('textoTransporte', '');
          this.model.set('labelNombre', '');
          this.model.set('labelCantidad', '');
          this.model.set('textoBoton', '');

          if(jsondata && jsondata[componenteTipo].tituloTransporte){

            jsondata[componenteTipo].tituloTransporte = 'Transporte Privado';
          }

          if(jsondata && jsondata[componenteTipo].textoTransporte){

            jsondata[componenteTipo].textoTransporte = 'Vamo todos juntos en un colectivo';
          }

          if(jsondata && jsondata[componenteTipo].labelform1){

            jsondata[componenteTipo].labelform1 = 'Nombre full Completo';
          }

          if(jsondata && jsondata[componenteTipo].labelform2){

            jsondata[componenteTipo].labelform2 = 'Numero de personas que viajan';
          }

          if(jsondata && jsondata[componenteTipo].botonTransporte){

            jsondata[componenteTipo].botonTransporte = 'Enviar';
          }

          var htmlActualizado = htmlfinalTransporte.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
          
        },
        openTrait(ev){

          var elemento = document.querySelector('.nohayComponent');
  
            if (elemento) {
                elemento.style.display = 'none';
            }
  
          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
      }
    })
  }

  if(component[i].nombre == 'divisor'){

    var labelfianl = component[i].label.trim();

    var htmlfinaldivisor = component[i].html.replace(/&amp;/g, '&');

    console.log(htmlfinaldivisor);

    var htmlActualizado = htmlfinaldivisor.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    divisor
                    </div>`,
      category: 'divisor',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });
    
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado ,
            NombreComponent:component[i].nombre,
            styles: component[i].style ,
            void: false,
            droppable: false,
            highlightable:false,
            selectable:true,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.remove();
  
                 let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);
  
                 listaComponenteNoRepect.splice(indice, 1);
  
                 console.log(listaComponenteNoRepect);
  
                 var divTrait = document.querySelector('.gjs-trt-traits');
  
                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';
  
  
                }
            
              },
              {
                type: 'button',
                label: '',
                name: 'subirComponente',
                text: 'Subir',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
                  //var longitud = editor.getWrapper().components.length  ;
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  if(ubicacion != 0){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion -1});
                  }
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'BajarComponente',
                text: 'Bajar',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  var longitud = arrayComponentes.length  ;
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  console.log(ubicacion);
                  console.log(longitud);
  
                  if(ubicacion < longitud){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion +1});
                  }
  
                }
              }
            ]
          }
      },
      view: {
        init () {
          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },
        openTrait(){

          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();

        }
      }
    })
  }

  if(component[i].nombre == 'lugar'){

    var htmlfinalLugar = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalLugar.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    //create trait dymanic 

    var trait = [
      {
        type: 'NombreComponent',
        name: 'NombreComponent',
        label: 'Nombre del Componente',
      },
    ];

    for (const key in templatedatos[categoria].Lugar) {
      if (templatedatos[categoria].Lugar.hasOwnProperty(key)) {
        const value = templatedatos[categoria].Lugar[key];
        
        const textoSeparado = key.replace(/([A-Z])/g, ' $1').trim();

        trait.push({
          type: 'text',
          name: key + 'Lugar', // Agregar 'Portada' al final de la clave
          label: textoSeparado,
          value: '',
          changeProp: 1,
        });
      }
    }

    var trait2 = [
            {
              type:'cargarImagenLugar',
              label:'Cambiar Imagen Lugar',
              name:'Imagenlugar'
            },
            {
              type: 'button',
              label: '',
              name: 'resetValores',
              text: 'Resetear',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.view.resetearValores();

              }
            },
            {
              type: 'button',
              label: '',
              text: 'Eliminar',
              name: 'eliminarComponent',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.remove();

              let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);

              listaComponenteNoRepect.splice(indice, 1);

              console.log(listaComponenteNoRepect);

              var divTrait = document.querySelector('.gjs-trt-traits');

              // Limpiar el contenido del div
              divTrait.innerHTML = '';


              }
          
            },
            {
              type: 'button',
              label: '',
              name: 'subirComponente',
              text: 'Subir',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';

                //var longitud = editor.getWrapper().components.length  ;

                var arrayComponentes = editor.getWrapper().components();

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                if(ubicacion != 0){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion -1});
                }

              }
            },
            {
              type: 'button',
              label: '',
              name: 'BajarComponente',
              text: 'Bajar',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';


                var arrayComponentes = editor.getWrapper().components();

                var longitud = arrayComponentes.length  ;

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                console.log(ubicacion);
                console.log(longitud);

                if(ubicacion < longitud){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion +1});
                }

              }
            }];

    const traitfinal = trait.concat(trait2);

    // end create trait dymanic 

    var labelfianl = component[i].label.trim();

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    Lugar
                    </div>`,
      category: 'lugar',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            NombreComponent:component[i].nombre,
            styles: component[i].style,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:traitfinal
          }
      },
      view: {
        init () {


          this.listenTo(this.model, 'change:Imagenlugar', this.renderizarImangen)

          const keys = Object.keys(templatedatos[categoria].Lugar);

          // Escuchar cambios en las claves y renderizar
          keys.forEach(key => {
            this.listenTo(this.model, `change:${key}Lugar`, this.renderizar);
          });

          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },
        renderizar(){

          var componenteTipo = this.model.attributes.type;

          const keys = Object.keys(templatedatos[categoria].Lugar);

          keys.forEach(key => {

            const variableLugar = this.model.get(`${key}Lugar`);


            if (variableLugar !== undefined) {
              const trimmedTituloLugar = variableLugar.trim();
              if (trimmedTituloLugar !== '') {

                if(typeof jsondata[componenteTipo] == 'undefined'){

                  jsondata[componenteTipo] = [] ;
                }

                if(key === 'textoBoton'){

                  if(typeof jsondata[componenteTipo][`${key}Lugar`] == 'undefined'){

                    jsondata[componenteTipo][`${key}Lugar`] = {text: 'Ver Ubicacion', src:'#'};
                  }

                  jsondata[componenteTipo][`${key}Lugar`]['text'] = trimmedTituloLugar;

                }

                else if(key === 'linkBoton'){

                  let str = key;
                  let nuevoStr = str.replace("link", "texto");

                  if(typeof jsondata[componenteTipo][`${nuevoStr}Lugar`] == 'undefined'){

                    jsondata[componenteTipo][`${nuevoStr}Lugar`] = {text: 'Ver Ubicacion', src:'#'};
                  }

                  jsondata[componenteTipo][`${nuevoStr}Lugar`]['src'] = trimmedTituloLugar;

                }

                else{

                  jsondata[componenteTipo][`${key}Lugar`] = trimmedTituloLugar;
                }


              }
            }
          });

          
          var htmlActualizado = htmlfinalLugar.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
  
        },
        renderizarImangen(){

          var componenteTipo = this.model.attributes.type;

          var imagenLugar = this.model.get(`Imagenlugar`);

          if (imagenLugar !== undefined) {
            imagenLugar = imagenLugar.trim();
            if (imagenLugar !== '') {

              if(typeof jsondata[componenteTipo] == 'undefined'){

                jsondata[componenteTipo] = [] ;
              }

      
              if(typeof jsondata[componenteTipo][`imgLugar`] == 'undefined'){

                jsondata[componenteTipo][`imgLugar`] = {src:'#'};
              }

              jsondata[componenteTipo][`imgLugar`]['src'] = imagenLugar;

      
            }
          }

          console.log(jsondata);

          var htmlActualizado = htmlfinalLugar.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);

        },
        openTrait(ev){
  
          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
        resetearValores
        (model) {

          var componenteTipo = this.model.attributes.type;

          for (const key in templatedatos[categoria].Lugar) {

            if (templatedatos[categoria].Lugar.hasOwnProperty(key)) {

              var value = templatedatos[categoria].Lugar[key];

              if(typeof jsondata[componenteTipo] == 'undefined'){

                jsondata[componenteTipo] = [] ;
              }
              
              // Establecer el valor en this.model
              this.model.set(`${key}Lugar`, '');

              if(key.includes('textoBoton')){

                if(typeof jsondata[componenteTipo][`${key}Lugar`] == 'undefined'){

                  jsondata[componenteTipo][`${key}Lugar`] = {text: 'Ver Ubicacion', src: '#'}
                }

                jsondata[componenteTipo][`${key}Lugar`]['text'] = value ;

              }

              else if(key.includes('linkBoton')){

                let str = key;
                let nuevoStr = str.replace("link", "texto");

                if(typeof jsondata[componenteTipo][`${nuevoStr}Lugar`] == 'undefined'){

                  jsondata[componenteTipo][`${nuevoStr}Lugar`] = {text: 'Ver Ubicacion', src: '#'}
                }

                jsondata[componenteTipo][`${nuevoStr}Lugar`]['src'] = value ;
                
              }

              else{

                jsondata[componenteTipo][`${key}Lugar`] = value
              }
              
            }
          }

          var htmlActualizado = htmlfinalLugar.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
          
        },
      }
    })


  }

  if(component[i].nombre == 'dressInsta'){

    if(categoria == 'Funeraria'){

      nombreComponentefinal = 'Velorio Sepelio' ;
    }

    if(categoria == 'Quince'){

      nombreComponentefinal = 'Dress Code Instagram' ;
    }

    if(categoria == 'Soltero'){

      nombreComponentefinal = 'Cuando? Donde?' ;
    }

    var htmlfinalDressInsta = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalDressInsta.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var trait = [
      {
        type: 'NombreComponent',
        name: 'NombreComponent',
        label: 'Nombre del Componente',
      },
    ];

    for (const key in templatedatos[categoria].DressInsta) {
      if (templatedatos[categoria].DressInsta.hasOwnProperty(key)) {
        const value = templatedatos[categoria].DressInsta[key];

        const textoSeparado = key.replace(/([A-Z])/g, ' $1').trim();

          trait.push({
            type: 'text',
            name: key + 'DressInsta', // Agregar 'Portada' al final de la clave
            label: textoSeparado,
            value: '',
            changeProp: 1,
          });
        
      }
    }

    if(categoria == 'Quince'){

      nuevotrait = {
        type: 'select',
        label: 'Lista de Vestimenta',
        name: 'tipoDressCodeDressInsta',
        options: [
          {value: 'formal', name: 'formal'},
          {value: 'sport', name: 'sport'},
        ],		
        changeProp: 1
      };

      trait.splice(2, 0, nuevotrait);

      templatedatos[categoria].DressInsta['tipoDressCode'] = 'formal';

      nuevotrait2 = {
        type:'cargarImagen',
        label:'Cambiar Imagen Dress Code',
        name:'ImagenModal'
      }

      trait.splice(5, 0, nuevotrait2);


      console.log(templatedatos[categoria]);
    }

    var trait2 = [
            {
              type: 'button',
              label: '',
              name: 'resetValores',
              text: 'Resetear',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.view.resetearValores();

              }
            },
            {
              type: 'button',
              label: '',
              text: 'Eliminar',
              name: 'eliminarComponent',
              full: true, // Full width button
              command: editor => {

              var componente =  editor.getSelected();

              componente.remove();

              let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);

              listaComponenteNoRepect.splice(indice, 1);

              console.log(listaComponenteNoRepect);

              var divTrait = document.querySelector('.gjs-trt-traits');

              // Limpiar el contenido del div
              divTrait.innerHTML = '';


              }
          
            },
            {
              type: 'button',
              label: '',
              name: 'subirComponente',
              text: 'Subir',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';

                //var longitud = editor.getWrapper().components.length  ;

                var arrayComponentes = editor.getWrapper().components();

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                if(ubicacion != 0){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion -1});
                }

              }
            },
            {
              type: 'button',
              label: '',
              name: 'BajarComponente',
              text: 'Bajar',
              full: true, // Full width button
              command: editor => {

                const selected = editor.getSelected();

                var componente = selected.attributes.type ;

                var ubicacion = '';


                var arrayComponentes = editor.getWrapper().components();

                var longitud = arrayComponentes.length  ;

                arrayComponentes.forEach(function(c, index) {

                  if (c.attributes.type === componente) {
                    
                      ubicacion = index ;
                  }
                  
                })

                console.log(ubicacion);
                console.log(longitud);

                if(ubicacion < longitud){

                  selected.remove({ temporary: true });

                  editor.getWrapper().append(selected, { at: ubicacion +1});
                }

              }
            }];

    const traitfinal = trait.concat(trait2);

    var labelfianl = component[i].label.trim();

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label:  `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    
                    </div>`,
      category: 'dress-insta',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            NombreComponent:nombreComponentefinal,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits: traitfinal
          }
      },
      view: {
        init () {

          const keys = Object.keys(templatedatos[categoria].DressInsta);

          // Escuchar cambios en las claves y renderizar
          keys.forEach(key => {

            this.listenTo(this.model, `change:${key}DressInsta`, this.renderizar);

          });

          this.listenTo(this.model, `change:ImagenModal`, this.renderizarImg);
          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },
        openTrait(){

  
          var botonPortadaDressInsta = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortadaDressInsta.click();
  
        },

        renderizar(){

          var componenteTipo = this.model.attributes.type;

          const keys = Object.keys(templatedatos[categoria].DressInsta);

          keys.forEach(key => {

            const variableDressInsta = this.model.get(`${key}DressInsta`);

            if (variableDressInsta !== undefined) {
              const trimmedTituloDressInsta = variableDressInsta.trim();
              if (trimmedTituloDressInsta !== '') {

                if(typeof jsondata[componenteTipo] == 'undefined'){

                  jsondata[componenteTipo] = [];
                }

                if(key.includes('textoBoton')){

                  if(typeof jsondata[componenteTipo][`${key}DressInsta`] == 'undefined'){

                    jsondata[componenteTipo][`${key}DressInsta`] = {};
                  }

                  jsondata[componenteTipo][`${key}DressInsta`].text = trimmedTituloDressInsta;

                }
                else if(key.includes('linkBoton')){

                  let str = key;
                  let nuevoStr = str.replace("link", "texto");

                  if(typeof jsondata[componenteTipo][`${nuevoStr}DressInsta`] == 'undefined'){

                    jsondata[componenteTipo][`${nuevoStr}DressInsta`] = {};
                  }

                  jsondata[componenteTipo][`${nuevoStr}DressInsta`]['src'] = trimmedTituloDressInsta;

                }
                else{

                  jsondata[componenteTipo][`${key}DressInsta`] = trimmedTituloDressInsta;
                }



              }
            }
          });


          var htmlActualizado = htmlfinalDressInsta.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);

        },

        renderizarImg(){

          var componenteTipo = this.model.attributes.type;

          var imgModal = this.model.get(`ImagenModal`);

          if (imgModal !== undefined) {
            var imgModal = imgModal.trim();
            if (imgModal !== '') {

              if(!jsondata[componenteTipo] || !jsondata[componenteTipo]['imgVestimenta']){

                if(typeof jsondata[componenteTipo] == 'undefined'){

                  jsondata[componenteTipo] = [];
                }

                if(typeof jsondata[componenteTipo]['imgVestimenta'] == 'undefined'){

                  jsondata[componenteTipo]['imgVestimenta'] = {src: 'https://292aa00292a014763d1b-96a84504aed2b25fc1239be8d2b61736.ssl.cf1.rackcdn.com/PostImagem/32496/decifrando-o-dress-code-masculino-do-dia-a-dia-ao-trabalho_o1e0e2hktb1shfmo917pi14471om1e.png'}
                }
              }

              jsondata[componenteTipo]['imgVestimenta']['src'] = imgModal

            }
          }

          console.log(jsondata);

          var htmlActualizado = htmlfinalDressInsta.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });

          const content = this.model.components(htmlActualizado);


        },
        
        resetearValores(){

          var componenteTipo = this.model.attributes.type;

          for (const key in templatedatos[categoria].DressInsta) {
            if (templatedatos[categoria].DressInsta.hasOwnProperty(key)) {
              const value = templatedatos[categoria].DressInsta[key];
              
              // Establecer el valor en this.model
              this.model.set(`${key}DressInsta`, '');

              console.log(key);
              
              // Verificar si jsondata existe y establecer la propiedad correspondiente
              if (jsondata && jsondata[componenteTipo]) {

                if(key.includes('textoBoton')){

                  if(typeof jsondata[componenteTipo][`${key}DressInsta`] == 'undefined'){

                    jsondata[componenteTipo][`${key}DressInsta`] = [];

                  }

                  jsondata[componenteTipo][`${key}DressInsta`].text = value;
                }
                else if(key.includes('linkBoton')){

                  let str = key;
                  let nuevoStr = str.replace("link", "texto");

                  if(typeof jsondata[componenteTipo][`${nuevoStr}DressInsta`] == 'undefined'){

                    jsondata[componenteTipo][`${nuevoStr}DressInsta`] = [];

                  }

                  jsondata[componenteTipo][`${nuevoStr}DressInsta`].src = value;
                }
                else{

                  jsondata[componenteTipo][`${key}DressInsta`] = value;

                }
              }
            }
          }


          var htmlActualizado = htmlfinalDressInsta.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });


  
          const content = this.model.components(htmlActualizado);

        }
      }
    })

  }

  if(component[i].nombre == 'HoraDia'){

    var htmlfinalHoraDia = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinalHoraDia.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    hora y dia
                    </div>`,
      category: 'HoraDia',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            NombreComponent:component[i].nombre,
            styles: component[i].style,
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { id: component[i].nombre+'-'+component[i].tipo },
            traits:[
              {
                type:'NombreComponent',
                name: 'NombreComponent',
                label: 'Nombre del Componente',
              },
              {
                type:'text',
                name: 'tituloDiayHora',
                label: 'Dia y Hora',
                changeProp: 1,
                value: ''
              },
              {
                type: 'button',
                label: '',
                name: 'resetValores',
                text: 'Resetear',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.view.prueba();
  
                }
              },
              {
                type: 'button',
                label: '',
                text: 'Eliminar',
                name: 'eliminarComponent',
                full: true, // Full width button
                command: editor => {
  
                 var componente =  editor.getSelected();
  
                 componente.remove();
  
                 let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);
  
                 listaComponenteNoRepect.splice(indice, 1);
  
                 console.log(listaComponenteNoRepect);
  
                 var divTrait = document.querySelector('.gjs-trt-traits');
  
                 // Limpiar el contenido del div
                 divTrait.innerHTML = '';
  
  
                }
            
              },
              {
                type: 'button',
                label: '',
                name: 'subirComponente',
                text: 'Subir',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
                  //var longitud = editor.getWrapper().components.length  ;
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  if(ubicacion != 0){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion -1});
                  }
  
                }
              },
              {
                type: 'button',
                label: '',
                name: 'BajarComponente',
                text: 'Bajar',
                full: true, // Full width button
                command: editor => {
  
                  const selected = editor.getSelected();
  
                  var componente = selected.attributes.type ;
  
                  var ubicacion = '';
  
  
                  var arrayComponentes = editor.getWrapper().components();
  
                  var longitud = arrayComponentes.length  ;
  
                  arrayComponentes.forEach(function(c, index) {
  
                    if (c.attributes.type === componente) {
                      
                        ubicacion = index ;
                    }
                    
                  })
  
                  console.log(ubicacion);
                  console.log(longitud);
  
                  if(ubicacion < longitud){
  
                    selected.remove({ temporary: true });
  
                    editor.getWrapper().append(selected, { at: ubicacion +1});
                  }
  
                }
              }
            ]
          }
      },
      view: {
        init () {

          this.listenTo(this.model, 'change:tituloDiayHora', this.renderizar)
          
        },
        events: {
          dblclick: '',
          click: 'openTrait'
        },
        renderizar(){

          var componenteTipo = this.model.attributes.type;

          var tituloDiayHora = this.model.get("tituloDiayHora");
  

          if(tituloDiayHora !== undefined){
  
            tituloDiayHora = tituloDiayHora.trim();
  
            if(tituloDiayHora != ''){
  
              if(jsondata[componenteTipo]){
  
                jsondata[componenteTipo].tituloDiayHora = tituloDiayHora;
              }
              else{
  
                jsondata[componenteTipo] = [];
                jsondata[componenteTipo].tituloDiayHora = tituloDiayHora;
  
  
              }
  
            }
  
          }
  
        
          var htmlActualizado = htmlfinalHoraDia.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
  
        },
        openTrait(ev){
  
          var botonPortada = document.getElementById("tabAjustes");
  
          // Simular un clic en el botón
          botonPortada.click();
  
        },
        prueba(model) {

          var componenteTipo = this.model.attributes.type;

          this.model.set('tituloDiayHora', '');
          
          if(jsondata && jsondata[componenteTipo].tituloDiayHora){

            jsondata[componenteTipo].tituloDiayHora = '21 SEPTIEMBRE, 22:30 HS';
          }

          var htmlActualizado = htmlfinalHoraDia.replace(/\${([^}]+)}/g, (match, p1) => {
            return jsondata ? eval(p1) : '';
          });
  
          const content = this.model.components(htmlActualizado);
          
        },
      }
    })


  }

  if(component[i].nombre == 'navbar'){

    var htmlfinal = component[i].html.replace(/&amp;/g, '&');

    const htmlActualizado = htmlfinal.replace(/\${([^}]+)}/g, (match, p1) => {
      return jsondata ? eval(p1) : '';
    });

    var labelfianl = component[i].label.trim();

    // add block
    bm.add(component[i].nombre+'-'+component[i].tipo, {
      label: `<img src="${labelfianl}" width="100%" height="100%">
      <div class="gjs-block-label">
                    navbar
                    </div>`,
      category: 'navbar',
      content: {
        type: component[i].nombre+'-'+component[i].tipo,
        activeOnRender: true,
        
      }
    });

    // add component type
    dc.addType(component[i].nombre+'-'+component[i].tipo, {
      extend: 'default',
      model: {
        defaults: {
            name: component[i].nombre+'-'+component[i].tipo,
            components: htmlActualizado,
            styles: component[i].style,
            tagName: 'div',
            void: false,
            droppable: false,
            hoverable: false,
            layerable: false,
            highlightable: false,
            attributes: { class: 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top scrolled', id: 'navbar'},
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


}

//para cerrar los collapse de las blocks



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
list.push({ value: 'Birthstone', name: 'Birthstone' });
list.push({ value: 'Bigelow', name: 'Bigelow' });
fontProperty.set('options', list);
styleManager.render();


//add fonts style 

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

editor.on('component:remove', cmp => {

  
});

editor.on('block:drag:start', cmp => {

  var gjsFrame = document.querySelector('.gjs-frame');

  if (gjsFrame) {
    gjsFrame.style.paddingBottom = '3%';
  }


});

var listaComponenteNoRepect = [] ;

editor.on('block:drag:stop', cmp => {

  console.log(cmp);

  if(!listaComponenteNoRepect.includes(cmp.attributes.type)){

    listaComponenteNoRepect.push(cmp.attributes.type);
  }
  else{

    alert('no se puede agregar componentes repetidos');

    cmp.remove();

    var divTrait = document.querySelector('.gjs-trt-traits');

    // Limpiar el contenido del div
    divTrait.innerHTML = '';

  }

  var gjsFrame = document.querySelector('.gjs-frame');

  if (gjsFrame) {
    gjsFrame.style.paddingBottom = '0%';
  }



});


editor.on('component:selected', cmp => {

  console.log(cmp);

  if(cmp.attributes.type == 'text' || cmp.attributes.type == 'image' || cmp.attributes.type == 'label' || cmp.attributes.type == 'link' || cmp.attributes.type == '' || cmp.attributes.type == 'listagaleria' || cmp.attributes.type == 'listaeventos' || cmp.attributes.type == 'listaregalos' || cmp.attributes.type == 'listapadrinos' || cmp.attributes.type == 'countdownWestern' || cmp.attributes.type == 'wrapper'){

    var arrayComponentExists = ['portada', 'historia', 'hashtag', 'vestimenta', 'confirmacion', 'regalos', 'mensaje', 'transporte', 'canciones', 'testigos', 'galeria', 'eventos', 'contador', 'HoraDia', 'lugar', 'dressInsta', 'divisor'];

    var arrayParents = cmp.parents();

    console.log(arrayParents)

    var selector = '';

    var encontrado = false;

    for (let element of arrayParents) {
      let tipComponent = element.attributes.type;  // Asegúrate de que este es el formato correcto para acceder a los atributos

      // Verificar si tipComponent contiene alguna palabra del arrayComponentExists
      if (arrayComponentExists.some(word => tipComponent.includes(word))) {
        if (!encontrado) {
            selector = tipComponent;
            console.log(selector);
            encontrado = true; // Cambiar la bandera a true después de encontrar el primer resultado

            var selectorfinal = '#'+selector;
            editor.select(editor.DomComponents.getWrapper().find(selectorfinal)[0]);

        } else {
            break; // Salir del bucle si ya se ha encontrado un resultado
        }
    }
    }

  }

  if(cmp.attributes.type == 'text' || cmp.attributes.type == 'image' || cmp.attributes.type == 'link'){

    cmp.set({
      toolbar: []
    })

  }

  cmp.set({
    toolbar: []
  })

  
  var elemento = document.querySelector('.tituloInformacion');

  if (elemento) {
    elemento.style.display = 'none';
  }


})



//console.log(componentInvitacion);

/*if(componentInvitacion.length > 0){

  componentInvitacion.forEach(el => {

    editor.addComponents({
      type: el,
    });
  
  });

}*/

editor.TraitManager.addType('image', {
  // Define la plantilla para el trait
  createInput(model) {

    const traitInput = document.createElement('div');

    const titulo = document.createElement('h5');
    titulo.classList.add('tituloTrait');
    titulo.classList.add('tituloTrait');
    titulo.classList.add('mb-4');
    titulo.textContent = 'Como funciona el componente portada ?'; // Cambia este texto si lo deseas
    traitInput.appendChild(titulo);

    const lista = document.createElement('ul');
    lista.classList.add('mb-2');

    // Crear el primer elemento de la lista
    const opcion1 = document.createElement('li');
    opcion1.classList.add('mb-2');
    opcion1.textContent = '1. Podes elegir una imagen para la vista Escritorio.';

    // Crear el icono para la opción 1
    const icono1 = document.createElement('i');
    icono1.classList.add('bi', 'bi-laptop');
    opcion1.appendChild(icono1);

    // Agregar la opción 1 a la lista
    lista.appendChild(opcion1);

    // Crear el segundo elemento de la lista
    const opcion2 = document.createElement('li');
    opcion2.classList.add('mb-2');
    opcion2.textContent = '2. Podes elegir una imagen para la vista mobile.';

    // Crear el icono para la opción 2
    const icono2 = document.createElement('i');
    icono2.classList.add('bi', 'bi-phone');
    opcion2.appendChild(icono2);

    // Agregar la opción 2 a la lista
    lista.appendChild(opcion2);

    // Agregar la lista al div contenedor
    traitInput.appendChild(lista);

    const parrafo = document.createElement('p');
    parrafo.classList.add('mt-5');
    parrafo.textContent = 'NOTA: Es lo primero que van a ver tus invitados cuando abran tu invitacion, así que procura que la imagen sea de alta resolución.';

    // Agregar el párrafo al div contenedor
    traitInput.appendChild(parrafo);

    const img = document.createElement('img');
    img.src = 'https://i.postimg.cc/G2FtMN3r/www-screencapture-com-2024-2-8-13-18-online-video-cutter-com.gif';
    img.style.width = '100%'; // Establecer el ancho de la imagen al 100%
    img.style.height = 'auto'; 
    traitInput.appendChild(img);
    
    // Agrega un párrafo a la plantilla
    const paragraph = document.createElement('p');
    paragraph.classList.add('textoExplicacionPortada');
    paragraph.classList.add('mt-2');
    paragraph.textContent = 'Video descriptivo de como funciona el componente portada.'; // Cambia este texto si lo deseas
    traitInput.appendChild(paragraph);
    
    return traitInput;
  },
});

editor.TraitManager.addType('custom-info', {
  // Define la plantilla para el trait
  createInput(model) {
    const traitInput = document.createElement('div');

    const titulo = document.createElement('h5');
    titulo.classList.add('tituloTraitEvent');
    titulo.classList.add('mb-4');
    titulo.textContent = 'Agregar Evento'; // Cambia este texto si lo deseas
    traitInput.appendChild(titulo);

    // Contenedor del cuadrado
    const squareContainer = document.createElement('div');
    squareContainer.style.width = '100%'; // Tamaño del cuadrado
    squareContainer.style.height = '100px'; // Tamaño del cuadrado
    squareContainer.style.marginBottom = '7px'; 
    squareContainer.style.backgroundColor = '#ccc'; // Color de fondo del cuadrado
    squareContainer.style.cursor = 'pointer'; // Cursor apuntador al pasar el mouse
    squareContainer.style.position = 'relative'; // Posición relativa para alinear el icono dentro del cuadrado

    // Icono dentro del cuadrado
    const icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add('fa-camera'); // Clases de Font Awesome para un icono de cámara
    icon.style.fontSize = '28px'; // Tamaño del icono
    icon.style.color = '#333'; // Color del icono
    icon.style.position = 'absolute'; // Posición absoluta para que el icono se ajuste dentro del cuadrado
    icon.style.top = '50%'; // Alinear el icono verticalmente en el centro del cuadrado
    icon.style.left = '50%'; // Alinear el icono horizontalmente en el centro del cuadrado
    icon.style.transform = 'translate(-50%, -50%)'; // Centrar el icono dentro del cuadrado
    squareContainer.appendChild(icon);

    // Input para la imagen
    const imgInput = document.createElement('input');
    imgInput.setAttribute('type', 'file');
    imgInput.setAttribute('accept', 'image/*');
    imgInput.setAttribute('name', 'img');
    imgInput.style.display = 'none'; // Ocultar el input file
    squareContainer.appendChild(imgInput);

    // Imagen dentro del cuadrado
    const imgPreview = document.createElement('img');
    imgPreview.style.width = '100%'; // Establecer el ancho al 100% dentro del cuadrado
    imgPreview.style.height = '100%'; // Establecer la altura al 100% dentro del cuadrado
    imgPreview.style.objectFit = 'cover'; // Ajustar la imagen para que cubra todo el cuadrado
    imgPreview.style.position = 'absolute'; // Posición absoluta para que la imagen se ajuste dentro del cuadrado
    imgPreview.style.top = '0'; // Alinear la imagen en la parte superior del cuadrado
    imgPreview.style.left = '0'; // Alinear la imagen en la parte izquierda del cuadrado
    imgPreview.style.pointerEvents = 'none'; // Desactivar eventos de clic en la imagen para que el clic pase al cuadrado
    squareContainer.appendChild(imgPreview);

    // Agregar evento de clic al cuadrado para activar el input file
    squareContainer.addEventListener('click', function() {
      imgInput.click();
    });

    // Agregar evento de cambio para mostrar la imagen seleccionada
    imgInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          imgPreview.src = e.target.result; // Mostrar la imagen dentro del cuadrado
        };
        reader.readAsDataURL(file);
      }
    });

    // Agregar el cuadrado al traitInput
    traitInput.appendChild(squareContainer);
    

    // Input para el título
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'titulo');
    titleInput.classList.add('gjs-field', 'gjs-field-text');
    titleInput.placeholder = 'Título';
    traitInput.appendChild(titleInput);

    // Input para la fecha
    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'fecha');
    dateInput.classList.add('gjs-field', 'gjs-field-date');
    traitInput.appendChild(dateInput);

    // Input para el título del lugar
    const placeTitleInput = document.createElement('input');
    placeTitleInput.setAttribute('type', 'text');
    placeTitleInput.setAttribute('name', 'tituloLugar');
    placeTitleInput.classList.add('gjs-field', 'gjs-field-text');
    placeTitleInput.placeholder = 'Título del lugar';
    traitInput.appendChild(placeTitleInput);

    // Input para la dirección
    const addressInput = document.createElement('input');
    addressInput.setAttribute('type', 'text');
    addressInput.setAttribute('name', 'direccion');
    addressInput.classList.add('gjs-field', 'gjs-field-text');
    addressInput.placeholder = 'Dirección';
    traitInput.appendChild(addressInput);

    // Input para la ubicación
    const locationInput = document.createElement('input');
    locationInput.setAttribute('type', 'text');
    locationInput.setAttribute('name', 'ubicacion');
    locationInput.classList.add('gjs-field', 'gjs-field-text');
    locationInput.placeholder = 'Link Ubicación';
    traitInput.appendChild(locationInput);

    // Botón para consumir la API
    const btnConsumirAPI = document.createElement('button');
    btnConsumirAPI.classList.add('btnAgregarEvento');
    btnConsumirAPI.textContent = 'Agregar';
    btnConsumirAPI.addEventListener('click', function() {

      const data = {
        cardImagenEvento: imgInput.files[0].name,
        cardTitulo : titleInput.value,
        default: dateInput.value,
        cardLugar: placeTitleInput.value,
        cardDireccion: addressInput.value,
        botonEventos: {
          "src": locationInput.value,
          "text": "VER UBICACION"
        }
      };

      console.log(data);

      if(jsondata && jsondata['eventos-Western'] && jsondata['eventos-Western'].listado) {

        console.log('entra aca');

        console.log(jsondata['eventos-Western'].listado.length);

        jsondata['eventos-Western'].listado.push(data);

        console.log(jsondata['eventos-Western'].listado);
      }
      else {

        jsondata['eventos-Western'] = {};
        jsondata['eventos-Western'].listado = [];
        jsondata['eventos-Western'].listado.push(data);

      }
      console.log(jsondata['eventos-Western'].listado.length);

      const selectedComponent = editor.getSelected();
      if (selectedComponent) {
        // Modificar el atributo del modelo
        selectedComponent.set('cantidadEvent', jsondata['eventos-Western'].listado.length);
      }

    });
    traitInput.appendChild(btnConsumirAPI);

    return traitInput;
  },
});

editor.TraitManager.addType('listaRegalos', {
  createInput(model) {
    const traitInput = document.createElement('div');

    // Input para la URL de MercadoLibre
    const urlInput = document.createElement('input');
    urlInput.setAttribute('type', 'text');
    urlInput.setAttribute('name', 'urlMeli');
    urlInput.classList.add('gjs-field', 'gjs-field-text');
    urlInput.placeholder = 'URL de MercadoLibre';
    traitInput.appendChild(urlInput);

    // Botón para consumir la API
    const btnConsumirAPI = document.createElement('button');
    btnConsumirAPI.classList.add('btnApi');
    btnConsumirAPI.style.width = '100%'; 
    btnConsumirAPI.textContent = 'Buscar Producto';


    btnConsumirAPI.addEventListener('click', function() {
        
        productContainer.innerHTML = '';

        const mercadolibreUrl = urlInput.value;
        // Realizar la llamada a la API utilizando Axios
        axios.post('http://127.0.0.1:3000/dataMeli', { url: mercadolibreUrl }) // Reemplaza 'URL_DEL_PRODUCTO' con la URL real del producto
        .then(response => {
            const data = response.data;
            // Crear elementos HTML para mostrar la información del producto

            const productName = document.createElement('h3');
            productName.textContent = data.name;
            productName.style.fontSize = '13px'; 
            productContainer.appendChild(productName);

            const productImage = document.createElement('img');
            productImage.src = data.image;
            productImage.alt = data.name;
            productImage.style.width = '100%'; 
            productImage.style.height = '110px';
            productImage.classList.add('imgMercadolibre');
            productContainer.appendChild(productImage);

            const productPrice = document.createElement('p');
            productPrice.style.fontSize = '14px'; 
            productPrice.textContent = `$ ${data.offers.price} ${data.offers.priceCurrency}`;
            productContainer.appendChild(productPrice);

            const btnAgregarProducto = document.createElement('button');
            btnAgregarProducto.classList.add('btnAgregarProducto');
            btnAgregarProducto.style.width = '100%'; 
            btnAgregarProducto.textContent = 'Agregar';
            productContainer.appendChild(btnAgregarProducto);

            btnAgregarProducto.addEventListener('click', function() {

              console.log(data);

              var data2 = {
                cardTituloRegalo: data.name,
                cardDescRegalo : '',
                cardPrecioRegalo: data.offers.price,
                cardImgRegalo: data.image,
                botonRegalo: {
                  "src": mercadolibreUrl,
                  "text": "VER REGALO"
                }
              };

              console.log(data2);

              if(jsondata && jsondata['regalos-Western'] && jsondata['regalos-Western'].listado) {

                console.log('entra aca');
        
                console.log(jsondata['regalos-Western'].listado.length);
        
                jsondata['regalos-Western'].listado.push(data2);
        
                console.log(jsondata['regalos-Western'].listado);
              }
              else {
        
                jsondata['regalos-Western'] = {};
                jsondata['regalos-Western'].listado = [];
                jsondata['regalos-Western'].listado.push(data2);
        
              }
              console.log(jsondata['regalos-Western'].listado);
        
              const selectedComponent = editor.getSelected();
              if (selectedComponent) {
                // Modificar el atributo del modelo
                selectedComponent.set('cantidadRegalos', jsondata['regalos-Western'].listado.length);
              }

              $('.contenregalo').show();

            });

            // Agregar el contenedor del producto al trait
            traitInput.appendChild(productContainer);
        })
        .catch(error => {
            console.error('Error al consumir la API:', error);
        });
    });
    traitInput.appendChild(btnConsumirAPI);

    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    productContainer.classList.add('mt-5');
    productContainer.classList.add('text-center');
    traitInput.appendChild(productContainer);

    return traitInput;
  },
});

editor.TraitManager.addType('NombreComponent', {
  createInput(model) {

    var nombreComponent = model.component.attributes.NombreComponent;
    // Obtener el valor de la propiedad 'NombreComponent' del modelo
    //var nombreComponent = model.get('NombreComponent');

    // Crear el elemento div que contendrá los elementos del trait
    const traitInput = document.createElement('div');

    // Crear el título del trait
    const titulo = document.createElement('h5');
    titulo.classList.add('tituloTrait');
    titulo.classList.add('mb-3');
    titulo.classList.add('text-capitalize');
    titulo.textContent = nombreComponent; // Modificar el texto del título si es necesario
    traitInput.appendChild(titulo);

    // Devolver el elemento que contiene los elementos del trait
    return traitInput;
  },
});

editor.TraitManager.addType('cargarImagen', {
  // Define la plantilla para el trait
  createInput(model) {
    const traitInput = document.createElement('div');

    // Contenedor del cuadrado
    const squareContainer = document.createElement('div');
    squareContainer.style.width = '100%'; // Tamaño del cuadrado
    squareContainer.style.height = '100px'; // Tamaño del cuadrado
    squareContainer.style.marginBottom = '7px'; 
    squareContainer.style.backgroundColor = '#ccc'; // Color de fondo del cuadrado
    squareContainer.style.cursor = 'pointer'; // Cursor apuntador al pasar el mouse
    squareContainer.style.position = 'relative'; // Posición relativa para alinear el icono dentro del cuadrado
    squareContainer.addEventListener('click', () => {
      imgInput.click(); // Al hacer clic en el cuadrado, se activa el input file
    });

    // Icono dentro del cuadrado
    const icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add('fa-camera'); // Clases de Font Awesome para un icono de cámara
    icon.style.fontSize = '28px'; // Tamaño del icono
    icon.style.color = '#333'; // Color del icono
    icon.style.position = 'absolute'; // Posición absoluta para que el icono se ajuste dentro del cuadrado
    icon.style.top = '50%'; // Alinear el icono verticalmente en el centro del cuadrado
    icon.style.left = '50%'; // Alinear el icono horizontalmente en el centro del cuadrado
    icon.style.transform = 'translate(-50%, -50%)'; // Centrar el icono dentro del cuadrado
    squareContainer.appendChild(icon);

    // Input para la imagen
    const imgInput = document.createElement('input');
    imgInput.setAttribute('type', 'file');
    imgInput.setAttribute('accept', 'image/*');
    imgInput.setAttribute('name', 'img');
    imgInput.style.display = 'none'; // Ocultar el input file
    imgInput.addEventListener('change', handleFileSelect); // Manejar la selección de archivos cuando se elige una imagen
    traitInput.appendChild(imgInput);

    // Imagen dentro del cuadrado
    const imgPreview = document.createElement('img');
    imgPreview.id = 'preview-image';
    imgPreview.style.width = '100%'; // Establecer el ancho al 100% dentro del cuadrado
    imgPreview.style.height = '100%'; // Establecer la altura al 100% dentro del cuadrado
    imgPreview.style.objectFit = 'cover'; // Ajustar la imagen para que cubra todo el cuadrado
    imgPreview.style.position = 'absolute'; // Posición absoluta para que la imagen se ajuste dentro del cuadrado
    imgPreview.style.top = '0'; // Alinear la imagen en la parte superior del cuadrado
    imgPreview.style.left = '0'; // Alinear la imagen en la parte izquierda del cuadrado
    imgPreview.style.pointerEvents = 'none'; // Desactivar eventos de clic en la imagen para que el clic pase al cuadrado
    squareContainer.appendChild(imgPreview);

    traitInput.appendChild(squareContainer);

    function handleFileSelect(event) {

      var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      var formData = new FormData();

      // Agregar archivos al objeto FormData
      for (var i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
      }
    
      fetch('/panel/upload', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': token // Incluir el token CSRF en el encabezado de la solicitud
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const imageUrl = `${urlApp}/storage/uploads/`+data.data['nombre_imagen']; 
        imgPreview.src = imageUrl;

        const selectedComponent = editor.getSelected();
          if (selectedComponent) {
                
            selectedComponent.set('ImagenModal', imageUrl);
          }
        
      })
      .catch(error => {
        console.error('Error al subir la imagen:', error);
      });

    }

    return traitInput;
  },
});

editor.TraitManager.addType('cargarImagenLugar', {
  // Define la plantilla para el trait
  createInput(model) {
    const traitInput = document.createElement('div');

    // Contenedor del cuadrado
    const squareContainer = document.createElement('div');
    squareContainer.style.width = '100%'; // Tamaño del cuadrado
    squareContainer.style.height = '100px'; // Tamaño del cuadrado
    squareContainer.style.marginBottom = '7px'; 
    squareContainer.style.backgroundColor = '#ccc'; // Color de fondo del cuadrado
    squareContainer.style.cursor = 'pointer'; // Cursor apuntador al pasar el mouse
    squareContainer.style.position = 'relative'; // Posición relativa para alinear el icono dentro del cuadrado
    squareContainer.addEventListener('click', () => {
      imgInput.click(); // Al hacer clic en el cuadrado, se activa el input file
    });

    // Icono dentro del cuadrado
    const icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add('fa-camera'); // Clases de Font Awesome para un icono de cámara
    icon.style.fontSize = '28px'; // Tamaño del icono
    icon.style.color = '#333'; // Color del icono
    icon.style.position = 'absolute'; // Posición absoluta para que el icono se ajuste dentro del cuadrado
    icon.style.top = '50%'; // Alinear el icono verticalmente en el centro del cuadrado
    icon.style.left = '50%'; // Alinear el icono horizontalmente en el centro del cuadrado
    icon.style.transform = 'translate(-50%, -50%)'; // Centrar el icono dentro del cuadrado
    squareContainer.appendChild(icon);

    // Input para la imagen
    const imgInput = document.createElement('input');
    imgInput.setAttribute('type', 'file');
    imgInput.setAttribute('accept', 'image/*');
    imgInput.setAttribute('name', 'img');
    imgInput.style.display = 'none'; // Ocultar el input file
    imgInput.addEventListener('change', handleFileSelect); // Manejar la selección de archivos cuando se elige una imagen
    traitInput.appendChild(imgInput);

    // Imagen dentro del cuadrado
    const imgPreview = document.createElement('img');
    imgPreview.id = 'preview-image';
    imgPreview.style.width = '100%'; // Establecer el ancho al 100% dentro del cuadrado
    imgPreview.style.height = '100%'; // Establecer la altura al 100% dentro del cuadrado
    imgPreview.style.objectFit = 'cover'; // Ajustar la imagen para que cubra todo el cuadrado
    imgPreview.style.position = 'absolute'; // Posición absoluta para que la imagen se ajuste dentro del cuadrado
    imgPreview.style.top = '0'; // Alinear la imagen en la parte superior del cuadrado
    imgPreview.style.left = '0'; // Alinear la imagen en la parte izquierda del cuadrado
    imgPreview.style.pointerEvents = 'none'; // Desactivar eventos de clic en la imagen para que el clic pase al cuadrado
    squareContainer.appendChild(imgPreview);

    traitInput.appendChild(squareContainer);

    function handleFileSelect(event) {

      var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
      var formData = new FormData();

      // Agregar archivos al objeto FormData
      for (var i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
      }
    
      fetch('/panel/upload', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': token // Incluir el token CSRF en el encabezado de la solicitud
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const imageUrl = `${urlApp}/storage/uploads/`+data.data['nombre_imagen']; 
        imgPreview.src = imageUrl;

        const selectedComponent = editor.getSelected();
          if (selectedComponent) {
                
            selectedComponent.set('Imagenlugar', imageUrl);
          }
        
      })
      .catch(error => {
        console.error('Error al subir la imagen:', error);
      });

    }

    return traitInput;
  },
});

/*
editor.TraitManager.addType('cambiarTamañoImagen', {
  // Define la plantilla para el trait
  createInput(model) {
    const traitInput = document.createElement('div');

    // Input para el ancho de la imagen
    const widthInput = document.createElement('input');
    widthInput.setAttribute('type', 'number');
    widthInput.setAttribute('placeholder', 'Ancho (en píxeles)');
    widthInput.style.width = '100%';
    widthInput.style.marginBottom = '7px';
    widthInput.addEventListener('input', () => {
      const selectedComponent = editor.getSelected();
      if (selectedComponent) {
        selectedComponent.set('width', widthInput.value + 'px');
      }
    });
    traitInput.appendChild(widthInput);

    // Input para el alto de la imagen
    const heightInput = document.createElement('input');
    heightInput.setAttribute('type', 'number');
    heightInput.setAttribute('placeholder', 'Alto (en píxeles)');
    heightInput.style.width = '100%';
    heightInput.style.marginBottom = '7px';
    heightInput.addEventListener('input', () => {
      const selectedComponent = editor.getSelected();
      if (selectedComponent) {
        selectedComponent.set('height', heightInput.value + 'px');
      }
    });
    traitInput.appendChild(heightInput);

    return traitInput;
  },
});*/

editor.TraitManager.addType('cambiarTamañoImagen', {
  // Define la plantilla para el trait
  createInput(model) {
    const traitInput = document.createElement('div');

    // Contenedor del cuadrado para la vista previa de la imagen
    const squareContainer = document.createElement('div');
    squareContainer.style.width = '100%'; // Tamaño del cuadrado
    squareContainer.style.height = '100px'; // Tamaño del cuadrado
    squareContainer.style.marginBottom = '7px';
    squareContainer.style.backgroundColor = '#ccc'; // Color de fondo del cuadrado
    squareContainer.style.cursor = 'pointer'; // Cursor apuntador al pasar el mouse
    squareContainer.style.position = 'relative'; // Posición relativa para alinear los inputs dentro del cuadrado
    squareContainer.addEventListener('click', () => {
      fileInput.click(); // Al hacer clic en el cuadrado, se activa el input file
    });
    traitInput.appendChild(squareContainer);

    // Input file para seleccionar la imagen
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.style.display = 'none'; // Ocultar el input file
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.src = e.target.result;
          img.style.Width = 'fit-content';
          img.style.height = '100px';
          squareContainer.innerHTML = ''; // Limpiar el cuadrado antes de agregar la nueva imagen
          squareContainer.appendChild(img);

          const selectedComponent = editor.getSelected();
          if (selectedComponent) {
            selectedComponent.set('srcimg', e.target.result);
          }

        }
        reader.readAsDataURL(file);
      }
    });
    traitInput.appendChild(fileInput);

    // Input para el ancho de la imagen
    const widthInput = document.createElement('input');
    widthInput.setAttribute('type', 'number');
    widthInput.setAttribute('placeholder', 'Ancho (en píxeles)');
    widthInput.style.width = '100%';
    widthInput.style.marginBottom = '7px';
    widthInput.addEventListener('input', () => {
      const selectedComponent = editor.getSelected();
      if (selectedComponent) {
        selectedComponent.set('width', widthInput.value + 'px');
      }
    });
    traitInput.appendChild(widthInput);

    // Input para el alto de la imagen
    const heightInput = document.createElement('input');
    heightInput.setAttribute('type', 'number');
    heightInput.setAttribute('placeholder', 'Alto (en píxeles)');
    heightInput.style.width = '100%';
    heightInput.style.marginBottom = '7px';
    heightInput.addEventListener('input', () => {
      const selectedComponent = editor.getSelected();
      if (selectedComponent) {
        selectedComponent.set('height', heightInput.value + 'px');
      }
    });
    traitInput.appendChild(heightInput);

    // Botón para abrir el input file
    const selectImageButton = document.createElement('i');
    selectImageButton.classList.add('fa');
    selectImageButton.classList.add('fa-camera'); // Clases de Font Awesome para un icono de cámara
    selectImageButton.style.fontSize = '28px'; // Tamaño del icono
    selectImageButton.style.color = '#333'; // Color del icono
    selectImageButton.style.position = 'absolute'; // Posición absoluta para que el icono se ajuste dentro del cuadrado
    selectImageButton.style.top = '50%'; // Alinear el icono verticalmente en el centro del cuadrado
    selectImageButton.style.left = '50%'; // Alinear el icono horizontalmente en el centro del cuadrado
    selectImageButton.style.transform = 'translate(-50%, -50%)'; // Centrar el icono dentro del cuadrado
    squareContainer.appendChild(selectImageButton);

    return traitInput;
  },
});




const all = editor.getComponents();

var modelosfinal = all.models ;

modelosfinal.forEach(el => {

  console.log(el.attributes.name);

  if(el.attributes.name.includes('portada') || el.attributes.name.includes('contador') || el.attributes.name.includes('mensaje')){

    const randomId = el.attributes.name;

    el.addAttributes({
      id: randomId,
    })

  }

});


var componentesFinales = [];

var ordenComponentByCategory = {
  Bodas: ["portada", "historia", "galeria", "hashtag", "vestimenta", "canciones", "mensaje", "transporte", "eventos", "contador", "regalos", "testigos", "confirmacion"],
  Soltero: ['portada', 'dressInsta', 'galeria', 'contador', 'confirmacion'],
  Funeraria: ['portada', 'dressInsta', 'regalos'],
  Quince: ['portada', 'contador', 'lugar', 'dressInsta', 'galeria', 'mensaje','canciones','regalos','confirmacion'],
  Cumple:['portada', 'divisor', 'HoraDia', 'contador', 'lugar', 'galeria', 'canciones', 'regalos','hashtag','confirmacion'],
  Empresarial:['portada','galeria']
}


component.forEach(function(c) {
  
  if(!c.nombre.includes('lista')){

    componentesFinales.push(c);
  }

});

componentesFinales.sort((a, b) => {
  let indexA = ordenComponentByCategory[categoria].indexOf(a.nombre); // Obtener el índice del nombre de a en elementos
  let indexB = ordenComponentByCategory[categoria].indexOf(b.nombre); // Obtener el índice del nombre de b en elementos
  return indexA - indexB; // Ordenar según el índice en elementos
});

console.log(componentesFinales);



if(Array.isArray(jsondata) && Object.keys(jsondata).length === 0){

  console.log('entra en el 1ro');

  listaComponenteNoRepect = [];

}

if(!Array.isArray(jsondata) && Object.keys(jsondata).length === 0){


  componentesFinales.forEach(function(c) {


    editor.addComponents({
      type: c.nombre+'-'+tipoTemplate
    });

    listaComponenteNoRepect.push(c.nombre+'-'+tipoTemplate);

  });
}

if(!Array.isArray(jsondata) && Object.keys(jsondata).length !== 0){

  console.log('entra en el 3ro');

  Object.keys(jsondata).forEach(function(key) {

    editor.addComponents({
      type: key
    });

    listaComponenteNoRepect.push(key);

});

}




editor.on("run:open-assets", function () {
  
  const elementoTitulo = document.querySelector('.gjs-mdl-title');

  elementoTitulo.innerText = 'Selecciona una Imagen';

  const elementoTitulo2 = document.querySelector('#gjs-am-title');

  elementoTitulo2.innerText = 'Suelte los archivos aquí o haga clic para cargarlos';
})

editor.on('component:selected', (component) => {
  
   editor.refresh();
})

function toggleMainContent() {
  var mainContent = document.querySelector('.main-content');

  if (mainContent.style.width === '100%') {
      mainContent.style.transition = 'width 0.3s ease, left 0.3s ease'; // agregar transición suave al ancho y posición
      mainContent.style.width = '83%'; // establecer el ancho al valor original
      mainContent.style.left = '17%'; // establecer la posición al valor original

      

  } else {
      mainContent.style.transition = 'width 0.3s ease, left 0.3s ease'; // agregar transición suave al ancho y posición
      mainContent.style.width = '100%'; // establecer el ancho al 100%
      mainContent.style.left = '0%'; // establecer la posición a 0
  }

  editor.refresh();
}

const bm3 = editor.BlockManager;

  
var blocksfinal ;
var dragStart ;
var dragStop;


editor.on('block:custom', props => {
     
  blocksfinal = props.blocks;
  dragStart = props.dragStart;
  dragStop = props.dragStop;

});

if(!Array.isArray(jsondata) && Object.keys(jsondata).length === 0){



  if(typeof jsondata['galeria-'+tipoTemplate]){

    jsondata['galeria-'+tipoTemplate] = {};
  }

  jsondata['galeria-'+tipoTemplate].listado =[
    {imgGaleria: srcFotos[tipoTemplate]},
    {imgGaleria: srcFotos[tipoTemplate]},
    {imgGaleria: srcFotos[tipoTemplate]},
  ];

  if(typeof jsondata['eventos-'+tipoTemplate]){

    jsondata['eventos-'+tipoTemplate] = {};
  }

  jsondata['eventos-'+tipoTemplate].listado =[
    {
      botonEventos: {
          "src": '#',
          "text": "VER UBICACION"
                    },
      cardDireccion: 'Blvr. Chacabuco 737, Córdoba',
      cardImagenEvento: 'https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/10/Masia-Piguillem-1024x682.jpg',
      cardLugar: 'REGISTRO CIVIL CENTRAL',
      cardTitulo: 'CEREMONIA',
      default: ''
    },
    {

      botonEventos: {
          "src": '#',
          "text": "VER UBICACION"
                    },
      cardDireccion: 'Blvr. Chacabuco 737, Córdoba',
      cardImagenEvento: 'https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/10/Captura-1024x626.png',
      cardLugar: 'REGISTRO CIVIL CENTRAL',
      cardTitulo: 'CEREMONIA',
      default: ''
    },
    {

      botonEventos: {
          "src": '#',
          "text": "VER UBICACION"
                    },
      cardDireccion: 'Blvr. Chacabuco 737, Córdoba',
      cardImagenEvento: 'https://eleve11.ar/wp-content/uploads/jet-engine-forms/1/2022/09/registro-civi-3-1024x768.jpeg',
      cardLugar: 'REGISTRO CIVIL CENTRAL',
      cardTitulo: 'SALON DE FIESTA',
      default: ''
    }
  ];

  if(typeof jsondata['regalos-'+tipoTemplate]){

    jsondata['regalos-'+tipoTemplate] = {};
  }

  jsondata['regalos-'+tipoTemplate].listado =[
    {
      cardTituloRegalo: 'MICROONDAS MULTIUSO',
      cardDescRegalo : '',
      cardPrecioRegalo: '$ '+ '36452',
      cardImgRegalo: 'https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/10/51KuKbZdUFL._AC_SX679_.jpg',
      botonRegalo: {
        "src": '#',
        "text": "VER REGALO"
      }
    },
    {
      cardTituloRegalo: 'MICROONDAS MULTIUSO',
      cardDescRegalo : '',
      cardPrecioRegalo: '$ '+ '36452',
      cardImgRegalo: 'https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/10/51KuKbZdUFL._AC_SX679_.jpg',
      botonRegalo: {
        "src": '#',
        "text": "VER REGALO"
      }
    },
    {
      cardTituloRegalo: 'MICROONDAS MULTIUSO',
      cardDescRegalo : '',
      cardPrecioRegalo: '$ '+ '36452',
      cardImgRegalo: 'https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/10/51KuKbZdUFL._AC_SX679_.jpg',
      botonRegalo: {
        "src": '#',
        "text": "VER REGALO"
      }
    }
  ];

  if(typeof jsondata['testigos-'+tipoTemplate]){

    jsondata['testigos-'+tipoTemplate] = {};
  }

  jsondata['testigos-'+tipoTemplate].listado =[
    {
      "cardImg": "https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/09/dan-cornilov-ehUYU820lcA-unsplash.jpg",
      "cardNombre": "Mario",
      "cardRelacion": "Hermano"
    },
    {
      "cardImg": "https://eventdate.es/wp-content/uploads/jet-engine-forms/1/2022/09/radek-homola-TYPU7klExAw-unsplash.jpg",
      "cardNombre": "Karen",
      "cardRelacion": "Hermana"
    }
  ];

  
}





























