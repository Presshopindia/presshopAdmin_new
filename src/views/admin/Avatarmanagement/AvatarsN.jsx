// Chakra imports
import {
  Input,
  Box,
  Checkbox,
  Container
} from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import Card from "components/card/Card";

import { toast } from "react-toastify";
import { Post, Patch, Get } from "api/admin.services";
import uploadic from "assets/img/icons/upload.svg";
import checklistic from "assets/img/icons/checklist.svg";
import dltic from "assets/img/icons/dlt.svg";
import Loader from "components/Loader";
import ReactPaginate from "react-paginate";

export default function AvatarsN() {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const perPage = 45;

  const [avatar, setAvatar] = useState({
    base_url: "",
    response: [],
  });
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    }
  };

  // upload avtars
  const Add = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (const file of event.target.files) {
        formData.append("avatars", file);
      }
      setLoading(true);
      await Post("admin/addAvatar", formData).then((res) => {
        toast.success("New avatar successfully uploaded")
        getAvtars()
        setLoading(false)
      })
    } catch (er) {
      setLoading(false)
    }

  }

  const getAvtars = async () => {
    setLoading(true)
    const offset = (currentPage - 1) * perPage
    await Get(`admin/getAvatars?limit=${perPage}&offset=${offset}`).then((res) => {
      setAvatar((prev) => ({
        ...prev,
        base_url: res.data.base_url,
        response: res.data.response,
      }));
      setTotalPages(res.data.count / perPage || 0)
    });
    setLoading(false)
  };

  const DeleteAvatar = async () => {
    if (checkedItems.length === 0) {
      toast.error("Please select an avatar");
    } else {

      let obj = {
        avtar_id: checkedItems
      }
      const resp = await Patch('admin/deleteAvatar', obj);
      if (resp) {

        toast.success("avatar deleted");
        setCheckedItems("")
        getAvtars();
        setShow(false)
      }
    }

  };
  const slectAvtars = () => {
    setCheckedItems([])
    setShow(!show)
  }

  useEffect(() => {
    getAvtars();
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  }



  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {loading && <Loader />}
      <Card
        className="avtr_dropzone_wrap avtrs_top_card"
        direction="column"
        w="100%"
        px="0px"
        mb="25px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Container className="inner_card_wrap" maxW="1000px" color="black">
          <div className="avtr_top">
            <div className="avt_inp">
              <div className="top_opt">
                <label htmlFor="upload_avtrs" className="upld_lbl">
                  <input type="file" id="upload_avtrs" onChange={(e) => Add(e)} />
                  <img src={uploadic} alt="Upload" /> Upload avatars
                </label>
                <Input className="hidden" type="file" multiple id="upload_avtrs" name="uploadImages"
                  onChange={(e) => {
                    Add(e)
                  }}
                />
              </div>
            </div>


            <div className="avt_inp">
              <button className="top_opt rw" onClick={() => slectAvtars()}>
                <img src={checklistic} alt="Upload" />
                <span >Select avatars</span>
              </button>
            </div>
            <div className="avt_inp">
              <button className="top_opt rw" onClick={() => DeleteAvatar()}>
                <img src={dltic} alt="Delete" />
                <span >Delete avatars</span>
              </button>
            </div>
          </div>
        </Container>
      </Card>

      <Card
        className="avtrs_btm_card"
        direction="column"
        w="100%"
        px="0px"
        mb="24px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <div className="avtrs_btm_in">
          {avatar?.response?.map((curr) => {
            return (
              <div key={curr._id} className="select_avt_wrap">
                {show && <Checkbox
                  className='img_select_check'
                  colorScheme='brandScheme'
                  me='10px'
                  checked={checkedItems.includes(curr?._id)}
                  id={curr?._id}

                  onChange={(event) => handleCheckboxChange(event, curr?._id)}

                />}

                <label htmlFor="img_chkr">
                  <img src={`${avatar.base_url}/${curr?.avatar}`} alt="avatar" />
                </label>
              </div>
            );
          })}
        </div>
        <div className="d-flex avtar-pagination">
          <ReactPaginate
            className="paginated"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            // pageCount={10}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </Card>
    </Box>
  );
}
