There are instructions for installing Node.js for Mac OS X and Windows (at the bottom). If you are using Linux, follow the instructions for OS X, starting from step 6.

## OS X

*Note!* Do not use the Node.js installer, instead we'll install it using "nvm", which eliminates common problems.

1. [Install "Git"](http://git-scm.com/download)
2. [Install Apple's XCode](http://developer.apple.com/xcode/).
3. Before continuing, start XCode and click "Accept" for the Terms of Service. This is important.
4. Open "Terminal"
5. Install XCode's command line tools by pasting the following text and pressing ENTER: 

	`xcode-select --install`
6. Make sure you're in your home directory:

    `cd ~`

7. Make sure you have a '.profile' file:

    `touch .profile`

8. Install nvm by pasting the following text and pressing ENTER:

	`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash`

9. Close Terminal and open it again, as instructed by the nvm installer
10. Test that nvm is working by typing `nvm` followed by ENTER. You should see a bunch of text. Mac users: If you get an error "Command not found", please jump to the section below and then come back and continue.
11. Install the latest stable version of Node.js. Paste the following and press ENTER:

	`nvm install v6.0.0`

12. Test that Node is working by typing `node --version` and pressing ENTER. You should see a version number printed.
13. Success! Now you can continue with the rest of the install steps.

If you need to remove Node.js run `nvm uninstall stable`. If that doesn't work you can manually remove it [by following these instructions](https://gist.github.com/ddo/668630454ea0d74fdc21).

### Error: 'nvm Command Not Found'

If you get the error "command not found" when running `nvm` as per step 7, try pasting in the following line:

`source ~/.nvm/nvm.sh`

If running `nvm` works after you do that, you'll need to make some changes to your ~/.bash_profile. This set of commands that runs every time you start a new Terminal session. Open the file for editing using Pico:

`pico ~/.bash_profile`

You need to add the following two lines, but change *USERNAME* to the username you use to login. If in doubt, run `whoami` to find out what your username is.

`export NVM_DIR="$HOME/.nvm`

`[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"`

Save the file with by pressing Ctrl+X and hitting Y when prompted to save, overwriting the file. Close and restart Terminal and try to continue from step 8.

## Windows
On Windows, you can open a new command prompt from the start menu, or by pressing Win+R, typing "cmd" and pressing ENTER.

1. [Install "Git"](http://git-scm.com/download). *Note:* You will be asked about "Adjusting your PATH environment", and given three choices. Select "Run Git from the Windows Command Prompt" or "Run Git and included Unix tools from the Windows COmmand Prompt". I.e., do *not* choose the first option "Use Git Bash only"
2. Open a new Command Prompt, type `git` and press ENTER to test that Git is installed. You should see a bunch of text. If it works, close the command prompt again.
3. Download and run [the Nodejs Windows installer (x64)](http://nodejs.org/download/)
4. After it finishes installing, you can test that Node is installed by opening a new command prompt (and yes, it's important that it's a new one), typing `node --version` and press ENTER. You should see a version number.
5. Success! You can now continue with installing Kattegat.