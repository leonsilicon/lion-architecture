import type { RemovePrivateProperties } from 'liontypes';

import type { InternalTypescriptTemplateProperties } from './properties';

export type TypescriptTemplateInstanceOptions = unknown;

export type InternalTypescriptTemplateState<T> = {
	globalState: T;
	_coreState: T;
	_options: TypescriptTemplateInstanceOptions;
};

export type InternalTypescriptTemplateInstance<T> =
	InternalTypescriptTemplateProperties<T> & InternalTypescriptTemplateState<T>;

export type TypescriptTemplateInstance<T> = RemovePrivateProperties<
	InternalTypescriptTemplateInstance<T>
>;
