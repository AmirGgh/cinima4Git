export const dateDDMMYY = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).substr(2, 2);
    return `${day}/${month}/${year}`;
}