<template>
  <h3 class="text-center">Informações da página home</h3>
  <carregando msg="Ops...nenhuma informação foi encontrada!">
    <form @submit.prevent="salvar">
        <div class="form-group">
            <label for="endereco" class="form-label">Endereço</label>
            <input v-model="form.endereco" type="text" class="form-control" id="endereco" placeholder="Endereço da empresa">
        </div>
        <div class="form-group">
            <label for="telefone" class="form-label">Telefone</label>
            <input v-maska="'(##)#####-####'" v-model="form.telefone"  type="text" class="form-control" id="telefone" placeholder="Número de telefone">
            <small class="text-muted text-form">Exemplo: (86)99937-2650</small>
        </div>
        <div class="form-group">
            <label for="whatsapp" class="form-label">Whatsapp</label>
            <input v-maska="'#############'" v-model="form.whatsapp"  type="text" class="form-control" id="whatsapp" placeholder="Número de whatsapp">
            <small class="text-muted text-form">Somente dígitos, exemplo: 5586999372650</small>
        </div>
        <div class="form-group">
            <label for="email" class="form-label">E-mail</label>
            <input v-model="form.email"  type="email" class="form-control" id="email" placeholder="Endereço de e-mail">
        </div>
        <div class="form-group">
            <label for="localizacao" class="form-label">Localização</label>
            <input v-model="form.localizacao"  type="url" class="form-control" id="localizacao" placeholder="Link da localização">
        </div>
        <div class="form-group">
            <label for="arquivo" class="form-label">Imagem</label>
            <input type="file" class="form-control" id="arquivo">
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
            endereco: '',
            telefone: '',
            whatsapp: '',
            email: '',
            localizacao: ''
        }
    }),
    created(){
        this.get('informacoes/1')
    },
    methods: {
        salvar(){
            let feedbacks = []
            if(this.form.endereco == '') feedbacks.push('O campo "endereço" não pode estar vazio')
            if(this.form.telefone == '') feedbacks.push('O campo "telefone" não pode estar vazio')
            if(this.form.email == '') feedbacks.push('O campo "e-mail" não pode estar vazio')
            if(this.form.whatsapp == '') feedbacks.push('O campo "whatsapp" não pode estar vazio')
            else if(this.form.whatsapp.length != 13) feedbacks.push('O campo "whatsapp" deve ter 13 caracteres')
            if(this.form.localizacao == '') feedbacks.push('O campo "localizacao" não pode estar vazio')

            if(feedbacks.length == 0){
                this.postPut('informacoes/1', 'PUT')
            } else {
                this.$emitter.emit('exibirAlerta', {feedbacks: feedbacks, tipoFeedback: 'erro'})
            }
        }
    }
}
</script>

<style>

</style>