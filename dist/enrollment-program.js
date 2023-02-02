"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EnrollmentProgram;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _componentLinkButton = _interopRequireDefault(require("@ivoyant/component-link-button"));
var _reactRouterDom = require("react-router-dom");
require("./styles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const processSearchResults = searchResults => {
  let results = [];
  if (searchResults) {
    results = JSON.parse(searchResults).map((_ref, index) => {
      let {
        firstName,
        lastName,
        identifier,
        addresses
      } = _ref;
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
    });
  }
  return results;
};
function EnrollmentProgram(_ref2) {
  let {} = _ref2;
  const location = (0, _reactRouterDom.useLocation)();
  const [searchResults, setSearchResults] = (0, _react.useState)([]);
  const [ebbUserData, setEBBUserData] = (0, _react.useState)(null);
  const [selectedRow, setSelectedRow] = (0, _react.useState)({});
  const [termsChecked, setTermsChecked] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (location?.state?.routeData) {
      if (location?.state?.routeData?.searchData) {
        setSearchResults(processSearchResults(location?.state?.routeData?.searchData));
        window[window.sessionStorage?.tabId].NEW_BAN = null;
        window[sessionStorage.tabId].conversationId = window[sessionStorage.tabId]?.sessionConversationId;
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
  const columns = [{
    title: 'First Name',
    dataIndex: 'firstName'
  }, {
    title: 'Last Name',
    dataIndex: 'lastName'
  }, {
    title: 'Address Line One',
    dataIndex: 'addressLine1'
  }, {
    title: 'Address Line Two',
    dataIndex: 'addressLine2'
  }, {
    title: 'State',
    dataIndex: 'state'
  }, {
    title: 'City',
    dataIndex: 'city'
  }, {
    title: 'Zip',
    dataIndex: 'zip'
  }];
  const searchColumns = [{
    title: 'First Name',
    dataIndex: 'firstName'
  }, {
    title: 'Last Name',
    dataIndex: 'lastName'
  }, {
    title: 'State',
    dataIndex: 'state'
  }];
  function onCheckBoxChange(e) {
    setTermsChecked(e.target.checked);
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRow(selectedRows[0]);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name
    })
  };
  const handleIdentifier = () => {
    window[window.sessionStorage?.tabId].identityId1 = selectedRow?.identifier;
    window[sessionStorage?.tabId].dispatchRedux('DATA_REQUEST', {
      loadLatest: true,
      datasources: ['360-bis-identity']
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "p-2"
  }, ebbUserData && !searchResults?.length ? /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "headingEnrollment"
  }, "EBB Program Enrollment"), /*#__PURE__*/_react.default.createElement("h3", {
    className: "result-text"
  }, "Please use the below customer information to search!")), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "table-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    columns: searchColumns,
    dataSource: [ebbUserData],
    pagination: false
  })))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "headingEnrollment"
  }, "EBB Program Enrollment"), /*#__PURE__*/_react.default.createElement("h3", {
    className: "result-text"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ebbTextGreen"
  }, "\u2713 ", searchResults?.length, " result found"), ' ', "for this customer. Please select one below to continue with EBB program enrollment.")), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "table-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    rowSelection: {
      type: 'radio',
      ...rowSelection
    },
    columns: columns,
    dataSource: searchResults,
    rowClassName: "table-row",
    pagination: {
      pageSize: 5,
      hideOnSinglePage: true
    }
  })))), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    justify: "end"
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 4,
    className: "button-col"
  }, Object.keys(selectedRow).length > 0 ? /*#__PURE__*/_react.default.createElement(_componentLinkButton.default, {
    type: "primary",
    href: "/dashboards/ebb-enrollment",
    onClick: () => handleIdentifier(),
    routeData: {
      identifier: selectedRow?.identifier
    }
  }, "Continue") : null))), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    dashed: true,
    className: "mt-2"
  }));
}
module.exports = exports.default;