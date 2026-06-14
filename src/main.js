import { getWetherData } from "./api";
import {
  forecastThreeDays,
  getAdditionalInfo,
  getCurrentInfo,
  getDailyForecast,
} from "./detailview";

import "./style.scss";

getCurrentInfo();
getDailyForecast();
forecastThreeDays();
getAdditionalInfo();
