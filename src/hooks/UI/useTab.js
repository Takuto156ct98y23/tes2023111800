// const titlePanelArray = useMemo(() => {
//   return [
//     {
//       title: "Arasuzies",
//       panel: <ContentOneUserArasuzies userId={userId} />,
//     },
//     {
//       title: "オススメシェア",
//       panel: <ContentOneUserShare userId={userId} />,
//     },
//   ];
// }, [userId]);

import { useMemo } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { v4 as uuidv4 } from "uuid";

const useTab = (titlePanelArray) => {
  // リンク先への移動時に上手くTabの更新がなされないことがあるので、keyで更新を強制。
  const TabArea = useMemo(() => {
    return (
      <div key={uuidv4()}>
        <Tabs>
          <TabList>
            {titlePanelArray.map((anObj) => {
              return <Tab key={uuidv4()}>{anObj.title}</Tab>;
            })}
          </TabList>
          {titlePanelArray.map((anObj) => {
            return <TabPanel key={uuidv4()}>{anObj.panel}</TabPanel>;
          })}
        </Tabs>
      </div>
    );
  }, [titlePanelArray]);

  return { TabArea };
};

export default useTab;
