export default {
    data: () => ({
        dados: [],
        urlApi: process.env.VUE_APP_URL_API,
        urlStorage: process.env.VUE_APP_URL_STORAGE
    }),
    methods: {
        get(url){
            fetch(this.urlApi + url)
            .then(res => res.json())
            .then(res => {  
                if(res){           
                    if(this.form){
                        Object.keys(res).forEach(key => {
                            this.form[key] = res[key]                  
                        })
                    } else {
                        this.dados = res
                    } 
                }              
                this.$emitter.emit('ocultarCarregamento', res)                                        
            })   
            .catch(() => {
                this.$emitter.emit('ocultarCarregamento', 'erro')
            })  
        },
        getDados(url){       
            fetch(this.urlApi + url)
            .then(res => res.json())
            .then(res => {
                this.dados = res  
                this.$emitter.emit('ocultarCarregamento', res) 
            })
            .catch(() => {
                this.$emitter.emit('ocultarCarregamento', 'erro')
            })
        },
        pesquisar(url, params){ 
            let query = new URLSearchParams(params).toString()
            if(query != ''){
                url += '?' + query
            } 
            this.getDados(url)
        },
        postPut(url, metodo = 'POST'){
            let feedbacks = []
            let tipoFeedback = ''
            let arquivo = document.getElementById('arquivo')?.files[0]         
            let formData = new FormData();
            formData.append('dados', JSON.stringify(this.form))
            if(arquivo){
                formData.append('arquivo', arquivo)
            }         
            if(metodo == 'PUT'){
                url += '?_method=PUT';
            }  
            fetch(this.urlApi + url, {
                method: 'POST',
                body: formData
            }).then(res => {
                if(res.status == 200){       
                    feedbacks.push('Ação realizada com sucesso!')
                    tipoFeedback = 'sucesso'  
                    if(metodo == 'POST') this.limparForm() 
                    this.$emitter.emit('getDados')  
                    if(metodo == 'PUT') {
                        switch(this.$route.name){
                            case 'produtos.edicao': 
                                this.$router.push({name: 'adm.produto', params: {id: this.$route.params.id}})
                                break  
                            case 'servicos.edicao': 
                                this.$router.push({name: 'adm.servicos'})                                                     
                        }                                                                                                 
                    }
                } else {
                    feedbacks.push('Ops...Ocorreu um problema ao processar esta ação')                      
                    tipoFeedback = 'erro' 
                }            
            }).catch(() => {
                feedbacks.push('Ops...Ocorreu um problema ao processar esta ação')
                feedbacks.push('Verifique sua conexão com a internet ou tente novamente mais tarde')
                tipoFeedback = 'erro'                                              
            })
            .finally(() => this.$emitter.emit('exibirAlerta', {feedbacks: feedbacks, tipoFeedback: tipoFeedback}))
            
        },
        delete(url){
            fetch(this.urlApi + url, {
                method: 'DELETE',
            }).then((res) => {            
                if(res.status == 200){
                    switch(this.$route.name){
                        case 'adm.produto': 
                            this.$router.push({name: 'adm.produtos'})
                            break                  
                        case 'adm.produtos': 
                            this.getDados('produtos')
                            break
                        case 'adm.contato': 
                            this.getDados('contato')
                            break
                        case 'adm.servicos': 
                            this.getDados('servicos')
                            break
                    }
                    this.$emitter.emit('exibirAlerta', {feedbacks: ['Ação de exclusão realizada com sucesso!'], tipoFeedback: 'sucesso'})
                } else {
                    this.$emitter.emit('exibirAlerta', {feedbacks: ['Ops...Ocorreu um problema ao processar esta ação'], tipoFeedback: 'erro'})
                }
            })
        },
        limparForm(){
            Object.keys(this.form).forEach(key => {
                this.form[key] = ''
            })
            if(document.getElementById('arquivo')?.files[0]) document.getElementById('arquivo').value = ""
 
        },
        excluir(url_delete){
            return (url = url_delete) => {              
                this.delete(url)
            }
        },
        login(){
            let formData = new FormData()
            formData.append('dados', JSON.stringify({email: this.form.email, password: this.form.senha}))
            fetch(this.urlApi + 'users', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(res => {
                if(res.length > 0){
                    localStorage.setItem('logado', 'sim')
                    this.$router.push({name: 'adm', query: {sucesso: '1'}})
                } else {
                    this.$emitter.emit('exibirAlerta', {feedbacks: ['E-mail ou senha incorretos!'], tipoFeedback: 'erro'})
                }
            })                                  
        }
    }
}