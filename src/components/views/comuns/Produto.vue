<template>

<button  @click="$router.back()" class="btn btn-secondary mt-2 mb-2 text-white">
    <i class="bi bi-arrow-left-circle"> Voltar</i>  
</button>
<carregando msg="Ops...esse produto não foi encontrado!">
  <div class="d-block d-md-flex align-items-center mt-3">
      <div class="col">
          <img v-if="!urlImagem.includes('undefined')" :src="urlImagem" class="img-fluid">
      </div>
      <div style="margin-left: 5px; margin-right: 5px"></div>
      <div class="col">
          <h4 class="text-center">{{dados.nome}}</h4>
          <p id="descricao"> {{ dados.descricao }} </p>
          <h4 style="font-style: italic"> Valor: R$ {{ dados.valor }},00</h4>
          <div class="d-flex justify-content-center mt-3 mb-3">         
            <button class="btn btn-info"  @click="favoritar">
                <i id="estrela" :class="estiloFavoritado"></i><span class="text-light"> Favoritar</span>
            </button>
          </div>
          <div id="acoes" v-if="$route.name == 'adm.produto' " class="d-flex justify-content-around border">    
            <i  @click="$router.push({name: 'produtos.edicao', params: {id: dados.id}})" class="bi bi-pencil text-info"></i>    
            <i  @click="$emitter.emit('exibir', {tipo: 'excluir', acao: excluir('produtos/' + dados.id)})" class="bi bi-trash text-danger"></i>          
          </div>    
     </div>     
  </div>
</carregando>
</template>

<script>
import localStorageMixin from '@/mixins/localStorajeMixin'
import requestMixin from '@/mixins/requestMixin'
export default {
    mixins: [localStorageMixin, requestMixin], 
    computed: {
        urlImagem(){
            return process.env.VUE_APP_URL_STORAGE + this.dados.urlImagem
        }
    },
    created(){
        this.verificarFavorito()
        this.get('produtos/' + this.$route.params.id)
    },
    beforeRouteUpdate(to){
        this.get('produtos/' + to.params.id)
    }
}
</script>

<style scoped>
    #descricao {
        white-space: pre-wrap;        
        word-wrap: break-word;       
    }
    #estrela {
        color: rgb(238, 230, 122);
        font-size: 1.3em;
        cursor: pointer
    }
    #acoes i {
        font-size: 1.3em;
        cursor: pointer
    }
</style>