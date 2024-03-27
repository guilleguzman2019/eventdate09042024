new Vue({
    el: '#app',
    data() {
      return {
        categorias: data,
        categoria: {
          nombre: '',
        },
        categoriaEditarId : '',
        categoriaEliminarId : '',
        categoriaEditarNombre : '',
        invitacionesUnicas: [],
        filtroTemplate: '',
        itemsPerPage: 6,
        currentPage: 1,
      };
    },
    computed: {
      paginatedCategorias: function() {
          const start = (this.currentPage - 1) * this.itemsPerPage;
          const end = start + this.itemsPerPage;
          return this.categorias.slice(start, end);
      },
      totalPages: function() {
          return Math.ceil(this.categorias.length / this.itemsPerPage);
      },
    },
    mounted() {

    },
    methods: {
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
          nombre: this.categoria.nombre,
      };
  
        fetch('/admin/crearCategoria', {
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

    prepararEditar(id,nombre) {

      this.categoriaEditarId = id ;
      this.categoriaEditarNombre = nombre;

    },
    EditarCategoria(){

      var id = this.categoriaEditarId;
      var nombre = this.categoriaEditarNombre;

      fetch('/admin/editarCategoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
          },
        body: JSON.stringify({
            id: id,
            nombre: nombre,
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
      this.categoriaEliminarId = id;
      console.log('Preparando eliminación de la invitación con ID:', id);
    },

    eliminarInvitacion() {

      var id = this.categoriaEliminarId ;
      
      fetch('/admin/eliminarCategoria', {
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
  }
    },
  });