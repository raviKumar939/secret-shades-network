import { expect } from "chai";
import { ethers } from "hardhat";
import { SecretShadesNetwork } from "../typechain-types";

describe("Secret Shades Network", function () {
  let secretShadesNetwork: SecretShadesNetwork;
  let owner: any;
  let user1: any;
  let user2: any;
  let verifier: any;

  beforeEach(async function () {
    [owner, user1, user2, verifier] = await ethers.getSigners();

    const SecretShadesNetwork = await ethers.getContractFactory("SecretShadesNetwork");
    secretShadesNetwork = await SecretShadesNetwork.deploy(verifier.address);
    await secretShadesNetwork.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await secretShadesNetwork.owner()).to.equal(owner.address);
    });

    it("Should set the right verifier", async function () {
      expect(await secretShadesNetwork.verifier()).to.equal(verifier.address);
    });

    it("Should initialize counters to zero", async function () {
      expect(await secretShadesNetwork.userCounter()).to.equal(0);
      expect(await secretShadesNetwork.connectionCounter()).to.equal(0);
      expect(await secretShadesNetwork.messageCounter()).to.equal(0);
    });
  });

  describe("User Registration", function () {
    it("Should allow user registration", async function () {
      const publicName = "Test User";
      const publicBio = "Test Bio";
      
      // Note: In a real test, you would need to provide proper FHE encrypted data
      // For now, we'll test the basic functionality
      await expect(
        secretShadesNetwork.connect(user1).registerUser(
          publicName,
          publicBio,
          "0x0000000000000000000000000000000000000000000000000000000000000000", // Placeholder encrypted data
          "0x" // Placeholder proof
        )
      ).to.emit(secretShadesNetwork, "UserRegistered");
    });

    it("Should prevent duplicate registration", async function () {
      const publicName = "Test User";
      const publicBio = "Test Bio";
      
      await secretShadesNetwork.connect(user1).registerUser(
        publicName,
        publicBio,
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x"
      );

      await expect(
        secretShadesNetwork.connect(user1).registerUser(
          publicName,
          publicBio,
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x"
        )
      ).to.be.revertedWith("User already registered");
    });
  });

  describe("Access Control", function () {
    it("Should allow owner to set verifier", async function () {
      await secretShadesNetwork.setVerifier(user1.address);
      expect(await secretShadesNetwork.verifier()).to.equal(user1.address);
    });

    it("Should prevent non-owner from setting verifier", async function () {
      await expect(
        secretShadesNetwork.connect(user1).setVerifier(user2.address)
      ).to.be.revertedWithCustomError(secretShadesNetwork, "OwnableUnauthorizedAccount");
    });
  });

  describe("Utility Functions", function () {
    it("Should return correct user registration status", async function () {
      expect(await secretShadesNetwork.isUserRegistered(user1.address)).to.be.false;
      
      // After registration, it should return true
      // Note: This would require proper FHE setup in a real test
    });

    it("Should return zero for unregistered user ID", async function () {
      expect(await secretShadesNetwork.getUserId(user1.address)).to.equal(0);
    });
  });
});
