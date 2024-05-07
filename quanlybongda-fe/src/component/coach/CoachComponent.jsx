import { Button, Divider } from "antd";
import React from "react";
import { TableComponent } from "./component/TableComponent";
import { Link } from "react-router-dom";

export const CoachComponent = () => {
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Quản Lý Huấn Luyện Viên
      </Divider>
      <Link to={"them-moi"}>
        <Button type="primary">Thêm mới</Button>
      </Link>
      <TableComponent />
    </>
  );
};
