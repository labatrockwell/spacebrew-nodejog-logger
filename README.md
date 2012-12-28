Spacebrew Node Logger  
=====================  
This Spacebrew app logs all data that it receives via a boolean, a range, and a string channel. Logged data is saved in a text file. 
  
Installing Node and Dependencies  
--------------------------------  
Before you can start up the logger you need to install node.js along with two node modules. If you already have node.js installed, then you just need to install the required modules.  
  
###1. Installing Node.js  
To install node.js use the packaged installer that is available on http://nodejs.org/. This package also includes node packaged modules (npm), a command-line utility that manages the installation of node modules.  
  
###2. Installing Node Modules  
The node logger requires the websockets (ws) and jog logger (jog) modules. The easiest way to install these modules is by using node packaged modules via terminal/command line:  
  
```
npm install ws  
npm install jog  
```
  
Running the Logger  
------------------  
To start the logger just enter the following command:
  
```
node spacelog.js  
```
  
The log file will be saved in the following directory: /tmp/tail  