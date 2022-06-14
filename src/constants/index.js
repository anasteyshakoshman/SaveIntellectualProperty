// Input data image
export const IMAGE_NAME = 'image_name';
export const IMAGE_DESCRIPTION = 'image_description';
export const FILE = 'file';
export const AUTHOR = 'author';

export const inputImageFields = [
    {
        name: IMAGE_NAME,
        placeholder: 'Название работы'
    },
    {
        name: IMAGE_DESCRIPTION,
        placeholder: 'Описание работы',
        isBig: true
    },
    {
        name: FILE,
        placeholder: 'Выбрать файл',
        isFile: true
    }
];
export const errorsImageMap = {
    [IMAGE_NAME]: 'Дайте название вашей работе',
    [IMAGE_DESCRIPTION]: 'Расскажите историю работы',
    [FILE]: 'Не забудьте выбрать файл'
};
export const typesFiles = 'image/gif,image/png,image/jpeg,image/pjpeg';

// Input data author
export const AUTHOR_NAME = 'author_name';
export const AUTHOR_DESCRIPTION = 'author_description';
export const inputAuthorFields = [
    {
        name: AUTHOR_NAME,
        placeholder: 'Имя автора'
    },
    {
        name: AUTHOR_DESCRIPTION,
        placeholder: 'Об авторе',
        isBig: true
    }
];

// Pinata
const PINATA_BASE_URL = 'https://api.pinata.cloud';
export const PINATA_SAVE_URL = `${PINATA_BASE_URL}/pinning/pinFileToIPFS`;
export const PINATA_DELETE_URL = `${PINATA_BASE_URL}/pinning/unpin/`;
export const PINATA_GET_URL = `${PINATA_BASE_URL}/data/pinList?status=pinned&metadata[name]=`;
export const PINATA_IMAGE_URL = 'https://gateway.pinata.cloud/ipfs/';
export const pinataApiKeys = {
    pinata_api_key: 'acb6a878c06a86b550f1',
    pinata_secret_api_key: 'fa8fe5f3ad79f630e7d61f5cfb5fa42b6c4ed291266a2bf49a1b0758e1de88c3'
};
export const pinataOptions = {
    cidVersion: 0,
    customPinPolicy: {
        regions: [
            {
                id: 'FRA1',
                desiredReplicationCount: 1
            },
            {
                id: 'NYC1',
                desiredReplicationCount: 2
            }
        ]
    }
};

// WEB3
export const infuraProvider = 'https://rinkeby.infura.io/v3/40546717988c45aaab8c5596c533c960';
export const SMART_CONTRACT_ADDRESS = '0x3ecff07a3db56a518f1f93359e0083839c20a69a';
export const walletConnectionProcessStartedErrorCode = -32002
export const cancelMetamaskApprove = 4001;
