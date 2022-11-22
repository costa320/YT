/** @format */

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Image, Row, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.css';

export function Home() {
  const [utenti, setUtenti] = useState([]);

  useEffect(() => {
    getUtenti();
  }, []);

  const getUtenti = () => {
    axios.get('https://randomuser.me/api/?results=18').then((result) => {
      setUtenti(result.data.results);
    });
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: ['name', 'title'],
      key: 'name.title',
      render: (value, row) => {
        return (
          <Space>
            <Avatar src={<Image src={row.picture.large} style={{ width: 32 }} />} />
            {`${row.name.title}. ${row.name.first} ${row.name.last}`}
          </Space>
        );
      },
    },
    {
      title: 'Sesso',
      dataIndex: 'gender',
      align: 'center',
      key: 'gender',
      render: (value, row) => {
        return <UserOutlined style={{ fontSize: '1.5em', color: value === 'male' ? '#006df1' : '#ffc0cb' }} />;
      },
    },
    {
      title: 'Eta',
      dataIndex: ['dob', 'age'],
      key: 'dob.age',
    },
    {
      title: 'Indirizzo',
      dataIndex: ['location', 'street', 'name'],
      key: 'location.street.name',
    },
    {
      title: 'Stato',
      dataIndex: ['location', 'state'],
      key: 'location.state',
    },
  ];
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Table dataSource={utenti} columns={columns} />
        </Col>
      </Row>
    </>
  );
}
