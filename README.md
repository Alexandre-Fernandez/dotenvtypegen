# dotenvtypegen

> Generate types for your .env files.

## Installation

```
// npm
npm install -D dotenvtypegen
// yarn
yarn add -D dotenvtypegen
// pnpm
pnpm add -D dotenvtypegen
```

## Usage

-   Star the [github repo](https://github.com/alexandre-fernandez/dotenvtypegen) 😎

### CLI

```css
npx dotenvtypegen [path_to_env] --save [path_to_output]
```

### Module

```ts
import { Env } from "dotenvtypegen"

new Env("path/to/.env").save("path/to/output.d.ts")
```

## Reference

### CLI

| Option      | Shortcut | Argument | Description                                                 |
| ----------- | -------- | -------- | ----------------------------------------------------------- |
| --namespace | -ns      | string   | Sets the namespace name for the generated type              |
| --interface | -in      | string   | Sets the interface name for the generated type              |
| --header    | -hd      | string   | Adds the given string at the top of the generated type file |
| --save      | -sv      | string   | Where to save the generated file                            |
| --optional  | -op      | bool     | Will make all the type properties optional                  |

If multiple `.env` file paths are given the `.env` files will be merged.

#### Example

```css
npx dotenvtypegen [path_to_first_env] [path_to_second_env] -ns MyNamespace -in MyInterface -hd "/* eslint-disable eslint/some-rule */" -op -sv type.d.ts
```

### Module

```ts
class Env {
	private env: Record<string, unknown>

	/**
	 * @param path If multiple paths are given, the corresponding `.env` files will be merged.
	 */
	constructor(
		path: string | string[],
		private options: Config = {
			namespace: "NodeJS",
			interface: "ProcessEnv",
			header: "",
			optional: false,
		}
	) {}

	/**
	 * @returns The type file's content corresponding to the current instance.
	 */
	generate() {}

	/**
	 * Saves the types corresponding to the current instance to the given path.
	 */
	save(path) {}
}
```
