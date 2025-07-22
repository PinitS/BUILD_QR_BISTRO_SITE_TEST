import { Button } from "@components/Base/Button";
import { Text } from "@components/Base/Text";
import _ from "lodash";
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { EDITOR_DEFAULT_STYLE } from "statics/DEFAULT_STYLE";
import { useForm } from "react-hook-form";
import { Slider } from "@components/Base/Slider";
import { Input } from "@components/Base/Input";
import { setFreeformBlocks } from "@redux/reducers/editor/freeformBlocks.reducers";

const Container = styled.div`
  width: 324px;
  background: ${EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.BACKGROUND};
  border-radius: 18px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${EDITOR_DEFAULT_STYLE?.LINE_COLOR};
`;

const ContainerSelectItem = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 68px;
  background: ${EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_BACKGROUND_COLOR};
  border-color: ${EDITOR_DEFAULT_STYLE?.IMPORT_FORM?.SELECT_BORDER_COLOR_INACTIVE};
  border-width: 1px;
  border-style: dashed;
  border-radius: 8px;
`;

const SELECT_LIST = [
  { label: "TEXT", value: "TEXT" },
  { label: "IMAGE", value: "IMAGE" },
];

export const SettingFreeformAttributeText = () => {
  const dispatch = useDispatch();
  const modalAttribute = useSelector((state) => state?.modalAttribute?.data, shallowEqual);
  const freeformBlocks = useSelector((state) => state?.freeformBlocks?.data, shallowEqual);
  const selectedFreeformBlock = useSelector((state) => state?.selectedFreeformBlock?.data, shallowEqual);
  const selectedFreeformBlockId = _.get(selectedFreeformBlock, ["id"]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      value: _.get(selectedFreeformBlock, ["attribute", "value"]) || "",
      size: _.get(selectedFreeformBlock, ["attribute", "size"]),
    },
  });

  const targetIndex = useMemo(() => {
    const result = _.findIndex(freeformBlocks, (item) => {
      return _.get(item, ["id"]) === selectedFreeformBlockId;
    });
    return result;
  }, [freeformBlocks, selectedFreeformBlockId]);

  console.log("targetIndex :>> ", targetIndex);

  const value = watch("value");
  const size = watch("size");

  useEffect(() => {
    console.log("freeformBlocks :>> ", freeformBlocks);
    if (targetIndex === -1) {
      return;
    }

    const targetBlock = _.get(freeformBlocks, [targetIndex]);
    const updatedAttr = { ...targetBlock?.attribute, value, size };

    if (_.isEqual(targetBlock.attribute, updatedAttr)) {
      return;
    }

    const updatedBlocks = [...freeformBlocks];
    updatedBlocks[targetIndex] = {
      ...targetBlock,
      attribute: updatedAttr,
    };

    console.log("updatedBlocks :>> ", updatedBlocks);
    dispatch(setFreeformBlocks(updatedBlocks));
  }, [value, size]);

  return (
    <Container>
      <ContainerHeader>
        <Text $fontSize={18} $fontWeight={500}>
          Setting Attribute (Text)
        </Text>
        <Line />
      </ContainerHeader>
      <Slider $control={control} $name="size" $label="Size" />
      <Input $control={control} $name="value" $label="Text" />
    </Container>
  );
};
