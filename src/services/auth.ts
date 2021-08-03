interface Response {
    token: string,
    user: {
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        isFinding: boolean,
        isOng: boolean,
        avatar: string
    }
}

export default function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({
                token: 'token',
                user: {
                    firstName: 'Nome',
                    lastName: 'Sobrenome',
                    phone: '99999999999',
                    email: 'email@email.com',
                    isFinding: false,
                    isOng: false,
                    avatar: 'default.png'
                }
            })
        },
            500)
    })
}