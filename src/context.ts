import { createContext } from 'react'

export type HasuraResourceContextConfig = {
  primaryKey: {
    [key: string]: string
  }
}

export interface HasuraResourceContextState {
  endpoint: string | null,
  headers?: object,
  config: HasuraResourceContextConfig;
}

export const HasuraResourceContext = createContext<HasuraResourceContextState>({
  endpoint: null,
  headers: {},
  config: {
    primaryKey: {}
  }
});
