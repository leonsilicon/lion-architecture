import type { InternalTypescriptTemplateMethods } from './methods';

export type InternalTypescriptTemplateInstance<T> = InternalTypescriptTemplateMethods<T> & {
	state: T;
};

export type TypescriptTemplateInstance<T> = {
	[K in keyof InternalTypescriptTemplateInstance<T> as K extends `_${infer _}`
		? never
		: K]: InternalTypescriptTemplateInstance<T>[K];
};
