import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import "./styles/Home.css";
import { editionDropAddress, editionDropTokenId } from "../const/yourDetails";

export default function Home() {
  const address = useAddress();

  const { contract: editionDropContract } = useContract(editionDropAddress);
  const { data: nft, isLoading: isNftLoading } = useNFT(
    editionDropContract,
    editionDropTokenId
  );
  const { data: ownedNfts, refetch: refetchOwnedNfts } = useOwnedNFTs(
    editionDropContract,
    address
  );

  return (
    <div className="container">
      <main className="main">
        <h3 className="title">
        Welcome to our Frictionless Wallet Creation and Nft minting Experience
        </h3>

        <p className="description">
        NO SEED PHRASE! NO PRIVATE KEYS!!
        </p>

        <div className="connect">
          <ConnectWallet
            dropdownPosition={{
              align: "center",
              side: "bottom",
            }}
            btnTitle="Login"
          />
        </div>

        {isNftLoading ? (
          "Loading..."
        ) : (
          <div className="card">
            <img
              className="nftImage"
              src={nft.metadata.image}
              alt={nft.metadata.description}
            />
            {address ? (
              <>
                <p>You own {ownedNfts?.[0]?.quantityOwned || "0"}</p>
                <Web3Button
                  contractAddress={editionDropAddress}
                  action={(contract) =>
                    contract.erc1155.claim(editionDropTokenId, 1)
                  }
                  onSuccess={async () => {
                    await refetchOwnedNfts();
                    alert("Claim successful!");
                  }}
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  Claim!
                </Web3Button>
              </>
            ) : (
              <p>Login to claim!</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
