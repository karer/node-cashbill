export enum PaymentStatus {
  START = 'Start',
  NEGATIVE_AUTHORIZATION = 'NegativeAuthorization',
  ABORT = 'Abort',
  FRAUD = 'Fraud',
  POSITIVE_AUTHORIZATION = 'PositiveAuthorization',
  POSITIVE_FINISH = 'PositiveFinish',
  NEGATIVE_FINISH = 'NegativeFinish',
  TIME_EXCEEDED = 'TimeExceeded',
  CRITICAL_ERROR = 'CriticalError'
}
