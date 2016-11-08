import React, {Component, PropTypes } from "react";
import Tabs from "dnn-tabs";
import Localization from "../../localization";
import PageDetails from "../PageDetails/PageDetails";
import PermissionGrid from "./PermissionGrid";
import Button from "dnn-button";
import styles from "./style.less";
import Modules from "../Modules/Modules";
import Seo from "../Seo/Seo";
import More from "../More/More";
import Appearance from "../Appearance/Appearance";
import PageTypeSelector from "../PageTypeSelector/PageTypeSelector";

class PageSettings extends Component {

    getButtons() {
        const {selectedPage, onCancel, onSave} = this.props;
        const saveButtonText = selectedPage.tabId === 0 ? 
            Localization.get("Add Page") : Localization.get("Save");

        return (
            <div className="buttons-box">
                <Button
                    type="secondary"
                    onClick={onCancel}>
                    {Localization.get("Cancel")}
                </Button>
                <Button
                    type="primary"
                    onClick={onSave}>
                    {saveButtonText}
                </Button>
            </div>
        );
    }

    render() {
        const {
            selectedPage, 
            selectedPageErrors, 
            onChangeField, 
            onChangePageType, 
            onDeletePageModule, 
            onToggleEditPageModule,
            editingSettingModuleId
        } = this.props;
        const buttons = this.getButtons();

        return (
            <Tabs 
                tabHeaders={[Localization.get("Details"), 
                             Localization.get("Permissions"), 
                             Localization.get("Advanced")]}
                className={styles.pageSettings}>
                <div className="dnn-simple-tab-item">
                    <PageTypeSelector
                        page={selectedPage}
                        onChangePageType={onChangePageType} />
                    <PageDetails 
                        page={selectedPage}
                        errors={selectedPageErrors} 
                        onChangeField={onChangeField} />
                    {buttons}
                </div>
                <div className="dnn-simple-tab-item">                
                    <PermissionGrid
                        permissions={selectedPage.permissions} 
                        onPermissionsChanged={this.props.onPermissionsChanged} />
                    {buttons}
                </div>
                <div>
                    <Tabs 
                        tabHeaders={[Localization.get("Modules"), 
                                     Localization.get("Appearance"), 
                                     Localization.get("S.E.O."), 
                                     Localization.get("More")]}
                        
                        type="secondary">
                        <div className="dnn-simple-tab-item">
                            <Modules 
                                modules={selectedPage.modules} 
                                absolutePageUrl={selectedPage.absoluteUrl}
                                onDeleteModule={onDeletePageModule}
                                onToggleEditModule={onToggleEditPageModule}
                                editingSettingModuleId={editingSettingModuleId} />
                        </div>
                        <div className="dnn-simple-tab-item">
                            <Appearance page={selectedPage} />
                        </div>
                        <div className="dnn-simple-tab-item">
                            <Seo page={selectedPage}
                                onChangeField={onChangeField} />
                        </div>
                        <div className="dnn-simple-tab-item">
                            <More page={selectedPage}
                                onChangeField={onChangeField} />
                            {buttons}
                        </div>
                    </Tabs>
                </div>
            </Tabs>
        );
    }    
}

PageSettings.propTypes = {
    selectedPage: PropTypes.object.isRequired,
    selectedPageErrors: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onChangeField: PropTypes.func.isRequired,
    onPermissionsChanged: PropTypes.func.isRequired,
    onChangePageType: PropTypes.func.isRequired,
    onDeletePageModule: PropTypes.func.isRequired,
    onToggleEditPageModule: PropTypes.func.isRequired,
    editingSettingModuleId: PropTypes.number
};

export default PageSettings;

