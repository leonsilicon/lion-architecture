import rfdc from 'rfdc';

export function retrieveModuleProperties<P>(modules: Record<string, Function>) {
	const modulesObj = { ...modules };
	const moduleProperties = {} as P;
	for (const module of Object.values(modulesObj)) {
		for (const [fn, value] of Object.entries(module())) {
			moduleProperties[fn as keyof P] = value as any;
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
