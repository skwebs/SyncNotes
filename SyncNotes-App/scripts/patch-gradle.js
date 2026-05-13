const fs = require("fs");
const path = require("path");

const gradlePath = path.join(__dirname, "../android/app/build.gradle");

if (!fs.existsSync(gradlePath)) {
  console.error("❌ android/app/build.gradle not found");
  process.exit(1);
}

let gradle = fs.readFileSync(gradlePath, "utf8");

const splitConfig = `
    splits {
        abi {
            enable = true
            reset()
            include("arm64-v8a")
            universalApk = false
        }
    }
`;

let modified = false;

// Add splits inside android {}
if (!gradle.includes("splits {")) {
  gradle = gradle.replace(/android\s*\{/, `android {${splitConfig}`);
  modified = true;
}

fs.writeFileSync(gradlePath, gradle);

console.log(
  modified
    ? "✅ build.gradle patched for arm64-v8a"
    : "⚠️ build.gradle already patched",
);
