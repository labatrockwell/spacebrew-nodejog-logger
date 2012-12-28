Spacebrew Node Logger  
=====================  
  

Installing Dependencies
-----------------------
Before you can start up the logger you need to install node.js along with two node modules. If you already have node.js installed, then you just need to install the required modules.

###1. Installing Node.js
To install node.js use the packaged installer that is available on http://nodejs.org/. This package also includes node packaged modules (npm), a command-line utility that manages the installation of node modules.

###2. Installing Node Modules
The easiest way to install the two required modules is through node packaged modules.   

```
$ npm install ws  
$ npm install jog  
```

Running the Logger  
------------------  
  
```
$ node spacelog.js  
```

It writes files to /tmp/tail
