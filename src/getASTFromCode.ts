import { transformAsync } from "@babel/core";
import { File } from "@babel/types";
import { Map } from "immutable";

export type ASTStore = Map<string, File>;

export async function getASTFromCode(
  astStore: ASTStore,
  code: string,
  filename: string
): Promise<[ASTStore, File]> {
  const existing = astStore.get(code);
  if (!existing) {
    const { ast } = (await transformAsync(code, {
      filename,
      ast: true,
      presets: [require("@babel/preset-typescript")],
      plugins: [
        require("@babel/plugin-proposal-optional-catch-binding"),
        require("@babel/plugin-proposal-optional-chaining"),
        require("@babel/plugin-proposal-nullish-coalescing-operator"),
      ],
    }))!;

    return [astStore.set(code, ast!), ast!];
  } else {
    return [astStore, existing];
  }
}
