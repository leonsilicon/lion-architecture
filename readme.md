# Lion Architecture

The Lion Architecture is a programming pattern for TypeScript projects. It emphasizes modularity, DRY code, and long-term flexibility. It does not prioritize performance and is willing to sacrifice on performance for greater ease-of-development. Many of the performance issues with this architecture can theoretically be fixed using a build-step that will compile TypeScript in Lion Architecture to more performantly-written TypeScript/JavaScript.

## Object Factories over ES6 `class`es

The Lion Architecture uses Object Factories and avoids ES6 `class`es as much as possible. This is because splitting a `class`'s functionality across multiple files is difficult and requires a lot of boilerplate. On the contrary, it is extremely easy to divide code across different files when using object factories.

One downside of using object factories is the difficulty of using private properties. The Lion Architecture solves this problem by prefixing private properties all private functions with an underscore, and using TypeScript to filter out the private properties in the final object passed to the client. Note that this pattern doesn't protect your private functions from being called at runtime, however.

## DRY Code
One of the current problems with developing TypeScript libraries is the need to maintain a separate file to declare the types of function headers. The Lion Architecture solves this problem by making the function declaration the source of truth for the function's types and leveraging TypeScript's powerful type-inference to automatically determine the type of object factories.

## Generic Functions

### Modules

To take the most advantage of TypeScript type inference, the Lion Architecture introduces the idea of "file modules", where each module declares a set of functions that are later merged into the final object that is passed to the user. To leverage TypeScript's powerful type system, a wrapper function, the `defineMethods` function returned by the `useDefineMethods` higher-order function, is needed to successfully define methods on the instance. `defineMethods` allows you to access private functions within your module, while making sure that the external instance doesn't expose any private functions in the TypeScript typings.
