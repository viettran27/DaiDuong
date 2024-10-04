@echo off
cd be
start "" "%~dp0be\run.bat"

cd ..
cd fe
start "" "%~dp0fe\run.bat"