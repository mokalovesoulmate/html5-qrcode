/**
 * @fileoverview
 * Strings used by {@class Html5Qrcode} & {@class Html5QrcodeScanner}
 *
 * @author mebjas <minhazav@gmail.com>
 *
 * The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 */

interface LocalizedStrings {
    [key: string]: string | LocalizedStrings;
}

const DEFAULT_STRINGS = {
    /**
     * Strings used in {@class Html5Qrcode}.
     */
    common: {
        codeParseError: 'QR code parse error, error = {{exception}}',
        errorGettingUserMedia: 'Error getting userMedia, error = {{error}}',
        cameraStreamingNotSupported: 'Camera streaming not supported by the browser.',
        unableToQuerySupportedDevices: 'Unable to query supported devices, unknown error.',
        insecureContextCameraQueryError: 'Camera access is only supported in secure context like https or localhost.',
        scannerPaused: 'Scanner paused'
    },
    /**
     * Strings used in {@class Html5QrcodeScanner}.
     */
    scanner: {
        scanningStatus: 'Scanning',
        idleStatus: 'Idle',
        errorStatus: 'Error',
        permissionStatus: 'Permission',
        noCameraFoundErrorStatus: 'No Cameras',
        lastMatch: 'Last Match: {{decodedText}}',
        codeScannerTitle: 'Code Scanner',
        cameraPermissionTitle: 'Request Camera Permissions',
        cameraPermissionRequesting: 'Requesting camera permissions...',
        noCameraFound: 'No camera found',
        scanButtonStopScanningText: 'Stop Scanning',
        scanButtonStartScanningText: 'Start Scanning',
        torchOnButton: 'Switch On Torch',
        torchOffButton: 'Switch Off Torch',
        torchOnFailedMessage: 'Failed to turn on torch',
        scanButtonScanningStarting: 'Launching Camera...',
        /**
         * Text to show when camera scan is selected.
         *
         * This will be used to switch to file based scanning.
         */
        textIfCameraScanSelected: "Scan an Image File",
        /**
         * Text to show when file based scan is selected.
         *
         * This will be used to switch to camera based scanning.
         */
        textIfFileScanSelected: "Scan using camera directly",
        selectCamera: 'Select Camera',
        fileSelectionChooseImage: 'Choose Image',
        fileSelectionChooseAnother: 'Choose Another',
        fileSelectionNoImageSelected: 'No image choosen',
        /** Prefix to be given to anonymous cameras. */
        anonymousCameraPrefix: "Anonymous Camera",
        dragAndDropMessage: 'Or drop an image to scan',
        dragAndDropMessageOnlyImages: 'Or drop an image to scan (other files not supported)',
        /** Value for zoom. */
        zoom: "zoom",
        loadingImage: 'Loading image...',
        cameraScanAltText: 'Camera based scan',
        fileScanAltText: 'File based scan'
    },
    /** Strings used in {@class LibraryInfoDiv} */
    libraryInfo: {
        poweredBy: 'Powered by ',
        reportIssues: 'Report issues'
    }
}

let localizedStrings: LocalizedStrings = DEFAULT_STRINGS;

export function setTranslations(translations: Partial<typeof DEFAULT_STRINGS>) {
    localizedStrings = translations;
}

function findValueByKey(key: string, lookup: LocalizedStrings | string): string | LocalizedStrings | undefined {
    const keyChain = key.split('.');
    // currentResult can be LocalizedStrings, a string, or undefined as we traverse.
    let currentResult: LocalizedStrings | string | undefined = lookup;

    for (const segment of keyChain) {
        if (typeof currentResult === 'string') {
            // We're trying to access a key on a string value,
            // which means the path is too deep or the structure is not as expected.
            return undefined;
        }
        if (currentResult === undefined) {
            // If at any point currentResult became undefined, the key path is invalid.
            return undefined;
        }
        // At this point, currentResult must be LocalizedStrings.
        // Accessing a key on it can result in string, LocalizedStrings, or undefined.
        currentResult = currentResult[segment];

        // If the segment doesn't exist, currentResult becomes undefined.
        // The loop will handle this in the next iteration or at the end.
    }
    return currentResult;
}

export function t(key: string, values?: Record<string, string>): string {
    let result = findValueByKey(key, localizedStrings) || findValueByKey(key, DEFAULT_STRINGS);
    if (typeof result !== 'string') throw new Error('Incorrect localization key provided: ' + key);
    for (let valueKey in values) {
        // When noUncheckedIndexedAccess is true, values[valueKey] is string | undefined.
        // However, since valueKey comes from `in values` and values is Record<string, string>,
        // we know values[valueKey] will be a string. The '!' asserts this.
        result = result.replace(new RegExp(`{{${valueKey}}}`, 'g'), values[valueKey]!);
    }
    return result;
}
