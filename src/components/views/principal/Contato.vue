<template>
  <div class="text-center">
    <h3><i class="bi bi-chat-dots"></i> Envie-nos uma mensagem</h3>
    <h5>Entraremos em contato o mais breve possível</h5>
  </div>
  <form @submit.prevent="enviarMensagem">
    <div class="form-group">
      <label for="nome" class="form-label">
        <i class="bi bi-person-circle"></i> Nome      
      </label>
      <input type="text" v-model="form.nome" class="form-control" id="nome" placeholder="Nome ou sobrenome">
    </div>
    <div class="form-group">
      <label for="email" class="form-label">
        <i class="bi bi-envelope"></i> E-mail
      </label>
      <input type="email" v-model="form.email" class="form-control" id="email" placeholder="Endereço de e-mail">
    </div>
    <div class="form-group">
      <label for="telefone" class="form-label">
        <i class="bi bi-telephone"></i> Telefone
      </label>
      <input type="text" v-maska="'(##)#####-####'" v-model="form.telefone" class="form-control" id="telefone" placeholder="Número de celular ou telefone">
    </div>
    <div class="form-group">
      <label for="titulo" class="form-label">
        <i class="bi bi-chat-left-quote"></i> Titulo
      </label>
      <input type="text" v-model="form.titulo" class="form-control" id="titulo" placeholder="Título da mensagem">
      <small class="form-text text-muted">Exemplo: Gerador de 50kva</small>
    </div>
    <div class="form-group">
      <label for="mensagem" class="form-label">
        <i class="bi bi-chat-left-dots"></i> Mensagem
      </label>
      <textarea v-model="form.mensagem" class="form-control" id="mensagem" rows="5" placeholder="Descrição da mensagem"></textarea>
      <small class="form-text text-muted">Exemplo: Quais os preços de geradores na faixa de 50kva?</small>
    </div> 
    <button class="btn btn-primary">Enviar</button>
  </form>
</template>

<script>
import requestMixin from '@/mixins/requestMixin'
export default {
  mixins: [requestMixin],
  data: () => ({
    form: {
      nome: '',
      email: '',
      telefone: '',
      titulo: '',
      mensagem: '',
    },   
  }),
  methods: {
    enviarMensagem(){
      let feedbacks = []
      let tipoFeedback = ''
      if(this.form.nome == '') feedbacks.push('O campo "nome" não pode estar vazio')
      else if(this.form.nome.length < 3) feedbacks.push('O campo "nome" deve ter no míninmo 3 caracteres')
      if(this.form.email == '') feedbacks.push('O campo "e-mail" não pode estar vazio')
      if(this.form.telefone == '') feedbacks.push('O campo "telefone" não pode estar vazio')
      if(this.form.titulo == '') feedbacks.push('O campo "titulo" não pode estar vazio')
      else if(this.form.titulo.length < 5) feedbacks.push('O campo "titulo" deve ter no mínimo 5 caracteres')     
      if(this.form.mensagem == '') feedbacks.push('O campo "mensagem" não pode estar vazio')
      else if(this.form.mensagem.length < 10) feedbacks.push('O campo "mensagem" deve ter no mínimo 10 caracteres')

      if(feedbacks.length == 0) {
        this.postPut('contato');
      } else {
        tipoFeedback = 'erro'
        this.$emitter.emit('exibirAlerta', {feedbacks: feedbacks, tipoFeedback: tipoFeedback})
      }
    },
  }
}
</script>

<style scoped>
    .bi-person-circle {
        color: dodgerblue;
    }
    .bi-telephone {
        color: dodgerblue;
    }   
    .bi-envelope {
        color:indianred
    }
    .bi-chat-left-quote {
       color:cadetblue
    }
    .bi-chat-left-dots {
        color:darkcyan
    }

</style>