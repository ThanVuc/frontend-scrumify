import StyleDictionary from "style-dictionary";
import fs from "node:fs";
import path from "node:path";

const allFiles = fs
    .readdirSync("tokens", { recursive: true })
    .filter((file) => typeof file === "string" && file.endsWith(".json"))
    .map((file) => path.join("tokens", file).replace(/\\/g, "/"));

const commonSource = allFiles.filter(
    (file) => !file.includes("tokens/theme/")
);

function createSDConfig(themeFile, destination, selector) {
    return new StyleDictionary({
        source: [...commonSource, themeFile],
        platforms: {
            css: {
                prefix: "ds",
                transformGroup: "css",
                buildPath: "src/styles/generated/",
                files: [
                    {
                        destination,
                        format: "css/variables",
                        options: {
                            selector,
                        },
                    },
                ],
            },
        },
    });
}

const sdLight = createSDConfig("tokens/theme/light.json", "tokens.css", ":root");
const sdDark = createSDConfig("tokens/theme/dark.json", "tokens-dark.css", '[data-theme="dark"]');

await Promise.all([
    sdLight.buildAllPlatforms(),
    sdDark.buildAllPlatforms(),
]);
