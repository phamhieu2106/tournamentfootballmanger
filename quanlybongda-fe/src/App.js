import React, { useState } from "react";
import "./App.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import NationalComponent from "./component/nation/NationalComponent";
import { Footer } from "antd/es/layout/layout";
import { Link, Route, Routes } from "react-router-dom";
import PlayerComponent from "./component/player/PlayerComponent";
import { PlayerAddComponent } from "./component/player/component/PlayerAddComponent";
import { CoachComponent } from "./component/coach/CoachComponent";
import { AddFormComponent } from "./component/coach/component/AddFormComponent";
import { UpdateFormComponent } from "./component/coach/component/UpdateFormComponent";
import { TeamComponent } from "./component/team/TeamComponent";
import { AddFormTeamComponent } from "./component/team/component/AddFormComponent";
import { UpdateTeamFormComponent } from "./component/team/component/UpdateFormComponent";
import { HomePageComponent } from "./component/home-page/HomePageComponent";
import { StadiumComponent } from "./component/stadium/StadiumComponent";
import { FormAddStadiumComponent } from "./component/stadium/component/FormAddStadiumComponent";
import { FormUpdateStadiumComponent } from "./component/stadium/component/FormUpdateStadiumComponent";
const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "0",
      icon: <UserOutlined />,
      label: <Link to={"/"}>Trang Chủ</Link>,
    },
    {
      key: "1",
      icon: <UploadOutlined />,
      label: <Link to={"/nations"}>Quốc Gia</Link>,
    },
    {
      key: "3",
      icon: <VideoCameraOutlined />,
      label: <Link to={"/coaches"}>Huấn Luyện Viên</Link>,
    },
    // {
    //   key: "4",
    //   icon: <VideoCameraOutlined />,
    //   label: <Link to={"/players"}>Cầu Thủ</Link>,
    // },
    {
      key: "5",
      icon: <VideoCameraOutlined />,
      label: <Link to={"/teams"}>Đội Bóng</Link>,
    },
    {
      key: "6",
      icon: <VideoCameraOutlined />,
      label: <Link to={"/stadiums"}>Sân Vận Động</Link>,
    },
  ];
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<HomePageComponent />}></Route>
            <Route path="/nations" element={<NationalComponent />}></Route>
            <Route path="/coaches" element={<CoachComponent />}></Route>
            <Route
              path="/coaches/them-moi"
              element={<AddFormComponent />}
            ></Route>
            <Route
              path="/coaches/:id"
              element={<UpdateFormComponent />}
            ></Route>
            <Route path="/players" element={<PlayerComponent />}></Route>
            <Route
              path="/players/them-moi"
              element={<PlayerAddComponent />}
            ></Route>
            <Route path="/teams" element={<TeamComponent />}></Route>
            <Route
              path="/teams/them-moi"
              element={<AddFormTeamComponent />}
            ></Route>
            <Route
              path="/teams/:id"
              element={<UpdateTeamFormComponent />}
            ></Route>
            <Route path="/stadiums" element={<StadiumComponent />}></Route>
            <Route
              path="/stadiums/them-moi"
              element={<FormAddStadiumComponent />}
            ></Route>
            <Route
              path="/stadiums/:id"
              element={<FormUpdateStadiumComponent />}
            ></Route>
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Website Quản Lý Giải Đấu Bóng Đá ©{new Date().getFullYear()} Được Tạo
          Bởi Phieu2106
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
