import React, { Component } from "react";
import { Table } from "antd";

const moment = require("moment");

class PatientTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null
    };
  }

  componentDidUpdate = lastProp => {
    console.log(lastProp, this.props, this.state);
    if (lastProp != this.props) {
      this.setState({
        tableData: this.updatePatientArray(this.props.patientData)
      });
    }
  };

  updatePatientArray = patients => {
    const tableData = [];
    patients.forEach(element => {
      if (!element) {
        return null;
      }
      element = element.resource;
      let patient = new Object();
      patient.name = element.name?.[0]?.family + " " + element.name?.[0]?.given?.[0];
      patient.id = element.id;
      patient.phone = element.telecom?.[0]?.value;
      patient.language = element.communication?.[0]?.language?.text;
      patient.maritalStatus = element.maritalStatus?.text;
      patient.address = element.address?.[0]?.line[0];
      patient.country = element.address?.[0]?.country;
      patient.gender = element.gender;
      patient.birthDate = element.birthDate;
      patient.age = moment().diff(element.birthDate, "years");
      tableData.push(patient);
    });

    return tableData;
  };

  render() {
    const { loading } = this.props;

    if (loading) {
      return <div></div>;
    }

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: text => <a>{text}</a>,
        ellipsis: true,
        width: 200,
        sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        ellipsis: true,
        sorter: (a, b) => a.id.localeCompare(b.id)
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        ellipsis: true,
        sorter: (a, b) => a.gender.localeCompare(b.gender)
      },
      {
        title: "Brith Date",
        dataIndex: "birthDate",
        key: "birthDate",
        ellipsis: true,
        sorter: (a, b) => a.birthDate.localeCompare(b.birthDate)
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        ellipsis: true,
        sorter: true,
        sorter: (a, b) => a.age - b.age
      },
      {
        title: "language",
        dataIndex: "language",
        key: "language",
        ellipsis: true,
        sorter: (a, b) => a.language.localeCompare(b.language)
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        ellipsis: true,
        sorter: (a, b) => a.phone.localeCompare(b.phone)
      },
      {
        title: "Marital Status",
        dataIndex: "maritalStatus",
        key: "maritalStatus",
        ellipsis: true,
        sorter: (a, b) => a.maritalStatus.localeCompare(b.maritalStatus)
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        ellipsis: true,
        sorter: (a, b) => a.address.localeCompare(b.address)
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        ellipsis: true,
        sorter: (a, b) => a.country.localeCompare(b.country)
      }
    ];

    return (
      <Table
        columns={columns}
        pagination={{ showSizeChanger: true }}
        dataSource={this.state.tableData}
      />
    );
  }
}

export default PatientTable;
