function load(key) {
    var val = localStorage.getItem(key)
    return (val)? JSON.parse(val) : null;
}

function store(key, val) {
    localStorage[key] = JSON.stringify(val);
}

function loadSession(key) {
    var val = sessionStorage.getItem(key)
    return (val)? JSON.parse(val) : null;
}

function storeSession(key, val) {
    sessionStorage[key] = JSON.stringify(val);
}


export const storageService = {
    load,
    store,
    loadSession,
    storeSession
}