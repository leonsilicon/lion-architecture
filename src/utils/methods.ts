import type { InternalTypescriptTemplateInstance } from '../types/instance';

export function createMethodDefiner<T>() {
	return function defineMethods<M>(
		methods: M & ThisType<InternalTypescriptTemplateInstance<T>>
	) {
		return methods as unknown as M;
	};
}
