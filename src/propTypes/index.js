import PropTypes from 'prop-types';

export const userPropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
});

export const imagePropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ipfs_pin_hash: PropTypes.string.isRequired,
    authorAddress: PropTypes.string.isRequired,
    ownerAddress: PropTypes.string.isRequired
});
