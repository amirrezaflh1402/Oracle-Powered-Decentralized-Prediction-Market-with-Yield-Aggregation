// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy PredictionManager
    const PredictionManager = await ethers.getContractFactory("PredictionManager");
    const predictionManager = await PredictionManager.deploy();
    console.log("PredictionManager deployed to:", predictionManager.address);

    // Deploy Governance
    const Governance = await ethers.getContractFactory("Governance");
    const governance = await Governance.deploy();
    console.log("Governance deployed to:", governance.address);

    // Deploy OracleHandler
    const OracleHandler = await ethers.getContractFactory("OracleHandler");
    const oracleHandler = await OracleHandler.deploy();
    console.log("OracleHandler deployed to:", oracleHandler.address);

    // Deploy Treasury
    const Treasury = await ethers.getContractFactory("Treasury");
    const treasury = await Treasury.deploy();
    console.log("Treasury deployed to:", treasury.address);

    // Deploy YieldManager
    const YieldManager = await ethers.getContractFactory("YieldManager");
    const yieldManager = await YieldManager.deploy();
    console.log("YieldManager deployed to:", yieldManager.address);
}

// Run the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
