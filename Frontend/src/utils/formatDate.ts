export function formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


// export function formatDate(date: Date | undefined): string {
//     const stringDate = (date as Date).toString();
//     const d = stringDate.split('T')[0] + ' ' + stringDate.split('T')[1].split('.')[0];
//     return  d
// }