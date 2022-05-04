export default {
    data: () => ({
        favoritos: [],
        estiloFavoritado: 'bi bi-star',
        produto: {}
    }),
    methods: {
        favoritar(){
            let favoritos = localStorage.getItem('favoritos')
                
            if(!favoritos){
                favoritos = []
            } else {
                favoritos = JSON.parse(favoritos)
            }

            if(!this.verificarFavorito()){                              
                favoritos.push(this.dados)
                localStorage.setItem('favoritos', JSON.stringify(favoritos))
                this.estiloFavoritado = 'bi bi-star-fill'
            } else {
                let index = 0
                for(let i = 0; i < favoritos.length; i++){
                    if(favoritos[i].id == this.dados.id) break
                    index++
                }
                favoritos.splice(index, 1)
                localStorage.setItem('favoritos', JSON.stringify(favoritos))
                this.estiloFavoritado = 'bi bi-star'
            }
            this.$emitter.emit('favoritou')
        },

        desfavoritar(id){
            let favoritos = localStorage.getItem('favoritos')
                
            if(!favoritos){
                favoritos = []
            } else {
                favoritos = JSON.parse(favoritos)
            }
  
            let index = 0
            for(let i = 0; i < favoritos.length; i++){
                if(favoritos[i].id == id) break
                index++
            }

            favoritos.splice(index, 1)          
            localStorage.setItem('favoritos', JSON.stringify(favoritos))
            this.$emitter.emit('favoritou')
        },

        getFavoritos(){
            let favoritos = localStorage.getItem('favoritos')
            
            if(!favoritos){
                favoritos = []
            } else {
                favoritos = JSON.parse(favoritos)
            }

            this.favoritos = favoritos
        },

        verificarFavorito(){
            let favoritos = localStorage.getItem('favoritos')
            
            if(!favoritos){
                favoritos = []
            } else {
                favoritos = JSON.parse(favoritos)
            }
            let favoritado = false
            favoritos.forEach(item => {
                if(item.id == this.$route.params.id){
                    this.estiloFavoritado = 'bi bi-star-fill'
                    favoritado = true
                } 
            })

            return favoritado

        }
    }

}