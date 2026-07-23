@echo off
echo =========================================
echo    PLAYWRIGHT RUNNER - DEBUG MODE
echo =========================================
echo.

setlocal

REM --- Go to your project folder
cd /d C:\Playwright_Typescript || (
    echo Could not change to project folder C:\Playwright_Typescript
    pause
    exit /b 1
)

echo Current folder:
cd
echo.

REM --- Check Node
echo Checking Node...
node -v
IF ERRORLEVEL 1 (
    echo NODE NOT FOUND
    pause
    exit /b 1
)
echo.

REM --- Path to Playwright CLI
set "PW=%CD%\node_modules\.bin\playwright.cmd"

echo Checking Playwright CLI at:
echo   %PW%
echo.

IF NOT EXIST "%PW%" (
    echo Playwright CLI NOT FOUND at "%PW%"
    echo Run "npm install" once in this folder from VS Code terminal.
    pause
    exit /b 1
)

REM --- Test file and filter
REM   TEST_FILE   = Windows path used for IF EXIST
REM   TEST_FILTER = POSIX path (forward slashes) used as Playwright filter
set "TEST_FILE=tests\Earnmoney3.spec.ts"
set "TEST_FILTER=tests/Earnmoney3.spec.ts"

IF NOT EXIST "%TEST_FILE%" (
    echo FILE NOT FOUND: %TEST_FILE%
    pause
    exit /b 1
)

echo.
echo Running Playwright test: %TEST_FILTER%
echo.

REM IMPORTANT: use TEST_FILTER (with /) for Playwright, otherwise it is treated as bad regex
call "%PW%" test "%TEST_FILTER%" --headed --workers=1

echo.
echo =========================================
echo    SCRIPT FINISHED
echo =========================================
pause
endlocal
