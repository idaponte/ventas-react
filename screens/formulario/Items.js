import { globalStyles } from '../../styles/globals';
import { ItemsScreenHeader } from '../../components/items/ItemsScreenHeader';
import { ItemsList } from '../../components/items/ItemsList';
import { View } from 'react-native';
import { Layout } from '../../components/ui/Layout';

const Items = () => {
    return (
        <Layout>
            <ItemsScreenHeader />
            <ItemsList />
        </Layout>
    );
}

export default Items