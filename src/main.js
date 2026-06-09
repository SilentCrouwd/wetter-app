import { getWetherData } from "./api";
import { getCurrentInfo } from "./detailview";

import "./style.scss";

getCurrentInfo();

// setWetherData();
// async function setWetherData() {
//   const currWetherData = await getWetherData();
//   const cityName = currWetherData.location.name;
//   console.log(cityName);
//   const currDegrease = currWetherData.current.temp_c;
//   console.log(currDegrease);
//   const currCondition = currWetherData.current.condition.text;
//   console.log(currCondition);
//   const heatIndex = currWetherData.current.heatindex_c;
//   console.log(heatIndex);
//   const dewpoint = currWetherData.current.dewpoint_c;
//   console.log(dewpoint);
// }
