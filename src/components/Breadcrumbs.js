import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Breadcrumbs = (props) => {
	const { Items } = props;

	return (
		<Breadcrumb>
			{
				Items.map((item, index) => (
					<Breadcrumb.Item key={index} href={item.href}>{item.text}</Breadcrumb.Item>
				))
			}
		</Breadcrumb>
	)
}

export default Breadcrumbs;