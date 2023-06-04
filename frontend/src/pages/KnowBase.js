import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tree } from 'antd';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { DirectoryTree } = Tree;

function KnowBase() {
  const [treeData, setTreeData] = useState([]);
  const access = localStorage.getItem('accessToken');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/knowbase/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const groupedData = groupItemsBySection(data);
        const convertedData = convertToTreeData(groupedData);
        setTreeData(convertedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [access]);

  const groupItemsBySection = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      if (!groupedData[item.section]) {
        groupedData[item.section] = [];
      }
      groupedData[item.section].push(item);
    });

    return groupedData;
  };

  const convertToTreeData = (groupedData) => {
    return Object.entries(groupedData).map(([section, items]) => {
      const folderNode = {
        title: section,
        key: section,
        icon: <FolderOutlined />,
        children: items.map((item) => ({
          title: <Link to={`http://localhost:3000/knowbase/${item.id}/`}>{item.title}</Link>,
          key: item.id,
          isLeaf: true,
          icon: <FileOutlined style={{ color: '#1890ff' }} />,
        })),
      };

      return folderNode;
    });
  };

  return (
    <d>
      <h2>База знаний</h2>
      <DirectoryTree
        multiple
        defaultExpandAll
        treeData={treeData}
      />
    </d>
  );
}

export default KnowBase;
