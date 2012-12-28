Spacebrew Node Logger  
=====================  
This Spacebrew app logs all data that it receives via a boolean, a range, and a string channel. All data is saved in a text file in a local tmp directory. You can configure this app by passing arguments to it via the command line, as described below. 
  
Installing Node and Dependencies  
--------------------------------  
Before you can start up the logger you need to install node.js along with two node modules. If you already have node.js installed, then you just need to install the required modules.  
  
###1. Installing Node.js  
To install node.js use the packaged installer that is available on http://nodejs.org/. This package also includes node packaged modules (npm), a command-line utility that manages the installation of node modules.  
  
###2. Installing Node Modules  
The node logger requires the websockets (ws) and jog logger (jog) modules. The easiest way to install these modules is by using node packaged modules.  
* Open up the Terminal app (or another command-line app).   
* Go to the base directory of the node logger app.  
* Run the following commands  
  
```
npm install ws  
npm install jog  
```
  
Running the Logger  
------------------  
Here are the steps for s
* Open up the Terminal app (or another command-line app).  
* Go to the base directory of the node logger app.  
* Run the start-up command with the appropriate arguments   
  
```  
node spacelog.js [optional arguments]  
```  
  
Here is a list of the optional arguments that can be added to the app launch command. All optional arguments are structured as follows key=value:  
* `server=server_name` server_name holds the hostname of the spacebrew server. If no server hostname is specified then app will attempt to connect to "localhost".  
* `name=app_name` app_name holds the client app name that will be registered with spacebrew. If argument not provided then client app name will be set to "spacelog".  
* `file=file_name` file_name holds the name of the file that where data will be saved. If no file name passed then file name is set to "tail". All data saved in "tmp" folder.  