export default function({
    data,
    asc
}) {
    return Object.entries(data)
        .sort(([,a],[,b]) => {
            return asc ? a - b : b - a
        })
        .map(([sample,]) => sample)

}