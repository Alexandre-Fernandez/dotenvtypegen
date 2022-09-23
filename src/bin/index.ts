#!/usr/bin/env node
import { resolve } from "path"
import Env from "../classes/Env"

const CMD = "dotenvtypegen"

const args = {
	header: "",
	envPaths: [] as string[],
	namespace: "NodeJS",
	interface: "ProcessEnv",
	optional: undefined as undefined | true,
	save: "./process.env.d.ts",
}

let mode: keyof typeof args = "envPaths"
for (const arg of process.argv.slice(2)) {
	if (arg === "--namespace" || arg === "-ns") {
		mode = "namespace"
		continue
	}
	if (arg === "--interface" || arg === "-in") {
		mode = "interface"
		continue
	}
	if (arg === "--header" || arg === "-hd") {
		mode = "header"
		continue
	}
	if (arg === "--save" || arg === "-sv") {
		mode = "save"
		continue
	}
	if (arg === "--optional" || arg === "-op") {
		args.optional = true
		continue
	}
	switch (mode) {
		case "envPaths":
			args.envPaths.push(arg)
			break
		case "namespace":
			args.namespace = arg
			break
		case "save":
			args.save = arg
			break
		case "header":
			args.header = arg
			break
		case "interface":
			args.interface = arg
			break
		default:
			throw new Error("Invalid command.")
	}
}

if (args.envPaths.length > 0) {
	new Env(args.envPaths, {
		header: args.header,
		interface: args.interface,
		namespace: args.namespace,
		optional: args.optional,
	}).save(resolve(args.save))
} else {
	console.error("Error: Provide a path to one or more .env files.")
	console.log(`Example: \n  ${CMD} [path1] [path2] --save [path3]`)
}
