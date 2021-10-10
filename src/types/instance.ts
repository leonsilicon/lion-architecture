import type { InternalTypescriptTemplateProperties } from './properties';

export type InternalTypescriptTemplateInstance<T> = InternalTypescriptTemplateProperties<T> & {
	globalState: T;
};

export type TypescriptTemplateInstance<T> = {
	[K in keyof InternalTypescriptTemplateInstance<T> as K extends `_${infer _}`
		? never
		: K]: InternalTypescriptTemplateInstance<T>[K];
};
