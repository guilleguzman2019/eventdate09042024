new Vue({
    el: '#app',
    data() {
      return {
        templates: data,
        template: {
          nombre: '',
          categoria_id: '',
          imagen: '',
        },
        imagePreview: null,
        templateEditaId: '',
        templateEditaNombre:'',
        templateEditaCategoria:'',
        templateEditaImagen:'',
        idTemplateDelete: '',
        categories: data2,
        invitacionesUnicas: [],
        filtroTemplate: '',
        itemsPerPage: 6,
        currentPage: 1,
        urlApp: urlApp
      };
    },
    computed: {
      totalPages: function() {
          return Math.ceil(this.templates.length / this.itemsPerPage);
      },
    },
    mounted() {

    },
    methods: {
      selectImage() {
        // Al hacer clic en el área, se simula un clic en el campo de entrada de tipo file
        this.$refs.fileInputTemplate.click();
      },
      previewImage(event) {
        // Al seleccionar una imagen, se muestra la vista previa en el área designada
        const file = event.target.files[0];
        if (file) {

          const formData = new FormData();
          formData.append('imagen', file);
          formData.append('folder', 'ImgTemplate');

          axios.post('/admin/upload', formData)
            .then(response => {
              const rutaImagen = response.data.data.nombre_imagen
              this.imagePreview = `${urlApp}/storage/uploads/ImgTemplate/`+rutaImagen;
              this.template.imagen =rutaImagen;

            })
            .catch(error => {
              console.error('Error al cargar la imagen:', error);
            });
          
        }
      },
      handleFileChange(event) {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            this.template.imagen = file;

            // Crear un objeto FormData para enviar el archivo al backend
            const formData = new FormData();
            formData.append('imagen', file);

            // Realizar la solicitud POST al endpoint de carga
            axios.post('/admin/upload', formData)
                .then(response => {
                    // La respuesta del servidor debería contener la URL de la imagen
                    const rutaImagen = response.data.data.nombre_imagen;
                    console.log(rutaImagen);
                    this.templateEditaImagen = `${urlApp}/storage/uploads/`+ rutaImagen;
                    this.template.imagen = `${urlApp}/storage/uploads/`+ rutaImagen;

                })
                .catch(error => {
                    console.error('Error al cargar la imagen:', error);
                });
        } else {
            alert('Por favor, seleccione un archivo de imagen válido.');
            event.target.value = null;
        }
      },
      toggleImage(index) {
        console.log(this.images[index].name);
        
        // Desmarcar todas las imágenes
        this.images.forEach((image) => {
          image.selected = false;
        });
    
        // Marcar la imagen seleccionada
        this.images[index].selected = true;
    
        // Limpiar el carrito y agregar la imagen seleccionada
        this.cart = [this.images[index]];
    
        console.log(this.cart);
        this.textoTemplate = '';
      },
      closeModal() {
        
        this.validationErrors = null ;
        this.textoTemplate = '';
      },
      submitForm() {

        const data = {
          name: this.template.nombre,
          image: this.template.imagen,
          category_id: this.template.categoria_id,
      };
  
        fetch('/admin/crearTemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(data.errors){

              this.validationErrors = data.errors;
            }

            else{

              $('#addEmployeeModal').modal('hide');
              location.reload();
            }
            
        })
        .catch(error => {
            
        });
      },

      prepararEditar(id,nombre, categoria, imagen) {
        this.templateEditaId = id;
        this.templateEditaNombre = nombre;
        this.templateEditaCategoria = categoria;
        this.templateEditaImagen = imagen;

      },
      EditarTemplate(){

        var id = this.templateEditaId;
        var nombre = this.templateEditaNombre;
        var categoria = this.templateEditaCategoria;
        var imagen = this.templateEditaImagen;

        fetch('/admin/editarTemplate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
            },
          body: JSON.stringify({
              id: id,
              nombre: nombre,
              categoria : categoria,
              imagen: imagen
          })
          })
          .then(response => response.json())
          .then(data => {
              if (data.errors) {
                  console.log(data);
                  this.validationErrors = data.errors;
              } else {
                  $('#editEmployeeModal').modal('hide');
                  location.reload();
              }
          })
          .catch(error => {
              // Manejar errores si es necesario
              console.error('Error al editar invitación', error);
          });

      },
      prepararEliminacion(id) {
        this.idTemplateDelete = id;
        console.log('Preparando eliminación de la invitación con ID:', id);
      },

      eliminarTemplate() {

        var id = this.idTemplateDelete ;
        
        fetch('/admin/deleteTemplate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
          },
          body: JSON.stringify({
            id: id
          })
        })
        .then(response => {
          
          return response.json();
        })
        .then(data => {
          console.log(data);
          
            $('#deleteEmployeeModal').modal('hide');
            location.reload();
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });

      },
      filtrarInvitaciones() {

        let invitacionesFiltradas = data;

      // Filtrar por template solo si se selecciona un template específico
      if (this.filtroTemplate !== '') {
          invitacionesFiltradas = invitacionesFiltradas.filter(inv => inv.Invitacion === this.filtroTemplate);
      }

      // Actualizar el array de invitaciones con el resultado del filtrado
      this.canciones = invitacionesFiltradas;
      },
      exportToCSV() {
        // Obtén los datos que deseas exportar (puedes ajustar esto según tus necesidades)
        const dataToExport = this.confirmados;

        // Convierte los datos a formato CSV utilizando PapaParse
        const csv = Papa.unparse(dataToExport);

        // Crea un objeto Blob para el archivo CSV
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        // Crea un enlace para descargar el archivo CSV
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', 'invitaciones.csv');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      },
      changePage: function(page) {
        this.currentPage = page;
      },
      prevPage: function() {
          if (this.currentPage > 1) {
              this.currentPage--;
          }
      },
      nextPage: function() {
          if (this.currentPage < this.totalPages) {
              this.currentPage++;
          }
      },
    },
  });