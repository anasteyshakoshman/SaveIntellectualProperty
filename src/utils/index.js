import forge from 'node-forge';

export const getShortEthAddress = (address) => {
    const len = address?.length;

    if (len < 5) {
        return '';
    }

    return address.slice(0, 5) + '...' + address.slice(len - 4, len);
};

export const generateImageSha256 = (imageFile, setImageSha256) => {
    // Создаем объект FileReader и объект для генерации sha256
    const reader = new FileReader();
    const generateSha256 = forge.md.sha256.create();

    // Записываем в объект FileReader изображение для получения его base64
    reader.readAsDataURL(imageFile);

    reader.onload = () => {
        // Получаем base64 изображения
        const imageBase64 = reader.result;

        // Закидываем base64 в генератор sha256
        generateSha256.update(imageBase64);

        // Получаем SHA256 картинки в формате base64
        setImageSha256(generateSha256.digest().toHex());
    };
};

export const convertDate = (fullDateString) => {
    const date = new Date(fullDateString);
    const dateNumbers = [date.getDate(), date.getMonth() + 1].map( (el) => {
        return el > 9 ? el : '0' + el
    });

    return dateNumbers[0] + '.' + dateNumbers[1] + '.' + date.getFullYear();
}
