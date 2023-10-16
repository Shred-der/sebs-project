const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const { ethers } = require("hardhat");

describe("CNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const CNFT = await ethers.getContractFactory("cnft");
    const cnft = await CNFT.deploy();
    await cnft.deployed();

    const recipient = '0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897';
    const metadataURI = 'cid/test.png';

    let balance = await cnft.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await cnft.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await cnft.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await cnft.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await cnft.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') });
  });
});



