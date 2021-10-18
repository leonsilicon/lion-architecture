import type { RemovePrivateProperties } from 'liontypes';

import type { InternalTypescriptTemplateProperties } from './properties';

export type TypescriptTemplateInstanceOptions = unknown;

export type InternalTypescriptTemplateState<T> = {
	globalState: T;
	_coreState: T;
	_options: TypescriptTemplateInstanceOptions;
};

type InternalTypescriptTemplateKeys<T> =
	InternalTypescriptTemplateProperties<T> & InternalTypescriptTemplateState<T>;

export interface InternalTypescriptTemplateInstance<T>
	extends InternalTypescriptTemplateKeys<T> {}

export interface TypescriptTemplateInstance<T>
	extends RemovePrivateProperties<InternalTypescriptTemplateInstance<T>> {}
