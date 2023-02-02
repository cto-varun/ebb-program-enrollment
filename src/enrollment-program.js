import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Checkbox, Divider } from 'antd';
import LinkButton from '@ivoyant/component-link-button';
import { useLocation } from 'react-router-dom';
import './styles.css';

const processSearchResults = (searchResults) => {
    let results = [];
    if (searchResults) {
        results = JSON.parse(searchResults).map(
            ({ firstName, lastName, identifier, addresses }, index) => {
                return {
                    key: index,
                    identifier: identifier,
                    firstName: firstName,
                    lastName: lastName,
                    addressLine1: addresses[0]?.addressLine1,
                    addressLine2: addresses[0]?.addressLine2,
                    state: addresses[0]?.state,
                    city: addresses[0]?.city,
                    zip: addresses[0]?.zip
                };
            }
        );
    }
    return results;
};

export default function EnrollmentProgram({}) {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [ebbUserData, setEBBUserData] = useState(null);

    const [selectedRow, setSelectedRow] = useState({});
    const [termsChecked, setTermsChecked] = useState(false);

    useEffect(() => {
        if (location?.state?.routeData) {
            if (location?.state?.routeData?.searchData) {
                setSearchResults(
                    processSearchResults(location?.state?.routeData?.searchData)
                );
                window[window.sessionStorage?.tabId].NEW_BAN = null;
                window[sessionStorage.tabId].conversationId =
                    window[sessionStorage.tabId]?.sessionConversationId;
                window[window.sessionStorage?.tabId].NEW_CTN = null;
                window[window.sessionStorage?.tabId].authenticated = false;
                if (window[window.sessionStorage?.tabId].unauthenticate) {
                    window[window.sessionStorage?.tabId].unauthenticate();
                }
            } else if (location?.state?.routeData?.ebb) {
                setEBBUserData(location?.state?.routeData?.ebb);
                sessionStorage.removeItem('ebbProgram');
            }
        }
    }, [location?.key]);

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName'
        },
        {
            title: 'Address Line One',
            dataIndex: 'addressLine1'
        },
        {
            title: 'Address Line Two',
            dataIndex: 'addressLine2'
        },
        {
            title: 'State',
            dataIndex: 'state'
        },
        {
            title: 'City',
            dataIndex: 'city'
        },

        {
            title: 'Zip',
            dataIndex: 'zip'
        }
    ];

    const searchColumns = [
        {
            title: 'First Name',
            dataIndex: 'firstName'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName'
        },
        {
            title: 'State',
            dataIndex: 'state'
        }
    ];

    function onCheckBoxChange(e) {
        setTermsChecked(e.target.checked);
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRows[0]);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name
        })
    };

    const handleIdentifier = () => {
        window[window.sessionStorage?.tabId].identityId1 =
            selectedRow?.identifier;
        window[sessionStorage?.tabId].dispatchRedux('DATA_REQUEST', {
            loadLatest: true,
            datasources: ['360-bis-identity']
        });
    };

    return (
        <div className="p-2">
            {ebbUserData && !searchResults?.length ? (
                <Row>
                    <Col span={24}>
                        <h1 className="headingEnrollment">
                            EBB Program Enrollment
                        </h1>
                        <h3 className="result-text">
                            Please use the below customer information to search!
                        </h3>
                    </Col>
                    <Col span={24}>
                        <div className="table-wrapper">
                            <Table
                                columns={searchColumns}
                                dataSource={[ebbUserData]}
                                pagination={false}
                            />
                        </div>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col span={24}>
                            <h1 className="headingEnrollment">
                                EBB Program Enrollment
                            </h1>
                            <h3 className="result-text">
                                <span className="ebbTextGreen">
                                    ✓ {searchResults?.length} result found
                                </span>{' '}
                                for this customer. Please select one below to
                                continue with EBB program enrollment.
                            </h3>
                        </Col>
                        <Col span={24}>
                            <div className="table-wrapper">
                                <Table
                                    rowSelection={{
                                        type: 'radio',
                                        ...rowSelection
                                    }}
                                    columns={columns}
                                    dataSource={searchResults}
                                    rowClassName="table-row"
                                    pagination={{
                                        pageSize: 5,
                                        hideOnSinglePage: true
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Col span={4} className="button-col">
                            {Object.keys(selectedRow).length > 0 ? (
                                <LinkButton
                                    type="primary"
                                    href="/dashboards/ebb-enrollment"
                                    onClick={() => handleIdentifier()}
                                    routeData={{
                                        identifier: selectedRow?.identifier
                                    }}
                                >
                                    Continue
                                </LinkButton>
                            ) : null}
                        </Col>
                    </Row>
                </>
            )}
            <Divider dashed className="mt-2" />
        </div>
    );
}
