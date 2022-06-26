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

// State names
export const IS_PROFILE_BUTTON_LOADING = 'isProfileButtonLoading';
export const IS_PROFILE_IMAGES_LOADING = 'isProfileImagesLoading';
export const IS_MAIN_IMAGE_LOADING = 'isMainImageLoading';

// Pinata
const PINATA_BASE_URL = 'https://api.pinata.cloud';
export const PINATA_SAVE_URL = `${PINATA_BASE_URL}/pinning/pinFileToIPFS`;
export const PINATA_DELETE_URL = `${PINATA_BASE_URL}/pinning/unpin/`;
export const PINATA_GET_URL = `${PINATA_BASE_URL}/data/pinList?status=pinned&metadata[name]=`;
export const PINATA_IMAGE_URL = 'https://gateway.pinata.cloud/ipfs/';
export const pinataApiKeys = {
    pinata_api_key: '105a2a21229a560aa970',
    pinata_secret_api_key: '2a6d6161b5319f8e9bdbd2356e9ca744ac4cbc61ec31ade256438e0597065797'
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
export const INFURA_PROVIDER = 'https://rinkeby.infura.io/v3/40546717988c45aaab8c5596c533c960';
export const SMART_CONTRACT_ADDRESS = '0x7cf264d51c385840c1844ea2a871b79ebcb2c446';
export const walletConnectionProcessStartedErrorCode = -32002
export const cancelMetamaskApprove = 4001;
