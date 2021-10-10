import * as typescriptTemplateModules from './modules';
import type {
	InternalTypescriptTemplateInstance,
	TypescriptTemplateInstance,
} from './types/instance';
import type { InternalTypescriptTemplateMethods } from './types/methods';

export function createTypescriptTemplateInstance<T>() {
	const typescriptTemplateModulesObj = { ...typescriptTemplateModules };
	const typescriptTemplateMethods = {} as InternalTypescriptTemplateMethods<T>;
	for (const module of Object.values(typescriptTemplateModulesObj)) {
		for (const [fn, value] of Object.entries(module<T>())) {
			typescriptTemplateMethods[fn as keyof InternalTypescriptTemplateMethods<T>] =
				value as any;
		}
	}

	const typescriptTemplateInstance: InternalTypescriptTemplateInstance<T> = {
		...typescriptTemplateMethods,
		state: {} as T,
	};

	return typescriptTemplateInstance as TypescriptTemplateInstance<T>;
}
