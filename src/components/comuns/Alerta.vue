<template> 
    <div :class="tipoAlerta" v-show="exibir">
        <ul>
            <li v-for="(feedback, i) in feedbacks" :key="i">{{ feedback }}</li>
        </ul>
    </div> 
</template>

<script>
export default {
    data: () => ({
        exibir: false,
        feedbacks: [],
        tipo: ''
    }),
    computed: {
        tipoAlerta(){
            return this.tipo == 'sucesso' ? 'alert alert-success mt-3' : 'alert alert-danger mt-3'
        }
    },
    created(){
        this.$emitter.on('exibirAlerta', dados => {
            this.feedbacks = dados.feedbacks
            this.tipo = dados.tipoFeedback
            this.exibir = true
            window.scroll(0, 0)
            setTimeout(() => {
                this.exibir = false
            }, 6000)

        })
    }

}
</script>

<style>

</style>