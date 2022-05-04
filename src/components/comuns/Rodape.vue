<template>
  <div style="margin-top: 100px"></div>
  <div class="d-md-block" :class="display">
  <footer :class="corRodape">    
        <div>    
            <span @click="$emitter.emit('exibir', {tipo: 'informacao', titulo: 'Número de telefone', texto: dados.telefone})">   
                <i class="bi bi-telephone"></i> <span class="d-none d-md-inline"> {{ dados.telefone }} </span>
            </span>
            <span @click="$emitter.emit('exibir', {tipo: 'informacao', titulo: 'E-mail', texto: dados.email})" > 
                <i class="bi bi-envelope"></i> <span class="d-none d-md-inline"> {{ dados.email }}</span>
            </span>           
            <span @click="mensagemWhatsapp">
                <i class="bi bi-whatsapp"></i><span class="d-none d-md-inline"> Whatsapp</span>
            </span>
            <span @click="abrirLocalizacao">
                <i class="bi bi-geo-alt"></i><span class="d-none d-md-inline"> Localização</span>
            </span>           
        </div>       
        <div>
            © 2022 Copyright: <span  @click="linkAutor" class="autor"> Marcos Vinícius</span> 
        </div>   
    </footer>
    </div>
</template>

<script>

export default {
    props: ['tipo', 'display', 'dados'],
    computed: {
        corRodape(){
            return this.tipo == 'adm' ? 'bg-dark' : 'bg-footer'
        },
    },
    methods: {
        mensagemWhatsapp(){
            window.open(`https://api.whatsapp.com/send?phone=${this.dados.whatsapp}&text=Olá, gostaria de saber sobre os geradores à venda`)
        },
        abrirLocalizacao(){
           let link = this.dados.localizacao
           if(!link.includes('http://') && !link.includes('https://')) link = 'http://' + this.dados.localizacao
           window.open(link)
        },
        linkAutor(){
            window.open('https://www.instagram.com/marcos.vini76/')
        }
    },
}
</script>

<style scoped>
   .bg-footer{
       background: rgb(125, 184, 151);
   } 
   footer {
        position: fixed;
        bottom: 0;
        color: white;
        text-align: center;      
        width: 100%;
        padding: 10px
    }
    i {
        margin-left: 20px;
        font-size:1.3em;       
    }
    footer span {
        cursor: pointer;
    }
    .autor {
        font-style: italic;
    }
    .bi-telephone {
        color: dodgerblue;
    }
    .bi-whatsapp {
        color: darkgreen;
    }
    .bi-geo-alt {
        color:crimson;
    }
    .bi-envelope {
        color:indianred
    }
</style>