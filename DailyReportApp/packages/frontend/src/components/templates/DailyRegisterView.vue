<template>
  <div class="register-view">
    <h1>日報情報登録画面</h1>
    <DailyInfoForm :onregister="handleRegister"/>
  </div>
</template>

<script>
import DailyInfoForm from '@/components/molecules/DailyInfoForm.vue'
import {useReportStore} from '@/stores/index.js'
import {useCulcStore} from '@/stores/culc.js'
export default {
    name: 'DailyRegisterView',
    components: {
        DailyInfoForm
    },
    data() {
      return {
        culcStore: useCulcStore(),
        userId: useReportStore().userId
      }
    },
    methods: {
      handleRegister (authInfo) {
        const sendData = {
          ...authInfo,
          userId: this.userId
        }
        console.log(sendData)
        return this.culcStore.dataRegister(sendData)
          .then(() => {
            this.$router.push('/auth/result')
          })
          .catch(err => this.throwReject(err))
      },
      throwReject (err) {return Promise.reject(err)}
    }
}
</script>

<style>
    .register-view{
        width: 320px;
        margin: auto;
        text-align: center;
    }
</style>