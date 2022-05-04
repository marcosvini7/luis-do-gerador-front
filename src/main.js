import { createApp } from 'vue'
import router from './router'
import maska from 'maska'
import mitt from 'mitt'
//components
import App from './App.vue'
import Alerta from './components/comuns/Alerta'
import Produto from './components/comuns/Produto'
import Modal from './components/comuns/Modal'
import Rodape from './components/comuns/Rodape'
import ProdutosFavoritados from './components/comuns/ProdutosFavoritados'
import Pesquisar from './components/comuns/Pesquisar'
import Carregando from './components/comuns/Carregando'

const app = createApp(App)

app.component('alerta', Alerta)
app.component('produto', Produto)
app.component('modal', Modal)
app.component('rodape', Rodape)
app.component('produtos-favoritados', ProdutosFavoritados)
app.component('pesquisar', Pesquisar)
app.component('carregando', Carregando)

app.use(router)
app.use(maska)
app.config.globalProperties.$emitter = mitt()

app.mount('#app')
