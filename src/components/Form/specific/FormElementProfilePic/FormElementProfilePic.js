import classes from "./FormElementProfilePic.module.css";
import useMe from "../../../../hooks/user/me/useMe";
import { useCallback, useState } from "react";
import useImageCropper from "../../../../hooks/image/useImageCropper";
import useModalBase from "../../../../hooks/Modal/useModalBase";
import { FIELDNAME_FOR_MULTER } from "../../../../data/constants/imageConstants";
import { updateMyProfilePic } from "../../../../api/apiUser";
import FormElementInput from "../../FormElementInput/FormElementInput";
import UserImage from "../../../UserImage/UserImage";
import ModalBase from "../../../Modal/ModalBase/ModalBase";
import ButtonBasic from "../../../button/Basic/ButtonBasic";
import ImageCropper from "../../../image/ImageCropper/ImageCropper";
import { handleError, isGoodError } from "../../../../utils/utilsError";
import { reloadPage } from "../../../../utils/utilsWindow";

const FormElementProfilePic = () => {
  const { me } = useMe();

  const {
    imgSrc,
    setImgSrc,
    previewCanvasRef,
    imgRef,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    scale,
    setScale,
    rotate,
    setRotate,
    aspect,
    setAspect,
    onSelectFile,
    onImageLoad,
    handleToggleAspectClick,
  } = useImageCropper();
  const { isOpen, openAreaModalBase, closeAreaModalBase } = useModalBase();
  const [sendingCroppedImageToServer, setSendingCroppedImageToServer] =
    useState(false);
  const [
    errorSendingCroppedImageToServer,
    setErrorSendingCroppedImageToServer,
  ] = useState(false);

  const sendCroppedImageToServer = useCallback(async () => {
    try {
      if (!completedCrop || !previewCanvasRef.current) {
        return;
      }

      previewCanvasRef.current.toBlob(async (blob) => {
        // if (!blob) {
        //   return;
        // }
        // setSendingCroppedImageToServer(true);
        // const formData = new FormData();
        // formData.append(FIELDNAME_FOR_MULTER, blob);
        // await updateMyProfilePic({
        //   data: formData,
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        // setErrorSendingCroppedImageToServer(false);
        // setSendingCroppedImageToServer(false);

        // reloadPage();
        try {
          if (!blob) {
            return;
          }
          setSendingCroppedImageToServer(true);
          const formData = new FormData();
          formData.append(FIELDNAME_FOR_MULTER, blob);
          await updateMyProfilePic({
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setErrorSendingCroppedImageToServer(false);
          setSendingCroppedImageToServer(false);

          reloadPage();
        } catch (error) {
          handleError({ error });
          if (isGoodError(error)) {
            return;
          }
          setErrorSendingCroppedImageToServer(true);
          setSendingCroppedImageToServer(false);
        }
      });
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
      setErrorSendingCroppedImageToServer(true);
      setSendingCroppedImageToServer(false);
    }
  }, [completedCrop, previewCanvasRef]);

  return (
    <FormElementInput
      label={"プロフィール写真"}
      labelSub={
        "（「保存」ボタンを押して更新しても、すぐには反映されない場合があります。保存後３０分たってもプロフィール写真が変わらない場合、お手数ですが再度画像のアップロードをお願いします。）"
      }
      // type={"file"}
      // // value={profilePic}
      // onChange={onChange_profilePic}
      // onClick={updateAValueInDB_profilePic}
      // // loading={loading_profilePic}
      // message={loadingSuccessful_profilePic ? "更新に成功しました！" : null}
      errorLoading={errorSendingCroppedImageToServer}
      errorMessage={"エラーが発生しました。"}
      isAForm={true}
      // disabled={disabled_profilePic}
      // uploadAFile={true}
      // accept={".jpg,.png,.jpeg"}
      // name={name_profilePic}

      displayOnlyChildren={true}
    >
      <div className={classes.FormElementInput_profilePic}>
        <div className={classes.FormElementInput_profilePic__profilePic}>
          <UserImage user={me} jumpToUserPageOnClick={false} />
        </div>
        <div className={classes.FormElementInput_profilePic__modalButton}>
          <ModalBase
            customComponentToOpen={
              <ButtonBasic>
                <p>更新</p>
              </ButtonBasic>
            }
            isOpen={isOpen}
            openAreaModalBase={openAreaModalBase}
            closeAreaModalBase={closeAreaModalBase}
            scrollableChildren={true}
          >
            <div className={classes.profilePicSetting}>
              {errorSendingCroppedImageToServer === true && (
                <p>エラーが発生しました。</p>
              )}
              <div className={classes.profilePicSetting__buttons}>
                <ButtonBasic
                  onClick={closeAreaModalBase}
                  disabled={sendingCroppedImageToServer}
                >
                  <p>閉じる</p>
                </ButtonBasic>
                <ButtonBasic
                  onClick={sendCroppedImageToServer}
                  disabled={sendingCroppedImageToServer}
                >
                  <p>確定</p>
                </ButtonBasic>
              </div>

              <ImageCropper
                imgSrc={imgSrc}
                setImgSrc={setImgSrc}
                previewCanvasRef={previewCanvasRef}
                imgRef={imgRef}
                crop={crop}
                setCrop={setCrop}
                completedCrop={completedCrop}
                setCompletedCrop={setCompletedCrop}
                scale={scale}
                setScale={setScale}
                rotate={rotate}
                setRotate={setRotate}
                aspect={aspect}
                setAspect={setAspect}
                onSelectFile={onSelectFile}
                onImageLoad={onImageLoad}
                handleToggleAspectClick={handleToggleAspectClick}
              />
            </div>
          </ModalBase>
        </div>
      </div>
    </FormElementInput>
  );
};

export default FormElementProfilePic;
