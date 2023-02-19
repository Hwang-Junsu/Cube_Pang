import Head from "next/head";
import React from "react";
import styled from "styled-components";

const Layout = ({
  children,
  seoTitle,
}: {
  children: React.ReactNode;
  seoTitle: string;
}) => {
  return (
    <>
      <Head>
        <title>{seoTitle}</title>
      </Head>
      <StyledMain>{children}</StyledMain>
    </>
  );
};

export default Layout;

const StyledMain = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);
`;
