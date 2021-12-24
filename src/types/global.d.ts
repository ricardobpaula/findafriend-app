export declare global {

    interface Avatar {
        id: number,
        path: string
    }

    interface User {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        role: string,
        since: Date,
        avatar?: Avatar
    }

    export interface Photo {
        path: string,
        id: number,
    }
    
    export interface Pet {
            id: number,
            description: string,
            size: string,
            adopted: boolean,
            createdAt: Date,
            specie: {
                id: number,
                name: string
            },
            photos: Photo[]
    }
}