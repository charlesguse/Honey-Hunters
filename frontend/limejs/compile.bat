@echo off 
SETLOCAL
set startingDir=%CD%
cd \sandbox\lime
python bin/lime.py build honeyhunters -o ..\honeyhunters\frontend\limejs\honeyhunters\compiled\honeyhunters.js -a
cd %startingDir%