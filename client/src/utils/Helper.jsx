export function compare(a, b){
    if(a.toLowerCase() < b.toLowerCase()){
        return -1
    }
    if(a.toLowerCase() > b.toLowerCase()){
        return 1
    }
    return 0
}

export function sort(a, b){
    a = a
    b = b

    return a > b ? -1 : b > a ? 1 : 0

}