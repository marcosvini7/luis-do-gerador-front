<template>
    <nav class="navbar navbar-expand-lg bg-navbar">
        <div class="container-fluid">
            <div @click="$router.push({name: 'principal'})" navbar-dark class="navbar-brand">
                <img src="/icons8-motor-64.png"> Luís do gerador
            </div>
            <button id="toggler" @click="display = display == 'd-none' ? '' : 'd-none' " class="navbar-toggler border-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span style="font-size: 1.8em" class="bi bi-filter"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link active" :to="{name: 'principal'}">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'produtos'}">Produtos</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'servicos'}">Serviços</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'contato'}">Contato</router-link>
                </li> 
                <li class="nav-item" style="cursor: pointer">
                    <a class="nav-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >Favoritos</a>
                </li>
                <li class="nav-item" @click="$router.push({name: 'adm'})" style="cursor:pointer">
                    <a class="nav-link">Administração</a>
                </li>   
                           
            </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <alerta/>
        <div v-if="$route.name == 'principal' ">
            <carregando :condicao="dados.length == 0" msg="Ops...não foi possível carregar os dados!">
            <div class="card col mt-3">
                <div class="card-header">
                    <h3 class="text-center">
                        <i class="bi bi-bookmark-check"></i>
                        Vantagens de negociar com a gente
                    </h3>
                </div>
                <div class="card-body">
                    <div class="d-block d-md-flex justify-content-center align-items-center">
                        <div class="col col-md-4">
                            <img :src="urlStorage + dados.urlImagem" class="img-fluid">
                        </div>
                        <div class="col">
                            <ul class="list-group">
                                <li>
                                    <h5>
                                        <i class="bi bi-check-lg"></i>
                                        Preço baixo e negociável
                                    </h5>
                                </li>
                                <li>
                                    <h5>
                                        <i class="bi bi-check-lg"></i>
                                        Atendimento rápido e de qualidade
                                    </h5>
                                </li>
                                <li>
                                    <h5>
                                        <i class="bi bi-check-lg"></i>
                                        Diversas opções de produtos e serviços
                                    </h5>
                                </li>
                                <li>
                                    <h5>
                                        <i class="bi bi-check-lg"></i>
                                        Serviços e produtos de qualidade e com garantia
                                    </h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="text-center">
                        <h6>
                            {{dados.endereco}}
                        </h6>
                    </div>
                </div>
            </div>
            </carregando>
        </div>
        
        <router-view/>
    </div>

    <rodape tipo="principal" :display="display" :dados="dados"/>
</template>

<script>

import requestMixin from '@/mixins/requestMixin'
export default {
    mixins: [requestMixin],
    data: () => ({
        display: ''
    }),
    computed: {
        urlImagem(){
            return process.env.VUE_APP_URL_STORAGE + this.dados.urlImagem
        }
    },
    created(){
        this.get('informacoes/1')       
    },
    mounted(){
        let links = document.getElementsByClassName('nav-link')
        for(let i = 0; i < links.length; i++){
            links[i].addEventListener('click', () => {
                document.getElementById('toggler').dispatchEvent(new Event('click'))
            })
        }         
    }
}
</script>


<style scoped>
    .bg-navbar {
        background: rgb(125, 184, 151);
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
    a {
        color: white
    }
    a:hover {
        color: rgb(8, 213, 228)
    }
    .router-link-exact-active {
        color: rgb(8, 213, 228)
    }

    li {
        list-style: none;
    }
    .bi-bookmark-check {
        color:darkcyan
    }
    .bi-check-lg {
        color:darkgreen
    }
    
</style>



