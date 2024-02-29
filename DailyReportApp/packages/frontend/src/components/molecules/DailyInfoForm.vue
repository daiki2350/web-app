<template>
  <form novalidate>
    <div class="form-item">
        <label for="totalSales">総売上</label>
        <input id="totalSales" v-model="totalSales" type="text">
    </div>
    <div class="form-item">
        <label for="netSales">純売上</label>
        <input id="netSales" v-model="netSales" type="number" required />
    </div>
    <div class="form-item">
        <label for="laborCosts">人件費</label>
        <input id="laborCosts" v-model="laborCost" type="number" reuired />
    </div>
    <div class="form-item">
        <label for="purchaseCosts">仕入れ額</label>
        <input id="purchaseCosts" v-model="purchaseCost" type="number" required />
    </div>
    <div class="form-item">
        <label for="costomers">客数</label>
        <input id="costomers" v-model="customers" type="number" required />
    </div>
    <div class="form-actions">
        <DailyButton :disabled="disableRegisterAction" @click="handleClick">登録</DailyButton>
    </div>
  </form>
</template>

<script>
import DailyButton from '../atoms/DailyButton.vue'
import { useCulcStore } from '../../stores/culc.js'
const required = val => val !== null && !!val.toString().trim()
export default {
    name: 'DailyInfoForm',
    components: {
        DailyButton
    },
    props: {
        onregister: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            totalSales: null,
            netSales: null,
            laborCost: null,
            purchaseCost: null,
            customers: null,
            progress: false,
        }
    },
    computed: {
        validation () {
            return {
                totalSales: {
                    required: required(this.totalSales)
                },
                netSales: {
                    required: required(this.netSales)
                },
                laborCost: {
                    required: required(this.laborCost)
                },
                purchaseCost: {
                    required: required(this.customers)
                },
                customers: {
                    required: required(this.customers)
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
        disableRegisterAction () {
            return !this.valid || this.progress
        }
    },
    methods: {
        handleClick() {
            if(this.disableRegisterAction) {return}
            useCulcStore().updateFormValues({
                totalSales: this.totalSales,
                netSales: this.netSales,
                laborCost: this.laborCost,
                purchaseCost: this.purchaseCost,
                customers: this.customers
            })
            this.progress = true
            this.error = ''
            this.$nextTick(() => {
                this.onregister({totalSales: this.totalSales, netSales: this.netSales, laborCost: this.laborCost, purchaseCost: this.purchaseCost, customers: this.customers})
                    .catch(err => {
                        this.error = err.message
                    })
                    .then(() => {
                        this.progress = false
                    })
            })
        }
    }

}
</script>

<style>
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
</style>