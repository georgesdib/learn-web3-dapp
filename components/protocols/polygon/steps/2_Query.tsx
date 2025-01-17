/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Space, Typography } from 'antd';
import { ethers } from 'ethers';
import axios from 'axios';
import styled from 'styled-components';

import { PolygonAccountT, PolygonQueryResponse, PolygonQueryErrorResponse } from 'types/polygon-types';

const { Text } = Typography;

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

import { LoadingOutlined } from '@ant-design/icons';

const Query = () => {
  const [queryData, setQueryData] = useState<PolygonQueryResponse | null>(null)
	const [fetching, setFetching] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const getQuery = () => {
		setFetching(true);

    
		axios
			.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polygon/query`)
			.then(res => {
				const data: PolygonQueryResponse = res.data
				setQueryData(data)
				if (!queryData) {
					console.log("queryData not set on first click?")
				} else {
					console.log(queryData)
				}
				setFetching(false)
			})
			.catch(err => {
				console.log(`err.response`, err.response)
				const data: PolygonQueryErrorResponse = err.response.data
				setFetching(false)
				setError(data.message)
			})
	}

  return (
		<Col>
			<Space direction="vertical" size="large">
				<Space direction="vertical">
					<Button type="primary" onClick={getQuery}>Query Polygon</Button>
					{
						fetching
							? <LoadingOutlined style={{ fontSize: 24 }} spin />
							: queryData
								? <Code>{JSON.stringify(queryData, null, 2)}</Code>
								: null
					}
					{
						error &&
							<Alert
								type="error"
								showIcon
								closable
								message={error}
								onClose={() => setError(null)}
							/>
					}
				</Space>
			</Space>
		</Col>
	);
}

const Code = styled.pre`
	font-size: 0.9em;
	padding: 10px;
	background-color: #eee;
	margin-top: 20px;
`;

export default Query
