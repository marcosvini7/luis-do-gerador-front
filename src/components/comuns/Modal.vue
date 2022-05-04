<template>
    <button id="btn-modal" type="button" class="d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" :class="modal.corTitulo" id="exampleModalLabel">{{ modal.titulo }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {{ modal.texto }}
            </div>
            <div class="modal-footer">
                <button v-show="exibirBotao" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                <button @click="verificarAcao" type="button" class="btn btn-primary" data-bs-dismiss="modal">{{ exibirBotao == false ? 'Entendi' : 'Sim' }}</button>               
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        modelos: {
            excluir: {
                titulo: 'Confirmação',
                texto: 'Deseja realmente excluir esse item?',
                corTitulo: 'text-dark'
            },
            informacao: {
                titulo: 'Informação',
                texto: '', 
                corTitulo: 'text-info'
            }
        },
        exibirBotao: true,
        modal: {}, 
        acao: ''
    }),
    methods: {
        verificarAcao(){
            if(this.acao != ''){
                this.acao()
            }
        }
    },
    created(){
        this.$emitter.on('exibir', params => {
            switch(params.tipo){
                case 'excluir': 
                    this.modal = this.modelos.excluir
                    this.exibirBotao = true
                    break
                case 'informacao': 
                    this.modal = this.modelos.informacao
                    this.exibirBotao = false
            }

            if(params.titulo){
                this.modal.titulo = params.titulo
            }

            if(params.texto){
                this.modal.texto = params.texto
            }

            if(params.acao){
                this.acao = params.acao
            }

            let botao = document.getElementById('btn-modal')
            botao.dispatchEvent(new Event('click'))
        })
    }
}
</script>

<style>

</style>