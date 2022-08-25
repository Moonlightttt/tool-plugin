import { createApp } from 'vue'
import AppComponent from "./App/App.vue";

const app = createApp(AppComponent);

app.component("app-component", AppComponent);

app.mount('#app');
