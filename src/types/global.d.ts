export declare global {

    interface User {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        role: string,
        since: Date,
        avatar?: Photo
    }

    interface RefreshToken {
        id: string,
        expiresIn: Date
    }

    export interface Photo {
        path: string,
        id: string,
    }

    export interface Specie {
      id: string,
      name: string
    }

    export interface Pet {
            id: string,
            description: string,
            size: string,
            adopted: boolean,
            createdAt: Date,
            specie: Specie,
            photos: Photo[]
    }
}
