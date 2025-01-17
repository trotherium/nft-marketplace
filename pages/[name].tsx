import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import PublicProfile from 'components/pages/PublicProfile';
import NotAvailableModal from 'components/base/NotAvailable';

import { getUser, getProfile } from 'actions/user';
import { getProfileNFTS } from 'actions/nft';

const PublicProfilePage = ({ user, data, profile }: any) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);

  return (
    <>
      <Head>
        <title>SecretNFT - {profile.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`Ternoart - ${profile.name} profile page.`}
        />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <PublicProfile
        user={user}
        profile={profile}
        NFTS={data}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
      />
    </>
  );
};
export async function getServerSideProps({ query }: any) {
  try {
    const user = await getUser();
    const profile = await getProfile(query.name);
    let data = await getProfileNFTS(query.name);

    data = data.filter((item: any) => item.media);
    data = data.filter((item: any) => item.listed === 1);

    return {
      props: { user, profile, data },
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

export default PublicProfilePage;
