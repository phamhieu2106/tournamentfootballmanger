import { Button, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { TableTeamComponent } from "./component/TableComponent";

export const TeamComponent = () => {
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Quản Lý Đội Bóng
      </Divider>
      <Link to={"them-moi"}>
        <Button type="primary">Thêm mới</Button>
      </Link>
      <TableTeamComponent />
    </>
  );
};
