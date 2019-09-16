import React, { Component } from 'react';
import { Icon, IconSettings, Card, Button, DataTable, DataTableColumn, DataTableRowActions, Dropdown, Modal }  from '@salesforce/design-system-react';
import './FileView.css';
import AddFileDialog from './AddFileDialog';
import * as api from '../api/api';

class FileView extends Component {
    constructor(props) {
        super(props);
            this.state = {
                isOpen: false,
                connection: props.connection,
                parentId: null,
                sessionExpired: false,
                isBusy: true,
                isDirty: false,
                fileToDelete: null,
                showDeletePrompt: false,
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

    fetchData = () => {
        const { connection } = this.props;
        const { sObjectId, embedded } = this.state;
    
        this.setState({
          isBusy: true
        });
    
        return api
          .globalDescribe(connection)
          .then(() => {
            return api.fetchDescription(connection, 'ContentVersion')
          })
          .then(() => {
            const description = api.descriptions[sObjectId.slice(0,3)];
            return Promise.all([api.fetchFiles(connection, sObjectId, embedded), api.getObjectInfo(connection, description.name, sObjectId)])
          })
          .then(([files, objectName]) => {
            this.setState({ files, objectName, isBusy: false });
          })
          .catch(function(err) {
            if (err.errorCode === 'INVALID_SESSION_ID') {
              this.setState({ sessionExpired: true, isBusy: false });
            }
            console.log(`%c>>>> ERROR `, `background-color: red; color:yellow;` , err );
          })
      };

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
                    <AddFileDialog
                        onSave={this.fetchData}
                        // connection={connection}
                        // parentId={sObjectId} 
                        />
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