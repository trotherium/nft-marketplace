import React, { useState } from 'react';
//import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import style from './Create.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import ArrowBottom from 'components/assets/arrowBottom';
import Upload from 'components/assets/upload';
import WhiteWaterMark from 'components/assets/WhiteWaterMark';
import Eye from 'components/assets/eye';

const Create: React.FC<any> = ({ setModalExpand }) => {
  //const { t } = useTranslation();
  const [select, setSelect] = useState('Select NFT Option');
  const [exp, setExp] = useState(false);
  const [NFT, setNFT] = useState(null);
  const [secretNFT, setSecretNFT] = useState(null);

  function loadfile(event: any, type: string) {
    console.log(URL.createObjectURL(event.target.files[0]));
    if (type === 'main') {
      setNFT(event.target.files[0]);
      var output = document.getElementById('output') as HTMLImageElement;
      output!.src = URL.createObjectURL(event.target.files[0]);
      output!.onload = function () {
        URL.revokeObjectURL(output!.src);
      };
    } else {
      setSecretNFT(event.target.files[0]);
      var outputSecret = document.getElementById(
        'outputSecret'
      ) as HTMLImageElement;
      outputSecret!.src = URL.createObjectURL(event.target.files[0]);
      outputSecret!.onload = function () {
        URL.revokeObjectURL(outputSecret!.src);
      };
    }
  }

  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <div className={style.Label}>Coming Soon</div>
        <h2 className={style.Title}>Create NFT</h2>
        <div className={style.InnerContainer}>
          <div className={style.Top}>
            <span className={style.TopInf}>
              <Eye className={style.EyeSVG} />
              NFT Preview
            </span>
            <div className={style.Label}>Coming Soon</div>
          </div>
          <div className={style.Data}>
            <div className={style.Left}>
              <div
                className={
                  NFT
                    ? style.NFTPreview
                    : `${style.NFTPreview} ${style.NFTPreviewBorder}`
                }
              >
                <div className={NFT ? style.Hidden : style.NFTNull}>
                  <Upload className={style.UploadSVG} />
                  <div className={style.InsightMedium}>
                    Click here to upload your file.
                  </div>
                  <div className={style.InsightLight}>
                    PNG, GIF, WEBP, MP4 or MP3. Max 30mb.
                  </div>
                </div>
                <img
                  className={NFT ? style.IMGBackground : style.Hidden}
                  src="#"
                  alt="img"
                  id="output"
                />
                <div className={style.HiddenShell}>
                  <input
                    type="file"
                    id="theFileInput"
                    onChange={(event) => loadfile(event, 'main')}
                    className={style.HiddenInput}
                  />
                </div>

                {select === 'Blur' && NFT && <div className={style.Blur} />}
                {select === 'Protect' && NFT && (
                  <div className={style.OPTN}>
                    <div className={style.OPTNCTNR}>
                      <WhiteWaterMark className={style.WaterMarkSVG} />
                    </div>
                  </div>
                )}
                {select === 'Secret' && (
                  <div
                    className={
                      secretNFT
                        ? style.NFTSPreview
                        : `${style.NFTSPreview} ${style.NFTPreviewBorder}`
                    }
                  >
                    <div className={secretNFT ? style.Hidden : style.NFTSNull}>
                      <div className={style.Label}>Coming soon</div>
                      <Upload className={style.UploadSVG2} />
                      <div className={style.NFTSTips}>
                        Click to select your file that will hide your NFT for
                        the surprise.
                      </div>
                      <div className={style.NFTSTips2}>
                        Once purchased, the owner will be able to see your NFT
                      </div>
                    </div>
                    <img
                      className={secretNFT ? style.IMGBackground : style.Hidden}
                      src="#"
                      alt="img"
                      id="outputSecret"
                    />
                    <div className={style.HiddenShell}>
                      <input
                        type="file"
                        onChange={(event) => loadfile(event, 'secondary')}
                        className={style.HiddenInput}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={style.Right}>
              <div className={style.InputShell}>
                <h4 className={style.Subtitle}>Name</h4>
                <input
                  type="text"
                  placeholder="Ternoa collection"
                  className={style.Input}
                />
              </div>

              <div className={style.InputShell}>
                <h4 className={style.Subtitle}>Description</h4>
                <textarea
                  placeholder="A cool description"
                  className={style.Textarea}
                />
              </div>

              <div className={style.InputShell}>
                <h4 className={style.Subtitle}>Royalties</h4>
                <input type="text" placeholder="10%" className={style.Input} />
                <span className={style.Insight}>Suggested: 10%, 20%, 30%</span>
              </div>

              <div className={style.InputShell}>
                <h4 className={style.Subtitle}>
                  Original Size
                  <span className={style.Insight}>(optional)</span>
                </h4>
                <input
                  type="text"
                  placeholder="ex: 3000x6000px"
                  className={style.Input}
                />
              </div>

              <div className={style.SelectShell}>
                <div className={style.SelectContainer}>
                  <div className={style.Select} onClick={() => setExp(!exp)}>
                    {select}
                    <ArrowBottom
                      className={exp ? style.arrowbtmselect : style.arrowbtm}
                    />
                  </div>
                  {exp && (
                    <div className={style.SelectOptn}>
                      <div
                        className={style.SelectItem}
                        onClick={() => {
                          setSelect('Protect');
                          setExp(false);
                        }}
                      >
                        Protect
                      </div>
                      <div
                        className={style.SelectItem}
                        onClick={() => {
                          setSelect('Secret');
                          setExp(false);
                        }}
                      >
                        Secret
                      </div>
                      <div
                        className={style.SelectItem}
                        onClick={() => {
                          setSelect('Blur');
                          setExp(false);
                        }}
                      >
                        Blur
                      </div>
                      <div
                        className={style.SelectItem}
                        onClick={() => {
                          setSelect('None');
                          setExp(false);
                        }}
                      >
                        None
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/">
                  <a className={style.Link}>How it works</a>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.Create}>Create NFT</div>
        </div>
      </div>

      <Footer />
      <FloatingHeader setModalExpand={setModalExpand} />
    </div>
  );
};

export default Create;