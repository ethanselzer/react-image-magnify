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
        // ["@semantic-release/gitlab", {
        //     "gitlabUrl": "https://gitlab.com/vistaprint-org/design-technology/themes",
        //     "assets": "release/*.tgz",
        // }],
    ],
};