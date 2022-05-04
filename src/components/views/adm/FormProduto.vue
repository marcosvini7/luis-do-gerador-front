<template>
  <button  @click="$router.back()" class="btn btn-secondary mt-2 mb-2 text-white">
     <i class="bi bi-arrow-left-circle"> Voltar</i> 
  </button>
  <carregando :condicao="$route.name == 'produtos.edicao'" msg="Ops...esse produto não foi encontrado!">
  <h3 class="text-center">{{ tituloPagina }}</h3> 
    <form  @submit.prevent="validarForm">
      <div class="form-group">
        <label for="nome" class="form-label">Nome</label>
        <input type="text" id="nome" v-model="form.nome" class="form-control" placeholder="Nome do produto">
      </div>
      <div class="form-group">
        <label for="descricao" class="form-label">Descrição</label>
        <textarea  id="descricao" v-model="form.descricao" class="form-control" rows="6" placeholder="Descrição do produto"></textarea>
      </div>
      <div class="form-group">
        <label for="valor" class="form-label">Valor</label>
        <input type="number" id="valor" v-model="form.valor" class="form-control" placeholder="Valor do produto em reais">
      </div>
      <div class="form-group">
        <label for="imagem" class="form-label">Imagem do produto</label>
        <input type="file" id="arquivo" class="form-control" accept="image/*">
      </div>
      <button class="btn btn-primary mt-2"><i class="bi bi-save"></i> Salvar</button>
    </form>
  </carregando>
</template>

<script>
import requestMixin from '@/mixins/requestMixin'
export default {
  mixins: [requestMixin],
  data: () => ({  
    form: {
      nome: '',
      descricao: '', 
      valor: '',
    }
  }),
  computed: {
    tituloPagina(){
      return this.$route.name == 'produtos.novo' ? 'Novo produto' : 
        'Edição do produto Nº ' + this.$route.params.id
    }
  },
  methods: {
    validarForm(){
      let feedbacks = []
      let tipoFeedback = ''
      if(this.form.nome == '') feedbacks.push('O campo "nome" não pode estar vazio')
      if(this.form.descricao == '') feedbacks.push('O campo "descrição" não pode estar vazio')
      if(this.form.valor == '') feedbacks.push('O campo "valor" não pode estar vazio')
      if(this.$route.name == 'produtos.novo'){
        if(!document.getElementById('arquivo').files[0]) feedbacks.push('O campo "imagem" não pode ser vazio')
      }
      // se ocorrer erros no formulário
      if(feedbacks.length > 0){
        tipoFeedback = 'erro'            
        this.$emitter.emit('exibirAlerta', {feedbacks: feedbacks, tipoFeedback: tipoFeedback})        
      } else { // se não tiver erros
        if(this.$route.name == 'produtos.novo'){
          this.postPut('produtos')
        } else {
          this.postPut('produtos/' + this.$route.params.id, 'PUT')
        }    
      }
    }
  },
  created(){
    if(this.$route.name == 'produtos.edicao'){
      this.get('produtos/' + this.$route.params.id)
    }
  }
}
</script>

<style>

</style>