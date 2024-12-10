##########################################################################################################
# A small setup script for Windows to install Android SDK and NDK necessary for React-Native Development #
##########################################################################################################

param(
    [Parameter(Mandatory=$true, ParameterSetName='steps')]
    [Alias('s')]
    [ValidateSet("1", "2", "3", "all")]
    [string[]]$steps,
    [Parameter(Mandatory=$false, ParameterSetName='help')]
    [Alias('h')]
    [switch]$help = $false
)

# Determine ZIP file based on OS
$ZIP = switch ($IsWindows) {
    $true { "commandlinetools-win-11076708_latest.zip" }
    default { throw "Unsupported OS" }
}
$URL = "https://dl.google.com/android/repository/$ZIP"

$ANDROID_HOME = "$env:USERPROFILE\.android-sdk"
$NDK_VERSION = "27.1.12297006"
$NDK_HOME = "$ANDROID_HOME\ndk\$NDK_VERSION"

# Binaries to be added to PATH
$CMDLINE_TOOLS = "$ANDROID_HOME\cmdline-tools\bin"
$PLATFORM_TOOLS = "$ANDROID_HOME\platform-tools"

# List of failed installs by sdkmanager
$FAILS = @()
$SDK_COMPONENTS = @(
    "emulator"
    "platform-tools"
    "build-tools;35.0.0"
    "platforms;android-35"
    "ndk;$NDK_VERSION"
    "system-images;android-35;google_apis_playstore;x86_64"
    "extras;google;Android_Emulator_Hypervisor_Driver"
)

################################################################################################################################

################
# Script Steps #
################

# Step 1: Download and extract cmdline-tools
function Download-And-Extract {
    Write-Host -ForegroundColor Blue "`nSTEP 1: Downloading and extracting cmdline-tools..."
    Remove-Item -Path "$env:TEMP\$ZIP", "$env:TEMP\cmdline-tools" -Force -Recurse -ErrorAction SilentlyContinue
    Invoke-WebRequest -Uri $URL -OutFile "$env:TEMP\$ZIP"
    Expand-Archive -Path "$env:TEMP\$ZIP" -DestinationPath "$env:TEMP"
    Write-Host -ForegroundColor Green "Downloaded and extracted cmdline-tools"
}

# Step 2: Install cmdline-tools to ANDROID_HOME
function Install-CmdlineTools {
    Write-Host -ForegroundColor Blue "`nSTEP 2: Installing SDK..."
    
    Remove-Item -Path "$ANDROID_HOME\cmdline-tools" -Force -Recurse -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Path $ANDROID_HOME -Force | Out-Null
    Copy-Item -Path "$env:TEMP\cmdline-tools" -Destination $ANDROID_HOME -Recurse
    Write-Host "${GREEN}Installed cmdline-tools${NC}"
}

# Step 3: Install SDK components
function Install-SdkComponents {
    Write-Host -ForegroundColor Blue "`nSTEP 3: Installing SDK components..."

    Set-Env -var "ANDROID_HOME" -val $ANDROID_HOME
    Set-Env -var "NDK_HOME" -val $NDK_HOME
    Set-Env -var "Path" -val $CMDLINE_TOOLS -append
    Set-Env -var "Path" -val $PLATFORM_TOOLS -append
    
    foreach ($component in $SDK_COMPONENTS) {
        Write-Host "`nSDK component: Installing $component..."
        
        & "$CMDLINE_TOOLS\sdkmanager.bat" --sdk_root="$ANDROID_HOME" "$component"
        if ($?) {
            Write-Host -ForegroundColor Green "Installed component: $component"
        } else {
            $FAILS += $component
        }
    }
}

################################################################################################################################

# Helper function to set environment variables in script scope and user scope
function Set-Env {
    param(
        [string]$var,
        [string]$val,
        [switch]$append = $false
    )
    
    if ($append) {
        Invoke-Expression "`$env:$var += '$val'"
        Write-Host -ForegroundColor DarkCyan "EnvironmentVariable: Appending $var+=$val"
        $currentVar = [System.Environment]::GetEnvironmentVariable($var, [System.EnvironmentVariableTarget]::User)
        if ((($currentVar -split ';') -contains $val) -eq $false) {
            [System.Environment]::SetEnvironmentVariable($var, "$currentVar;$val", [System.EnvironmentVariableTarget]::User)
        }
    } else {
        Write-Host -ForegroundColor DarkCyan "EnvironmentVariable: Setting $var=$val"
        Invoke-Expression "`$env:$var = '$val'"
        if ([System.Environment]::GetEnvironmentVariable($var, [System.EnvironmentVariableTarget]::User) -ne $val) {
            [System.Environment]::SetEnvironmentVariable($var, $val, [System.EnvironmentVariableTarget]::User)
        }
    }
}

# Help message
function Show-Usage {
    Write-Host -ForegroundColor Blue "Usage: setup.ps1 -Steps <steps>"
    Write-Host ""
    Write-Host -ForegroundColor Blue "Options:"
    Write-Host "  -Steps    Specify steps to run (1,2,3 or 'all')"
    Write-Host "           Examples: -Steps 1,2 or -Steps all"
    Write-Host ""
    Write-Host -ForegroundColor Blue "Steps:"
    Write-Host "  1          Download and extract cmdline-tools"
    Write-Host "  2          Install cmdline-tools"
    Write-Host "  3          Install SDK Components"
}

# # Validate steps argument
function Validate-Steps {
    param([string[]]$steps)

    
    if ($steps -contains 'all') {
        if ($steps.Count -gt 1) {
            Write-Host -ForegroundColor Red "Error: 'all' cannot be combined with other steps"
            exit 1
        }
        return @(1, 2, 3)
    }

    $stepsInt = @()
    foreach ($step in $steps) {
        $stepsInt += [int]$step
    }

    return $stepsInt
}

# Check for failed component installations
function Check-Failures {
    if ($FAILS.Count -gt 0) {
        Write-Host "`nFailed to install the following components:"
        foreach ($fail in $FAILS) {
            Write-Host -ForegroundColor Red "-  $fail"
        }
        return $false
    }
    return $true
}


# Main entry point
function Main {
    param(
        [ValidateSet("1", "2", "3", "all")]
        [string[]]$steps
    )

    $stepNumbers = Validate-Steps -steps $steps

    if ([string]::IsNullOrEmpty($env:JAVA_HOME)) {
        Write-Host ""
        Write-Host -ForegroundColor Yellow "Warning: JAVA_HOME is not set"
        Write-Host -ForegroundColor Yellow "         The variable should point to the install location of JDK 17"
        Write-Host -ForegroundColor Yellow "         Install with 'choco install openjdk17'"
        exit 1
    }

    $stepNumbers | ForEach-Object {
        switch ($_) {
            1 { Download-And-Extract }
            2 { Install-CmdlineTools }
            3 { Install-SdkComponents }
        }
    }

    if (-not (Check-Failures)) {
        return $false
    }

    Write-Host -ForegroundColor Green "`nSetup completed successfully"

    return $true
}

if ($Help -or $steps -eq $null) {
    Show-Usage
    exit 0
}


# Run the script
if (-not (Main -steps $steps)) {
    exit 1
}
