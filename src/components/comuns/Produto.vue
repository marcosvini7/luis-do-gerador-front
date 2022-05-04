<template>
  <div class="produto" @click="navegarPara" >
      <img :src="urlImagem" class="img-fluid">
      <h5>{{produto.nome}}</h5>
      <h5 style="font-style: italic"> R${{produto.valor}},00</h5>
  </div>
  <div v-if="$route.name == 'adm.produtos' " class="d-flex justify-content-around border mb-3">    
    <i  @click="$router.push({name: 'produtos.edicao', params: {id: produto.id}})" class="bi bi-pencil text-info"></i>    
    <i  @click="$emitter.emit('exibir', {tipo: 'excluir', acao: excluir('produtos/' + produto.id)})" class="bi bi-trash text-danger"></i>          
  </div>
</template>

<script>
import requestMixin from '@/mixins/requestMixin'
export default {
    mixins: [requestMixin],
    props: ['produto'],
    computed: {
        urlImagem(){
            return process.env.VUE_APP_URL_STORAGE + this.produto.urlImagem
        }
    },
    methods: {    
       navegarPara(){
           if(this.$route.name == 'adm.produtos'){
               this.$router.push({name: 'adm.produto', params: {id: this.produto.id}})
           } else {
               this.$router.push({name: 'produto', params: {id: this.produto.id}})
           }
       },                            
    }
}
</script>

<style scoped>
    .produto:hover {
        cursor: pointer;
        opacity: 0.7;
        
    }
    i {
        font-size: 1.3em;
        cursor: pointer
    }
</style>