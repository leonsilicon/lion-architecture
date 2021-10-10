import * as typescriptTemplateModules from './modules';
import type {
	InternalTypescriptTemplateInstance,
	TypescriptTemplateInstance,
} from './types/instance';
import type { InternalTypescriptTemplateMethods } from './types/methods';

export function createTypescriptTemplateInstance<T>() {
	const ttModulesObj = { ...typescriptTemplateModules };
	const ttMethods = {} as InternalTypescriptTemplateMethods<T>;
	for (const module of Object.values(ttModulesObj)) {
		for (const [fn, value] of Object.entries(module<T>())) {
			ttMethods[fn as keyof InternalTypescriptTemplateMethods<T>] =
				value as any;
		}
	}

	const ttInstance: InternalTypescriptTemplateInstance<T> = {
		...ttMethods,
		state: {} as T,
	};

	return ttInstance as TypescriptTemplateInstance<T>;
}
