import { ColorPicker } from "@components/LandingPage/Base/ColorPicker";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${MAIN_SIZE?.SPACING}px;
`;

export const CustomizeEmptyBlock = () => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);
  const selectedStackBlockColumnItem = useSelector(
    (state) => state?.selectedStackBlockColumnItem?.data,
    shallowEqual,
  );

  const selectItem = _.chain(stackBlocks)
    .find((item) => {
      return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
    })
    .value();

  const indexItem = _.findIndex(stackBlocks, (item) => {
    return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
  });

  const attribute = _.get(selectItem, ["attribute", selectedLayoutDesign]);
  const columnItems = _.get(attribute, ["columnItems"]);

  const indexColumnItem = _.findIndex(columnItems, (item) => {
    return _.get(item, ["id"]) === selectedStackBlockColumnItem;
  });

  const currentColumn = _.find(columnItems, (item) => {
    return _.get(item, ["id"]) === selectedStackBlockColumnItem;
  });

  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      backgroundColor: _.get(currentColumn, ["attribute", "backgroundColor"]),
    },
  });

  const backgroundColor = watch("backgroundColor");

  useEffect(() => {
    if (indexItem === -1 && indexColumnItem === -1) {
      return;
    }

    const updateCurrentColumn = { ...currentColumn, attribute: { backgroundColor } };
    if (_.isEqual(updateCurrentColumn, currentColumn)) {
      return;
    }

    const updateColumnItem = [...columnItems];
    updateColumnItem[indexColumnItem] = {
      ...updateCurrentColumn,
    };

    const updateSelectItem = {
      ...selectItem,
      attribute: {
        ...selectItem?.attribute,
        [selectedLayoutDesign]: {
          ...selectItem?.attribute[selectedLayoutDesign],
          columnItems: updateColumnItem,
        },
      },
    };

    const updatedBlocks = [...stackBlocks];
    updatedBlocks[indexItem] = {
      ...updateSelectItem,
    };

    batch(() => {
      dispatch(setStackBlocks(updatedBlocks));
    });
  }, [backgroundColor]);

  useEffect(() => {
    const attributeDevice = _.get(selectItem, ["attribute", selectedLayoutDesign]);
    const attributeCurrentColumnItem = _.get(attributeDevice, ["columnItems", indexColumnItem, "attribute"]);
    reset({
      backgroundColor: _.get(attributeCurrentColumnItem, ["backgroundColor"]),
    });
  }, [selectedLayoutDesign, currentColumn]);

  return (
    <Container>
      <ColorPicker
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $control={control}
        $fontFamily="Sen"
        $name="backgroundColor"
        $label={`background color`}
      />
    </Container>
  );
};
