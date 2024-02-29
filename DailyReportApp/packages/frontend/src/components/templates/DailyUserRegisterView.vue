<template>
  <div class="userRegister">
    <h1>ユーザー登録</h1>
    <DailyRegisterForm :onlogin="handleLogin" />
  </div>
</template>

<script>
import DailyRegisterForm from '@/components/molecules/DailyRegisterForm.vue'
import {useReportStore} from '@/stores/index.js'

export default {
    name: 'DailyUserRegisterView',
    components: {
        DailyRegisterForm
    },
    data() {
        return{
            reportStore: useReportStore()
        }
    },
    methods: {
        handleLogin (authInfo){
          return this.reportStore.register(authInfo)
            .finally(() => {
              this.$router.push('/auth/login')
            })
            .catch(err => this.throwReject(err))
        },
        throwReject (err) {return Promise.reject(err)}
    }
}
</script>

<style>

</style>