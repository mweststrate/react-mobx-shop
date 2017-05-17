import React from 'react'
import { observer, inject } from 'mobx-react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './DevTools.css'
import 'react-tabs/style/react-tabs.css';

const DevTools = ({ history }) => (
    <div className="devtools">
        <Tabs>
            <TabList>
                <Tab>Snapshots</Tab>
                <Tab>Patches</Tab>
                <Tab>Actions</Tab>
            </TabList>
            <TabPanel>
                { history.snapshots.map((entry, idx) =>
                    <HistoryEntry key={idx} entry={entry} />
                )}
            </TabPanel>
            <TabPanel>
                { history.patches.map((entry, idx) =>
                    <HistoryEntry key={idx} entry={entry} />
                )}
            </TabPanel>
            <TabPanel>
                { history.actions.map((entry, idx) =>
                    <HistoryEntry key={idx} entry={entry} />
                )}
            </TabPanel>
        </Tabs>
    </div>
)

const HistoryEntry = ({ entry }) => (
    <div className="history-entry" onClick={() => entry.onClick()}>
        { JSON.stringify(entry.data)}
    </div>
)

export default inject("history")(observer(DevTools))
