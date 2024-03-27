new Vue({
    el: '.padrinosfinal',
      data: {
        nombre:'',
        parentesco:'',
        padrinos: [],
        editandoPadrino: false,
        indiceEditado: null,
        tipoTemplatefinal: '',
        imagePreview: null,
      },
      mounted() {
  
        this.tipoTemplatefinal = 'testigos-'+tipoTemplate ;
  
        if (jsondata && jsondata[this.tipoTemplatefinal] && jsondata[this.tipoTemplatefinal].listado) {
          // Realizar una copia profunda de los datos para evitar referencias
          this.padrinos = JSON.parse(JSON.stringify(jsondata[this.tipoTemplatefinal].listado));
        }
        console.log(this.padrinos.length);
  
      },
      methods: {
        selectImage() {
          // Al hacer clic en el área, se simula un clic en el campo de entrada de tipo file
          this.$refs.fileInputPadrinos.click();
        },
        previewImage(event) {
          // Al seleccionar una imagen, se muestra la vista previa en el área designada
          const file = event.target.files[0];
          if (file) {
            
            const formData = new FormData();
            formData.append('imagen', file);
            formData.append('folder', 'ImgPadrino');

            axios.post('/panel/upload2', formData)
            .then(response => {
              const rutaImagen = response.data[0].nombre_imagen
              this.imagePreview = `${urlApp}/storage/uploads/ImgPadrino/`+ rutaImagen;

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
        agregarPadrino() {
  
          var nuevoPadrino = {
            "cardImg": this.imagePreview,
            "cardNombre": this.nombre,
            "cardRelacion": this.parentesco
          };
  
  
          this.padrinos.push(nuevoPadrino);
  
          if (jsondata[this.tipoTemplatefinal] && jsondata[this.tipoTemplatefinal].listado) {
  
            jsondata[this.tipoTemplatefinal].listado = this.padrinos;
            
          } else {
  
            jsondata[this.tipoTemplatefinal] = {};
            jsondata[this.tipoTemplatefinal].listado = [];
  
            jsondata[this.tipoTemplatefinal].listado = this.padrinos;
              
          }
  
          var cantidad = jsondata[this.tipoTemplatefinal].listado.length;

          var selectorfinal = '#listapadrinos';
          var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
  
          if (componente3) {
            componente3.set('cantidadTestigos', cantidad);
          }

  
          this.limpiarFormulario();
  
  
        },
        editarPadrino(index) {
  
          this.editandoPadrino = true;
          this.indiceEditado = index;
          const padrino = this.padrinos[index];
  
          this.imagePreview = padrino.cardImg;
          this.nombre = padrino.cardNombre;
          this.parentesco = padrino.cardRelacion;
          
        },
        guardarCambiosEditados() {
  
          var padrinoEditado = {
            "cardImg": this.imagePreview,
            "cardNombre": this.nombre,
            "cardRelacion": this.parentesco
          };
  
          this.padrinos.splice(this.indiceEditado, 1, padrinoEditado);
  
          jsondata[this.tipoTemplatefinal].listado = this.padrinos;

          var selectorfinal = '#listapadrinos';
          var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
  
          if (componente3) {
            componente3.set('edicion', true);
          }
  
  
          this.editandoPadrino = false;
          this.indiceEditado = null;
          this.limpiarFormulario();
        },
        eliminarPadrino(index) {

          this.padrinos.splice(index, 1);
  
          jsondata[this.tipoTemplatefinal].listado = this.padrinos;

          var selectorfinal = '#listapadrinos';
          var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
  
          if (componente3) {
            componente3.set('cantidadTestigos', jsondata[this.tipoTemplatefinal].listado.length);
          }
  
        this.editandofoto = false;
        this.limpiarFormulario();
  
        },
        limpiarFormulario() {
          this.imagePreviewPadrino = '';
        }
        
        }
    });