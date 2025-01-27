const users = [{
    id:1,
    name: "vignesh",
    email: "vigneshr470@gmail.com",
    password: "12345678",
    type: "buyer"
}]

export default class UserModel {
    constructor(id,name, email, password, type) {
        this.id=id
        this.name = name,
            this.email = email,
            this.password = password,
            this.type = type
    }

    static SignUp(name, email, password, type) {
        let id=users.length
        let newUser = new UserModel(++id,name, email, password, type);
        users.push(newUser)
        return newUser
    }
    static SignIn(email, password) {
        let user = users.find((u) => u.email == email && u.password == password)
        return user
    }
    static getUsers(){
        return users
    }
    static getUser(id){
        return users.find((user)=>user.id==id)
    }
}

