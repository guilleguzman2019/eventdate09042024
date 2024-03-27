new Vue({
    el: '#app',
    data() {
      return {
        campo1: '',
        campo2: '',
        campo3: '',
      };
    },
    mounted() {

        this.campo1 = decodedHTML;
        this.campo2 = decodedCss;
        this.campo3 = idComponent;
    },
    methods: {

        async guardarDatos() {
            try {
              const url = '/admin/updateComponent/';
      
              const response = await axios.post(url, {
                campo1: this.campo1,
                campo2: this.campo2,
                campo3: this.campo3,
                // ...envía más datos según tu modelo
              });
      
              console.log(response.data.mensaje);
              // Puedes hacer algo con la respuesta, como mostrar un mensaje de éxito.
            } catch (error) {
              console.error('Error al guardar datos:', error);
            }
          },
      
    },
  });