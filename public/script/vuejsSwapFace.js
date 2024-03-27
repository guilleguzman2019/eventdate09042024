new Vue({
    el: '.swapface',
    data:{
        imagePreview1: null,
        imagePreview2: null,
    },
    methods: {
        selectImage1() {
          // Al hacer clic en el área, se simula un clic en el campo de entrada de tipo file
          this.$refs.fileInput4.click();
        },
        selectImage2() {
            // Al hacer clic en el área, se simula un clic en el campo de entrada de tipo file
            this.$refs.fileInput5.click();
          },

        previewImage1(event) {
            // Al seleccionar una imagen, se muestra la vista previa en el área designada
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                this.imagePreview1 = e.target.result;
              };
              reader.readAsDataURL(file);
            }
        },
        previewImage2(event) {
            // Al seleccionar una imagen, se muestra la vista previa en el área designada
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                this.imagePreview2 = e.target.result;
              };
              reader.readAsDataURL(file);
            }
        },

        EnviarCaras(){

            document.getElementById('loadingIndicator').style.display = 'block';
            document.getElementById('resultadoImg').style.display = 'none';

            var img1 = this.dataURLtoFile(this.imagePreview1, 'img1.jpg');
            var img2 = this.dataURLtoFile(this.imagePreview2, 'img2.jpg');

            console.log(img1);

            // Crear un objeto FormData para enviar los archivos
            var formData = new FormData();
            formData.append('img', img1);
            formData.append('imgguille', img2);

            // Configurar la solicitud POST con Fetch
            fetch('http://45.55.136.142:5000/intercambiar_caras', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {


                // Manejar la respuesta del servidor
                var imgBase64 = data.image_base64;

                var byteCharacters = atob(imgBase64);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], { type: 'image/jpeg' });

                var formData = new FormData();
                formData.append('file', blob, 'nombreRandom' + '.' + 'png');

                // Enviar la imagen al servidor Flask
                fetch('http://159.203.107.76:5000/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {

                    document.getElementById('loadingIndicator').style.display = 'none';
                    // Manejar la respuesta del servidor si es necesario
                    var finalbase64 = 'data:image/jpeg;base64,' + data.image;

                    var binaryImg = atob(finalbase64.split(',')[1]);
                    var arrayImg = [];
                    for(var i = 0; i < binaryImg.length; i++) {
                        arrayImg.push(binaryImg.charCodeAt(i));
                    }
                    var file = new Blob([new Uint8Array(arrayImg)], {type: 'image/jpeg'});

                    // Generar un nombre aleatorio para la imagen
                    var nombreArchivo = 'imagen_' + Math.random().toString(36).substr(2, 9) + '.jpeg';

                    // Crear un FormData para enviar la imagen al servidor
                    var formData = new FormData();
                    formData.append('imagen', file, nombreArchivo);

                    axios.post('/panel/upload2', formData)
                    .then(response => {

                        const urlfinal = `${urlApp}/storage/uploads/`+response.data[0].nombre_imagen

                        document.getElementById('resultadoImg').src = urlfinal;
                        document.getElementById('resultadoImg').style.display = 'block';

                        var selectorfinal = '#portada-HarryPotter';
                        var componente3 = editor.DomComponents.getWrapper().find(selectorfinal)[0];
                
                        if (componente3) {
                            componente3.set('src', urlfinal);
                        }

                    })
                    .catch(error => {
                    console.error('Error al cargar la imagen:', error);
                    });
                })
                .catch(error => {
                    console.error('Error during upload:', error);
                });

                
            })
            .catch(error => {

                document.getElementById('loadingIndicator').style.display = 'none';

                // Manejar errores de la solicitud
                console.error('Error al enviar las imágenes:', error);
            });
        },
        dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), 
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
        
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
        
            return new File([u8arr], filename, {type:mime});
        }
    }
})