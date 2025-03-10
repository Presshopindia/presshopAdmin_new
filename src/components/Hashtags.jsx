import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated"; // for animations in select
import { Get } from "api/admin.services";
const animatedComponents = makeAnimated();

const TagSelect = ({ curr, index, setPublishedData }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const fetchTags = async (input) => {
    try {
      const response = await Get("admin/getTags");
      if (response) {
        const fetchedTags = response.data.tags.map((tag) => ({
          label: `#${tag.name}`,
          value: tag.name,
          _id: tag._id,
        }));
        setOptions(fetchedTags);
      }
    } catch (error) {
      console.error("Error fetching tags", error);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    if (!selectedOptions) return;
    const selectedTags = selectedOptions.map((option) => ({
      name: option.value,
      _id: option._id,
    }));

    curr.tagData = selectedTags;
    curr.tag_ids = selectedTags.map((ele) => ele._id);

    setPublishedData((pre) => {
      const updatedData = [...pre];
      updatedData[index] = curr;
      return updatedData;
    });
  };

  const handleInputChange = (input) => {
    setInputValue(input);
    if (input.startsWith("#")) fetchTags(input);
  };

  const handleBlur = () => {
    if (
      inputValue &&
      !options.some(
        (option) => option.value.toLowerCase() === inputValue.toLowerCase()
      )
    ) {
      const tags = inputValue.split(/[\s,]+/);
      tags?.forEach((tag) => {
        const newTag = {
          label: `#${tag}`,
          value: tag.toLowerCase().replace(/\W/g, ""),
          _id: tag.toLowerCase().replace(/\W/g, ""),
        };
        setOptions((prevOptions) => [...prevOptions, newTag]);
        curr.tagData = [...curr.tagData, { name: tag, _id: newTag._id }];
        curr.tag_ids = [...curr.tag_ids, newTag._id];

        setPublishedData((pre) => {
          const updatedData = [...pre];
          updatedData[index] = curr;
          return updatedData;
        });
      });
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 200,
      maxHeight: 100,
      overflowY: "auto",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: 200,
      overflowY: "auto",
    }),
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      value={curr.tagData.map((tag) => ({
        label: `#${tag.name}`,
        value: tag.name,
        _id: tag._id,
      }))}
      onInputChange={handleInputChange} // Handle input change
      onChange={handleSelectChange} // Handle selection
      onBlur={handleBlur} // Handle blur to create new option if necessary
      options={options} // Dynamic options from API
      inputValue={inputValue} // Display input value in select
      placeholder="Type # to search hashtags"
      isClearable={false}
      styles={customStyles}
      autoFocus={false}
      menuPosition="fixed"
    />
  );
};

export default TagSelect;

TagSelect.propTypes = {
  curr: PropTypes.shape({
    tagData: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    tag_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setPublishedData: PropTypes.func.isRequired,
};