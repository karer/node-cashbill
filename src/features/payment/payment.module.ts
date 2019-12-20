import * as crypto from 'crypto'
import { LibModule } from '../../utils'
import { CashBillError } from '../../error'
import { Payment } from './interfaces/payment.interface'
import { PaymentRequest } from './interfaces/payment-request.interface'
import { PaymentResponse } from './interfaces/payment-response.interface'
import * as diacritics from 'diacritics'

export class PaymentModule extends LibModule {
  async get(paymentId: string): Promise<Payment> {
    let resultRaw

    try {
      resultRaw = await this.sendGetRequest(this.getUrl() + paymentId, { qs: { sign: this.getAccessSign(paymentId) } })
    } catch (err) {
      throw new CashBillError(`Cannot access a payment. Reason: ${err.message}`)
    }

    const result = this.parseResult(resultRaw)

    const payment: Payment = result

    return payment
  }

  async create(payment: PaymentRequest): Promise<PaymentResponse> {
    payment.title = diacritics.remove(payment.title)

    const fields = {
      ...payment,
      sign: this.getCreationSign(payment)
    }

    let resultRaw

    try {
      resultRaw = await this.sendPostRequest(this.getUrl(), { form: fields })
    } catch (err) {
      throw new CashBillError(`Cannot create a payment request. Reason: ${err.message}`)
    }

    const result = this.parseResult(resultRaw)

    const paymentResponse: PaymentResponse = {
      id: result.id,
      redirectUrl: result.redirectUrl
    }

    return paymentResponse
  }

  protected getUrl(): string {
    return `payment/${this.getConfig().shopId}/`
  }

  private getAccessSign(paymentId: string): string {
    const config = this.getConfig()

    return crypto
      .createHash('sha1')
      .update(paymentId + config.secretPhrase)
      .digest('hex')
  }

  private getCreationSign(paymentRequest: PaymentRequest): string {
    const config = this.getConfig()

    const safePersonalData = paymentRequest.personalData || {}

    return crypto
      .createHash('sha1')
      .update(
        paymentRequest.title +
          paymentRequest.amount.value +
          paymentRequest.amount.currencyCode +
          (paymentRequest.returnUrl || '') +
          paymentRequest.description +
          (paymentRequest.negativeReturnUrl || '') +
          (paymentRequest.additionalData || '') +
          (paymentRequest.paymentChannel || '') +
          (paymentRequest.languageCode || '') +
          (paymentRequest.referer || '') +
          (safePersonalData.firstName || '') +
          (safePersonalData.surname || '') +
          (safePersonalData.email || '') +
          (safePersonalData.country || '') +
          (safePersonalData.city || '') +
          (safePersonalData.postcode || '') +
          (safePersonalData.street || '') +
          (safePersonalData.house || '') +
          (safePersonalData.flat || '') +
          config.secretPhrase
      )
      .digest('hex')
  }
}
