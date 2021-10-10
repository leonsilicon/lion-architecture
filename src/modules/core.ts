import type { InternalTypescriptTemplateInstance } from '../types/instance';

export function coreModule<T>() {
	const coreState = {} as T;

	function publicMethod(this: InternalTypescriptTemplateInstance<T>) {
		return coreState;
	}

	function _privateMethod(this: InternalTypescriptTemplateInstance<T>) {
		return 'private';
	}

	return {
		publicMethod,
		_privateMethod,
		coreState,
	};
}
