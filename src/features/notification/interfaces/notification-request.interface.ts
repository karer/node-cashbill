import { NotificationCommand } from '../enums/notification.cmd'

export interface NotificationRequest {
  cmd: NotificationCommand
  args: string
  sign: string
}
