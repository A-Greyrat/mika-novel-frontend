

class User {
    name?: string;
    readingList?: string[];
    account?: string;
    token?: string;
}

let user: User = new User();


export function login(account: string, password: string) {
    if (account === 'admin' && password === 'admin') {
        user.name = 'admin';
        user.readingList = ['1', '2'];
        user.account = account;
        user.token = 'token';
        return user;
    }
    return null;
}


export default User;