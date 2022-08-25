<template>
  <div class="main_app">
    <el-input class="source" v-model="sourceValue" :rows="5" type="textarea" placeholder="Please input" />
    <el-button class="send" type="primary" @click="send">ChangeToCamel</el-button>
    <el-input class="destination" v-model="destinationValue" :rows="5" type="textarea" placeholder="Please input" />
  </div>
</template>

<script>
import { convertToCamel } from '@/api'
export default {
  name: 'app',
  data() {
    return {
      url: "http://localhost:8899/Tool/ConvertToCamel",
      sourceValue: '',
      destinationValue: ''
    }
  },
  methods: {
    send() {
      convertToCamel({
        jsonStr: this.sourceValue
      })
        .then(res => {
          console.log(res)
          this.destinationValue = JSON.stringify(res);
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style>
.main_app {
  text-align: center;
}

.send {
  margin: 5px;
}

.source {
  width: 200px;
}

.destination {
  width: 200px;
}
</style>
