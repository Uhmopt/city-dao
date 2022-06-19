import React from "react";
import { Tabs } from "antd";

import { RootState } from "../store";
import { useAppSelector } from "../hooks";
import PlotList from "./PlotList";
import { stringifyPlotId } from "../helpers/stringifyPlotId";

const { TabPane } = Tabs;

export default function PlotTabs() {
  const userAddress = useAppSelector((state: RootState) => state.user.address);
  const fetchingPlots = useAppSelector((state: RootState) => state.plots.fetching);
  const idFilter = useAppSelector((state: RootState) => state.plots.idFilter);
  const plots = useAppSelector((state: RootState) => state.plots.plots).filter(plot => {
    return stringifyPlotId(plot.id).includes(idFilter ?? "");
  });

  return (
    <Tabs defaultActiveKey="1" className="plot-tabs px-4">
      <TabPane tab="All Parcels" key="1">
        <PlotList
          plots={plots}
          emptyMessage={fetchingPlots ? "Loading..." : "Couldn't load plots - please try again"}
        />
      </TabPane>
      <TabPane tab="Your Land" key="2">
        {userAddress && (
          <PlotList
            plots={plots.filter(plot => plot.owner === userAddress)}
            emptyMessage={fetchingPlots ? "Loading..." : "You don't own any plots yet"}
          />
        )}
        {!userAddress && <span className="text-gray-7 third-font">Connect your wallet to see your owned plots</span>}
      </TabPane>
    </Tabs>
  );
}
