import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

function KnowBase() {
  const [treeData, setTreeData] = useState([]);
  const access = localStorage.getItem('accessToken');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/knowbase/', {
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => {
        const data = response.data;
        const groupedData = groupItemsBySection(data);
        const updatedTreeData = convertToTreeData(groupedData);
        setTreeData(updatedTreeData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [access]);

  // Группирует элементы по секциям
  const groupItemsBySection = (data) => {
    const groupedData = {
      FAQ: [],
      Инструкции: [],
      Кейсы: []
    };

    data.forEach(item => {
      groupedData[item.section].push(item);
    });

    return groupedData;
  };

  // Преобразует группированные данные в структуру дерева
  const convertToTreeData = (groupedData) => {
    const treeData = [];

    Object.entries(groupedData).forEach(([section, items]) => {
      const sectionNode = {
        key: section,
        title: section,
        children: items.map(item => ({
          key: item.id,
          title: item.title
        }))
      };

      treeData.push(sectionNode);
    });

    return treeData;
  };

  const onSelect = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  return (
    <div>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </div>
  );
}

export default KnowBase;
