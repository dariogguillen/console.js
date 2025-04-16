import { yarg } from "./config/plugins/args.plugins";
import { ServerApp } from "./server/server";

async function main() {
  const {
    b: base,
    l: limit,
    s: showTable,
    n: name,
    d: destination,
  } = await yarg;

  ServerApp.run({ base, limit, showTable, name, destination });
}

(async () => {
  await main();
})();
