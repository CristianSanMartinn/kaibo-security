// Carga los módulos puros de TypeScript para node:test sin añadir dependencias.
import { readFileSync } from "node:fs";
import ts from "typescript";

const cache = new Map();
export function moduleUrl(url) {
  const key = url.href;
  if (cache.has(key)) return cache.get(key);
  const source = ts.transpileModule(readFileSync(url, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const resolved = source.replace(/from ["'](\.[^"']+)["']/g, (_, relative) => {
    const dependency = new URL(
      relative.endsWith(".ts") ? relative : relative + ".ts",
      url,
    );
    return `from "${moduleUrl(dependency)}"`;
  });
  const result =
    "data:text/javascript;base64," + Buffer.from(resolved).toString("base64");
  cache.set(key, result);
  return result;
}
export async function loadModule(relative) {
  return import(moduleUrl(new URL(relative, import.meta.url)));
}
