import React, { Component } from 'react';
import { Icon, IconSettings, Card, Modal }  from '@salesforce/design-system-react';
import './FileView.css';
import AddFileDialog from './AddFileDialog';
import * as api from '../api/api';
import queryString from 'query-string';

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
                embedded: (window.FX && window.FX.SALESFORCE && window.FX.SALESFORCE.embedded) || (queryString.parse(document.location.search).embedded && JSON.parse(queryString.parse(document.location.search).embedded)) || false,
                sObjectId: (window.FX && window.FX.SALESFORCE && window.FX.SALESFORCE.currentObjectId) || queryString.parse(document.location.search).id

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
        this.setState({isOpen: false});
        console.log("toggleClose: ", this.state.isOpen)
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
            console.log("files state: ", this.state.files);
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
                <Modal heading="File Upload" isOpen={this.state.isOpen} ariaHideApp={false}>
                    { console.log("sObjectId, ", this.state.sObjectId)}
                    <AddFileDialog
                        onSave={this.fetchData}
                        connection={this.props.connection}
                        parentId={this.state.sObjectId}
                        handleClose={this.toggleClose}
                        />
                </Modal>
                
            </Card>
            </div>
        </IconSettings>
        )
    }

}

export default FileView;