
export const imageState = (itemImg: string, uploadImg: string, statickImg: string) => {
    if (itemImg === '' && uploadImg === '') {
        return statickImg
    }
    if (uploadImg) {
        return uploadImg
    }
    if (itemImg) {
        return itemImg
    }
}