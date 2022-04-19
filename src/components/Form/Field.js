import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import {
  BorderedRadio,
  Checkbox,
  FormDatepicker,
  FilePond,
  FileUpload,
  Input,
  PriceField,
  Radio,
  ReactSelect,
  Select,
  Stepper,
  TextArea,
  TextButton,
  ToggleSwitch,
  H6,
  Image,
  Icon,
  Text,
  Modal,
} from "@licenserocks/kit";
import styled, { css } from "styled-components";
import Masonry from "react-masonry-css";

const Item = styled.div`
  width: 168px;
  min-height: 200px !important;
  border-radius: 12px;
  box-shadow: rgba(41, 40, 57, 0.08) 0px 8px 32px;
  cursor: pointer;
  margin: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.palette.common.white};
`;

const SelectItem = styled.div`
  position: relative;
  width: 169px;
  min-height: 200px !important;
  border-radius: 12px;
  border: 3px solid ${({ theme }) => theme.palette.gray.regular};
  cursor: pointer;
  margin: ${({ theme }) => theme.spacing(2)};

  display: grid !important;
  place-items: center;
`;

const Title = styled(H6)`
  flex: 1;
  height: 60px;
  width: 100%;
  padding-left: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(2)};
`;

const StyledImage = styled(Image)`
  width: 148px;
  height: 130px;
  object-fit: cover;
  z-index: 2;
  border-radius: 12px;
  margin-left: 10px;
  margin-right: 10px;
`;
const HeaderRow = styled.div`
  display: flex;
`;

const Close = styled(Icon)`
  width: 14px !important;
  height: 14px !important;
  margin-right: 10px;
  margin-left: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.palette.gray.semiLight};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  ${({ singleChoice }) =>
    singleChoice &&
    css`
      max-width: 200px !important;
    `}

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px !important;
    `}
`;

const AddIcon = styled(Icon)`
  font-size: 28px !important;
  color: ${({ theme }) => theme.palette.gray.medium} !important;
`;

const Description = styled(Text)`
  position: absolute;
  bottom: 40px;
  color: ${({ theme }) => theme.palette.gray.medium};
`;

const StyledModal = styled(Modal)`
  .MuiDialog-paper {
    min-height: 640px !important;
  }
  .MuiDialogTitle-root {
    padding-bottom: ${({ theme }) => theme.spacing(4)};
  }
  .MuiDialogContent-root {
    border-top: none !important;
  }
`;
const GridWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.gray.semiLight};
  padding: ${({ theme }) => theme.spacing(4, 6)};

  overflow-y: scroll;
  height: 530px;

  .nft-masonry-grid {
    display: flex;
    width: auto;

    &:first-child {
      margin-left: -${({ theme }) => theme.spacing(4)};
    }
  }

  .nft-masonry-grid_column {
    padding-left: ${({ theme }) => theme.spacing(2)}; /* gutter size */
    min-width: 180px !important;
  }

  /* Style your items */
  .nft-masonry-grid_column > a,
  .nft-masonry-grid_column > div {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

export const SelectNftCard = ({ onClick }) => {
  return (
    <SelectItem onClick={onClick}>
      <AddIcon icon="plus" />
      <Description content={"select"} />
    </SelectItem>
  );
};

export const Card = ({
  id,
  coverSrc,
  title,
  onClick,
  isRemovable,
  onRemove,
}) => {
  return (
    <Item onClick={onClick}>
      <HeaderRow>
        <Title content={title} />

        {isRemovable && (
          <Close onClick={() => onRemove(id)} color="secondary" icon="times" />
        )}
      </HeaderRow>

      <StyledImage src={coverSrc} />
    </Item>
  );
};

export const NftsPreview = ({ items, onRemove, action }) => {
  return (
    <>
      <Container>
        {items?.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              coverSrc={item.coverSrc}
              isRemovable
              onRemove={onRemove}
            />
          );
        })}

        <SelectNftCard onClick={action} />
      </Container>
    </>
  );
};

const CardItem = styled.div`
  width: 168px;
  min-height: 200px !important;
  border-radius: 12px;
  box-shadow: rgba(41, 40, 57, 0.08) 0px 8px 32px;
  cursor: pointer;
  margin: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.palette.common.white};
`;

const CardTitle = styled(H6)`
  flex: 1;
  height: 60px;
  width: 100%;
  padding-left: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(2)};
`;

const CardStyledImage = styled(Image)`
  width: 148px;
  height: 130px;
  object-fit: cover;
  z-index: 2;
  border-radius: 12px;
  margin-left: 10px;
  margin-right: 10px;
`;
const CardHeaderRow = styled.div`
  display: flex;
`;

const CardClose = styled(Icon)`
  width: 14px !important;
  height: 14px !important;
  margin-right: 10px;
  margin-left: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
`;

const CardSelectCircle = styled.div`
  width: 24px !important;
  height: 24px !important;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.palette.gray.regular};
  margin-right: 10px;
  margin-left: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
  display: grid;
  place-items: center;

  svg {
    color: ${({ theme }) => theme.palette.common.white} !important;
  }

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${({ theme }) => theme.palette.primary.main};
    `}
`;

const CardNumber = styled(Text)`
  color: ${({ theme }) => theme.palette.common.white};
`;

