# Push to GitHub

Commit all changes and push to the GitHub repository.

## Steps

1. Run `git status` to see what files have changed
2. Run `git diff --stat` to summarize the changes
3. Stage all changes with `git add .`
4. Create a commit with a descriptive message summarizing the changes (no acknowledgements or co-author tags)
5. Push to the remote repository using `git push`

## Notes

- Use the SSH config with `github.com-polinikita` host for authentication
- The repository is `nikitapolyanskii/nikitapolyanskii.github.io`
- GitHub Actions will automatically deploy to GitHub Pages after pushing
- Do NOT add Claude acknowledgements or Co-Authored-By tags to commits
