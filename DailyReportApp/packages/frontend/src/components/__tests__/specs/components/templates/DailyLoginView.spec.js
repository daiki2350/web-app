import { mount } from "@vue/test-utils";
import DailyLoginView from '@/components/templates/DailyLoginView.vue'
import { beforeEach, describe, test } from "vitest";
import sinon from 'sinon'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const app = createApp();
const pinia = createPinia();


describe('DailyLoginView', () => {
  test('ログイン成功時、ボードページにリダイレクトされること', async () => {
    beforeEach(() => {
        app.use(pinia);
    })
    const $router = {
      push: sinon.spy()
    }

    const wrapper = mount(DailyLoginView, {
      global: {
        mocks: {
          $router
        }
      }
    })

    // DailyLoginForm から emit される onlogin イベントをトリガー
    await wrapper.vm.handleLogin({ userName: 'user', password: '12345678' })

    // $router.push が正しく呼び出されることを確認
    expect($router.push.called).toBe(true)
    expect($router.push.args[0][0]).toEqual({ path: '/' })
  })

  test('ログイン失敗時、エラーメッセージが設定されること', async () => {
    const $router = {
      push: sinon.spy()
    }


    const wrapper = mount(DailyLoginView, {
      global: {
        mocks: {
          $router
        }
      }
    })

    // login アクションがエラーを返すように設定
    wrapper.vm.reportStore.login.rejects(new Error('login failed'))

    // DailyLoginForm から emit される onlogin イベントをトリガー
    await wrapper.vm.handleLogin({ userName: 'user', password: '12345678' })

    // エラーメッセージが設定されることを確認
    expect(wrapper.vm.$data.error).toBe('login failed')

    // $router.push は呼び出されないことを確認
    expect($router.push.called).toBe(false)
  })
})
