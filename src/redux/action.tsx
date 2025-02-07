export const CHANGE_NAME = 'CHANGE_NAME'

export function changeName(newName: string) {
    return {
        type: CHANGE_NAME,
        payload: { newName: newName },
    }
}