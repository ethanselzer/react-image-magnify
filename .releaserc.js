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
    ],
};