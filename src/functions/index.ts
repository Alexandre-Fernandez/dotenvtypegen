import { readFileSync } from "fs"
import { resolve } from "path"

export function getFileSync(path: string) {
	return readFileSync(resolve(path), { encoding: "utf8" })
}
