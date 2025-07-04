import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Flowbite imports
import { initFlowbite } from 'flowbite'

const app = createApp(App)

app.use(router)
app.mount('#app')

// Initialize Flowbite components
initFlowbite()
