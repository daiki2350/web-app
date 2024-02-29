import { mount } from "@vue/test-utils";
import DailyInfoForm from '@/components/molecules/DailyInfoForm.vue'
import { describe, expect, test } from "vitest";

describe('DailyInfoForm', () => {
    describe('入力成功', () => {
        test('totalSalesが数字であること', () => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue1: '123456'});
            expect(infoForm.find('#totalSales').element.value).toBe('123456');
        });
        test('netSalesが数字であること', () => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue2: '123456'});
            expect(infoForm.find('#netSales').element.value).toBe('123456');
        });
        test('personnelCostsが数字であること', () => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue3: '54321'});
            expect(infoForm.find('#personnelCosts').element.value).toBe('54321');
        });
        test('form4が数字であること', () => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue4: '23456'});
            expect(infoForm.find('#form4').element.value).toBe('23456');
        });
        test('form5が数字であること', () => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue5: '123'});
            expect(infoForm.find('#form5').element.value).toBe('123');
        });
    })

    describe('入力ミス', () => {
        test('totalSalesが空白文字であること', () => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue1: ''});
            expect(infoForm.find('#totalSales').element.value).toBe('')
        });
        test('totalSalesが文字であること',() => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue1: 'abcd'});
            expect(infoForm.find('#totalSales').element.value).toBe('abcd');
        });
        test('netSalesが空白文字であること', () => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue2: ''});
            expect(infoForm.find('#netSales').element.value).toBe('')
        });
        test('netSalesが文字であること',() => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue2: 'abcd'});
            expect(infoForm.find('#netSales').element.value).toBe('abcd');
        });
        test('personnelCostsが空白文字であること', () => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue3: ''});
            expect(infoForm.find('#personnelCosts').element.value).toBe('')
        });
        test('form4が文字であること',() => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue4: 'abcd'});
            expect(infoForm.find('#form4').element.value).toBe('abcd');
        });
        test('form5が空白文字であること', () => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue5: ''});
            expect(infoForm.find('#form5').element.value).toBe('')
        });
        test('form5が文字であること',() => {
            const infoForm = mount(DailyInfoForm);
            infoForm.setData({inputValue5: 'abcd'});
            expect(infoForm.find('#form5').element.value).toBe('abcd');
        });
    })
})