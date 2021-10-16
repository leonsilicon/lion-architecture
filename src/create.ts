import rfdc from 'rfdc';

import * as typescriptTemplateModules from './modules';
import type {
	InternalTypescriptTemplateInstance,
	InternalTypescriptTemplateState,
	TypescriptTemplateInstance,
} from './types/instance';
import type { InternalTypescriptTemplateProperties } from './types/properties';

const clone = rfdc();
const typescriptTemplateModulesObj = { ...typescriptTemplateModules };
const typescriptTemplateProperties =
	{} as InternalTypescriptTemplateProperties<any>;
for (const module of Object.values(typescriptTemplateModulesObj)) {
	for (const [fn, value] of Object.entries(module<any>())) {
		typescriptTemplateProperties[
			fn as keyof InternalTypescriptTemplateProperties<any>
		] = value;
	}
}

export function createTypescriptTemplateInstance<T>() {
	const internalState: InternalTypescriptTemplateState<T> = {
		_coreState: {} as T,
		globalState: {} as T,
	};

	const typescriptTemplateInstance: InternalTypescriptTemplateInstance<T> =
		Object.assign(clone(typescriptTemplateProperties), internalState);

	return typescriptTemplateInstance as TypescriptTemplateInstance<T>;
}
