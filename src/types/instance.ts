import type { InternalTTMethods } from './methods';

export type InternalTTInstance<T> = InternalTTMethods<T> & {
	state: T;
};

export type TTInstance<T> = {
	[K in keyof InternalTTInstance<T> as K extends `_${infer _}`
		? never
		: K]: InternalTTInstance<T>[K];
};
