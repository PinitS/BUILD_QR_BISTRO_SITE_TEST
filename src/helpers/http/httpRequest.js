/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import _ from "lodash";
import { configHeader } from "@helpers/http/configHeader";
import { hold } from "@utils/hold";
// import { useClearAuthState } from "@customHooks/useClearAuthState";
// import { ALERT_TYPE, DialogAlert } from "@contexts/dialogAlert/DialogAlertProvider.provider";

const NEXT_PUBLIC_API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const httpRequest = async ({
  method = "post",
  apiVersions = "v1",
  externalUrl = null,
  path = null,
  data = null,
  useAuthToken = true,
  isFormData = false,
  isInternal = true,
  timeout = 30 * 1000,
}) => {
  // const { clearAuthState } = useClearAuthState();
  try {
    const url = isInternal ? `${NEXT_PUBLIC_API_ENDPOINT}/${apiVersions}${path}` : externalUrl;

    console.log("url :>> ", url);
    const payload = data ? (isFormData ? data : JSON.stringify(data)) : undefined;
    const response = await axios({
      method,
      url,
      data: payload,
      headers: configHeader({ isFormData, useAuthToken }),
      timeout,
    });
    return _.get(response, ["data"]);
  } catch (error) {
    console.log("error :>> ", error);
    const errno = _.get(error, ["response", "data", "errno"], null);
    const message = _.get(error, ["response", "data", "message"], "-");
    const axiosErrorCode = _.get(error, ["code"]);
    if (axiosErrorCode === "ERR_NETWORK") {
      // DialogAlert.show({
      //   type: ALERT_TYPE.DANGER,
      //   description: "Server Error",
      //   duration: 2000,
      // });
      // await hold({ sec: 2 });
      // return navigate("server-error");
    }

    if ((errno && errno === 10003) || errno === 70002) {
      // DialogAlert.show({
      //   type: ALERT_TYPE.DANGER,
      //   description: message,
      //   duration: 2000,
      // });
      // await hold({ sec: 2 });
      // clearAuthState();
      // return navigate("restaurant-auth-stack-navigator");
    }
    throw _.get(error, ["response", "data"]);
  }
};
