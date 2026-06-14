import { getWetherData } from "./api";
import {
  forecastThreeDays,
  getCurrentInfo,
  getDailyForecast,
} from "./detailview";

import "./style.scss";

getCurrentInfo();
getDailyForecast();
forecastThreeDays(); //
