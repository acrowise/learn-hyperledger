import React from "react";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import FileUpload from "components/FileUpload";
import CodePanel from "components/CodePanel/Loadable";
import VisualPanel from "components/VisualPanel/Loadable";
import Forms from "components/Forms";

export default class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { addFile, isValid, filename, transactions, changeTab, currentTab, ...rest } = this.props;
    return (
      <div className="grid-x grid-padding-x">
        <div className="auto cell grid-x">
          <div className="cell">
            <FileUpload
              isValid={isValid}
              addFile={addFile}
              filename={filename}
            />
            <Forms isValid={isValid} filename={filename} {...rest} />
          </div>
          <div className="cell">
            <h4>
              <FormattedMessage {...messages.intro} />
            </h4>
          </div>
        </div>
        <div className="auto cell">
        <AppBar position="static" color="default">
          <Tabs
            value={currentTab}
            onChange={(e,value)=> changeTab(value)}
            indicatorColor="primary"
          >
            <Tab label="Code" />
            <Tab label="Visual" />
          </Tabs>
        </AppBar>
        {currentTab === 0 && <CodePanel transactions={transactions} />}
        {currentTab === 1 && <VisualPanel transactions={transactions} />}
        </div>
      </div>
    );
  }
}
