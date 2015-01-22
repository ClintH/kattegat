

## Mac OS

*Note!* Do not use the Node.js installer, instead we'll install it using "nvm", which solves many common problems.

1. [Install "Git"](http://git-scm.com/download)
2. [Install Apple's XCode](http://developer.apple.com/xcode/)
3. Open "Terminal"
4. Install XCode's command line tools by pasting the following text and pressing ENTER: 

	`xcode-select --install`
5. Install nvm by pasting the following text and pressing ENTER:

	`curl https://raw.githubusercontent.com/creationix/nvm/v0.22.0/install.sh | bash`

6. Close Terminal and open it again, as instructed by the nvm installer
7. Test that nvm is working by typing `nvm` followed by ENTER. You should see a bunch of text. Mac users: If you get an error "Command not found", please jump to the section below and then come back and continue.
8. Install the latest stable version of Node.js. Paste the following and press ENTER:

	`nvm install stable`
9. Instruct nvm to use the stable version. Paste the following and press ENTER. (nvm allows you to switch between different versions of Node)

	`nvm alias default stable`

9. Test that Node is working by typing `node --version` and pressing ENTER. You should see a version number printed.
10. Success! 

If you need to remove Node.js run `nvm uninstall stable`. If that doesn't work you can manually remove it [by following these instructions](https://gist.github.com/ddo/668630454ea0d74fdc21).

### Mac: Nvm Command Not Found

If you get the error "command not found" when running `nvm` as per step 7, try pasting in the following line:

`source ~/.nvm/nvm.sh`

If running `nvm` works after you do that, you'll need to make some changes to your ~/.bash_profile. This set of commands that runs every time you start a new Terminal session. Open the file for editing using Pico:

`pico ~/.bash_profile`

You need to add the following lines, but change *USERNAME* to the username you use to login. If in doubt, run `whoami`.

`export NVM_DIR="/Users/USERNAME/.nvm"`

`[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"`

Save the file with by pressing Ctrl+X and hitting Y when prompted to save. Close and restart Terminal and try to continue from step 7.

## Windows

1. [Install "Git"](http://git-scm.com/download)
2. Visit [Nodejs.org and download the Windows installer](http://nodejs.org/download/)
3. Install
4. You are done