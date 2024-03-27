new Vue({
    el: '#app',
    data() {
      return {
        transporte: data,
        invitacionesUnicas: [],
        filtroTemplate: '',
      };
    },
    created() {
      // Llena invitacionesUnicas con valores únicos al inicio
      this.invitacionesUnicas = [...new Set(this.transporte.map(t => t.Invitacion))];
    },
    mounted() {

    },
    computed: {
      
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
              location.reload();
            }
            
        })
        .catch(error => {
            
        });
    },

    prepararEditar(id, html, style) {
      this.htmlComponente = html;
      this.styleComponente = style;
      this.invitacionEditarId = id;

    },

    prepararEliminacion(id) {
      this.invitacionId = id;
      console.log('Preparando eliminación de la invitación con ID:', id);
    },

    eliminarInvitacion() {
      
      fetch('/panel/eliminar', {
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

      let invitacionesFiltradas = data;

    // Filtrar por template solo si se selecciona un template específico
    if (this.filtroTemplate !== '') {
        invitacionesFiltradas = invitacionesFiltradas.filter(inv => inv.Invitacion === this.filtroTemplate);
    }

    console.log(invitacionesFiltradas);

    // Actualizar el array de invitaciones con el resultado del filtrado
    this.transporte = invitacionesFiltradas;
  },
  exportToCSV() {
    // Obtén los datos que deseas exportar (puedes ajustar esto según tus necesidades)
    const dataToExport = this.transporte;

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