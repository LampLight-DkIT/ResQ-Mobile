#!/usr/bin/env bash

##############################################################################################################
# A small setup script for MacOS/Linux to install Android SDK and NDK necessary for React-Native Development #
##############################################################################################################

set -eo pipefail

# Define color codes
RED='\033[1;31m'
GREEN='\033[1;32m'
ORANGE='\033[0;33m'
NC='\033[0m'  # No Color

ZIP=""
case "`uname`" in
    Darwin* )
        ZIP="commandlinetools-mac-11076708_latest.zip"
        ;;
    Linux* )
        ZIP="commandlinetools-linux-7302050_latest.zip"
        ;;
    * )
        echo "Unsupported OS"
        exit 1
        ;;
esac
URL="https://dl.google.com/android/repository/$ZIP"

ANDROID_HOME="$HOME/android-sdk"
NDK_VERSION="27.1.12297006"
NDK_HOME="$ANDROID_HOME/ndk/$NDK_VERSION"

# binaries to be added to PATH
CMDLINE_TOOLS="$ANDROID_HOME/cmdline-tools/bin"
PLATFORM_TOOLS="$ANDROID_HOME/platform-tools"

ENV_VARS="
export ANDROID_HOME=$ANDROID_HOME
export NDK_HOME=$NDK_HOME
export PATH=$CMDLINE_TOOLS:$PLATFORM_TOOLS:\$PATH
"

# List of failed install by skdmanager
FAILS=()
SDK_COMPONENTS=(
    "emulator"
    "platform-tools"
    "build-tools;35.0.0"
    "platforms;android-35"
    "ndk;$NDK_VERSION"
    "system-images;android-35;google_apis_playstore;x86_64"
    # "extras;google;Android_Emulator_Hypervisor_Driver"
)

################################################################################################################################

################
# Script Steps #
################

# Step 1: Download and extract the cmdline-tools to /tmp
function download_and_extract() {
    echo -e "\nDownloading $ZIP..."
    rm -rf "/tmp/$ZIP" "/tmp/cmdline-tools"
    wget "$URL" -O "/tmp/$ZIP"
    unzip -q "/tmp/$ZIP" -d "/tmp"
    echo -e "${GREEN}Downloaded and extracted cmdline-tools${NC}"
}

# Step 2: Install cmdline-tools to ANDROID_HOME
function install_cmdline_tools() {
    echo -e "\nInstalling SDK..."
    eval "$ENV_VARS"
    
    rm -rf "$ANDROID_HOME/cmdline-tools"
    mkdir -p "$ANDROID_HOME"
    cp -r "/tmp/cmdline-tools" "$ANDROID_HOME"
    echo -e "${GREEN}Installed cmdline-tools${NC}"
}

# Step 3: Install SDK components
function install_sdk_components() {
    echo -e "Installing SDK components..."
    for component in "${SDK_COMPONENTS[@]}"; do
        echo -e "\nInstalling component: $component..."
        if yes | sdkmanager --sdk_root="$ANDROID_HOME" "$component"; then
            echo -e "${GREEN}Installed component: $component${NC}"
        elif [ $? -eq 1 ]
            FAILS+=("$component")
        fi
    done
}

################################################################################################################################


# Function to print usage
function usage() {
    echo "Usage: setup.sh --steps <steps>"
    echo ""
    echo "Options:"
    echo "  --steps    Specify steps to run (1,2,3 or 'all')"
    echo "             Examples: --steps 1,2 or --steps all"
    echo ""
    echo "Steps:"
    echo "  1          Download and extract cmdline-tools"
    echo "  2          Install cmdline-tools"
    echo "  3          Install SDK Components"
    exit 1
}

# Validate the steps argument
function validate_steps() {
    local steps=$1
    
    # Check if steps is 'all'
    if [[ "$steps" == "all" ]]; then
        return 0
    fi   

    # Split steps by comma and validate each
    IFS=',' read -ra step_array <<< "$steps"
    for step in "${step_array[@]}"; do
        if ! [[ $step -ge 1 && $step -le 3 ]]; then
            echo "Error: Invalid step '$step'. Steps must be between 1 and 3."
            return 1
        fi
    done

    return 0
}

# Run a step
function run_step() {
    local step=$1
    case $step in
        1) download_and_extract;;
        2) install_cmdline_tools;;
        3) install_sdk_components;;
    esac
}

# Parse command line arguments
function parse_args() {
    if [[ $# -eq 0 ]]; then
        usage
    fi

    local steps=""

    while [[ $# -gt 0 ]]; do
        case $1 in
            --steps|-s)
                if [[ -z "$2" ]]; then
                    echo "Error: $1 requires an argument"
                    usage
                fi
                steps="$2"
                shift 2
                ;;
            --help|-h)
                usage
                ;;
            *)
                echo "Error: Unknown option $1"
                usage
                ;;
        esac
    done

    echo "$steps"
}

# Execute the steps
function execute_steps() {
    local steps=$1

    if [[ "$steps" == "all" ]]; then
        for i in {1..3}; do
            run_step $i
        done
    else
        IFS=',' read -ra step_array <<< "$steps"
        for step in "${step_array[@]}"; do
            run_step $step
        done
    fi
}

function check_failures() {
    if [[ ${#FAILS[@]} -gt 0 ]]; then
        echo -e "\nFailed to install the following components:"
        for fail in "${FAILS[@]}"; do
            echo -e "${RED}  $fail${NC}"
        done
        return 1
    fi
    return 0
}

# Main entry point
function _main() {
    local steps
    
    # Parse arguments
    if ! steps=$(parse_args "$@"); then
        echo $steps
        return 1
    fi

    # Validate steps
    if ! validate_steps "$steps"; then
        return $status
    fi
    
    # check if JAVA_HOME is set
    if [[ -z "$JAVA_HOME" ]]; then
        echo ""
        echo -e "${ORANGE}Warning: JAVA_HOME is not set${NC}"
        echo -e "${ORANGE}         The variable should point to the install location of JDK 17${NC}"
        echo -e "${ORANGE}         Install with 'brew install openjdk@17'${NC}"
    fi

    # Execute steps
    if ! execute_steps "$steps"; then
        return 1
    fi

    # Check if any components failed to install
    if ! check_failures; then
        return 1
    fi
    
    echo ""
    echo -e "${GREEN}Setup completed successfully${NC}"
    echo -e "${GREEN}Please add the following to '~/.zshrc' or ~/.bashrc':${NC}"
    echo -e "${GREEN}$ENV_VARS${NC}"

    return 0
}

# Run the script
if ! _main "$@"; then
    exit 1
fi
