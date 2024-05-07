import { Button, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { TableStadiumComponent } from "./component/TableStadiumComponent";

export const StadiumComponent = () => {
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Quản Lý Sân Vận Động
      </Divider>
      <Link to={"them-moi"}>
        <Button type="primary">Thêm mới</Button>
      </Link>
      <TableStadiumComponent />
    </>
  );
};
