
import { spawnSync } from "child_process";

const runCommand = (command, args) => {
  const result = spawnSync(command, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    console.error(`❌ Command failed: ${command} ${args.join(" ")}`);
    process.exit(1);
  }
};

// Fetch latest main branch
console.log("📡 Fetching latest main branch...");
runCommand("git", ["fetch", "origin", "main"]);

// Check if local branch is behind main
console.log("🔍 Checking if branch is up to date...");
const mergeBase = spawnSync("git", ["merge-base", "--is-ancestor", "origin/main", "HEAD"]);

if (mergeBase.status !== 0) {
  console.error("❌ Your branch is behind main. Please rebase before pushing.");
  process.exit(1);
}

// Run linting and formatting checks
console.log("🎨 Running lint and format checks...");
runCommand("npx", ["lint-staged"]);

console.log("✅ Code is clean and up to date with main. Pushing allowed!");
process.exit(0);
