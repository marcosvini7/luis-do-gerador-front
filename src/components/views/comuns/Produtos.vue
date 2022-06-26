<template>

  <div v-if="$route.name == 'adm.produtos' || $route.name == 'produtos' ">
    <h3 class="text-center">
        <i class="bi bi-cart"></i>
        Produtos disponíveis
    </h3>
    <pesquisar/>
    <button v-if="$route.name == 'adm.produtos' " @click="$router.push({name: 'produtos.novo'})" class="btn btn-info mb-2 mt-2 text-white">
      <i class="bi bi-plus-circle"> Adicionar produto</i>
    </button>
    <carregando :condicao="dados.length == 0" msg="Ops...nenhum produto foi encontrado!">
      <div class="row">
          <div v-for="(produto) in dados" :key="produto.id" class="col-6 col-md-4 col-lg-2"> 
            <produto :produto="produto" />      
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
    this.pesquisar('produtos', this.$route.query) 
  },
  beforeRouteUpdate(to){ 
    this.pesquisar('produtos', to.query)
  }
}
</script>
