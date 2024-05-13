import { Button, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { TableTournamentComponent } from "./component/TableTournamentComponent";

export const TournamentComponent = () => {
  return (
    <>
      <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
        Quản Lý Giải Đấu
      </Divider>
      <Link to={"them-moi"}>
        <Button type="primary">Thêm mới</Button>
      </Link>
      <TableTournamentComponent />
    </>
  );
};
