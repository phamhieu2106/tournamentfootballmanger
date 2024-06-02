import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const ServerErrorPageComponent = () => {
  return (
    <Result
      status="500"
      title="Oops, có chuyện gì đó"
      subTitle="Sorry, something went wrong.!"
      extra={
        <Button type="primary">
          {" "}
          <Link to={"/admin"}>Trở lại Trang Chủ</Link>
        </Button>
      }
    />
  );
};
