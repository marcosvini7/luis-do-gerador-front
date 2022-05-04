import { createRouter, createWebHistory } from 'vue-router'
import Principal from '@/components/layouts/Principal'
import Contato from '@/components/views/principal/Contato'
import Produtos from '@/components/views/comuns/Produtos'
import Servicos from '@/components/views/comuns/Servicos'
import Adm from '@/components/layouts/Adm'
import Produto from '@/components/views/comuns/Produto'
import Login from '@/components/views/principal/Login'
import FormProduto from '@/components/views/adm/FormProduto'
import AdmContato from '@/components/views/adm/Contato'
import FormInformacoes from '@/components/views/adm/FormInformacoes'
import FormServico from '@/components/views/adm/FormServico'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            name: 'principal', 
            component: Principal,           
            children: [
                {
                    path: 'contato',
                    name: 'contato',
                    component: Contato                 
                },
                {
                    path: 'produtos',
                    name: 'produtos',
                    component: Produtos,   
                    children: [
                        {
                            path: ':id',
                            name: 'produto',
                            component: Produto               
                        },
                    ]              
                },               
                {
                    path: 'servicos',
                    name: 'servicos',
                    component: Servicos                 
                },
                {
                    path: 'login',
                    name: 'login',
                    component: Login,
                    beforeEnter: () => {
                        if(localStorage.getItem('logado')){
                            return {name: 'adm'}
                        }
                    }                
                }
            ]
        },
        { 
            path: '/adm',
            name: 'adm',
            component: Adm,
            beforeEnter: (to) => {
                if(to.name != 'adm' && !localStorage.getItem('logado')){
                    return {name: 'login', query: {erro: '1'}} 
                }
                else if(!localStorage.getItem('logado')){
                    return {name: 'login',}
                }
            },
            children: [
                {
                    path: 'produtos',
                    name: 'adm.produtos',
                    component: Produtos,
                    children: [
                        {
                            path: 'novo',
                            name: 'produtos.novo',
                            component: FormProduto
                        },
                        {
                            path: ':id/edicao',
                            name: 'produtos.edicao',
                            component: FormProduto
                        },                     
                        {
                            path: ':id',
                            name: 'adm.produto',
                            component: Produto
                        },
                                                                    
                    ]
                },
                
                {
                    path: 'contato',
                    name: 'adm.contato',
                    component: AdmContato
                },
                {
                    path: 'informacoes',
                    name: 'adm.informacoes',
                    component: FormInformacoes
                },
                {
                    path: 'servicos',
                    name: 'adm.servicos',
                    component: Servicos,
                    children: [
                        {
                            path: 'novo',
                            name: 'servicos.novo',
                            component: FormServico
                        },
                        {
                            path: ':id/edicao',
                            name: 'servicos.edicao',
                            component: FormServico
                        }
                    ]
                },
            ]
        },
        {
            path: "/:catchAll(.*)",
            beforeEnter: () => {
                return {name: 'principal'}
            }
        }
    ]
})

export default router