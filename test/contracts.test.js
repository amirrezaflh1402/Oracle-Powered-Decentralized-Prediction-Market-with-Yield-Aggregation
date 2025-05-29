// test/contracts.test.js
const { expect } = require("chai");

describe("PredictionManager", function () {
    let PredictionManager;
    let predictionManager;
    let owner;
    let addr1;

    beforeEach(async function () {
        PredictionManager = await ethers.getContractFactory("PredictionManager");
        [owner, addr1] = await ethers.getSigners();
        predictionManager = await PredictionManager.deploy();
    });

    it("Should create a market", async function () {
        await predictionManager.createMarket("Test Event", 3600);
        const market = await predictionManager.markets(1);
        expect(market.eventName).to.equal("Test Event");
    });

    it("Should allow users to place bets", async function () {
        await predictionManager.createMarket("Test Event", 3600);
        await predictionManager.connect(addr1).placeBet(1, { value: ethers.utils.parseEther("1") });
        const market = await predictionManager.markets(1);
        expect(market.totalStake).to.equal(ethers.utils.parseEther("1"));
    });

    it("Should resolve the market", async function () {
        await predictionManager.createMarket("Test Event", 3600);
        await predictionManager.resolveMarket(1, "TeamA Wins");
        const market = await predictionManager.markets(1);
        expect(market.resolved).to.equal(true);
    });
});

describe("Governance", function () {
    let Governance;
    let governance;
    let addr1;

    beforeEach(async function () {
        Governance = await ethers.getContractFactory("Governance");
        [owner, addr1] = await ethers.getSigners();
        governance = await Governance.deploy();
    });

    it("Should create a proposal", async function () {
        await governance.createProposal("Test Proposal");
        const receipt = await governance.createProposal("Test Proposal 2");
        expect(receipt).to.emit(governance, 'ProposalCreated');
    });
});

describe("OracleHandler", function () {
    let OracleHandler;
    let oracleHandler;

    beforeEach(async function () {
        OracleHandler = await ethers.getContractFactory("OracleHandler");
        oracleHandler = await OracleHandler.deploy();
    });

    it("Should fetch oracle data", async function () {
        await oracleHandler.fetchOracleData(1);
        // Assuming the result is "TeamA Wins"
        await expect(oracleHandler.fetchOracleData(1))
            .to.emit(oracleHandler, "OracleDataFetched")
            .withArgs(1, "TeamA Wins");
    });
});

describe("Treasury", function () {
    let Treasury;
    let treasury;
    let addr1;

    beforeEach(async function () {
        Treasury = await ethers.getContractFactory("Treasury");
        [owner, addr1] = await ethers.getSigners();
        treasury = await Treasury.deploy();
    });

    it("Should collect fees", async function () {
        await treasury.collectFees({ value: ethers.utils.parseEther("1") });
        expect(await ethers.provider.getBalance(treasury.address)).to.equal(ethers.utils.parseEther("1"));
    });
});

describe("YieldManager", function () {
    let YieldManager;
    let yieldManager;
    let addr1;

    beforeEach(async function () {
        YieldManager = await ethers.getContractFactory("YieldManager");
        [owner, addr1] = await ethers.getSigners();
        yieldManager = await YieldManager.deploy();
    });

    it("Should allow users to allocate funds", async function () {
        await yieldManager.allocateFunds({ value: ethers.utils.parseEther("1") });
        const userStake = await yieldManager.userStakes(owner.address);
        expect(userStake).to.equal(ethers.utils.parseEther("1"));
    });

    it("Should allow users to withdraw funds", async function () {
        await yieldManager.allocateFunds({ value: ethers.utils.parseEther("1") });
        await yieldManager.withdrawFunds(ethers.utils.parseEther("1"));
        const userStake = await yieldManager.userStakes(owner.address);
        expect(userStake).to.equal(0);
    });
});
