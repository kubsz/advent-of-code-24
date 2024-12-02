import { spawn } from "child_process";

const args = process.argv.slice(2);
const [day, file] = args;

if (!day) {
  console.error("Please provide the day number.");
  process.exit(1);
}

const tsnd = spawn("tsnd", ["--respawn", `days/${day}/${file || "solution"}.ts`], { stdio: "inherit" });

tsnd.on("close", (code) => {
  if (code !== 0) {
    console.error(`tsnd exited with code ${code}`);
  }
});
