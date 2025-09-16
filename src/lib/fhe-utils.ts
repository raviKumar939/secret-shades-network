import { createFhevmInstance } from 'fhevmjs';

export interface FhevmInstance {
  getPublicKey: () => Promise<string>;
  encrypt8: (value: number) => Promise<string>;
  encrypt32: (value: number) => Promise<string>;
  encryptBool: (value: boolean) => Promise<string>;
  decrypt8: (encryptedValue: string) => Promise<number>;
  decrypt32: (encryptedValue: string) => Promise<number>;
  decryptBool: (encryptedValue: string) => Promise<boolean>;
  generatePublicKey: (contractAddress: string) => Promise<string>;
  generateInputProof: (contractAddress: string, value: number) => Promise<string>;
}

let fhevmInstance: FhevmInstance | null = null;

export async function initializeFHE() {
  if (fhevmInstance) {
    return fhevmInstance;
  }

  try {
    fhevmInstance = await createFhevmInstance({
      chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '11155111'),
      publicKey: await getPublicKey(),
    });
    return fhevmInstance;
  } catch (error) {
    console.error('Failed to initialize FHE:', error);
    throw error;
  }
}

export async function getPublicKey(): Promise<string> {
  try {
    const response = await fetch(`${import.meta.env.VITE_FHEVM_NETWORK_URL}/publicKey`);
    const data = await response.json();
    return data.publicKey;
  } catch (error) {
    console.error('Failed to get public key:', error);
    throw error;
  }
}

export async function getFhevmInstance() {
  if (!fhevmInstance) {
    await initializeFHE();
  }
  return fhevmInstance;
}

export async function encryptAmount(
  value: number,
  contractAddress: string,
  userAddress: string
): Promise<{ encryptedData: string; inputProof: string }> {
  const instance = await getFhevmInstance();
  if (!instance) {
    throw new Error('FHE instance not initialized');
  }

  try {
    const encryptedData = await instance.encrypt32(value);
    const inputProof = await instance.generateInputProof(contractAddress, value);
    
    return {
      encryptedData,
      inputProof,
    };
  } catch (error) {
    console.error('Failed to encrypt amount:', error);
    throw error;
  }
}

export async function encryptBoolean(
  value: boolean,
  contractAddress: string,
  userAddress: string
): Promise<{ encryptedData: string; inputProof: string }> {
  const instance = await getFhevmInstance();
  if (!instance) {
    throw new Error('FHE instance not initialized');
  }

  try {
    const encryptedData = await instance.encryptBool(value);
    const inputProof = await instance.generateInputProof(contractAddress, value ? 1 : 0);
    
    return {
      encryptedData,
      inputProof,
    };
  } catch (error) {
    console.error('Failed to encrypt boolean:', error);
    throw error;
  }
}

export async function encryptConnectionType(
  connectionType: number,
  contractAddress: string,
  userAddress: string
): Promise<{ encryptedData: string; inputProof: string }> {
  const instance = await getFhevmInstance();
  if (!instance) {
    throw new Error('FHE instance not initialized');
  }

  try {
    const encryptedData = await instance.encrypt8(connectionType);
    const inputProof = await instance.generateInputProof(contractAddress, connectionType);
    
    return {
      encryptedData,
      inputProof,
    };
  } catch (error) {
    console.error('Failed to encrypt connection type:', error);
    throw error;
  }
}

export async function decryptValue(
  encryptedValue: string,
  type: 'uint8' | 'uint32' | 'bool'
): Promise<number | boolean> {
  const instance = await getFhevmInstance();
  if (!instance) {
    throw new Error('FHE instance not initialized');
  }

  try {
    switch (type) {
      case 'uint8':
        return await instance.decrypt8(encryptedValue);
      case 'uint32':
        return await instance.decrypt32(encryptedValue);
      case 'bool':
        return await instance.decryptBool(encryptedValue);
      default:
        throw new Error('Unsupported decryption type');
    }
  } catch (error) {
    console.error('Failed to decrypt value:', error);
    throw error;
  }
}

export async function generateReencryptionKey(
  contractAddress: string,
  userAddress: string
): Promise<string> {
  const instance = await getFhevmInstance();
  if (!instance) {
    throw new Error('FHE instance not initialized');
  }

  try {
    return await instance.generatePublicKey(contractAddress);
  } catch (error) {
    console.error('Failed to generate reencryption key:', error);
    throw error;
  }
}

export async function isFhevmSupported(): Promise<boolean> {
  try {
    await getPublicKey();
    return true;
  } catch (error) {
    console.warn('FHEVM not supported:', error);
    return false;
  }
}
