<template>
  <div class="login-view">
    <h1>日報計算アプリ</h1>
    <DailyLoginForm :onlogin="handleLogin" />
    <router-link to="/auth/register">新規登録の方はこちら</router-link>
  </div>
</template>

<script>
import DailyLoginForm from '@/components/molecules/DailyLoginForm.vue'
import {useReportStore} from '@/stores/index.js'

export default {
    name: 'DailyLoginView',
    components: {
        DailyLoginForm
    },
    data() {
        return{
            reportStore: useReportStore()
        }
    },
    methods: {
        handleLogin (authInfo) {
            return this.reportStore.login(authInfo)
                .then(() => {
                    this.$router.push({path: '/auth/dataRegister'})
                })
                .catch(err => this.throwReject(err))
        },
        throwReject (err) {return Promise.reject(err)}
    }
}
</script>

<style scoped>
    .login-view{
        width: 320px;
        margin: auto;
    }
</style>