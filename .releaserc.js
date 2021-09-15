module.exports = {
    "branches": ["master"],
    "plugins": [
        ["@semantic-release/commit-analyzer", {
            "preset": "conventionalcommits",
        }],
        ["@semantic-release/release-notes-generator", {
            "preset": "conventionalcommits",
        }],
        "@semantic-release/changelog",
        ["@semantic-release/npm", {
            "tarballDir": "release",
        }],
        ["@semantic-release/github", {
            "assets": []
        }],
        ["@semantic-release/git", {
            "assets": ["docs", "package.json"],
            "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }]
    ],
};