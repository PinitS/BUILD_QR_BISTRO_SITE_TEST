import { Select } from "@components/LandingPage/Base/Select";
import { Text } from "@components/LandingPage/Base/Text";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { COLUMN_ITEM_TYPE } from "statics/PAGE_BUILDER_COLUMN_ITEM";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${MAIN_SIZE?.SPACING}px;
`;

export const CustomizeColumnItem = () => {
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: _.get(currentColumn, ["type"]),
    },
  });

  const type = watch("type");

  useEffect(() => {
    if (indexItem === -1 && indexColumnItem === -1) {
      return;
    }

    const updateCurrentColumn = { ...currentColumn, type };
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
  }, [type]);

  useEffect(() => {
    const attributeDevice = _.get(selectItem, ["attribute", selectedLayoutDesign]);
    reset({
      type: _.get(attributeDevice, ["type"]),
    });
  }, [selectedLayoutDesign]);

  return (
    <Container>
      <Select
        $labelColor={MAIN_COLORS?.MAIN?.LABEL_CUSTOMIZE_COLOR}
        $color={MAIN_COLORS?.MAIN?.INPUT_CUSTOMIZE_COLOR}
        $fontFamily="Sen"
        $options={COLUMN_ITEM_TYPE}
        $control={control}
        $name="type"
        $label="type"
      />
      <Text
        $ellipsis={false}
        $fontFamily="Sen"
        $textTransform="capitalize"
        $color={MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE_TEXT}
        $fontSize={16}
        $fontWeight={500}
        $align="start"
      >
        selectedStackBlockColumnItem: {type}
      </Text>
    </Container>
  );
};
