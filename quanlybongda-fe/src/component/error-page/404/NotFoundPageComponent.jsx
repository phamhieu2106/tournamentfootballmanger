import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPageComponent = () => {
  return (
    <Result
      status="404"
      title="Oops, có chuyện gì đó"
      subTitle="Trang bạn tìm kiếm không tồn tại!"
      extra={
        <Button type="primary">
          {" "}
          <Link to={"/admin"}>Trở lại Trang Chủ</Link>
        </Button>
      }
    />
  );
};
