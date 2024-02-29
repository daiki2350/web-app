<template>
  <form novalidate>
    <div class="form-item">
        <label for="userName">ユーザーネーム</label>
        <input id="userName" v-model="userName" type="text" autocomplete="off" placeholder="userName" @focus="resetError">
        <ul class="validation-errors">
            <li v-if="!validation.userName.required">ユーザーネームが入力されていません</li>
        </ul>
    </div>
    <div class="form-item">
        <label for="password">パスワード</label>
        <input id="password" v-model="password" type="password" autocomplete="off" placeholder="12345678" @focus="resetError">
        <ul class="validation-errors">
            <li v-if="!validation.password.required">パスワードが入力されていません</li>
        </ul>
    </div>
    <div class="form-actions">
        <DailyButton :disabled="disableLoginAction" @click="handleClick">登録</DailyButton>
        <p v-if="progress" class="login-progress">登録中...</p>
        <p v-if="error" class="login-error">{{error}}</p>
    </div>
  </form> 

</template>

<script>
import DailyButton from '../atoms/DailyButton.vue'
const required = val => !!val.trim()
export default {
    name: 'DailyRegisterForm',
    components: {
        DailyButton
    },
    props: {
        onlogin: {
            type: Function,
            required: true
        }
    },
    data () {
        return {
            userName: '',
            password: '',
            progress: false,
            error: ''
        }
    },
    computed: {
        validation () {
            return {
                userName: {
                    required: required(this.userName)
                },
                password: {
                    required: required(this.password)
                }
            }
        },
        valid () {
            const validation = this.validation
            const fields = Object.keys(validation)
            let valid = true
            for(let i=0;i<fields.length;i++){
                const field = fields[i]
                valid = Object.keys(validation[field])
                    .every(key => validation[field][key])
                if(!valid){break}
            }
            return valid
        },
        disableLoginAction () {
            return !this.valid || this.progress
        }
    },
    methods: {
        resetError () {
            this.error = ''
        },
        handleClick () {
            if(this.disableLoginAction) {return}
            this.progress = true
            this.error = ''
            this.$nextTick(() => {
                this.onlogin({userName: this.userName, password: this.password})
                    .catch(err => {
                        this.error = err.message
                    })
                    .finally(() => {
                        this.progress = false
                    })
            })           
        }
    }
}
</script>

<style scoped>
    form{
        display: block;
        margin: 0 auto;
        text-align: center;
    }
    label{
        display: block;
    }
    input {
        width: 100%;
        padding: .5em;
        font: inherit;
    }
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0.25em 0;
    }
    ul li {
        font-size: 0.5em;
    }
    .validation-errors{
        height: 32px;
    }
    .form-action p{
        font-size: 0.5em;
    }
</style>