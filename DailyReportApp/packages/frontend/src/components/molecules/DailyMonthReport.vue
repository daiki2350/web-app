<template>
    <div>
        <h2>今月</h2>
        <p>総売上: {{culcStore.formValues.allTotalSales}}</p>
        <p>純売上: {{culcStore.formValues.allNetSales}}</p>
        <p>客数: {{culcStore.formValues.allCustomers}}</p>
        <p>人件費: {{culcStore.formValues.allLaborCost}}</p>
        <p>仕入れ額: {{culcStore.formValues.allPurchaseCost}}</p>
        <p>客単価: {{culcPricePerCustomer}}</p>
        <p>人件費率: {{culcLaborCostRate}}</p>
        <p>仕入れ額率: {{culcPurchaseCostRate}}</p>
    </div>
</template>

<script>
import {useCulcStore} from '../../stores/culc.js'
export default {
    name: 'DailyMonthReport',
    data () {
        return {
            culcStore: useCulcStore() 
        }
    },
    computed: {
        culcPricePerCustomer() {
            return this.culcStore.getAllPricePerCustomer();
        },
        culcLaborCostRate() {
            return this.culcStore.getAllLaborCostRate();
        },
        culcPurchaseCostRate() {
            return this.culcStore.getAllPurchaseCostRate();
        },
    }
}
</script>

<style>

</style>