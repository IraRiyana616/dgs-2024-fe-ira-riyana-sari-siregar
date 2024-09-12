import axios from 'axios';

const BASE_URL = 'https://digistar-demo-be.vercel.app/api/wallets';
const WALLETS_ENDPOINT = '/wallets';

const getUrl = (endpoint) => `${BASE_URL}${endpoint}`;

const getWallets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/wallets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallets:', error);
    throw error;
  }
};

const createWallet = async (wallet) => {
  try {
    if (!wallet || !wallet.name || !wallet.balance) {
      throw new Error('Invalid wallet data');
    }
    const response = await axios.post(getUrl(WALLETS_ENDPOINT), wallet);
    return response.data;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
};

const updateWallet = async (id, wallet) => {
  try {
    if (!wallet || !wallet.name || !wallet.balance) {
      throw new Error('Invalid wallet data');
    }
    const response = await axios.put(
      getUrl(`${WALLETS_ENDPOINT}/${id}`),
      wallet
    );
    return response.data;
  } catch (error) {
    console.error('Error updating wallet:', error);
    throw error;
  }
};

const deleteWallet = async (id) => {
  try {
    const response = await axios.delete(getUrl(`${WALLETS_ENDPOINT}/${id}`));
    return response.data;
  } catch (error) {
    console.error('Error deleting wallet:', error);
    throw error;
  }
};

export { getWallets, createWallet, updateWallet, deleteWallet };
