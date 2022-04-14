/* eslint-disable @typescript-eslint/ban-types */

import rfdc from 'rfdc';

export function retrieveModuleProperties(
	modules: Record<string, Function>
): Record<string, Function> {
	const modulesObj = { ...modules };
	const moduleProperties = {} as Record<string, Function>;
	for (const module of Object.values(modulesObj)) {
		for (const [fn, value] of Object.entries(module())) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			moduleProperties[fn] = value as any;
		}
	}

	return moduleProperties;
}

const clone = rfdc();
export function createInstance(
	properties: Record<string, unknown>,
	state: Record<string, unknown>
): unknown {
	return Object.assign(clone(properties), state);
}
