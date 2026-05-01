// need to be able to maintain state even if the user refreshes the page
let dismissalActive = false;

export function startDismissal() {
    dismissalActive = true;
}

export function stopDismissal() {
    dismissalActive = false;
}

export function isDismissalActive() {
    return dismissalActive;
}