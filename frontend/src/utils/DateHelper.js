export const getCurrentDate = () => {
    const date = new Date();

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}${month}${year}`;
};

export const formatDate = (date) => {

    const parts = date.split("-");  // Teilt den String an den '-' Zeichen

    // parts[0] ist das Jahr, parts[1] ist der Monat, parts[2] ist der Tag
    const output = parts[2] + parts[1] + parts[0];
    return output;
}