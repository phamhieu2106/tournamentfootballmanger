import { Button, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const AddFormTeamComponent = () => {
  return (
    <>
      <>
        <Divider style={{ fontWeight: "bolder", fontSize: 40 }}>
          Thêm Mới Đội Bóng
        </Divider>
        <Link to={"/teams"}>
          <Button type="primary" style={{ marginBottom: 20 }}>
            Quay lại
          </Button>
        </Link>
      </>
    </>
  );
};
