@echo off
title Smart Restaurant Adminsoftware
echo Starte Smart Restaurant Adminsoftware...
cd /d "%~dp0"
java -cp "lib/sqlite-jdbc.jar;bin" com.smartrestaurant.Main
pause
