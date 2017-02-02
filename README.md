# scalejs.ko-bindings
Common ko-bindings for scalejs

## Building and Publishing to npm
1. Run `npm run build`
2. Bump up the version in `package.json`
3. Add, commit, and push changes to master
4. Switch to npm branch `git checkout npm`
5. Rebase master `git rebase master`
6. Run the build script to prepare the npm branch
7. Add, commit, and push changes to npm branch
8. `npm publish` 
