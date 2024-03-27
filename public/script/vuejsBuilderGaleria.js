new Vue({
    el: '.galeriaFinal',
      data: {
        fotos: [],
        editandofoto: false,
        indiceEditado: null,
        tipoTemplatefinal: '',
        imagePreview: null,
      },
      mounted() {
  
        this.tipoTemplatefinal = 'galeria-'+tipoTemplate ;
  
        if (jsondata && jsondata[this.tipoTemplatefinal] && jsondata[this.tipoTemplatefinal].listado) {
          // Realizar una copia profunda de los datos para evitar referencias
          this.fotos = JSON.parse(JSON.stringify(jsondata[this.tipoTemplatefinal].listado));

          this.actualizar();

        }
        console.log(this.fotos);
  
      },
      methods: {
        selectImage() {
          // Al hacer clic en el área, se simula un clic en el campo de entrada de tipo file
          this.$refs.fileInput3.click();
        },
        previewImage(event) {
          // Al seleccionar una imagen, se muestra la vista previa en el área designada
          const file = event.target.files[0];
          if (file) {

            const formData = new FormData();
            formData.append('imagen', file);
            formData.append('folder', 'ImgGaleria');

            axios.post('/panel/upload2', formData)
            .then(response => {
              const rutaImagen = response.data[0].nombre_imagen
              this.imagePreview = `${urlApp}/storage/uploads/ImgGaleria/`+ rutaImagen;

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
        agregarFoto() {
  
          var nuevaFoto = {
            imgGaleria: this.imagePreview,
          };
  
  
          this.fotos.push(nuevaFoto);
  
          if (jsondata[this.tipoTemplatefinal] && jsondata[this.tipoTemplatefinal].listado) {
  
            jsondata[this.tipoTemplatefinal].listado = this.fotos;
            
          } else {
  
            jsondata[this.tipoTemplatefinal] = {};
            jsondata[this.tipoTemplatefinal].listado = [];
  
            jsondata[this.tipoTemplatefinal].listado = this.fotos;
              
          }
  
          var cantidad = jsondata[this.tipoTemplatefinal].listado.length;

          var selectorfinal = '#listagaleria';
          var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
  
          if (componente3) {
            componente3.set('cantidadEvent', cantidad);
          }

  
          this.limpiarFormulario();
  
  
        },
        editarFoto(index) {
  
          this.editandofoto = true;
          this.indiceEditado = index;
          var foto = this.fotos[index];
  
          this.imagePreview = foto.imgGaleria;
          
        },
        guardarCambiosEditados() {
  
          var fotoEditada = {
  
            imgGaleria: this.imagePreview,
          };
  
          this.fotos.splice(this.indiceEditado, 1, fotoEditada);
  
          jsondata[this.tipoTemplatefinal].listado = this.fotos;

          var selectorfinal = '#listagaleria';
          var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
  
          if (componente3) {
            componente3.set('edicion', true);
          }
  
  
          this.editandofoto = false;
          this.indiceEditado = null;
          this.limpiarFormulario();
        },
        eliminarFoto(index) {

          this.fotos.splice(index, 1);
  
          jsondata[this.tipoTemplatefinal].listado = this.fotos;

          var selectorfinal = '#listagaleria';
          var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
  
          if (componente3) {
            componente3.set('cantidadEvent', jsondata[this.tipoTemplatefinal].listado.length);
          }
  
        this.editandofoto = false;
        this.limpiarFormulario();
  
        },
        limpiarFormulario() {
          this.imagePreview = '';
        },
        actualizar(){

          var selectorfinal = '#listagaleria';
          var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];

          console.log(componente3);
  
          if (componente3) {
            componente3.set('edicion', true);
          }

        }
        
        }
    });