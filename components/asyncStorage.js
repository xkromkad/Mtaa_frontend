let name ='';
let surname = '';
let email = '';
let token = '';
export async function storeData(nm, snm, em, tkn) {
    try {
        name = nm;
        surname = snm;
        email = em;
        token = tkn;
    } catch (e) {
        console.log("Error Storing in AsyncStorage stroing " + key + " in async Storage")
    }
}

export async function getData() {
    try {
        return ([name, surname, email])
    } catch (e) {
        console.log("Error Reading in AsyncStorage stroing " + key + " in async Storage")
    }
}