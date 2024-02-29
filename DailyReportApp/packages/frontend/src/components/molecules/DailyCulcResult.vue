<template>
  <div>
    <div>
        <h2>本日</h2>
        <p>客単価: {{culcPricePerCustomer}}</p>
        <p>人件費率: {{culcLaborCostRate}}</p>
        <p>仕入れ額率: {{culcPurchaseCostRate}}</p>
    </div>
    <div>
        <DailyButton  :disabled="disableRegisterAction" @click="handleClick">今月のレポート</DailyButton>
    </div>
  </div>
</template>

<script>
import {useCulcStore} from '@/stores/culc.js';
import {useReportStore} from '@/stores/index.js'
import DailyButton from '../atoms/DailyButton.vue';
export default {
    name: 'DailyCulcResult',
    components: {
        DailyButton
    },
    props: {
        onreport: {
            type: Function,
            required: true
        },
    },
    data () {
        return {
            progress: false,
            userId: useReportStore().userId,
            culcStore: useCulcStore()
        }
    },
    computed: {
        culcPricePerCustomer() {
            return this.culcStore.getPricePerCustomer();
        },
        culcLaborCostRate() {
            return this.culcStore.getLaborCostRate();
        },
        culcPurchaseCostRate() {
            return this.culcStore.getPurchaseCostRate();
        },
        disableRegisterAction () {
            return this.progress
        }
    },
    methods: {
        handleClick () {
            if(this.disableRegisterAction) {return}
            this.progress = true
            this.error = ''
            this.$nextTick(() => {
                this.onreport({userId: this.userId})
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

</style>