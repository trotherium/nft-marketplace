/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Link from 'next/link';
//import { useTranslation } from 'react-i18next';

import Logo from 'components/assets/LogoTernoa';
import Creator from '../Creator';
import CopyPaste from 'components/assets/copypaste';

import style from './MainHeader.module.scss';
import { middleEllipsis } from 'utils/strings';
import gradient from 'random-gradient';

const MainHeader: React.FC<any> = ({ setModalExpand, user }) => {
  const [, setSearchValue] = useState('' as string);
  const [isExpanded, setIsExpanded] = useState(false);
  const bgGradient = user ? { background: gradient(user.name) } : {};
  //const { t } = useTranslation();

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <div className={style.Header}>
      <div className={style.HeaderContainer}>
        <Link href="/">
          <a>
            <Logo className={style.Logo} onClick={() => true} />
          </a>
        </Link>

        <div className={style.SearchBar}>
          <input
            type="search"
            onChange={updateKeywordSearch}
            className={style.Input}
            placeholder="Search"
          />
        </div>
        <div className={style.Infos}>
          <div className={style.Links}>
            <Link href="/explore">
              <a className={style.LinkItem}>Explore</a>
            </Link>
            <Link href="/faq">
              <a className={style.LinkItem}>How it works</a>
            </Link>
          </div>
          <div className={style.Wallet}>
            {user ? (
              <div className={style.Regular}>
                <Link href="/create">
                  <a className={style.Create}>Create NFT</a>
                </Link>
                <div
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={style.Profile}
                >
                  <div className={style.Caps}>
                    <span className={style.NumberCaps}>{user?.caps}</span>
                    CAPS
                  </div>
                  <div className={style.ProfileImageContainer}>
                    {user.picture ? (
                      <img
                        src={user.picture}
                        draggable="false"
                        className={style.ProfileImage}
                      />
                    ) : (
                      <div style={bgGradient} className={style.ProfileImage}>
                        <div className={style.CreatorLetter}>
                          {user.name.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.Regular}>
                <Link href="/create">
                  <a className={style.Create}>Create NFT</a>
                </Link>
                <div
                  onClick={() => setModalExpand(true)}
                  className={style.Connect}
                >
                  Connect
                </div>
              </div>
            )}
          </div>
        </div>
        {user && isExpanded && (
          <div className={style.Dropdown}>
            <div className={style.DropdownContainer}>
              <div className={style.DropdownProfile}>
                <Creator user={user} size="xsmall" showTooltip={false} />
                <div className={style.Name}>{user?.name}</div>
              </div>

              <div className={style.Section}>
                <div
                  className={style.SectionTitle}
                  onClick={() => {
                    navigator.clipboard.writeText(user.walletId);
                  }}
                >
                  Wallet :
                  <span className={style.SectionWallet}>
                    {middleEllipsis(user.walletId, 20)}
                    <CopyPaste className={style.CopyPaste} />
                  </span>
                </div>
              </div>
              <Link href="/profile">
                <a className={style.Section}>
                  <div className={style.SectionTitle}> My Account</div>
                </a>
              </Link>
            </div>
            <Link href={`/${user.walletId}`}>
              <a className={style.CapsSection}>
                <div className={style.SectionTitle}>My artist profile</div>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
