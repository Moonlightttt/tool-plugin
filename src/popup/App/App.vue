<template>
  <div class="main_app" v-loading="loading">
    <el-input class="source" v-model="sourceValue" :rows="5" type="textarea" placeholder="请输入需要转换的Json" />
    <el-button class="commonBtn" type="primary" @click="send">ConvertToCamel</el-button>
    <el-input class="destination" v-model="destinationValue" :rows="5" type="textarea" placeholder="" />
    <el-button class="commonBtn" type="primary" @click="copy">ClickToCopy</el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { convertToCamel } from '@/api'
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()

export default {
  name: 'app',
  data() {
    return {
      sourceValue: '',
      destinationValue: '',
      loading: ref(false),
    }
  },
  methods: {
    send() {
      this.loading = true
      convertToCamel({
        jsonStr: this.sourceValue
      })
        .then(res => {
          console.log(res)
          this.loading = false
          if (res) {
            this.destinationValue = JSON.stringify(res)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async copy() {
      try {
        await toClipboard(this.destinationValue)
        console.log('Copied to clipboard')
      } catch (e) {
        console.error(e)
      }
    }
  },
}
</script>

<style>
.main_app {
  text-align: center;
}

.commonBtn {
  margin: 5px;
}

.source {
  width: 200px;
}

.destination {
  width: 200px;
}
</style>
