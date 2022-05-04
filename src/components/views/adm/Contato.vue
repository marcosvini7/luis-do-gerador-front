<template>
  <h3 class="text-center"><i class="bi bi-chat-dots"></i> Mensagens recebidas</h3>
  <carregando msg="Ops...nenhuma mensagem foi encontrada!">
    <ul class="list-group">
        <li v-for="contato in dados" :key="contato.id" class="list-group-item">
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <i class="bi bi-person-circle"></i> {{contato.nome}} <br>
                    <i class="bi bi-envelope"></i>  {{contato.email}} <br>
                    <i class="bi bi-telephone"></i> {{contato.telefone}} <br>
                    <i class="bi bi-chat-left-quote"></i> {{contato.titulo}} <br>
                    <i class="bi bi-chat-left-dots"></i> {{contato.mensagem}} <br>
                    <i class="bi bi-calendar-check"></i> {{data(contato.created_at)}}
                </div>
                <div>
                    <i  @click="$emitter.emit('exibir', {tipo: 'excluir', acao: excluir('contato/' + contato.id)})"  style="cursor: pointer" class="bi bi-trash text-danger"></i>         
                </div>
            </div>            
        </li>
    </ul>
  </carregando>
</template>

<script>
import requestMixin from '@/mixins/requestMixin'
export default {
    mixins: [requestMixin],
    methods: {
        data(data){
            let data1 = new Date(data) 
            return 'Enviada em ' + data1.toLocaleDateString('pt-br') + ' às ' + data1.toLocaleTimeString('pt-br')
        }
    },
    created(){
        this.getDados('contato')
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
    .bi-calendar-check {
        color:rgb(172, 121, 60)
    }
</style>