export type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any 
    ? ReturnType<T[K]>
    : never;
};

export type Unbox<T> = T extends {[K in keyof T]: infer U} ? U : never;

export type CreatorsToActions<T> = Unbox<ReturnTypes<T>>;

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
