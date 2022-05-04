<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <div @click="$router.push({name: 'adm'})" class="navbar-brand">
                <img src="/icons8-motor-64.png"> Luís do gerador
            </div>
            <button id="toggler" @click="display = display == 'd-none' ? '' : 'd-none' " class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span style="font-size: 1.8em" class="bi bi-filter"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link exact-active-class="active" class="nav-link" :to="{name: 'adm'}">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link exact-active-class="active" class="nav-link" :to="{name: 'adm.informacoes'}">Informações</router-link>
                </li> 
                <li class="nav-item">
                    <router-link exact-active-class="active" class="nav-link" :to="{name: 'adm.produtos'}">Produtos</router-link>
                </li> 
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'adm.servicos'}">Serviços</router-link>
                </li>  
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'adm.contato'}">Contato</router-link>
                </li>  
                <li class="nav-item">
                    <router-link exact-active-class="active" class="nav-link" :to="{name: 'principal'}">Site</router-link>
                </li>  
                <li class="nav-item" style="cursor: pointer">
                    <a class="nav-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >Favoritos</a>
                </li>
                <li class="nav-item" @click="deslogar"  style="cursor: pointer">
                    <a exact-active-class="active" class="nav-link">Deslogar</a>
                </li>      
            </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <alerta/>
        <div v-if="$route.name == 'adm' ">
          <h3 class="text-center">Área da administração</h3>
          <h4 class="text-center">Acesso restrito aos administradores da empresa</h4>         
        </div>       
        <router-view/>
    </div>
    
    <rodape tipo="adm" :display="display" :dados="dados"/>
</template>

<script>

import requestMixin from '@/mixins/requestMixin'
export default {
    mixins: [requestMixin],
    methods: {
        deslogar(){
            let funcao = () => {this
                localStorage.removeItem('logado')
                this.$router.push({name: 'principal'})
            }
            this.$emitter.emit('exibir', {tipo: 'excluir', texto: 'Tem certeza que quer deslogar?', acao: funcao})   
        }
    },
    data: () => ({
        display: ''
    }),
    created(){
        this.get('informacoes/1')
    },
    mounted(){
        if(this.$route.query.sucesso) this.$emitter.emit('exibirAlerta', {feedbacks: ['Login feito com sucesso!'], tipoFeedback: 'sucesso'})       
        let links = document.getElementsByClassName('nav-link')
        for(let i = 0; i < links.length; i++){
            if(links[i].innerText != 'Site'){
                links[i].addEventListener('click', () => {
                    document.getElementById('toggler').dispatchEvent(new Event('click'))
                })
            }
        }        
    },
}
</script>


<style scoped>
    .bg-navbar {
        font-size: 1.1em;
    }
    .navbar-brand {
        font-size: 1.3em;
        font-family: 'Lucida Sans';
        color: white
    }
    .navbar-brand:hover {
        cursor: pointer
    } 
    li {
        list-style: none;
    }
       
</style>