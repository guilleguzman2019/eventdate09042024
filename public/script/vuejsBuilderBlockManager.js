var app2 = new Vue({
    el: '.blocks-wrp',
    data: 
    { blocks: [],
      searchTerm:'',
      filteredBlocks: []
    },
    mounted() {
      
      this.blocks = blocksfinal;
      this.dragStart = dragStart;
      this.dragStop = dragStop;
      this.filteredBlocks = this.blocks;

    },
    methods: {
      filterBlocksByCategory() {
        // Filtramos los bloques por categoría según el término de búsqueda
        this.filteredBlocks = this.blocks.filter(block => {
          return block.getCategoryLabel().toLowerCase().includes(this.searchTerm.trim().toLowerCase());
        });
      },
      onDragStart(block) {
        this.dragStart(block);
      },
      onDragStop() {
        this.dragStop();
      },
    },
    watch: {
      // Observador para detectar cambios en el término de búsqueda y actualizar los bloques filtrados
      searchTerm() {
        this.filterBlocksByCategory();
      },
    },
  });


  