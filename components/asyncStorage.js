let name ='';
let surname = '';
let email = '';
let token = '';
var id;
export async function storeData(nm, snm, em, tkn, uid) {
    try {
        name = nm;
        surname = snm;
        email = em;
        token = tkn;
        id = uid;
    } catch (e) {
        console.log("Error Storing in AsyncStorage stroing " + key + " in async Storage")
    }
}

export async function getData() {
    try {
        return ([name, surname, email, token, id])
    } catch (e) {
        console.log("Error Reading in AsyncStorage stroing " + key + " in async Storage")
    }
}