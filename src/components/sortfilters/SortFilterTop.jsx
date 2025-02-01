// Chakra imports
import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import closeic from "../../assets/img/sorticons/close.svg";
import dailyic from "assets/img/sorticons/day-calendar.svg";
import weeklyic from "assets/img/sorticons/week-calendar.svg";
import monthlyic from "assets/img/sorticons/month-calendar.svg";
import yearlyic from "assets/img/sorticons/date.svg";
import PropTypes from "prop-types";

export default function SortFilterTop(props) {
  const [active, setActive] = useState({
    daily: "",
    weekly: "",
    monthly: "",
    yearly: ""
  })

  const handleSortClick = (value, value2) => {
    props.sendDataToParent(value, value2)
  };

  const handleApplyClick = () => {
    props?.handleApplySorting();
  };

  return (
    <>
      {props?.hideShow?.status === true &&
        <div className="sort_filter_wrap top_srt">
          <Flex
            alignItems={"center"}
            className="sort_hdng"
            mb={"30px"}
          >
            <button style={{border:"none", background:"none"}} onClick={props?.closeSort} >
              <img src={closeic} alt="close" className="icn" />
            </button>
            <Text w="100%" textAlign="center" pr="15px" fontSize={"20px"} mb={"0px"} fontFamily={"AirbnbBold"}>
              Sort
            </Text>
          </Flex>
          <Flex mb={"30px"} direction={"column"} gap={"10px"}>
            <Flex
              className={`fltr_itm ${active.daily}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={dailyic} alt="new to old" className="icn" />
              <Text className="fltr_txt " mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => {
                  handleSortClick(props?.hideShow?.type, "daily")
                  setActive(() => ({
                    daily: "active",
                    weekly: "",
                    monthly: "",
                    yearly: ""

                  }))
                }}
              >
                View daily
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active.weekly}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={weeklyic} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => {
                  handleSortClick(props?.hideShow?.type, "weekly")
                  setActive(() => ({
                    daily: "",
                    weekly: "active",
                    monthly: "",
                    yearly: ""

                  }))
                }

                }
              >
                View weekly
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active.monthly}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}>
              <img src={monthlyic} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => {
                  handleSortClick(props?.hideShow?.type, "monthly")
                  setActive(() => ({
                    daily: "",
                    weekly: "",
                    monthly: "active",
                    yearly: ""

                  }))
                }}>
                View monthly
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active.yearly}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={yearlyic} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => {
                  handleSortClick(props?.hideShow?.type, "yearly")
                  setActive(() => ({
                    daily: "",
                    weekly: "",
                    monthly: "",
                    yearly: "active"

                  }))
                }}>
                View yearly
              </Text>
            </Flex>
            <Button className="theme_btn filter_btn" mt="20px" onClick={handleApplyClick}>
              Apply
            </Button>
          </Flex>
        </div>
      }
    </>
  );
}

SortFilterTop.propTypes = {
  hideShow: PropTypes.shape({
    status: PropTypes.bool,
    type: PropTypes.isRequired,
  }),
  closeSort: PropTypes.func,
  sendDataToParent: PropTypes.func.isRequired,
  handleApplySorting: PropTypes.func.isRequired
};
