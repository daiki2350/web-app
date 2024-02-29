import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, test, beforeEach } from "vitest";
import DailyLoginForm from '@/components/molecules/DailyLoginForm.vue'
import sinon from "sinon";

describe('DailyLoginForm', () => {
    describe('プロパティ', () => {
        describe('validation', () => {
            let loginForm
            beforeEach(async () => {
                loginForm = mount(DailyLoginForm, {
                    propsData: {onlogin: () => {}}
                })
                loginForm.vm.$nextTick()
            })
            describe('userName', () => {
                describe('required', () => {
                    describe('何も入力されていない', () => {
                        test('validation.userName.requiredがinvalidであること', () => {
                            loginForm.setData({userName: ''})
                            expect(loginForm.vm.validation.userName.required).toBe(false)
                        })
                    })
                    describe('入力あり', () => {
                        test('validation.userName.requiredがvalidであること', () => {
                            loginForm.setData({userName: 'name'})
                            expect(loginForm.vm.validation.userName.required).toBe(true)
                        })
                    })
                })
            })
            describe('password', () => {
                describe('required', () => {
                    describe('何も入力されていない', () => {
                        test('validation.password.requiredがinvalidであること', () => {
                            loginForm.setData({password: ''})
                            expect(loginForm.vm.validation.password.required).toBe(false)
                        })
                    })
                    describe('入力あり', () => {
                        test('validation.password.requiredがvalidであること',() => {
                            loginForm.setData({password: 'xxxx'})
                            expect(loginForm.vm.validation.password.required).toBe(true)
                        })
                    })
                })
            })
        })
        describe('valid', () => {
            let loginForm
            beforeEach(async () => {
                loginForm = mount(DailyLoginForm, {
                    propsData: {onlogin: () => {}}
                })
                loginForm.vm.$nextTick()
            })
            describe('バリデーション項目すべてOK', () => {
                test('validになること', () => {
                    loginForm.setData({
                        userName: 'user',
                        password: '12345678'
                    })
                    expect(loginForm.vm.valid).toBe(true)
                })
            })
            describe('バリデーションNG項目あり', () => {
                test('invalidになること', () => {
                    loginForm.setData({
                        userName: 'user',
                        password: ''
                    })
                    expect(loginForm.vm.valid).toBe(false)
                })
            })
        })
        describe('disableLoginAction', () => {
            let loginForm
            beforeEach(async () => {
                loginForm = mount(DailyLoginForm, {
                    propsData: {onlogin: () => {}}
                })
                loginForm.vm.$nextTick()
            })
            describe('バリデーション項目NGある', () => {
                test('ログイン処理は無効', () => {
                    loginForm.setData({
                        userName: 'user',
                        password: ''
                    })
                    expect(loginForm.vm.disableLoginAction).toBe(true)
                })
            })
            describe('バリデーション項目すべてOKかつログイン処理中ではない', () => {
                test('ログイン処理は有効', () => {
                    loginForm.setData({
                        userName: 'user',
                        password: '12345678'
                    })
                    expect(loginForm.vm.disableLoginAction).toBe(false)
                })
            })
            describe('バリデーション項目すべてOKかつログイン処理中', () => {
                test('ログイン処理は無効', () => {
                    loginForm.setData({
                        userName: 'user',
                        password: '12345678',
                        progress: true
                    })
                    expect(loginForm.vm.disableLoginAction).toBe(true)
                })
            })
        })
        describe('onlogin', () => {
            let loginForm
            let onloginStub
            beforeEach(async () => {
                onloginStub = sinon.stub()
                loginForm = mount(DailyLoginForm, {
                    propsData: {onlogin: onloginStub}
                })
                loginForm.setData({
                    userName: 'user',
                    password: '12345678'
                })
                loginForm.vm.$nextTick()
            })
            describe('resolve', () => {
                test('resolveされること', async () => {
                    onloginStub.resolves()
                    await loginForm.find('button').trigger('click')
                    await loginForm.vm.$nextTick()
                    await flushPromises();
                    expect(onloginStub.called).toBe(true)
                    const authInfo = onloginStub.args[0][0]
                    expect(authInfo.userName).toBe(loginForm.vm.userName)
                    expect(authInfo.password).toBe(loginForm.vm.password)
                    expect(loginForm.vm.error).toBe('')
                    expect(loginForm.vm.disableLoginAction).toBe(false)
                })
            })
            describe('reject', () => {
                test('rejectされること', async () => {
                    const rejectError = new Error('login error!')
                    onloginStub.rejects(rejectError)
                    try{
                        await loginForm.find('button').trigger('click')
                        await loginForm.vm.$nextTick()
                    } catch(error){
                        expect(onloginStub.called).toBe(false)
                        const authInfo = onloginStub.args[0][0]
                        expect(authInfo.userName).toBe(loginForm.vm.userName)
                        expect(authInfo.password).toBe(loginForm.vm.password)
                        expect(loginForm.vm.error).toBe('login error!')
                        expect(loginForm.vm.disableLoginAction).toBe(false)
                    }
                })
            })
        })
    })
})