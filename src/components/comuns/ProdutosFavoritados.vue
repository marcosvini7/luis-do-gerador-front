<template>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Produtos favoritos</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <ul class="list-group">
            <li v-for="(produto, i) in favoritos" :key="i" class="list-group-item">
                <div class="d-flex align-items-center justify-content-between">
                    <img :src="urlImagem(produto)" class="img-luid col-4">
                    <router-link class="col-7" to="" @click="navegarPara(produto)" data-bs-dismiss="offcanvas"> 
                        {{ produto.nome}}
                    </router-link>
                    <i  style="cursor: pointer" @click="desfavoritar(produto.id)" class="bi bi-x-lg"></i>
                </div>               
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import localStorageMixin from '@/mixins/localStorajeMixin'
export default {
    mixins: [localStorageMixin],
    methods: {
        urlImagem(produto){
            return process.env.VUE_APP_URL_STORAGE + produto.urlImagem
        },
        navegarPara(produto){
            if(this.$route.name.includes('adm')){ 
                this.$router.push({name: 'adm.produto', params: {id: produto.id}})
            } else {
                this.$router.push({name: 'produto', params: {id: produto.id}})
            }
        }
    },
    created(){
        this.$emitter.on('favoritou', () => {this.getFavoritos()})
        this.getFavoritos()
    }
}
</script>

<style>

</style>