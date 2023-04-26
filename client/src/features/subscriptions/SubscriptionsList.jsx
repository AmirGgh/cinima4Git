
import { Grid } from '@mui/material';
import Loading from '../../components/Loading';
import Subscription from './Subscription';
import { useGetMembersQuery } from './subscriptionsSlice'
import { validPermission } from '../../utils/permissionsUI';
import { useContext } from 'react';
import { AppContext } from '../../App';

const SubscriptionsList = () => {
    const { currPermissions } = useContext(AppContext)

    const {
        data: members,
        isLoading,
        isSuccess
    } = useGetMembersQuery('getMembers')


    const editPer = validPermission("Update Subscriptions", currPermissions)
    const viewSubsPer = validPermission("View Subscriptions", currPermissions)
    let content
    if (isLoading) {
        content = <Loading />
    } else if (isSuccess) {
        content = members.ids.filter((id) => members.entities[id].firstName).map(id => <Subscription key={id} id={id} viewSubsPer={viewSubsPer} editPer={editPer} />)
    }
    return (
        <Grid container display="flex" spacing={2}  >
            {content}
        </Grid>)
}

export default SubscriptionsList