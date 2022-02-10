# StackOverflow Answer to [Question][q]

## [How to mock functions in the same module using Jest?][q]


> What's the best way to correctly mock the following example?
> 
> The problem is that after import time, `foo` keeps the reference to the original unmocked `bar`.
> 
> `module.js`:
> 
>     export function bar () {
>         return 'bar';
>     }
> 
>     export function foo () {
>         return `I am foo. bar is ${bar()}`;
>     }
> 
> 
> 
> `module.test.js`:
> 
>     import * as module from '../src/module';
> 
>     describe('module', () => {
>         let barSpy;
> 
>         beforeEach(() => {
>             barSpy = jest.spyOn(
>                 module,
>                 'bar'
>             ).mockImplementation(jest.fn());
>         });
> 
> 
>         afterEach(() => {
>             barSpy.mockRestore();
>         });
> 
>         it('foo', () => {
>             console.log(jest.isMockFunction(module.bar)); // outputs true
> 
>             module.bar.mockReturnValue('fake bar');
> 
>             console.log(module.bar()); // outputs 'fake bar';
> 
>             expect(module.foo()).toEqual('I am foo. bar is fake bar');
>             /**
>              * does not work! we get the following:
>              *
>              *  Expected value to equal:
>              *    "I am foo. bar is fake bar"
>              *  Received:
>              *    "I am foo. bar is bar"
>              */
>         });
>     });
> 
> I could change:
> 
>     export function foo () {
>         return `I am foo. bar is ${bar()}`;
>     }
> 
> to:
> 
>     export function foo () {
>         return `I am foo. bar is ${exports.bar()}`;
>     }
> 
> but this is pretty ugly in my opinion to do everywhere.


---

## Answer

> My opinion is that you should never have the necessity to mock methods of a class or module that you're testing. That's a clear indication that you're creating a "god module". You should rather think of following the [single responsibility principle][2].
> I would have extracted the `bar()` into a separate module and would have generated an [auto-mock][auto-mock], which jest would take care of hoisting and generate mocks for each of it's methods
> 
> And [the test](./src/module.test.js) would become trivial


[q]: https://stackoverflow.com/questions/45111198/how-to-mock-functions-in-the-same-module-using-jest
[2]: https://en.wikipedia.org/wiki/Single-responsibility_principle
[auto-mock]: https://jestjs.io/docs/es6-class-mocks#automatic-mock