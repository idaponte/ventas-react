export const getHumanDate = (date = new Date(), fullDate = false) => {
    const formattedDate = new Date(date);

    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1 < 10 ? `0${formattedDate.getMonth() + 1}` : formattedDate.getMonth();
    const day = formattedDate.getDate() < 10 ? `0${formattedDate.getDate()}` : formattedDate.getDate();

    if (!fullDate) return `${day}-${month}-${year}`;

    const hour = formattedDate.getHours() < 10 ? `0${formattedDate.getHours()}` : formattedDate.getHours();
    const minutes = formattedDate.getMinutes() < 10 ? `0${formattedDate.getMinutes()}` : formattedDate.getMinutes();

    return `${day}-${month}-${year} ${hour}:${minutes}`;

};

export const getYYYYMMDD = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    return `${year}-${month}-${day}`;
}