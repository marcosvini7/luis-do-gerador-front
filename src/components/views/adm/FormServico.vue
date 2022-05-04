<template>
  <button  @click="$router.back()" class="btn btn-secondary mt-2 mb-2 text-white">
     <i class="bi bi-arrow-left-circle"> Voltar</i> 
  </button>
  <carregando :condicao="$route.name == 'servicos.edicao'" msg="Ops...não foi possível encontrar esse serviço!" >
    <h3 class="text-center">
        <i class="bi bi-list-check"></i> {{tituloPagina}}
    </h3>
    <form @submit.prevent="salvar">
        <div class="form-group">
            <label for="servico" class="form-label">Serviço</label>
            <input type="text" class="form-control" id="servico" placeholder="Serviço" v-model="form.servico">
        </div>
        <div class="form-group">
            <label for="descricao" class="form-label">Descrição</label>
            <small class="form-text text-muted"> (opcional)</small>
            <textarea id="descricao" class="form-control" v-model="form.descricao" rows="3" placeholder="Descrição do serviço"></textarea>
        </div>
        <div class="form-group">
            <label for="arquivo" class="form-label">Imagem</label>
            <input type="file" accept="image/*" class="form-control" id="arquivo">
        </div>
        <button class="btn btn-primary mt-2">Salvar</button>
    </form>
  </carregando>
</template>

<script>
import requestMixin from '@/mixins/requestMixin'
export default {
  mixins: [requestMixin],
    data: () => ({
        form: {
            servico: '',
            descricao: ''
        }
    }),
    computed: {
        tituloPagina(){
            return this.$route.name == 'servicos.novo' ? 'Novo serviço' 
                : 'Edição do serviço Nº ' + this.$route.params.id
        }
    },
    methods: {
        salvar(){
            let feedbacks = []
            if(this.form.servico == '') feedbacks.push('O campo "serviço" não pode estar vazio')
            if(document.getElementById('arquivo').value == '') feedbacks.push('O campo "imagem" não pode estar vazio')

            if(feedbacks.length == 0) {
                if(this.$route.name == 'servicos.novo'){
                    this.postPut('servicos')
                } else {
                    this.postPut('servicos/' + this.$route.params.id, 'PUT')
                }   
                
            } else {
                this.$emitter.emit('exibirAlerta', {feedbacks: feedbacks, tipoFeedback: 'erro'})
            }
        }
    },
    created(){
        if(this.$route.name == 'servicos.edicao'){
            this.get('servicos/' + this.$route.params.id)
        }
    }
}
</script>

<style>

</style>