# Lion Architecture

[![npm version](https://img.shields.io/npm/v/lion-architecture)](https://npmjs.com/package/lion-architecture)

The "Lion Architecture" (LA) is a programming pattern for TypeScript projects. It emphasizes modularity, DRY code, and long-term flexibility. It does not prioritize performance and is willing to sacrifice on performance for greater ease-of-development. Many of the performance issues with this architecture can theoretically be fixed using a build-step that will compile TypeScript in Lion Architecture to more performantly-written TypeScript/JavaScript.

## Object Factories over ES6 `class`es

The Lion Architecture uses Object Factories and avoids ES6 `class`es as much as possible. This is because splitting a `class`'s functionality across multiple files is difficult and requires a lot of boilerplate. On the contrary, it is extremely easy to divide code across different files when using object factories.

One downside of using object factories is the difficulty of using private properties. The Lion Architecture solves this problem by prefixing private properties all private functions with an underscore, and using TypeScript to filter out the private properties in the final object passed to the client. Note that this pattern doesn't protect your private functions from being called at runtime, however.

## DRY Code
One of the current problems with developing TypeScript libraries is the need to maintain a separate file to declare the types of function headers. The Lion Architecture solves this problem by making the function declaration the source of truth for the function's types and leveraging TypeScript's powerful type-inference to automatically determine the type of object factories.

## Generic Functions

### Modules

To take the most advantage of TypeScript type inference, the Lion Architecture introduces the idea of "file modules", where each module declares a set of functions that are later merged into the final object that is passed to the user. To leverage TypeScript's powerful type system, a wrapper function, the `defineMethods` function returned by the `useDefineMethods` higher-order function, is needed to successfully define methods on the instance. `defineMethods` allows you to access private functions within your module, while making sure that the external instance doesn't expose any private functions in the TypeScript typings.

## File Structure
A project following the Lion Architecture generally adopts the following file structure:
```
my-project/
  - package.json
  - src/
    - index.ts # the exports of your package
    - types/   # folder for all TypeScript types
    - utils/   # folder for all utility code
      - create.ts # file where the project instance is created 
    - modules/ # folder for all your Lion Architecture modules
      - module1/
        - module-part.ts          # a LA module
	- another-module-part.ts  # another LA module
        - index.ts                # re-exports the module files
      - module2/
        - module-part.ts
        - another-module-part.ts
	- index.ts
      - index.ts # re-exports all modules
```

The `create.ts` file would generally look something like this:
```typescript
import { createInstance, retrieveModuleProperties } from 'lion-architecture';

import * as myProjectModules from '../modules';
import type { InternalMyProjectState, MyProject } from '../types/my-project';
import type { MyProjectProperties } from '../types/properties';

const myProjectProperties = retrieveModuleProperties(
  myProjectModules
) as InternalMyProjectProperties<any>;

export function createMyProject() {
  const myProject = createInstance(myProjectProperties, {}) as MyProject;
  return myProject;
}
```

## Exports

In order to improve import/export ergonomics, the Lion Architecture makes heavy use of dependency cycles and `index.ts` files that re-export all files in a folder. This is generally only recommended in places where tree-shaking isn't valuable, like on a server backend.

To reduce problems from dependency cycles, the Lion Architecture forbids exporting variables, and only allows exporting functions. When a constant value is needed, the constant is wrapped in a function using [onetime](https://npm.im/onetime).

## Example Projects using Lion Architecture
[lionecs](https://github.com/leonzalion/lionecs): The most strongly typed ECS library in TypeScript.

## No top-level constant exports

Real world example:

```typescript
import chalk from 'chalk';

export const DEFAULT_THEME = {
  keyword: chalk.blue,
  built_in: chalk.cyan,
  // ...
};
```

Because `chalk.blue` is already evaluated, overidding environment variables like `FORCE_COLOR` for chalk (e.g. in tests) doesn't work.

Instead, this problem can be mitigated using top-level function exports:

```typescript
import chalk from 'chalk';
import onetime from 'onetime';

export const getDefaultTheme = onetime(() => ({
  keyword: chalk.blue,
  built_in: chalk.cyan,
  // ...
}));
```

