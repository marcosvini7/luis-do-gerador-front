<template>
    <div class="row mb-2">
        <div class="col-12 col-md-10">
            <input v-model="pesquisa" type="text" class="form-control" placeholder="Pesquise por produtos ou marcas">
        </div>
        <div class="col">
            <button  @click="buscar" class="btn btn-primary mt-2 mt-md-0">
                <i class="bi bi-search"> Pesquisar</i>            
            </button>
        </div>
    </div>
</template>

<script>
import requestMixin from '@/mixins/requestMixin'
export default {
  mixins: [requestMixin],
    data: () => ({
        pesquisa: ''
    }),
    methods: {
        buscar(){
            if(this.$route.query.pesquisa != this.pesquisa){
                this.$emitter.emit('exibirCarregamento')
                let rota = 'produtos'
                if(this.$route.name == 'adm.produtos') rota = 'adm.produtos'
                this.$router.push({name: rota, query: {pesquisa: this.pesquisa}})
            }
        }
    }
}
</script>

<style>

</style>