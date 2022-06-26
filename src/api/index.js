import axios from 'axios';
import Web3 from 'web3';
import {
    pinataApiKeys,
    PINATA_GET_URL,
    PINATA_SAVE_URL,
    PINATA_DELETE_URL,
    SMART_CONTRACT_ADDRESS,
    INFURA_PROVIDER
} from '../constants';
import { abi } from '../constants/abi';

class ApiInterface {
    constructor() {
        const provider = Web3.givenProvider || new Web3.providers.HttpProvider(INFURA_PROVIDER);

        this.web3 = new Web3(provider);
        this.contract = new this.web3.eth.Contract(abi, SMART_CONTRACT_ADDRESS)
    }

    connectMetamask() {
        if (typeof window?.ethereum === 'undefined') {
            return null;
        }

        return window.ethereum
            .request({
                method: 'eth_requestAccounts'
            });
    }

    saveImageToPinata(data) {
        return axios
            .post(PINATA_SAVE_URL, data, {
                maxBodyLength: 'Infinity',
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    ...pinataApiKeys
                }
            });
    }

    deleteImageFromPinata(ipfsHash) {
        return axios
            .delete(PINATA_DELETE_URL + ipfsHash, {
                headers: pinataApiKeys
            });
    }

    getImageFromPinata(imageSha256) {
        return axios
            .get(PINATA_GET_URL + imageSha256, {
                headers: pinataApiKeys
            })
            .then(res => res)
            .catch();
    }

    saveImageHashToBlockchain(hash, author) {
        return this.contract.methods
            .registerNewToken(hash)
            .send({ from: author });
    }

    getListAuthorImages(author) {
        return this.contract.methods
            .getRegisteredTokens()
            .call({ from: author });
    }

    getImageIdentifier(tokenId) {
        return this.contract.methods
            .getImageIdentifier(tokenId)
            .call()
            .then(res => res)
            .catch();
    }

    setAuthorName(author, name) {
        return this.contract.methods
            .setAuthorName(name)
            .send({ from: author });
    }

    setAuthorDescription(author, description) {
        return this.contract.methods
            .setAuthorDescription(description)
            .send({ from: author });
    }

    setAuthorData(author, name, description) {
        return this.contract.methods
            .setAuthorData(name, description)
            .send({ from: author });
    }

    getAuthorName(author) {
        return this.contract.methods
            .getAuthorName(author)
            .call()
            .then(res => res)
            .catch();
    }

    getAuthorDescription(author) {
        return this.contract.methods
            .getAuthorDescription(author)
            .call()
            .then(res => res)
            .catch();
    }
}

export const Api = new ApiInterface();
