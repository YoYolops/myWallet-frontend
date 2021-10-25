import API from './api';

async function getEntries(token) {
    try {
        const response = await API.get("/entries", {
            headers: { Authorization: `Bearer ${token}` }
        })
        if(response.data) return response.data;
        return false
    } catch {
        return false
    }
}


async function registerEntry(token, entryObject) {
    try {
        await API.post("/entries", entryObject, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return true
    } catch {
        return false
    }

}


export {
    getEntries,
    registerEntry
}