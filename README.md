# Issue to Hexo

This action converts a GitHub Issue to a Hexo post.

## Template

In converting, this action takes information of an issue and set it to information of a post as follows:

| GitHub Issue           | Hexo post | Action                                                   |
|------------------------|-----------|----------------------------------------------------------|
| Title                  | Title     |                                                          |
| Last updated date/time | Date      |                                                          |
| Labels                 | Tags      |                                                          |
| Body                   | Content   |                                                          |
| Milestone              |           | Issue is converted only if milestone is set to `publish` |

## Usage

```yml
name: Issue to Hexo
on:
  issues:
    # Sufficient to trigger this workflow when an issue is milestoned
    types: [ milestoned ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: gsongsong/issue-to-hexo
        with:
          issue_url: ${{ github.event.issue.url }}
          # Personal access token used to get information of Issue
          token: ${{ secrets.token }}
      # At this point, a markdown file is generated and untracked
      # Take further action, e.g. generate (`hexo generate`), commit and push
```

## Sponsor

If you feel this is useful, please consider to support me:

<a href="https://www.buymeacoffee.com/somidad" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" width="217" height="60" style="height: 60px !important;width: 217px !important;" ></a>
