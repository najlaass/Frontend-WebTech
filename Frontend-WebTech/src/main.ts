
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)
app.use(router)
app.mount('#root')


// import Bootstrap's CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// import Bootstrap's JS (includes Popper)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
