import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { 
  encryptAmount, 
  encryptBoolean, 
  encryptConnectionType,
  generateReencryptionKey 
} from './fhe-utils';

// Contract ABI - This would be generated from the compiled contract
export const SECRET_SHADES_NETWORK_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_publicName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_publicBio",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_encryptedReputation",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_inputProof",
        "type": "bytes"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_toUserId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_encryptedConnectionType",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_inputProof",
        "type": "bytes"
      }
    ],
    "name": "createConnection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_toUserId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_encryptedContent",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_encryptedIsRead",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_inputProof",
        "type": "bytes"
      }
    ],
    "name": "sendMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "_showConnections",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_showActivity",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_allowMessages",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_showReputation",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_inputProof",
        "type": "bytes"
      }
    ],
    "name": "updatePrivacySettings",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isUserRegistered",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getUserId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_userId",
        "type": "uint256"
      }
    ],
    "name": "getUserProfile",
    "outputs": [
      {
        "internalType": "string",
        "name": "publicName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "publicBio",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastActive",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '';

export interface UserProfile {
  publicName: string;
  publicBio: string;
  walletAddress: string;
  createdAt: bigint;
  lastActive: bigint;
}

export interface PrivacySettings {
  showConnections: boolean;
  showActivity: boolean;
  allowMessages: boolean;
  showReputation: boolean;
}

export function useSecretShadesNetwork() {
  const { address } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();

  const registerUser = async (
    publicName: string,
    publicBio: string,
    initialReputation: number = 50
  ) => {
    if (!address || !CONTRACT_ADDRESS) {
      throw new Error('Wallet not connected or contract not deployed');
    }

    try {
      const { encryptedData, inputProof } = await encryptAmount(
        initialReputation,
        CONTRACT_ADDRESS,
        address
      );

      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: SECRET_SHADES_NETWORK_ABI,
        functionName: 'registerUser',
        args: [publicName, publicBio, encryptedData, inputProof],
      });
    } catch (error) {
      console.error('Failed to register user:', error);
      throw error;
    }
  };

  const createConnection = async (
    toUserId: number,
    connectionType: number = 0 // 0: Friend, 1: Follower, 2: Blocked
  ) => {
    if (!address || !CONTRACT_ADDRESS) {
      throw new Error('Wallet not connected or contract not deployed');
    }

    try {
      const { encryptedData, inputProof } = await encryptConnectionType(
        connectionType,
        CONTRACT_ADDRESS,
        address
      );

      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: SECRET_SHADES_NETWORK_ABI,
        functionName: 'createConnection',
        args: [BigInt(toUserId), encryptedData, inputProof],
      });
    } catch (error) {
      console.error('Failed to create connection:', error);
      throw error;
    }
  };

  const sendMessage = async (
    toUserId: number,
    encryptedContent: string,
    isRead: boolean = false
  ) => {
    if (!address || !CONTRACT_ADDRESS) {
      throw new Error('Wallet not connected or contract not deployed');
    }

    try {
      const { encryptedData, inputProof } = await encryptBoolean(
        isRead,
        CONTRACT_ADDRESS,
        address
      );

      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: SECRET_SHADES_NETWORK_ABI,
        functionName: 'sendMessage',
        args: [BigInt(toUserId), encryptedContent, encryptedData, inputProof],
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const updatePrivacySettings = async (settings: PrivacySettings) => {
    if (!address || !CONTRACT_ADDRESS) {
      throw new Error('Wallet not connected or contract not deployed');
    }

    try {
      const [showConnections, showActivity, allowMessages, showReputation] = await Promise.all([
        encryptBoolean(settings.showConnections, CONTRACT_ADDRESS, address),
        encryptBoolean(settings.showActivity, CONTRACT_ADDRESS, address),
        encryptBoolean(settings.allowMessages, CONTRACT_ADDRESS, address),
        encryptBoolean(settings.showReputation, CONTRACT_ADDRESS, address),
      ]);

      // Use the first proof for all settings (in a real implementation, you'd need separate proofs)
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: SECRET_SHADES_NETWORK_ABI,
        functionName: 'updatePrivacySettings',
        args: [
          showConnections.encryptedData,
          showActivity.encryptedData,
          allowMessages.encryptedData,
          showReputation.encryptedData,
          showConnections.inputProof,
        ],
      });
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
      throw error;
    }
  };

  return {
    registerUser,
    createConnection,
    sendMessage,
    updatePrivacySettings,
    isPending,
    error,
  };
}

export function useUserProfile(userId?: number) {
  const { data: profile, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SECRET_SHADES_NETWORK_ABI,
    functionName: 'getUserProfile',
    args: userId ? [BigInt(userId)] : undefined,
    query: {
      enabled: !!userId && !!CONTRACT_ADDRESS,
    },
  });

  return {
    profile: profile as UserProfile | undefined,
    isLoading,
    error,
  };
}

export function useUserRegistration(address?: string) {
  const { data: isRegistered, isLoading: isLoadingRegistration } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SECRET_SHADES_NETWORK_ABI,
    functionName: 'isUserRegistered',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address && !!CONTRACT_ADDRESS,
    },
  });

  const { data: userId, isLoading: isLoadingUserId } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SECRET_SHADES_NETWORK_ABI,
    functionName: 'getUserId',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address && !!CONTRACT_ADDRESS,
    },
  });

  return {
    isRegistered: isRegistered as boolean | undefined,
    userId: userId ? Number(userId) : undefined,
    isLoading: isLoadingRegistration || isLoadingUserId,
  };
}
