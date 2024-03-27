new Vue({
  el: '.eventosFinal',
    data: {
      titulo: '',
      fecha: '',
      nombre: '',
      direccion:'',
      linkMaps: '',
      eventos: [],
      editandoEvento: false,
      indiceEditado: null,
      tipoTemplatefinal: '',
      imagePreview: null,
    },
    mounted() {

      this.tipoTemplatefinal = 'eventos-'+tipoTemplate ;

      if (jsondata && jsondata[this.tipoTemplatefinal] && jsondata[this.tipoTemplatefinal].listado) {
        // Realizar una copia profunda de los datos para evitar referencias
        this.eventos = JSON.parse(JSON.stringify(jsondata[this.tipoTemplatefinal].listado));
      }
      console.log(this.eventos);

    },
    methods: {
      selectImage() {
        // Al hacer clic en el área, se simula un clic en el campo de entrada de tipo file
        this.$refs.fileInput2.click();
      },
      previewImage(event) {
        // Al seleccionar una imagen, se muestra la vista previa en el área designada
        const file = event.target.files[0];
        if (file) {

            const formData = new FormData();
            formData.append('imagen', file);
            formData.append('folder', 'ImgEvento');

            axios.post('/panel/upload2', formData)
            .then(response => {
              const rutaImagen = response.data[0].nombre_imagen
              this.imagePreview = `${urlApp}/storage/uploads/ImgEvento/`+ rutaImagen;

            })
            .catch(error => {
              console.error('Error al cargar la imagen:', error);
            });

        }
      },
      scrollCarouselEventos(distance) {
        const carousel = document.querySelector('.horizontal-carousel');
        carousel.scrollLeft += distance;
      },
      agregarEvento() {

        var nuevoEvento = {

          botonEventos: {
              "src": this.linkMaps,
              "text": "VER UBICACION"
                        },
          cardDireccion: this.direccion,
          cardImagenEvento: this.imagePreview,
          cardLugar: this.nombre,
          cardTitulo: this.titulo,
          default: this.fecha
        };


        this.eventos.push(nuevoEvento);

        if (jsondata[this.tipoTemplatefinal] && jsondata[this.tipoTemplatefinal].listado) {

          jsondata[this.tipoTemplatefinal].listado = this.eventos;
          
        } else {

          jsondata[this.tipoTemplatefinal] = {};
          jsondata[this.tipoTemplatefinal].listado = [];

          jsondata[this.tipoTemplatefinal].listado = this.eventos;
            
        }

        var cantidad = jsondata[this.tipoTemplatefinal].listado.length;

        var selectorfinal = '#listaeventos';
        var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
  
        if (componente3) {
           componente3.set('cantidadEvent', cantidad);
        }

        this.limpiarFormulario();


      },
      editarEvento(index) {

        this.editandoEvento = true;
        this.indiceEditado = index;
        const evento = this.eventos[index];

        this.titulo = evento.cardTitulo;
        this.nombre = evento.cardLugar;
        this.direccion= evento.cardDireccion;
        this.imagePreview= evento.cardImagenEvento;
        this.fecha = evento.default;
        this.linkMaps = evento.botonEventos.src;
        
      },
      guardarCambiosEditados() {

        var eventoEditado = {

          botonEventos: {
              "src": this.linkMaps,
              "text": "VER UBICACION"
                        },
          cardDireccion: this.direccion,
          cardImagenEvento: this.imagePreview,
          cardLugar: this.nombre,
          cardTitulo: this.titulo,
          default: this.fecha
      };

        this.eventos.splice(this.indiceEditado, 1, eventoEditado);

        jsondata[this.tipoTemplatefinal].listado = this.eventos;

        var selectorfinal = '#listaeventos';
        var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
  
        if (componente3) {
           componente3.set('edicion', true);
        }

        this.editandoEvento = false;
        this.indiceEditado = null;
        this.limpiarFormulario();

      },
      eliminarEvento(index) {
        this.eventos.splice(index, 1);

        jsondata[this.tipoTemplatefinal].listado = this.eventos;


        var selectorfinal = '#listaeventos';
        var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
  
        if (componente3) {
           componente3.set('cantidadEvent', jsondata[this.tipoTemplatefinal].listado.length);
        }

        this.editandoEvento = false;
        this.limpiarFormulario();

      },
      limpiarFormulario() {
        this.titulo = '';
        this.direccion = '';
        this.nombre = '';
        this.fecha = '';
        this.linkMaps = '';
        this.imagePreview = '';
      }
      
      }
  });