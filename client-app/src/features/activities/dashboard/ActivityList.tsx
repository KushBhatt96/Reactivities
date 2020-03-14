import React, { SyntheticEvent, useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'

//To reiterate, the Iprops interface is used to type check the incoming props from the parent react component
//If the parent tries to send a prop with the incorrect type, an error message will be shown
interface IProps {
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

//Again our component here just contains a whole bunch of semantic UI elements
//And again we've deconstructed props into activities and selectedActivity
const ActivityList: React.FC<IProps> = ({deleteActivity, submitting, target}) => {
    const activityStore = useContext(ActivityStore);
    const {activities, selectActivity} = activityStore;
    return (
        <Segment clearing>
        <Item.Group divided>
            {activities.map(activity => (
                <Item key = {activity.id}>
                <Item.Content>
                  <Item.Header as='a'>{activity.title}</Item.Header>
                  <Item.Meta>{activity.date}</Item.Meta>
                  <Item.Description>
                      <div>{activity.description}</div>
                      <div>{activity.city}, {activity.venue}</div>
                  </Item.Description>
                  <Item.Extra>
                      <Button
                        onClick = {() => selectActivity(activity.id)}   //when we click this button our selectedActivity is goning be passed in our state in our App component 
                        floated = "right" 
                        content = "view" 
                        color = "blue"
                        />
                        <Button
                        name = {activity.id}
                        loading = {target === activity.id && submitting}
                        onClick = {(e) => deleteActivity(e, activity.id)}   //when we click this button our selectedActivity is goning be passed in our state in our App component 
                        floated = "right" 
                        content = "delete" 
                        color = "red"
                        />
                      <Label basic content = "Category" color = "blue"/>
                  </Item.Extra>
                </Item.Content>
                </Item>
            ))}
      </Item.Group>
      </Segment>
    )
};

export default observer(ActivityList);
