import { useMemo } from "react";
import { useSelector } from "react-redux";

const usePageId = ({
  // windowLocationPathnameは「window.location.pathname」で得れる値
  windowLocationPathname,
  // 「window.location.pathname」が"/chatroom/63e87f331b58e265a3d3cc41"等の場合true
  // 「window.location.pathname」が"/chatrooms-private"等の場合false
  tailIsId = false,
}) => {
  const pageIdObj = useSelector((state) => {
    return state.pageIdReducer.pageId;
  });

  const objectId = useMemo(() => {
    if (!windowLocationPathname) {
      return;
    }
    if (tailIsId) {
      return windowLocationPathname.split("/").slice(-1).join("");
    } else {
      return null;
    }
  }, [windowLocationPathname, tailIsId]);

  const pageId = useMemo(() => {
    if (!pageIdObj) {
      return;
    }
    if (!windowLocationPathname) {
      return;
    }
    let pagePath;
    if (tailIsId) {
      pagePath = windowLocationPathname.split("/").slice(0, -1).join("/");
    } else {
      pagePath = windowLocationPathname;
    }
    const pageIdWithOutObjectId = pageIdObj[pagePath.toLowerCase()];
    const idOfThisPage = objectId
      ? `${pageIdWithOutObjectId}/${objectId}`
      : pageIdWithOutObjectId;

    return idOfThisPage.toLowerCase();
  }, [windowLocationPathname, tailIsId, pageIdObj, objectId]);

  return { pageId, objectId };
};

export default usePageId;
