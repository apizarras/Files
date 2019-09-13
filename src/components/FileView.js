import React, { Component } from 'react';
import { Icon, IconSettings, Card, Button, DataTable, DataTableColumn, DataTableRowActions, Dropdown, Modal }  from '@salesforce/design-system-react';
import './FileView.css';
import AddFileDialog from './AddFileDialog';

class FileView extends Component {
    constructor(props) {
        super(props);
            this.state = {
                AddFileDialogOpen: false
            }
        }
    

    componentDidMount() {
        console.log("component did mount", this.state)
    }

    toggleOpen = () => {
        this.setState({AddFileDialogOpen: true});
        console.log("toggleOpen: ", this.state)
    };

    toggleClose = () => {
        this.setState({AddFileDialogOpen: false})
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
                <Modal show={this.state.AddFileDialog} handleClose={this.toggleClose}>
                    <p>Upload Files Modal</p>
                </Modal>
                <DataTable>
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
                />
            </Card>
            </div>
        </IconSettings>
        )
    }

}

export default FileView;