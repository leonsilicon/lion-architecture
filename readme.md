# Lion Architecture

The Lion Architecture is a programming pattern for TypeScript projects. It emphasizes modularity, ease-of-development, and long-term flexibility. It does not prioritize performance and is willing to sacrifice on performance for greater ease-of-development.

## Avoiding `class`

ES6 `class`es should be avoided as much as possible. This is because splitting a `class`'s functionality across multiple files is difficult and requires a lot of boilerplate. Object factories should be preferred whenever possible.

One downside of using object factories is the difficulty of using private properties. The Lion Architecture solves this problem by prefixing private properties all private functions with an underscore, and using TypeScript to filter out the private properties in the final object passed to the client. Note that this pattern doesn't protect your private functions from being called at runtime, however.

### Modules

To take the most advantage of TypeScript type inference, the Lion Architecture introduces the idea of "file modules", where each module declares a set of functions that are later merged into the final object that is passed to the user. To leverage TypeScript's powerful type system, a wrapper function, the `defineMethods` function returned by the `useDefineMethods` higher-order function, is needed to successfully define methods on the instance. `defineMethods` allows you to access private functions within your module, while making sure that the external instance doesn't expose any private functions in the TypeScript typings.
