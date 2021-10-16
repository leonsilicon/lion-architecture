import type { InternalTypescriptTemplateInstance } from '../types/instance';

export function coreModule<T>() {
	function publicMethod(this: InternalTypescriptTemplateInstance<T>): T {
		if (this._options) {
			return this._options as T;
		} else {
			return this._coreState;
		}
	}

	function _privateMethod(this: InternalTypescriptTemplateInstance<T>) {
		return 'private';
	}

	return {
		publicMethod,
		_privateMethod,
	};
}
