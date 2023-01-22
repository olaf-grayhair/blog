
export const endOfWords = (array: number, word:string) => {
    if(array > 1) {
        return word + 's'
    }
    if(array === 0) {
        return "add " + word
    }
    if(array === 1) {
        return word
    }
}