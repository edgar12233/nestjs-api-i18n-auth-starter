import { AsyncLocalStorage } from 'async_hooks';

type ContextStore = {
  lang: string;
};

const asyncLocalStorage = new AsyncLocalStorage<ContextStore>();

export const RequestContext = {
  run<T>(fn: () => T, store: ContextStore): T {
    return asyncLocalStorage.run(store, fn);
  },

  get<T extends keyof ContextStore>(key: T): ContextStore[T] | undefined {
    return asyncLocalStorage.getStore()?.[key];
  },
};
