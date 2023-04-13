// Importing necessary modules and components
import styles from "../styles/NftGallery.module.css";
import { useEffect, useState } from "react";
import NftCard from "./nftCard";

// Defining the main component of the NFT gallery
export default function NftGallery({
  walletAddress,
  collectionAddress,
  chain,
  pageSize,
}) {
  // Defining states for the component
  const [nfts, setNfts] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [pageKey, setPageKey] = useState();
  const [excludeFilter, setExcludeFilter] = useState(true);

  // Defining functions for fetching NFTs
  const fetchNfts = async () => {
    setIsloading(true);
    if (walletAddress) {
      await getNftsForOwner();
    } else if (collectionAddress) {
      await getNftsForCollection();
    }
    setIsloading(false);
  };
  const getNftsForOwner = async () => {
    console.log(walletAddress);
    if (walletAddress) {
      try {
        // Making a POST request to the server to get NFTs
        const res = await fetch("/api/getNftsForOwner", {
          method: "POST",
          body: JSON.stringify({
            address: walletAddress,
            pageSize: pageSize ? pageSize : 30,
            chain: chain ? chain : "ETH_MAINNET",
            pageKey: pageKey ? pageKey : null,
            excludeFilter: excludeFilter,
          }),
        }).then((res) => res.json());
        if (pageKey?.length) {
          setNfts((prev) => {
            return [...prev, ...res.nfts];
          });
        } else {
          setNfts(res.nfts);
        }
        if (res.pageKey) {
          setPageKey(res.pageKey);
        } else setPageKey();
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Defining useEffect hooks for fetching NFTs and updating when the wallet address changes
  useEffect(() => {
    if (walletAddress?.length) fetchNfts();
  }, [walletAddress]);

  const getNftsForCollection = async () => {
    if (collectionAddress) {
      try {
        // Making a POST request to the server to get NFTs
        const res = await fetch("/api/getNftsForCollection", {
          method: "POST",
          body: JSON.stringify({
            address: collectionAddress,
            pageSize: pageSize,
            chain: chain,
            pageKey: pageKey ? pageKey : null,
            excludeFilter: excludeFilter,
          }),
        }).then((res) => res.json());
        if (pageKey?.length) {
          setNfts((prev) => {
            return [...prev, ...res.nfts];
          });
        } else {
          setNfts(res.nfts);
        }
        if (res.pageKey) {
          setPageKey(res.pageKey);
        } else setPageKey();
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    // Calling fetchNfts on component mount
    fetchNfts();
  }, []);

  // If data is still loading, display a loading message

  // Once data is loaded, display NFT gallery
  return (
    <div className={styles.nft_gallery_page_container}>
      <div className={styles.nft_gallery}>
        <div className={styles.nfts_display}>
          {nfts?.length ? (
            nfts.map((nft) => {
              return <NftCard key={nft.tokenId} nft={nft} />;
            })
          ) : (
            <p>No NFTs found for the selected address</p>
          )}
        </div>
      </div>

      {pageKey && (
        <div className={styles.button_container}>
          <a
            className={styles.button_black}
            onClick={() => {
              fetchNfts(pageKey);
            }}
          >
            Load more
          </a>
        </div>
      )}
    </div>
  );
}
