new Vue({
    el: '#app',
    data: {
      titulo: '',
      descripcion: '',
      precio: '',
      imagePreview: null,
      linkRegalo:'',
      urlMeli: '',
      productoMercadolibre: null,
      regaloEditando:'',
      editando: false,
      indexEditado : [],
      regalos: [],
      tipoTemplatefinal: ''
    },
    mounted() {

      this.tipoTemplatefinal = 'regalos-'+tipoTemplate ;

      if (jsondata && jsondata[this.tipoTemplatefinal] && jsondata[this.tipoTemplatefinal].listado) {
        // Realizar una copia profunda de los datos para evitar referencias
        this.regalos = JSON.parse(JSON.stringify(jsondata[this.tipoTemplatefinal].listado));
      }
      console.log(jsondata);

    },
    methods: {
      selectImage() {
        // Al hacer clic en el área, se simula un clic en el campo de entrada de tipo file
        this.$refs.fileInput.click();
      },
      buscarMercadolibre(){
        var url =  this.urlMeli ;

        axios.post('http://138.197.126.186/Meli', { url: url }) // Reemplaza 'URL_DEL_PRODUCTO' con la URL real del producto
        .then(response => {

            const data = response.data;

            console.log(data);

            this.productoMercadolibre = {
              cardTituloRegalo: data.titulo,
              cardDescRegalo: '',
              cardImgRegalo: data.imagen_principal,
              cardPrecioRegalo: data.precio,
              botonRegalo: {
                "src": url,
                "text": "VER REGALO"
              }
            };

            console.log(data);
        })
        .catch(error => {
            console.error('Error al consumir la API:', error);
        });
      },
      agregarProducto() {

        if (this.productoMercadolibre) {


        this.regalos.push(this.productoMercadolibre);

        if (jsondata[this.tipoTemplatefinal] && jsondata[this.tipoTemplatefinal].listado) {

          jsondata[this.tipoTemplatefinal].listado = this.regalos ;
           
        } else {

          jsondata[this.tipoTemplatefinal] = {};
          jsondata[this.tipoTemplatefinal].listado = [];
          jsondata[this.tipoTemplatefinal].listado = this.regalos ;
            
        }

          jsondata[this.tipoTemplatefinal].listado = this.regalos ;


          console.log(jsondata[this.tipoTemplatefinal].listado);

          var selectorfinal = '#listaregalos';
          var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];

          console.log(componente3);
      
          if (componente3) {
            componente3.set('cantidadRegalos', jsondata[this.tipoTemplatefinal].listado.length);
          }
        
        }

      },
      eliminarRegalo(index) {
        
        this.regalos.splice(index, 1);

        jsondata[this.tipoTemplatefinal].listado = this.regalos;

        var selectorfinal = '#listaregalos';
        var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];

        console.log(componente3);
    
        if (componente3) {
          componente3.set('cantidadRegalos', jsondata[this.tipoTemplatefinal].listado.length);
        }

        this.imagePreview = '';
        this.titulo = '';
        this.precio = '';
        this.linkRegalo = '';


      },
      editarRegalo(index) {

      console.log('Editar regalo', this.regalos[index]);

      this.indexEditado = index;

      const formEditar = document.querySelector('.manual');

      formEditar.click();

      this.editando = true;
      this.regaloEditando = this.regalos[index];
      console.log(this.regalos[index]);
      this.imagePreview = this.regaloEditando.cardImgRegalo;
      this.titulo = this.regaloEditando.cardTituloRegalo;
      this.precio = this.regaloEditando.cardPrecioRegalo;
      this.linkRegalo = this.regaloEditando.botonRegalo.src;
  

        jsondata[this.tipoTemplatefinal].listado = this.regalos;

        const selectedComponent = editor.getSelected();
            if (selectedComponent) {
              selectedComponent.set('cantidadRegalos', jsondata[this.tipoTemplatefinal].listado.length);
            }


      },
      guardarCambiosEditados(){

        var dataFinal = {
          cardTituloRegalo: this.titulo,
          cardDescRegalo : this.descripcion,
          cardPrecioRegalo: '$ '+this.precio,
          cardImgRegalo: this.imagePreview,
          botonRegalo: {
            "src": this.linkRegalo,
            "text": "VER REGALO"
          }
        };

        // Reemplazar el regalo en this.regalos con el nuevo objeto
        this.regalos.splice(this.indexEditado, 1, dataFinal);

        jsondata[this.tipoTemplatefinal].listado = this.regalos;

        var selectorfinal = '#listaregalos';
        var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
    
        if (componente3) {
          componente3.set('edicion', true);
        }
        
        this.editando = false;

        this.imagePreview = '';
        this.titulo = '';
        this.precio = '';
        this.linkRegalo = '';

      },
      previewImage(event) {
        // Al seleccionar una imagen, se muestra la vista previa en el área designada
        const file = event.target.files[0];
        if (file) {

            const formData = new FormData();
            formData.append('imagen', file);
            formData.append('folder', 'ImgRegalo');

            axios.post('/panel/upload2', formData)
            .then(response => {
              const rutaImagen = response.data[0].nombre_imagen
              this.imagePreview = `${urlApp}/storage/uploads/ImgRegalo/`+ rutaImagen;

            })
            .catch(error => {
              console.error('Error al cargar la imagen:', error);
            });
        }
      },
      scrollCarousel(distance) {
        const carousel = document.querySelector('.horizontal-carousel');
        carousel.scrollLeft += distance;
      },
      agregarRegalo() {


          var dataFinal = {
            cardTituloRegalo: this.titulo,
            cardDescRegalo : this.descripcion,
            cardPrecioRegalo: '$ '+this.precio,
            cardImgRegalo: this.imagePreview,
            botonRegalo: {
              "src": this.linkRegalo,
              "text": "VER REGALO"
            }
          };

          this.regalos.push(dataFinal);


          if (jsondata[this.tipoTemplatefinal] && jsondata[this.tipoTemplatefinal].listado) {

            jsondata[this.tipoTemplatefinal].listado = this.regalos;
            
          } else {

            jsondata[this.tipoTemplatefinal] = {};
            jsondata[this.tipoTemplatefinal].listado = [];

            jsondata[this.tipoTemplatefinal].listado = this.regalos;
              
          }

          var cantidad = jsondata[this.tipoTemplatefinal].listado.length;

          var selectorfinal = '#listaregalos';
          var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
    
          if (componente3) {
            componente3.set('cantidadRegalos', cantidad);
          }

            this.imagePreview = '';
            this.titulo = '';
            this.precio = '';
            this.linkRegalo = '';
          
      }
      }
  });