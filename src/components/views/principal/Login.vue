<template>
  <h3 class="text-center">Acesso à administração</h3>
  <div class="d-flex justify-content-center">
      <div class="col col-md-6">
          <form @submit.prevent="acessar" class="form-control">
            <div class="form-group">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" placeholder="Endereço de e-mail" v-model="form.email" id="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="senha" class="form-label">Senha</label>
                <input type="password" placeholder="Senha" v-model="form.senha" id="senha" class="form-control">
            </div>
            <button class="btn btn-primary mt-2">Acessar</button>
        </form>
      </div>   
  </div>
  
</template>

<script>
import requestMixin from '@/mixins/requestMixin'
export default {
  mixins: [requestMixin],
    data: () => ({
        form: {
            email: '',
            senha: ''
        },
    }),
    mounted(){
        if(this.$route.query.erro) this.$emitter.emit('exibirAlerta', {feedbacks: ['Você precisa fazer o login antes!'], tipoFeedback: 'erro'})
    },
    methods: {
        acessar(){
            let feedbacks = []
            if(this.form.email == '') feedbacks.push('O campo "e-mail" não pode estar vazio')
            if(this.form.senha == '') feedbacks.push('O campo "senha" não pode estar vazio')
            if(feedbacks.length == 0){
                this.login()
            } else {
                this.$emitter.emit('exibirAlerta', {feedbacks: feedbacks, tipoFeedback: 'erro'})
            }
        }
    }
}
</script>

<style>

</style>