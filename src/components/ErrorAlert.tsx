import {useRouter} from "next/router";
import React from "react";
import IconButton from "./IconButton";
import Image from "next/legacy/image";
import exitIcon from "/public/arrow-right-from-bracket.svg";
import Modal from "./Modal";

const ErrorAlert = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/home");
  };

  return (
    <Modal>
      <div>서버 오류입니다. </div>
      <IconButton onClick={onClick}>
        <Image src={exitIcon} width={30} height={30} alt="exit" />
      </IconButton>
    </Modal>
  );
};

export default ErrorAlert;
