import * as crypto from 'crypto'
import { LibModule } from '../../utils'
import { CashBillError } from '../../error'
import { NotificationRequest } from './interfaces/notification-request.interface'
import { Notification } from './interfaces/notification.interface'

export class NotificationModule extends LibModule {
  consume(request: NotificationRequest): Notification {
    if (!this.verify(request)) {
      throw new CashBillError('Verification failed.')
    }

    return this.mapRequestToNotification(request)
  }

  protected verify(request: NotificationRequest): boolean {
    const config = this.getConfig()

    const expectedSign = crypto
      .createHash('md5')
      .update(request.cmd + request.args + config.secretPhrase)
      .digest('hex')

    return request.sign === expectedSign
  }

  protected mapRequestToNotification(request: NotificationRequest): Notification {
    return { paymentId: request.args }
  }
}
