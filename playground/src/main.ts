import { ViteSSG } from 'vite-ssg'
import routes from 'virtual:generated-pages'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

export const createApp = ViteSSG(App, {
  routes, base: import.meta.env.BASE_URL,
})
