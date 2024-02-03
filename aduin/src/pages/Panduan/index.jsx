import { Text } from "components";
import Container from "components/Container";
import React from "react";

import UnderConstruction from "../../assets/images/underconstruction.svg";

const PanduanPage = () => {
  return (
    <Container withoutSearchInput>
      <section className="p-6">
        <Text
          size=""
          className="text-center font-poppins font-bold text-primary text-3xl mb-10"
        >
          Panduan
        </Text>

        <img
          src={UnderConstruction}
          alt="underconstruction"
          className="h-[400px] w-auto"
        />
      </section>
    </Container>
  );
};

export default PanduanPage;
