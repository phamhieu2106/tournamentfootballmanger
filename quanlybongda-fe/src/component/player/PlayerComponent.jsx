import { Button, Divider } from "antd";
import React, { Component } from "react";
import TableComponent from "./component/TableComponent";
import { Link } from "react-router-dom";

export class PlayerComponent extends Component {
  render() {
    return (
      <>
        <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
          Quản Lý Cầu Thủ
        </Divider>
        <Link to={"them-moi"}>
          <Button type="primary">Thêm mới</Button>
        </Link>
        <TableComponent />
      </>
    );
  }
}

export default PlayerComponent;
