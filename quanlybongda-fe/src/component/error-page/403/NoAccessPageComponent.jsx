import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const NoAccessPageComponent = () => {
  return (
    <Result
      status="403"
      title="Không có quyền truy cập"
      subTitle="Xin lỗi bạn không có quyền truy cập!"
      extra={
        <Button type="primary">
          {" "}
          <Link to={"/"}>Trở lại Trang Chủ</Link>
        </Button>
      }
    />
  );
};
