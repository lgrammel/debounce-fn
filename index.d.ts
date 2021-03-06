export interface Options {
	/**
	Time to wait until the `input` function is called.

	@default 0
	*/
	readonly wait?: number;

	/**
	Trigger the function on the leading edge of the `wait` interval.

	For example, this can be useful for preventing accidental double-clicks on a "submit" button from firing a second time.

	@default false
	*/
	readonly before?: boolean;

	/**
	Trigger the function on the trailing edge of the `wait` interval.

	@default true
	*/
	readonly after?: boolean;
}

export interface BeforeOptions extends Options {
	readonly before: true;
}

export interface NoBeforeNoAfterOptions extends Options {
	readonly after: false;
	readonly before?: false;
}

export interface DebouncedFunction<ArgumentsType extends unknown[], ReturnType> {
	(...arguments: ArgumentsType): ReturnType;
	cancel(): void;
}

/**
[Debounce](https://davidwalsh.name/javascript-debounce-function) a function.

@param input - Function to debounce.
@returns A debounced function that delays calling the `input` function until after `wait` milliseconds have elapsed since the last time the debounced function was called.

It comes with a `.cancel()` method to cancel any scheduled `input` function calls.

@example
```
import debounceFn from 'debounce-fn';

window.onresize = debounceFn(() => {
	// Do something on window resize
}, {wait: 100});
```
*/
declare function debounceFn<ArgumentsType extends unknown[], ReturnType>(
	input: (...arguments: ArgumentsType) => ReturnType,
	options: BeforeOptions
): DebouncedFunction<ArgumentsType, ReturnType>;

declare function debounceFn<ArgumentsType extends unknown[], ReturnType>(
	input: (...arguments: ArgumentsType) => ReturnType,
	options: NoBeforeNoAfterOptions
): DebouncedFunction<ArgumentsType, undefined>;

declare function debounceFn<ArgumentsType extends unknown[], ReturnType>(
	input: (...arguments: ArgumentsType) => ReturnType,
	options?: Options
): DebouncedFunction<ArgumentsType, ReturnType | undefined>;

export default debounceFn;
