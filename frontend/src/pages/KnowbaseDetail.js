import { Divider, Typography, Skeleton, Space } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import { saveAs } from 'file-saver';

const { Title, Paragraph, Text, Link } = Typography;

const KnowbaseDetail = () => {
    const [data, setData] = useState(null);
    const [author, setAuthor] = useState(null);
    const [attachment, setAttachment] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/knowbase/${id}/`)
            .then((response) => {
                setData(response.data);
                setAttachment(response.data.attach);
                return response.data.author;

            })
            .then((author) => {
                axios
                    .get(`http://localhost:8000/api/user/${author}/`)
                    .then((response) => {
                        setAuthor(response.data.username);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    // Проверка, загружены ли данные из API
    if (!data || !author) {
        return <div><Skeleton active /></div>;
    }

    // Форматирование контента
    const formattedContent = data.content.split('\r\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <Typography>
            <Title level={4}
                style={{
                    margin: 0,
                }}>{data.title}</Title>
            <Paragraph>{formattedContent}</Paragraph>
            {attachment && (
                <Paragraph>
                    <Text keyboard>
                        Вложение:{" "}
                        <a
                            href={attachment}
                            onClick={(e) => {
                                e.preventDefault();
                                saveAs(attachment, "attachment");
                            }}
                        >
                            скачать
                        </a>
                    </Text>
                </Paragraph>
            )}
            <Paragraph><Text italic>Автор: {author}</Text></Paragraph>
        </Typography>
    );
};

export default KnowbaseDetail;
