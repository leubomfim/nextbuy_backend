import argon2 from 'argon2'

export async function verifyHashPassword(hash: string, password: string) {
    try {
        return argon2.verify(hash, password)
    } catch (err) {
        console.log(err)
        return false
    }
}

export async function convertPasswordToHash( password: string) {
    try {
        return argon2.hash(password)
    } catch (err) {
        console.log(err)
        return '';
    }
}