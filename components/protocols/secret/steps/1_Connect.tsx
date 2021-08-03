import { useEffect, useState } from 'react';
import axios from "axios";
import { Alert, Col, Space, Typography } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Connect = () => {
	const [version, setVersion] = useState<string>('');
	const [fetchingVersion, setFetchingVersion] = useState<boolean>(false);

	useEffect(() => {
		getConnection();
	}, []);

    const getConnection = () => {
        setFetchingVersion(true)
		axios
			.get(`/api/secret/connect`)
			.then(res => {
				const version = res.data
				setVersion(version)
				setFetchingVersion(false)
			})
			.catch(err => {
				console.error(err)
				setFetchingVersion(false)
			})
	}

	return (
		<Col style={{ width: "100%" }}>
			{fetchingVersion
				? <LoadingOutlined style={{ fontSize: 24 }} spin />
				: version.length != 0
				? <Alert
					message={
						<Space>
						Connected to Secret!
						<Text code>{version}</Text>
						</Space>
					}
					type="success"
					showIcon
				/>
          : <Alert message={`Not connected to Secret`} type="error" showIcon />}
		</Col>
	);
}

export default Connect