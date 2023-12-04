import {
  CButton,
  CButtonGroup,
  CProgress,
  CProgressStacked,
} from "@coreui/react";
import styles from "@views/home-page/home-page.module.scss";
import Variant from "@components/variant";
import { useEffect, useState } from "react";
import { dataPropsElem } from "../app";

const CURRENT_DATE = new Date("2023-12-04 12:00").getTime();

const DataParse = (data: dataPropsElem[]) => {
  const [type, setType] = useState(0);
  const [activeButton, setactiveButton] = useState(0);
  const [errors, setErrors] = useState(0);
  const [zeros, setZeros] = useState(0);
  const [timeouts, setTimeouts] = useState(0);
  const [errorsColor, setErrorsColor] = useState("green");
  const [zerosColor, setZerosColor] = useState("green");
  const [timeoutsColor, setTimeoutsColor] = useState("green");
  const [errors500, setErrors500] = useState(0);
  const [errors501, setErrors501] = useState(0);
  const [errors502, setErrors502] = useState(0);
  const [errorsOther, setErrorsOther] = useState(0);
  const [errors500Percent, setErrors500Percent] = useState(0);
  const [errors501Percent, setErrors501Percent] = useState(0);
  const [errors502Percent, setErrors502Percent] = useState(0);
  const [errorsOtherPercent, setErrorsOtherPercent] = useState(0);

  useEffect(() => {
    let nowData: dataPropsElem[] = [];
    let pastData: dataPropsElem[] = [];
    let nowTime = CURRENT_DATE - 60 * 60 * 1000;
    let pastTime = CURRENT_DATE - 120 * 60 * 1000;

    if (type === 1) {
      nowTime = CURRENT_DATE - 60 * 60 * 24 * 1000;
      pastTime = CURRENT_DATE - 60 * 60 * 48 * 1000;
    }
    if (type === 2) {
      nowTime = CURRENT_DATE - 60 * 60 * 48 * 1000;
      pastTime = CURRENT_DATE - 60 * 60 * 96 * 1000;
    }
    if (type === 3) {
      nowTime = CURRENT_DATE - 60 * 60 * 72 * 1000;
      pastTime = CURRENT_DATE - 60 * 60 * 144 * 1000;
    }

    nowData = Object.values(data).filter(
      (elem) => new Date(elem.date).getTime() > nowTime,
    );
    pastData = Object.values(data).filter(
      (elem) =>
        new Date(elem.date).getTime() > pastTime &&
        nowTime >= new Date(elem.date).getTime(),
    );

    let tmpErrors500 = 0;
    let tmpErrors501 = 0;
    let tmpErrors502 = 0;
    let tmpErrorsOther = 0;
    let nowErrors = 0;
    let nowZeros = 0;
    let nowTimeouts = 0;

    nowData.map((elem) => {
      tmpErrors500 += elem["errors-500"];
      tmpErrors501 += elem["errors-501"];
      tmpErrors502 += elem["errors-502"];
      tmpErrorsOther += elem["errors-other"];
      nowErrors +=
        elem["errors-500"] +
        elem["errors-501"] +
        elem["errors-502"] +
        elem["errors-other"];
      nowZeros += elem["zeros"];
      nowTimeouts += elem["timeouts"];
    });

    let pastErrors = 0;
    let pastZeros = 0;
    let pastTimeouts = 0;

    pastData.map((elem) => {
      pastErrors +=
        elem["errors-500"] +
        elem["errors-501"] +
        elem["errors-502"] +
        elem["errors-other"];
      pastZeros += elem["zeros"];
      pastTimeouts += elem["timeouts"];
    });

    setErrors((((nowErrors - pastErrors) / pastErrors) * 100) | 0);
    setZeros((((nowZeros - pastZeros) / pastZeros) * 100) | 0);
    setTimeouts((((nowTimeouts - pastTimeouts) / pastTimeouts) * 100) | 0);
    setErrorsColor((nowErrors - pastErrors) / pastErrors > 0 ? "green" : "red");
    setZerosColor(
      ((nowZeros - pastZeros) / pastZeros) * 100 > 0 ? "green" : "red",
    );
    setTimeoutsColor(
      (nowTimeouts - pastTimeouts) / pastTimeouts > 0 ? "green" : "red",
    );
    setErrors500(tmpErrors500);
    setErrors501(tmpErrors501);
    setErrors502(tmpErrors502);
    setErrorsOther(tmpErrorsOther);
    console.log(nowErrors);
    setErrors500Percent((tmpErrors500 * 100) / nowErrors);
    setErrors501Percent((tmpErrors501 * 100) / nowErrors);
    setErrors502Percent((tmpErrors502 * 100) / nowErrors);
    setErrorsOtherPercent((tmpErrorsOther * 100) / nowErrors);

    setactiveButton(type);
  }, [type, data]);

  return (
    <>
      <CButtonGroup role="group" aria-label="nav" className={styles.nav}>
        <CButton
          onClick={() => setType(0)}
          color="dark"
          className={styles.navButton}
          variant="outline"
          active={activeButton === 0}
        >
          Last hour
        </CButton>
        <CButton
          onClick={() => setType(1)}
          color="dark"
          className={styles.navButton}
          variant="outline"
          active={activeButton === 1}
        >
          Today
        </CButton>
        <CButton
          onClick={() => setType(2)}
          color="dark"
          className={styles.navButton}
          variant="outline"
          active={activeButton === 2}
        >
          Yesterday
        </CButton>
        <CButton
          onClick={() => setType(3)}
          color="dark"
          className={styles.navButton}
          variant="outline"
          active={activeButton === 3}
        >
          Last 3 days
        </CButton>
      </CButtonGroup>

      <div className={styles.errorsInfo}>
        <div className={`${styles.errorsInfoItem} ${errorsColor}`}>
          <p className={styles.errorsInfoItemTitle}>Errors: {errors}%</p>
          <p className={styles.errorsInfoItemText}>Average: 0.11%</p>
        </div>
        <div className={`${styles.errorsInfoItem} ${zerosColor}`}>
          <p className={styles.errorsInfoItemTitle}>Zeroes: {zeros}%</p>
          <p className={styles.errorsInfoItemText}>Average: 0.11%</p>
        </div>
        <div className={`${styles.errorsInfoItem} ${timeoutsColor}`}>
          <p className={styles.errorsInfoItemTitle}>Timeouts: {timeouts}%</p>
          <p className={styles.errorsInfoItemText}>Average: 0.11%</p>
        </div>
      </div>

      <CProgressStacked className={styles.progress}>
        <CProgress color="warning" value={errors500Percent} />
        <CProgress value={errors501Percent} />
        <CProgress color="info" value={errors502Percent} />
        <CProgress color="secondary" value={errorsOtherPercent} />
      </CProgressStacked>

      <div className={styles.progressInfo}>
        <div className={`${styles.progressInfoItem} warning`}>
          Error 500: {errors500}
        </div>
        <div className={`${styles.progressInfoItem} primary`}>
          Error 501: {errors501}
        </div>
        <div className={`${styles.progressInfoItem} info`}>
          Error 502: {errors502}
        </div>
        <div className={`${styles.progressInfoItem} secondary`}>
          Other: {errorsOther}
        </div>
      </div>

      <div className={styles.variants}>
        <Variant
          color={"green"}
          title="Searches"
          percent="+5%"
          yesterday={29380}
          friday={27985}
          infoTitle={`Mobile traffic: 100% \n Web traffic: 100%`}
          infoText={
            <p>
              Help <a href="#">Searches</a>, <a href="#">Pessimisation</a>
            </p>
          }
          infoTextGray="You get 100% traffic on mobile and desktop devices."
        />

        <Variant
          color={"red"}
          title="Clicks"
          percent="-13%"
          yesterday={243}
          friday={280}
          infoTitle={`CTR: 0.04%`}
          infoText={
            <p>
              Help <a href="#">CTR</a>, <a href="#">Clicks</a>
            </p>
          }
          infoTextGray="Conversion from searches to clicks on all devices."
        />

        <Variant
          color={"green"}
          title="Bookings"
          percent=""
          yesterday={24}
          friday={24}
          infoTitle={`STR: 6.2% \n Avg. Check: 8 903`}
          infoText={
            <p>
              Help <a href="#">STR</a>, <a href="#">Booking</a>,
              <a href="#">Avg. Check</a>
            </p>
          }
          infoTextGray="Conversion from clicks to bookings on all devices."
        />
      </div>
    </>
  );
};

export default DataParse;
