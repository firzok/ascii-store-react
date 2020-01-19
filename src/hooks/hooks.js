import { useState } from "react";

// This is used to have a local storage.
export function useLocalState(localStateName) {
    const [localState, setState] = useState(localStorage.getItem(localStateName));

    function setLocalState(newItem) {
        localStorage.setItem(localStateName, newItem);
        setState(newItem);
    };

    return [localState, setLocalState];
};