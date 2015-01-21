# Installing Node.js

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
7. Test that nvm is working by typing `nvm` followed by ENTER. You should see a bunch of text. Mac users: If you get an error "Command not found", please try `source ~/.nvm/nvm.sh` and then `nvm` again. If this works, you'll have to add the source... line to your ~/.bashrc or ~/.bash_profile file so it runs every time you start Terminal. Fo
8. Install the latest stable version of Node.js. Paste the following and press ENTER:

	`nvm install stable`
9. Instruct nvm to use the stable version. Paste the following and press ENTER. (nvm allows you to switch between different versions of Node)

	`nvm alias default stable`

9. Test that Node is working by typing `node --version` and pressing ENTER. You should see a version number printed.
10. Success! 

If you need to remove Node.js run `nvm uninstall stable`. If that doesn't work you can manually remove it [by following these instructions](https://gist.github.com/ddo/668630454ea0d74fdc21).

## Windows

1. [Install "Git"](http://git-scm.com/download)
2. Visit [Nodejs.org and download the Windows installer](http://nodejs.org/download/)
3. Install
4. You are done