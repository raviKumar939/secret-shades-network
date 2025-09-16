import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Secret Shades Network contract...");

  // Get the contract factory
  const SecretShadesNetwork = await ethers.getContractFactory("SecretShadesNetwork");

  // Deploy the contract with a verifier address (can be the deployer for now)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const secretShadesNetwork = await SecretShadesNetwork.deploy(deployer.address);

  await secretShadesNetwork.waitForDeployment();

  const contractAddress = await secretShadesNetwork.getAddress();
  console.log("Secret Shades Network deployed to:", contractAddress);

  // Verify the deployment
  console.log("Verifying deployment...");
  const isUserRegistered = await secretShadesNetwork.isUserRegistered(deployer.address);
  console.log("Is deployer registered:", isUserRegistered);

  console.log("Deployment completed successfully!");
  console.log("Contract Address:", contractAddress);
  console.log("Verifier Address:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
