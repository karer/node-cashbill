import * as request from 'request-promise-native'

import { ConfigGetter } from '../config'

const BASE_URL = 'https://pay.cashbill.pl/ws/rest/'

export class LibModule {
  protected getConfig: ConfigGetter

  constructor(getConfig: ConfigGetter) {
    this.getConfig = getConfig
  }

  protected sendGetRequest(url: string, options: object): request.RequestPromise {
    return request.get(this.calculateUrl(url), options)
  }

  protected sendPostRequest(url: string, options: request.RequestPromiseOptions = {}): request.RequestPromise {
    if (options.form) {
      options.form = Object.entries(options.form).reduce((prev, [key, value]) => {
        if (typeof value === 'object') {
          const nestedObjects = Object.entries(value).reduce(
            (prevNested, [nestedKey, nestedValue]) => ({ ...prevNested, [`${key}.${nestedKey}`]: nestedValue }),
            {}
          )

          return { ...prev, ...nestedObjects }
        }

        return { ...prev, [key]: value }
      }, {})
    }

    return request.post(this.calculateUrl(url), options)
  }

  protected parseResult(result: string): any {
    return JSON.parse(result)
  }

  private calculateUrl(url: string): string {
    return BASE_URL + url
  }
}
