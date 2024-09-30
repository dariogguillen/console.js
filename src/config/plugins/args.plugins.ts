import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    description: "Multiplication base",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    default: 10,
    description: "Multiplication limit",
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    description: "Show multiplication table",
  })
  .option("n", {
    alias: "name",
    type: "string",
    default: "table",
    description: "File name",
  })
  .options("d", {
    alias: "destination",
    type: "string",
    default: "./outputs",
    description: " File destination",
  })
  .check((argv) => {
    if (argv.b < 1) throw new Error("base should be > 0 ");
    return true;
  })
  .parseAsync();
