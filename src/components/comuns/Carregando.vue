<template>
    <div v-if="temDados">
        <div  v-if="!terminouCarregar" class="d-flex justify-content-center mt-5">
            <img src="/loading.gif" class="imgfluid">   
        </div>
        <slot v-if="terminouCarregar" />
    </div>
    <div v-if="!temDados" class="text-center text-secondary">
        <h4 class="mt-4" > {{ msg }} </h4>
        <h5>Clique <router-link to="" @click="$router.back()">aqui</router-link> para voltar</h5>
    </div>   
</template>

<script>
import requestMixin from '@/mixins/requestMixin'
export default {
    mixins: [requestMixin],
    props: ['condicao', 'msg'],
    data: () => ({
        terminouCarregar: false,
        nenhumDado: false,
        temDados: true
    }),
    created(){
        this.$emitter.on('ocultarCarregamento', res => {
            if(res != '' && res != null && res != undefined && res != 'erro') {
                this.terminouCarregar = true   
                this.temDados = true            
            } else {
                this.temDados = false
            }

            let rotasSemCarregamento = ['produtos.novo', 'servicos.novo']
            if(rotasSemCarregamento.includes(this.$route.name)) this.temDados = true
        })

        this.$emitter.on('exibirCarregamento', () => {
            this.terminouCarregar = false
        })
            
        if(this.condicao != undefined){
            if(!this.condicao){ 
                this.terminouCarregar = true  
            }                         
        }
    },
}
</script>

<style>

</style>