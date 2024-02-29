<template>
    <div class="result-view">
        <h1>計算結果</h1>
        <DailyCulcResult :onreport="handleGet"/>
    </div>
</template>

<script>
import { useCulcStore } from '@//stores/culc.js'
import { useReportStore } from '@/stores/index.js'
import DailyCulcResult from '../molecules/DailyCulcResult.vue'
export default {
    name: 'DailyResultView',
    components: {
        DailyCulcResult
    },
    data() {
      return {
        culcStore: useCulcStore(),
        userId: useReportStore().userId
      }
    },
    methods: {
        handleGet () {
            console.log(this.userId)
            return this.culcStore.getReportData(this.userId)
                .then(() => {
                    // 成功時の処理
                    this.$router.push('/auth/report')
                })
                .catch(err => {
                    // エラー時の処理
                    console.error(err);
                });
        }
    }
}
</script>

<style>
    .result-view{
        text-align: center;
    }
</style>