import { controller, get, post, put, del } from '../lib/decorator'
import {
  checkPassword
} from '../service/user'

@controller('api/v0/user')
export class userController {

  @post('/')
  async login (ctx, next) {
    const { email, password } = ctx.body
    const mathData = await checkPassword(email, password)

    if (!mathData.user) {
      return (ctx.body = {
        success: false,
        message: '用户不存在'
      })
    }

    if (mathData.match) {
      return (ctx.body = {
        success: true,
      })
    }

    return (ctx.body = {
      success: false,
      message: '密码不正确'
    })

  }
}
