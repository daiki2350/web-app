import axios from "axios"
import { describe, expect, test } from "vitest"
import auth from '@/api/auth'

describe('Auth APIモジュール', () => {
    describe('login', () => {
        const token = '1234567890abcdef'
        const userId = 1
        const userName = 'user'
        const password = '12345678'

        describe('成功', () => {
            test('token,userIdが取得できること', async () => {
               
                const result = auth.login({userName, password})
                expect(result.token).toBe(token)
                expect(result.userId).toBe(userId)
            })
        })
        describe('失敗', () => {
            test('エラーメッセージを取得できること', async () => {
                const message = 'failed login'
                try{
                    await auth.login({userName, password})
                } catch(err){
                    expect(err.message).toBe(message)
                }
            })
        })
    })
})