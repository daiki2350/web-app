import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import DailyButton from '@/components/atoms/DailyButton.vue'

describe('DailyButton', () => {
    describe('プロパティ'  , () => {
        describe('type', () => {
            describe('デフォルト', () => {
                test('daily-buttonクラスをもつbutton要素で構成されること', () => {
                    const button = mount(DailyButton)
                    const buttonElement = button.element
                    expect(buttonElement.tagName).toBe('BUTTON')
                    expect(button.classes()).toContain('daily-button')
                })
            })
            describe('button', () => {
                test('daily-buttonクラスをもつbutton要素で構成されること', () => {
                    const button = mount(DailyButton, {
                        propsData: {type: 'button'}
                    })
                    const buttonElement = button.element
                    expect(buttonElement.tagName).toBe('BUTTON')
                    expect(button.classes()).toContain('daily-button')
                })
            })
            describe('text', () => {
                test('daily-button-textクラスをもつbutton要素で構成されること', () => {
                    const button = mount(DailyButton, {
                        propsData: {type: 'text'}
                    })
                    const buttonElement = button.element
                    expect(buttonElement.tagName).toBe('BUTTON')
                    expect(button.classes()).toContain('daily-button-text')
                })
            })
        })
        describe('disabled', () => {
            describe('デフォルト', () => {
                test('disabled属性が付与されていないこと', () => {
                    const button = mount(DailyButton)
                    expect(button.attributes('disabled')).toBeUndefined()
                })
            })
            describe('true', () => {
                test('disabled属性が付与されていること', () => {
                    const button = mount(DailyButton, {
                        propsData: {disabled: true}
                    })
                    expect(button.element.disabled).toBe(true)
                })
            })
            describe('false', () => {
                test('disabled属性が付与されていないこと', () => {
                    const button = mount(DailyButton)
                    expect(button.attributes('disabled')).toBeUndefined()
                })
            })
        })
    })
    describe('イベント', () => {
        describe('click', () => {
            test('発行されていること', () => {
                const button = mount(DailyButton)
                button.trigger('click')
                expect(button.emitted('click')).toBeTruthy()
            })
        })
    })
    describe('スロット', () => {
        describe('コンテンツ挿入あり', () => {
            test('挿入されていること', () => {
                const button = mount(DailyButton, {
                    slots: {default: '<p>hello</p>'}
                })
                expect(button.text()).toBe('hello')
            })
        })
        describe('コンテンツ挿入なし', () => {
            test('挿入されていないこと', () => {
                const button = mount(DailyButton)
                expect(button.text()).toBe('')
            })
        })
    })
})