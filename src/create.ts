import * as ttModules from './modules';
import type { InternalTTInstance, TTInstance } from './types/instance';
import type { InternalTTMethods } from './types/methods';

export function createTTInstance<T>() {
	const ttModulesObj = { ...ttModules };
	const ttMethods = {} as InternalTTMethods<T>;
	for (const module of Object.values(ttModulesObj)) {
		for (const [fn, value] of Object.entries(module<T>())) {
			ttMethods[fn as keyof InternalTTMethods<T>] = value as any;
		}
	}

	const ttInstance: InternalTTInstance<T> = {
		...ttMethods,
		state: {} as T,
	};

	return ttInstance as TTInstance<T>;
}