export const SelectItemCard = ({
  id,
  coverSrc,
  title,
  checked,
  onClick,
  isRemovable,
  onRemove,
}) => {
  return (
    <CardItem onClick={onClick}>
      <CardHeaderRow>
        <CardTitle content={title} />
        <CardSelectCircle checked={checked}>
          {checked && <Icon icon="check" />}
        </CardSelectCircle>
        {isRemovable && (
          <CardClose
            onClick={() => onRemove(id)}
            color="secondary"
            icon="times"
          />
        )}
      </CardHeaderRow>
      <CardStyledImage src={coverSrc} />
    </CardItem>
  );
};

export const SelectItemsModal = ({
  action,
  isOpen,
  onClose,
  handleSelectItems,
  selectedItems,
  options,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const isChecked = (option) => {
    let checkStatus = selectedItems?.some(
      (item) => Number(item.id) === option.id
    );
    return checkStatus;
  };

  return (
    <StyledModal
      cancelButton={true}
      action={onClose}
      actionTitle={`add`}
      title={`select Merch Items`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <GridWrapper>
        <Masonry
          breakpointCols={{
            default: 4,
            1265: 4,
            950: 3,
            650: 2,
            513: 1,
          }}
          className="nft-masonry-grid"
          columnClassName="nft-masonry-grid_column"
        >
          {options?.map((option) => {
            return (
              <SelectItemCard
                checked={isChecked(option)}
                onClick={() => {
                  if (!selectedItems?.some((item) => item.id === option.id)) {
                    handleSelectItems([
                      ...selectedItems,
                      {
                        id: option.id,
                        coverSrc: option.coverSrc,
                        title: option.title,
                      },
                    ]);
                  } else if (
                    selectedItems?.some((item) => item.id === option.id)
                  ) {
                    handleSelectItems(
                      selectedItems?.filter((item) => item.id !== option.id)
                    );
                  }
                }}
                key={option.id}
                id={option.id}
                title={option.title}
                coverSrc={option.coverSrc}
              />
            );
          })}
        </Masonry>
      </GridWrapper>
    </StyledModal>
  );
};

export const ItemSelect = ({ register, control, setValue, options }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setValue(
      `selectedItems`,
      selectedItems?.map((item) => item?.id)
    );
  }, [selectedItems]);

  const removeSelectedItem = (id) => {
    setSelectedItems(selectedItems?.filter((item) => item.id !== id));
  };
  return (
    <>
      <Controller
        as={
          <NftsPreview
            action={() => setOpenModal(true)}
            items={selectedItems}
            onRemove={removeSelectedItem}
          />
        }
        register={register}
        control={control}
        name="selectedItems"
      />
      <SelectItemsModal
        action={() => setOpenModal(true)}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        handleSelectItems={(props) => setSelectedItems(props)}
        selectedItems={selectedItems}
        options={options}
      />
    </>
  );
};

const mapFieldTypeToComponent = (fieldType) => {
  switch (fieldType) {
    case "datepicker":
      return FormDatepicker;
    case "select":
      return Select;
    case "borderedRadio":
      return BorderedRadio;
    case "checkbox":
      return Checkbox;
    case "radio":
      return Radio;
    case "toggleSwitch":
      return ToggleSwitch;
    case "fileUpload":
      return FileUpload;
    case "filePond":
      return FilePond;
    case "price":
      return PriceField;
    case "reactSelect":
      return ReactSelect;
    case "stepper":
      return Stepper;
    case "textArea":
      return TextArea;
    case "itemSelect":
      return ItemSelect;
    default:
      return Input;
  }
};

export const FormField = ({
  data,
  field,
  hasError,
  isRecurring,
  recurringIndex,
  stepIndex,
  fieldId,
  rowId,
  stepData,
  merchandise,
}) => {
  const { control, setValue, register } = useFormContext();
  const {
    conditions,
    defaultValue,
    name,
    required,
    type,
    options,
    ...others
  } = field;

  if (type === "link") return <TextButton {...others} />;

  const Field = mapFieldTypeToComponent(type);
  const fieldKey = `step-${stepIndex}-row-${rowId}-field-${fieldId}`;
  const fieldName = isRecurring
    ? `${data.name}[${recurringIndex}].${name}`
    : name;

  const prevValue =
    isRecurring && stepData[data.name] && stepData[data.name][recurringIndex]
      ? stepData[data.name][recurringIndex][name]
      : stepData[name];

  if (field?.currencies !== undefined) {
    field.currencies = stepData?.currencies;
  }

  return (
    <Field
      control={control}
      defaultValue={prevValue || defaultValue}
      hasError={hasError}
      isRequired={required}
      key={fieldKey}
      name={fieldName}
      register={register({
        required,
      })}
      setValue={setValue}
      options={field?.name !== "selectMerchIds" ? options : merchandise}
      type={type}
      {...others}
    />
  );
};

FormField.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  field: PropTypes.shape({
    conditions: PropTypes.arrayOf(PropTypes.string),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.string,
    required: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  fieldId: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired,
  isRecurring: PropTypes.bool.isRequired,
  recurringIndex: PropTypes.number,
  stepIndex: PropTypes.number.isRequired,
  stepData: PropTypes.shape({}).isRequired,
  rowId: PropTypes.number.isRequired,
};

FormField.defaultProps = {
  recurringIndex: null,
};
