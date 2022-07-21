


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const monthFunck = (time: string) => {
    const fullTime = time.split('T')[0]
    const year = fullTime.split('-')[0]
    const month = fullTime.split('-')[1]
    const day = fullTime.split('-')[2]
    const monthStr = months.filter((el, index) => index === +month - 1).join()
    
    const date = new Date().getFullYear()

    if(date === +year) {
        return `${monthStr} ${day}` 
    }else {
        return `${monthStr} ${day} ${year}`
    }

}