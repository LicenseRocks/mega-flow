import {
  Button,
  OutlineButton,
  TextButton,
  Image,
  Text,
} from "@licenserocks/kit";
import React from "react";
import styled from "styled-components";

import MegaFlow from "./index";
import schema from "./sample.json";

export default {
  title: "MegaFlow",
};

const Wrapper = styled.div`
  width: 680px;
  margin: auto;
  padding: 16px 0;
`;

const SelectContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: ${({ theme }) => theme.spacing(2)};
  }
`;

export const main = () => {
  const handleWatch = (data) => {
    console.log("data: ", data);
  };

  const handlePreview = (data) => {
    console.log("live data: ", data);
  };

  const getOption = (option) => ({
    label: (
      <SelectContent>
        <Content>
          <Image src={option?.coverSrc} height="30px" width="30px" />
          {option?.title}
        </Content>
        <Text content={`#${option?.id}`} />
      </SelectContent>
    ),
    value: option.id,
  });

  const merchandiseItems = [
    {
      id: 12222342435,
      coverSrc:
        "https://creatorshub.s3.eu-central-1.amazonaws.com/0xbC80A63aA97633aEe78caB002E3fcCEeaF21b506/nftFiles/119/cover/7DCAFA29-0898-4B43-B085-046461C9A606.jpeg",
      title: "Sneackers",
    },
    {
      id: 1227898935,
      coverSrc:
        "https://creatorshub.s3.eu-central-1.amazonaws.com/0xbC80A63aA97633aEe78caB002E3fcCEeaF21b506/nftFiles/147/cover/images.jpeg",
      title: "Jordans",
    },
    {
      id: 9022372435,
      coverSrc:
        "https://creatorshub.s3.eu-central-1.amazonaws.com/0x3391fE5A9B72A737E0F7e0461b4Cf7F977c8C59A/nftFiles/170/cover/Metabear.png",
      title: "Glasses",
    },
  ];

  return (
    <Wrapper>
      <MegaFlow
        defaultValues={{
          initialSalesFees: [
            {
              disabled: true,
              feeName: "ROBA MUSIC",
              feeUser: {
                label: "ROBA Music Verlag GmbH (nft@roba.com)",
                value: 7,
              },
              feeCategory: {
                label: "Creator Rights",
                value: "creator",
              },
              feeAmountType: "PERCENTAGE",
              feeRecipientType: "USER",
              feeAmountPercentage: 15,
            },
          ],
          secondarySalesFees: [
            {
              disabled: true,
              feeName: "PMR Music",
              feeUser: {
                label: "PMR MUSIC (nft@pmr-music.com)",
                value: 8,
              },
              feeCategory: {
                label: "Recording Rights",
                value: "recording",
              },
              feeRecipientType: "USER",
              feeAmountPercentage: 7,
            },
          ],
          currencies: [
            { sign: "€", label: "EUR (€)", value: "eur" },
            { sign: "zł", label: "PLN (zł)", value: "pln" },
            { sign: "$", label: "USD ($)", value: "usd" },
            { sign: "£", label: "GBP (£)", value: "gbp" },
          ],
        }}
        onFinish={(output) => {
          console.log("output: ", output);
        }}
        renderActionButtons={(wizardData) => (
          <>
            <TextButton
              content="Save as Draft"
              color="secondary"
              dInline
              mr={4}
              onClick={() => console.log("wizardData: ", wizardData)}
            />

            <OutlineButton
              color="secondary"
              content="Schedule"
              dInline
              mr={4}
              onClick={() => console.log("wizardData: ", wizardData)}
            />
          </>
        )}
        merchandise={merchandiseItems?.map((item) => getOption(item))}
        schema={schema}
        watcher={handleWatch}
        livePreview={handlePreview}
      />
    </Wrapper>
  );
};
