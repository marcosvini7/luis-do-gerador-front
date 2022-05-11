<template> 
  <div v-if="$route.name == 'servicos' || $route.name == 'adm.servicos'"> 
    <h3 class="text-center">
    <i class="bi bi-list-check"></i>
      Serviços oferecidos
    </h3>
    <button v-if="$route.name == 'adm.servicos' " @click="$router.push({name: 'servicos.novo'})" class="btn btn-info mb-2 mt-2 text-white">
      <i class="bi bi-plus-circle"> Adicionar serviço</i>
    </button>      
    <carregando :condicao="dados.length == 0" msg="Ops...nenhum serviço foi encontrado!">
      <div  v-for="servico in dados" :key="servico.id" class="d-flex align-items-center mt-3">
        <img :src="urlStorage + servico.urlImagem" style="width: 70px">
        <div style="margin-left: 5px; margin-right: 5px"></div>
        <div>
          <h5> {{ servico.servico }} </h5>
          <p v-if="servico.descricao != '' " > {{ servico.descricao }} </p>
          <div id="acoes" v-if="$route.name == 'adm.servicos' " class="d-flex justify-content-around border" style="width: 200px">    
            <i  @click="$router.push({name: 'servicos.edicao', params: {id: servico.id}})" class="bi bi-pencil text-info"></i>    
            <i  @click="$emitter.emit('exibir', {tipo: 'excluir', acao: excluir('servicos/' + servico.id)})" class="bi bi-trash text-danger"></i>          
          </div>
        </div>     
      </div>
    </carregando>
  </div>
  <router-view></router-view>
</template>

<script>
import requestMixin from '@/mixins/requestMixin'
export default {
  mixins: [requestMixin],
  created(){
    this.getDados('servicos')
  },
  beforeRouteUpdate(){
    this.getDados('servicos')
  }

}
</script>

<style scoped>
  h4 {
    margin-left: 10px;
  }
  #acoes i {
        font-size: 1.3em;
        cursor: pointer
    }
</style>