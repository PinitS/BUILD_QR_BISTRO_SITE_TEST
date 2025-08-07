import { Button } from "@components/LandingPage/Base/Button";
import { Text } from "@components/LandingPage/Base/Text";
import _ from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { batch, shallowEqual, useDispatch, useSelector } from "react-redux";
import { MAIN_COLORS, MAIN_SIZE } from "statics/PAGE_BUILDER_STYLE";
import styled from "styled-components";
import ICON_CUSTOMIZE_CLOSE from "@assets/svgs/PAGE_BUILDER/MENU/ICON_CUSTOMIZE_CLOSE.svg";
import { setCustomizeBlockAttr } from "@redux/reducers/customizeBlockAttr.reducers";
import { Slide } from "@components/LandingPage/Base/Slide";
import { setStackBlocks } from "@redux/reducers/stackBlocks.reducers";
import { COLUMN_HEIGHT_OPTIONS_RANGE } from "statics/PAGE_BUILDER_VOID";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: ${MAIN_SIZE?.SPACING}px;
  gap: ${MAIN_SIZE?.SPACING}px;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${MAIN_SIZE?.SPACING / 2}px;
`;

const ContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${MAIN_COLORS?.MAIN?.LINE};
`;

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${MAIN_SIZE?.SPACING}px;
  /* overflow-y: scroll; */
`;

export const CustomizeStackVoid = () => {
  const dispatch = useDispatch();
  const customizeBlockAttr = useSelector((state) => state?.customizeBlockAttr?.data, shallowEqual);
  const stackBlocks = useSelector((state) => state?.stackBlocks?.data, shallowEqual);
  const selectedLayoutDesign = useSelector((state) => state?.selectedLayoutDesign?.data, shallowEqual);

  const selectItem = _.chain(stackBlocks)
    .find((item) => {
      return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
    })
    .value();

  const indexItem = _.findIndex(stackBlocks, (item) => {
    return _.get(item, ["id"]) === _.get(customizeBlockAttr, ["id"]);
  });

  const attribute = _.get(selectItem, ["attribute", selectedLayoutDesign]);

  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      height: String(_.get(attribute, ["height"])),
      spacing: String(_.get(attribute, ["spacing"])),
      columns: String(_.get(attribute, ["columns"])),
      paddingHorizontal: String(_.get(attribute, ["paddingHorizontal"])),
      paddingVertical: String(_.get(attribute, ["paddingVertical"])),
    },
  });

  const handleCloseCustomize = () => {
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false };
    dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
  };

  const handleRemoveItem = () => {
    const updateStackBlocks = _.filter(stackBlocks, (item, index) => {
      return _.get(selectItem, ["id"]) !== _.get(item, ["id"]);
    });
    const updateCustomizeBlockAttr = { ...customizeBlockAttr, isVisible: false, id: null };
    batch(() => {
      dispatch(setStackBlocks(updateStackBlocks));
      dispatch(setCustomizeBlockAttr(updateCustomizeBlockAttr));
    });
  };

  const height = watch("height");
  const spacing = watch("spacing");
  const columns = watch("columns");

  const paddingHorizontal = watch("paddingHorizontal");
  const paddingVertical = watch("paddingVertical");

  useEffect(() => {
    if (indexItem === -1) {
      return;
    }

    const updateSelectItem = {
      ...selectItem,
      attribute: {
        ...selectItem?.attribute,
        [selectedLayoutDesign]: {
          ...selectItem?.attribute[selectedLayoutDesign],
          height: Number(height),
          spacing: Number(spacing),
          columns: Number(columns),
          paddingHorizontal: Number(paddingHorizontal),
          paddingVertical: Number(paddingVertical),
        },
      },
    };

    if (_.isEqual(updateSelectItem, selectItem)) {
      return;
    }

    const updatedBlocks = [...stackBlocks];
    updatedBlocks[indexItem] = {
      ...updateSelectItem,
    };

    dispatch(setStackBlocks(updatedBlocks));
  }, [height, columns, spacing, paddingHorizontal, paddingVertical]);

  useEffect(() => {
    const attributeDevice = _.get(selectItem, ["attribute", selectedLayoutDesign]);
    reset({
      height: _.get(attributeDevice, ["height"]),
      columns: _.get(attributeDevice, ["columns"]),
      spacing: _.get(attributeDevice, ["spacing"]),
      paddingHorizontal: _.get(attributeDevice, ["paddingHorizontal"]),
      paddingVertical: _.get(attributeDevice, ["paddingVertical"]),
    });
  }, [selectedLayoutDesign, selectItem]);

  return (
    <Container>
      <React.Fragment>
        <ContainerHeader>
          <ContainerTitle>
            <Text
              $fontFamily="Sen"
              $textTransform="capitalize"
              $color={MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE_TEXT}
              $fontSize={16}
              $fontWeight={500}
              $align="start"
            >
              Customize Stack (Void)
            </Text>
            <Button $height={24} $isSquare $mt={4} onClick={() => handleCloseCustomize()}>
              <ICON_CUSTOMIZE_CLOSE
                width={18}
                height={18}
                stroke={MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE_TEXT}
              />
            </Button>
          </ContainerTitle>

          <Line />
        </ContainerHeader>
        <ContainerInput>
          <Button
            $borderRadius={8}
            $height={MAIN_SIZE?.INPUT_DEFAULT_HEIGHT}
            $backgroundColor={MAIN_COLORS?.MAIN?.ERROR_COLOR}
            $width={"100%"}
            onClick={() => handleRemoveItem()}
          >
            <Text
              $fontFamily="Sen"
              $textTransform="capitalize"
              $color={MAIN_COLORS?.MAIN?.CONTAINER_CUSTOMIZE_TEXT}
              $fontSize={16}
              $fontWeight={400}
              $align="start"
            >
              Delete
            </Text>
          </Button>
          <Slide
            $label="columns"
            $fontFamily="Sen"
            $name="columns"
            $min={1}
            $max={4}
            $valueIndicator={columns}
            $control={control}
          />
          <Slide
            $label="Height"
            $fontFamily="Sen"
            $name="height"
            $min={_.get(COLUMN_HEIGHT_OPTIONS_RANGE, [selectedLayoutDesign, "min"])}
            $max={_.get(COLUMN_HEIGHT_OPTIONS_RANGE, [selectedLayoutDesign, "max"])}
            $valueIndicator={height}
            $control={control}
          />
          <Slide
            $label="Spacing"
            $fontFamily="Sen"
            $name="spacing"
            $min={0}
            $max={64}
            $valueIndicator={spacing}
            $control={control}
          />
          <Slide
            $label="Padding (Horizontal)"
            $fontFamily="Sen"
            $name="paddingHorizontal"
            $min={0}
            $max={64}
            $valueIndicator={paddingHorizontal}
            $control={control}
          />
          <Slide
            $label="Padding (Vertical)"
            $fontFamily="Sen"
            $name="paddingVertical"
            $min={0}
            $max={64}
            $valueIndicator={paddingVertical}
            $control={control}
          />
        </ContainerInput>
      </React.Fragment>
    </Container>
  );
};
