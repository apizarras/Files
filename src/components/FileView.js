import React, { Component } from 'react';
import { Icon, IconSettings, Card, Button, DataTable, DataTableColumn, DataTableRowActions, Dropdown, Modal }  from '@salesforce/design-system-react';
import './FileView.css';
import AddFileDialog from './AddFileDialog';

class FileView extends Component {
    constructor(props) {
        super(props);
            this.state = {
                isOpen: false,
            }
        }
    

    componentDidMount() {
        console.log("component did mount", this.state)
    }

    toggleOpen = () => {
        this.setState({isOpen: true});
        console.log("toggleOpen: ", this.state)
    };

    toggleClose = () => {
        this.setState({isOpen: false})
    }

    render() {
        return (
        <IconSettings iconPath="/assets/icons">
            <div className="slds-grid slds-grid_vertical component-container">
            <Card
                heading="Files"
                icon={<Icon category="standard" name="document" size="small" />}
                headerActions={<button type="button" onClick={this.toggleOpen}>Upload File</button>}
            >
                <Modal title="File Upload" isOpen= {this.state.isOpen} handleClose={this.toggleClose}>
                    <AddFileDialog onSave={this.fetchData} />
                </Modal>
                {/* <DataTable items={this.state.items}>
                <DataTableColumn
                    label="Title" />
                <DataTableColumn
                    label="Owner" />
                <DataTableColumn
                    label="Last Modified" />
                <DataTableColumn
                    label="Last Modified By" />
                </DataTable>
                <DataTableRowActions
                options={[
                {label: "Preview"},
                {label: "Delete"},
                {label: "Dowload"}
                ]}
                menuPostion="overflowBoundaryElement"
                onAction={this.handleRowAction}
                dropdown={<Dropdown dir="rtl" />}
                /> */}
            </Card>
            </div>
        </IconSettings>
        )
    }

}

export default FileView;