import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import NFTPage from 'components/pages/NFT';
import ModalShowcase from 'components/pages/NFT/ModalShowcase';
import NotAvailableModal from 'components/base/NotAvailable';

import { getUser } from 'actions/user';
import { getNFT } from 'actions/nft';

const NftPage = ({ user, NFT }: any) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [exp, setExp] = useState(0);
  const [notAvailable, setNotAvailable] = useState(false);
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    async function callBack() {
      try {
        let res = await fetch(NFT.media!.url, { method: 'HEAD' });
        setType(res.headers.get('Content-Type'));
        return res;
      } catch (err) {
        console.log('Error :', err);
      }
    }

    callBack();
  }, []);

  return (
    <>
      <Head>
        <title>{NFT.name} - SecretNFT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={NFT.description} />
        <meta name="og:image" content={NFT.media.url} />
        <meta property="og:image" content={NFT.media.url} />
      </Head>
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      {exp !== 0 && (
        <ModalShowcase
          NFT={NFT}
          setExp={setExp}
          exp={exp}
          setNotAvailable={setNotAvailable}
          type={type}
        />
      )}
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}

      <AlphaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <NFTPage
        NFT={NFT}
        setExp={setExp}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        user={user}
        type={type}
      />
    </>
  );
};

export async function getServerSideProps({ query }: any) {
  try {
    const user = await getUser();
    let NFT = await getNFT(query.name);

    return {
      props: { user, NFT },
    };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}

export default NftPage;
