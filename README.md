# Website for People & Code

The website of [People and Code](https://people-and-code.com/).

## Directory structure aka Contents

- `root`: Home page, People, and Code
- `workshops`: Workshops for web development teams
- `how-to`: Practical guides
- `summary-of`: Non-opinionated pieces on a subject
- `thoughts-on`: Essays and opinions
- `pledges`: Commitments to act or think differently
- `examples`: A repository of examples used on the site and in workshops

## How to deploy

There is one trunk, and 2 permanent branches:

### main

`main`, the trunk, is the definitive, production ready version of the site.

### gh-pages

The `gh-pages` branch is a testable version of the site. There are no promises as to its stability.

To update `gh-pages`, make sure you are in the branch you want to publish, typically `main`.

- In the terminal run `npm run gh-pages:publish`.
  This will update the `gh-pages` branch with a deployable build (using the `build` script) and push it to `origin`.
  The `gh-pages:publish` script depends on the **gh-pages** dependency.
- GitHub will detect the updated branch, and publish to the [test site](https://p-n-c.github.io/website/).
- See GitHub [pages](https://github.com/p-n-c/website/settings/pages) for more details.

### netlify-deploy

The `netlify-deploy` branch is the current deployed version of the site.

- Update `netlify-deploy` to the version you want to deploy in production, typically by merging from `main`.
- Push your changes
- **netlify** is configured to listen to changes to `netlify-deploy` in GitHub.
- When **netlify** detects changes, it will run the build script from package.json, `build`, and, if successful deploy to the [production site](https://people-and-code.com/).

#### Versioning

When new code is committed to `netlify-deploy` a GitHub action, Release Management, is triggered.  
This workflow contains the following steps:

- Gets the package.json version number e.g. 0.0.1 (major.minor.build)
- Increments the build portion of the version by one e.g. 0.0.1
- Updates the package.json version to the new version
- Updates the content value of the meta tag `version` in index.html to the same version
- Commits these changes to `netlify-deploy`
- Pushes these changes to `main` so that the trunk and deploy branch are in sync

To see the full yml script, go to [release_management.yml](https://github.com/p-n-c/website/blob/main/.github/workflows/release_management.yml)
