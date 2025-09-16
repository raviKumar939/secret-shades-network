// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract SecretShadesNetwork is SepoliaConfig, Ownable {
    using FHE for *;
    
    struct UserProfile {
        euint32 userId;
        euint32 reputationScore;
        euint32 connectionCount;
        ebool isActive;
        ebool isVerified;
        string publicName;
        string publicBio;
        address walletAddress;
        uint256 createdAt;
        uint256 lastActive;
    }
    
    struct Connection {
        euint32 connectionId;
        euint32 fromUserId;
        euint32 toUserId;
        euint8 connectionType; // 0: Friend, 1: Follower, 2: Blocked
        ebool isEncrypted;
        ebool isActive;
        uint256 createdAt;
    }
    
    struct Message {
        euint32 messageId;
        euint32 fromUserId;
        euint32 toUserId;
        ebool isEncrypted;
        ebool isRead;
        string encryptedContent;
        uint256 timestamp;
    }
    
    struct PrivacySettings {
        euint32 userId;
        ebool showConnections;
        ebool showActivity;
        ebool allowMessages;
        ebool showReputation;
        uint256 updatedAt;
    }
    
    mapping(uint256 => UserProfile) public userProfiles;
    mapping(uint256 => Connection) public connections;
    mapping(uint256 => Message) public messages;
    mapping(uint256 => PrivacySettings) public privacySettings;
    mapping(address => uint256) public addressToUserId;
    mapping(uint256 => address) public userIdToAddress;
    
    uint256 public userCounter;
    uint256 public connectionCounter;
    uint256 public messageCounter;
    
    address public verifier;
    
    event UserRegistered(uint256 indexed userId, address indexed walletAddress, string publicName);
    event ConnectionCreated(uint256 indexed connectionId, uint256 indexed fromUserId, uint256 indexed toUserId);
    event MessageSent(uint256 indexed messageId, uint256 indexed fromUserId, uint256 indexed toUserId);
    event PrivacySettingsUpdated(uint256 indexed userId);
    event ReputationUpdated(uint256 indexed userId, uint32 reputation);
    
    constructor(address _verifier) Ownable(msg.sender) {
        verifier = _verifier;
    }
    
    function registerUser(
        string memory _publicName,
        string memory _publicBio,
        externalEuint32 _encryptedReputation,
        bytes calldata _inputProof
    ) external {
        require(addressToUserId[msg.sender] == 0, "User already registered");
        
        userCounter++;
        uint256 userId = userCounter;
        
        userProfiles[userId] = UserProfile({
            userId: FHE.asEuint32(userId),
            reputationScore: _encryptedReputation,
            connectionCount: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            isVerified: FHE.asEbool(false),
            publicName: _publicName,
            publicBio: _publicBio,
            walletAddress: msg.sender,
            createdAt: block.timestamp,
            lastActive: block.timestamp
        });
        
        addressToUserId[msg.sender] = userId;
        userIdToAddress[userId] = msg.sender;
        
        // Initialize privacy settings
        privacySettings[userId] = PrivacySettings({
            userId: FHE.asEuint32(userId),
            showConnections: FHE.asEbool(true),
            showActivity: FHE.asEbool(true),
            allowMessages: FHE.asEbool(true),
            showReputation: FHE.asEbool(false),
            updatedAt: block.timestamp
        });
        
        emit UserRegistered(userId, msg.sender, _publicName);
    }
    
    function createConnection(
        uint256 _toUserId,
        externalEuint8 _encryptedConnectionType,
        bytes calldata _inputProof
    ) external {
        uint256 fromUserId = addressToUserId[msg.sender];
        require(fromUserId != 0, "User not registered");
        require(_toUserId != 0 && _toUserId <= userCounter, "Invalid target user");
        require(_toUserId != fromUserId, "Cannot connect to yourself");
        
        connectionCounter++;
        uint256 connectionId = connectionCounter;
        
        connections[connectionId] = Connection({
            connectionId: FHE.asEuint32(connectionId),
            fromUserId: FHE.asEuint32(fromUserId),
            toUserId: FHE.asEuint32(_toUserId),
            connectionType: _encryptedConnectionType,
            isEncrypted: FHE.asEbool(true),
            isActive: FHE.asEbool(true),
            createdAt: block.timestamp
        });
        
        emit ConnectionCreated(connectionId, fromUserId, _toUserId);
    }
    
    function sendMessage(
        uint256 _toUserId,
        string memory _encryptedContent,
        externalEbool _encryptedIsRead,
        bytes calldata _inputProof
    ) external {
        uint256 fromUserId = addressToUserId[msg.sender];
        require(fromUserId != 0, "User not registered");
        require(_toUserId != 0 && _toUserId <= userCounter, "Invalid target user");
        require(_toUserId != fromUserId, "Cannot message yourself");
        
        messageCounter++;
        uint256 messageId = messageCounter;
        
        messages[messageId] = Message({
            messageId: FHE.asEuint32(messageId),
            fromUserId: FHE.asEuint32(fromUserId),
            toUserId: FHE.asEuint32(_toUserId),
            isEncrypted: FHE.asEbool(true),
            isRead: _encryptedIsRead,
            encryptedContent: _encryptedContent,
            timestamp: block.timestamp
        });
        
        emit MessageSent(messageId, fromUserId, _toUserId);
    }
    
    function updatePrivacySettings(
        externalEbool _showConnections,
        externalEbool _showActivity,
        externalEbool _allowMessages,
        externalEbool _showReputation,
        bytes calldata _inputProof
    ) external {
        uint256 userId = addressToUserId[msg.sender];
        require(userId != 0, "User not registered");
        
        privacySettings[userId] = PrivacySettings({
            userId: FHE.asEuint32(userId),
            showConnections: _showConnections,
            showActivity: _showActivity,
            allowMessages: _allowMessages,
            showReputation: _showReputation,
            updatedAt: block.timestamp
        });
        
        emit PrivacySettingsUpdated(userId);
    }
    
    function updateReputation(
        uint256 _userId,
        externalEuint32 _newReputation,
        bytes calldata _inputProof
    ) external {
        require(msg.sender == verifier || msg.sender == owner(), "Unauthorized");
        require(_userId != 0 && _userId <= userCounter, "Invalid user");
        
        userProfiles[_userId].reputationScore = _newReputation;
        
        emit ReputationUpdated(_userId, 0); // Reputation value is encrypted
    }
    
    function verifyUser(uint256 _userId) external {
        require(msg.sender == verifier || msg.sender == owner(), "Unauthorized");
        require(_userId != 0 && _userId <= userCounter, "Invalid user");
        
        userProfiles[_userId].isVerified = FHE.asEbool(true);
    }
    
    function getUserProfile(uint256 _userId) external view returns (
        string memory publicName,
        string memory publicBio,
        address walletAddress,
        uint256 createdAt,
        uint256 lastActive
    ) {
        require(_userId != 0 && _userId <= userCounter, "Invalid user");
        UserProfile memory profile = userProfiles[_userId];
        
        return (
            profile.publicName,
            profile.publicBio,
            profile.walletAddress,
            profile.createdAt,
            profile.lastActive
        );
    }
    
    function getConnectionCount(uint256 _userId) external view returns (uint256) {
        require(_userId != 0 && _userId <= userCounter, "Invalid user");
        // This would need to be calculated off-chain or with additional storage
        return 0; // Placeholder
    }
    
    function isUserRegistered(address _address) external view returns (bool) {
        return addressToUserId[_address] != 0;
    }
    
    function getUserId(address _address) external view returns (uint256) {
        return addressToUserId[_address];
    }
    
    function setVerifier(address _newVerifier) external onlyOwner {
        verifier = _newVerifier;
    }
}
