import * as dotenv from "dotenv"
import { writeFileSync } from "fs"
import { resolve } from "path"
import { getFileSync } from "../functions"

class Env {
	private env: Record<string, unknown>

	constructor(
		path: string | string[],
		private options: Config = {
			namespace: "NodeJS",
			interface: "ProcessEnv",
		}
	) {
		const paths = typeof path === "string" ? [path] : path
		this.env = paths.reduce((prev, cur) => {
			return { ...prev, ...dotenv.parse(getFileSync(cur)) }
		}, {})
	}

	generate() {
		const header = this.options.header ? `${this.options.header}\n\n` : ""

		const out = Object.entries(this.env).reduce((prev, [key, val]) => {
			return (
				prev +
				`\t\t\t${key}${
					this.options.optional ? "?" : ""
				}: ${typeof val}\n`
			)
		}, `${header}declare global {\n\tnamespace ${this.options.namespace} {\n\t\tinterface ${this.options.interface} {\n`)

		return out + `\t\t}\n\t}\n}`
	}

	save(path = "./process.env.d.ts") {
		writeFileSync(resolve(path), this.generate())
	}
}

type Config = {
	namespace?: string
	interface?: string
	header?: string
	optional?: true
}

export default Env
