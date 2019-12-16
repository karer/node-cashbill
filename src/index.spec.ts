import { PaymentModule } from './features/payment'
import { NotificationModule } from './features/notification'

import { CashBill } from '.'

const MOCK_CONFIG = {
  shopId: '100',
  secretPhrase: 'xxxx-xxxx'
}

describe('Entry point', (): void => {
  const cashbill = new CashBill(MOCK_CONFIG)

  it('should be instance of CashBill', (): void => {
    expect(cashbill).toBeInstanceOf(CashBill)
  })

  it('should run payment module', (): void => {
    const key = 'payments'
    expect(cashbill).toHaveProperty(key)
    expect(cashbill[key]).toBeInstanceOf(PaymentModule)
  })

  it('should run notification module', (): void => {
    const key = 'notifications'
    expect(cashbill).toHaveProperty(key)
    expect(cashbill[key]).toBeInstanceOf(NotificationModule)
  })
})
