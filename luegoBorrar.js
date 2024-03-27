dc.addType(component[i].nombre+'-'+component[i].tipo, {
    extend: 'default',
    model: {
      defaults: {
          components: htmlActualizado,
          attributes: { id: component[i].nombre+'-'+component[i].tipo },
          styles: cssActualizado,
          void: false,
          badgable:false,
          NombreComponent:component[i].nombre,
          traits: [
            /*
            {
              type: 'image',
              name: '',
              label: '',
            },
            */
            {
              type:'NombreComponent',
              name: 'NombreComponent',
              label: 'Nombre del Componente',
            },
            {
              type:'text',
              name: 'tituloPortada',
              label: 'Titulo',
              changeProp: 1,
              value: 'Martin y Laura'
            },
            {
              type:'text',
              name: 'textoPortada',
              label: 'Texto',
              value: 'Nos Casamos !!',
              changeProp: 1,
            },
            {
              type: 'button',
              label: '',
              name: 'resetValores',
              text: 'Resetear valores',
              full: true, // Full width button
              command: editor => {

               var componente =  editor.getSelected();

               componente.view.prueba();

              }
            },
            {
              type: 'button',
              label: '',
              text: 'Eliminar Componente',
              name: 'eliminarComponent',
              full: true, // Full width button
              command: editor => {

               var componente =  editor.getSelected();

               componente.remove();

               let indice = listaComponenteNoRepect.indexOf(componente.attributes.type);

               listaComponenteNoRepect.splice(indice, 1);

               console.log(listaComponenteNoRepect);

               var divTrait = document.querySelector('.gjs-trt-traits');

               // Limpiar el contenido del div
               divTrait.innerHTML = '';

              }
          }
          ],
          droppable: false,
          hoverable: false,
          layerable: true,
          highlightable: false,
        }
    },
    view: {
      init () {
        this.listenTo(this.model, 'active', this.onActive)
        this.listenTo(this.model, 'change:src', this.updateImage)
        this.listenTo(this.model, 'change:tituloPortada', this.renderizar)
        this.listenTo(this.model, 'change:textoPortada', this.renderizar)
      },
      events: {
        //dblclick: 'onActive',
        'click .btnClickPorta': 'onActive',
        'click .btnClickPortaMobile': 'onActive',
        'click .titulo_portada': 'openTrait',
        'click .texto_portada': 'openTrait',
        click: 'openTrait'
      },
      onActive (ev) {
  
        if (ev) {
          editor.runCommand('open-assets', { target: this.model, types: ['image'], accept: 'image/*' });
        }
        
      },

      renderizar(){

        var tituloPortada = this.model.get("tituloPortada");

        var textoPortada = this.model.get("textoPortada");

        

        if(tituloPortada !== undefined){

          tituloPortada = tituloPortada.trim();

          if(tituloPortada != ''){

            if(jsondata['portada-Western']){

              jsondata['portada-Western'].titulo_portada = tituloPortada;
            }
            else{

              jsondata['portada-Western'] = [];
              jsondata['portada-Western'].titulo_portada = tituloPortada;


            }

          }

        }

        if(textoPortada !== undefined){

          textoPortada = textoPortada.trim();

          if(textoPortada != ''){

            if(jsondata['portada-Western']){

              jsondata['portada-Western'].texto_portada = textoPortada;
            }
            else{

              jsondata['portada-Western'] = [];
              jsondata['portada-Western'].texto_portada = textoPortada;


            }

          }

        }

        var htmlActualizado2 = htmlfinalPortada.replace(/\${([^}]+)}/g, (match, p1) => {
          return jsondata ? eval(p1) : '';
        });

        const content = this.model.components(htmlActualizado2);

      },

      openTrait(ev){



        var botonPortada = document.getElementById("tabAjustes");

        // Simular un clic en el botón
        botonPortada.click();

      },
      prueba(model) {

        this.model.set('tituloPortada', '');
        this.model.set('textoPortada', '');

        const content = this.model.components(htmlActualizado);
        
      },
      updateImage (model, url) {

        const selected = deviceManager.getSelected();

        console.log(url);

        if (url) {
          const style = model.getStyle()

          if(selected.id =='desktop'){

            assets[model.ccid + '-desktop'] = url;

          }

          else{

            assets[model.ccid + '-mobile'] = url;
          }

  
          model.setStyle({
            'background-image': `url("${url}")`,
            'background-size': 'cover',
            'background-position': 'center center',
            'background-repeat': 'no-repeat',
            'height': '100vh',
            'position':'relative',
            'display':'flex',
            'flex-direction':'column',
            'justify-content':'center',
            'align-items':'center',
            'box-shadow': 'inset 0 0 0 2000px rgba(7, 7, 7, 0.3)'
  
          })
        }
      }
    }
  });