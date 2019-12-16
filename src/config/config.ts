export interface Config {
  shopId: string
  secretPhrase: string
}

export type ConfigGetter = () => Config
