import { defineStore } from 'pinia';
import Auth from '../api/auth.js'

export const useCulcStore = defineStore('app', {
  state: () => ({
    formValues: {
      totalSales: null,
      netSales: null,
      laborCost: null,
      purchaseCost: null,
      customers: null,
      allTotalSales: null,
      allNetSales: null,
      allLaborCost: null,
      allPurchaseCost: null,
      allCustomers: null
    }
  }),
  actions: {
    updateFormValues(formData) {
        this.formValues = formData;
    },
    getPricePerCustomer() {
      return this.formValues.netSales / this.formValues.customers;
    },
    getLaborCostRate() {
        return (this.formValues.laborCost / this.formValues.netSales) * 100;
    },
    getPurchaseCostRate() {
        return (this.formValues.purchaseCost / this.formValues.netSales) * 100;
    },
    getAllPricePerCustomer() {
      return this.formValues.allNetSales / this.formValues.allCustomers;
    },
    getAllLaborCostRate() {
        return (this.formValues.allLaborCost / this.formValues.allNetSales) * 100;
    },
    getAllPurchaseCostRate() {
        return (this.formValues.allPurchaseCost / this.formValues.allNetSales) * 100;
    },
    async dataRegister (authInfo) {
      try{
        const response = await Auth.dataRegister(authInfo);
        console.log(response);
        return response;
      } catch(err){
        throw err;
      }
    },
    async getReportData (userId) {
      try {
        const authInfo = { userId: userId };
        const response = await Auth.getReportData(authInfo);
        this.formValues = {
          ...this.formValues,
          allTotalSales: response.allTotalSales,
          allNetSales: response.allNetSales,
          allLaborCost: response.allLaborCost,
          allPurchaseCost: response.allPurchaseCost,
          allCustomers: response.allCustomers
        };
        console.log(this.formValues);
      } catch(err){
        throw err;
      }
    }
  }
});
