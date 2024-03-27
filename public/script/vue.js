new Vue({
    el: '#app',
    data() {
      return {
        templates: templates,
        templatesFiltrados: templates,
        titulo: '',
        categorias: categorias,
        validationErrors: null,
        textoTemplate : '',
        invitacionId: '',
        invitacionEditarTitulo : '',
        invitacionEditarTemplate : '',
        cart:[],
        invitaciones: data,
        filtroTemplate: '',
        filtroEstado: '',
        itemsPerPage: 4,
        currentPage: 1,
        busqueda:'',
        scrollContainer: null,
        urlApp: urlApp
      };
    },
    mounted() {
      // Inicializar el carrusel de Owl Carousel
      $('.owl-carousel').owlCarousel({
        items: 4,
        margin: 15,
        loop: false,
        nav: true,
        navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
      ],
      });

      this.scrollContainer = this.$refs.carouselContainer;
    },
    computed: {
      paginatedInvitaciones: function() {
          const start = (this.currentPage - 1) * this.itemsPerPage;
          const end = start + this.itemsPerPage;
          return this.invitaciones.slice(start, end);
      },
      totalPages: function() {
          return Math.ceil(this.invitaciones.length / this.itemsPerPage);
      },
    },
    methods: {
      filtrarPorCategoria(idCategoria) {
        this.templatesFiltrados = this.templates.filter(template => template.categoria === idCategoria);

        this.templatesFiltrados.forEach((image) => {
          image.selected = false
        });

      },
      toggleImage(index) {


        this.templatesFiltrados.forEach((image) => {
          console.log(image.selected);
          image.selected = false
        });

        this.templatesFiltrados[index].selected = true;

        this.cart = [this.templatesFiltrados[index]];
    
        this.textoTemplate = '';
    
        
      },
      closeModal() {
        
        this.validationErrors = null ;
        this.textoTemplate = '';
      },
      submitForm() {
        const selectedImage = this.cart[0]; // Obtener la imagen seleccionada
        
        if (!selectedImage) {

            console.error('No se ha seleccionado ninguna imagen');
            this.textoTemplate = 'No se ha seleccionado ningun template';
            return;
        }
    
        const data = {
            titulo: this.titulo,
            template_id: selectedImage.id,
            data: '{}',
            assets:'{}',
            status: 'pendiente'
        };
    
        fetch('/panel/crear', {
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

              confeti();

              setTimeout(() => {
                location.reload();
              }, 500)


            }
            
        })
        .catch(error => {
            
        });
    },

    prepararEditar(id, titulo, template) {
      this.invitacionEditarTitulo = titulo;
      this.invitacionEditarTemplate = template;
      this.invitacionEditarId = id;

    },
    EditarInvitacion(){

      fetch('/panel/editarInvitacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
          },
        body: JSON.stringify({
            id: this.invitacionEditarId,
            titulo: this.invitacionEditarTitulo,
            template_id: this.invitacionEditarTemplate
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
      this.invitacionId = id;
      console.log('Preparando eliminación de la invitación con ID:', id);
    },

    eliminarInvitacion() {
      
      fetch('/panel/eliminarInvitacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
        },
        body: JSON.stringify({
          invitacionId: this.invitacionId
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

      this.currentPage = 1;

      let invitacionesFiltradas = data;

    // Filtrar por template solo si se selecciona un template específico
    if (this.filtroTemplate !== '') {
        invitacionesFiltradas = invitacionesFiltradas.filter(inv => inv.template === this.filtroTemplate);
    }

    // Filtrar por estado solo si se selecciona un estado específico
    if (this.filtroEstado !== '') {
      invitacionesFiltradas = invitacionesFiltradas.filter(inv => inv.status === this.filtroEstado);
    }

    if (this.busqueda !== '') {
      const busquedaLower = this.busqueda.toLowerCase();
      invitacionesFiltradas = invitacionesFiltradas.filter(inv =>
          inv.titulo.toLowerCase().includes(busquedaLower)
      );
    }


    // Actualizar el array de invitaciones con el resultado del filtrado
    this.invitaciones = invitacionesFiltradas;
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
    exportToCSV() {
      // Obtén los datos que deseas exportar (puedes ajustar esto según tus necesidades)
      const dataToExport = this.invitaciones;
  
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
    scrollLeft() {
      if (this.scrollContainer) {
        this.scrollContainer.scrollLeft -= 200; // Ajusta la cantidad de desplazamiento según sea necesario
      }
    },
    scrollRight() {
      if (this.scrollContainer) {
        this.scrollContainer.scrollLeft += 200; // Ajusta la cantidad de desplazamiento según sea necesario
      }
    },
    },
  });