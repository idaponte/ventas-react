import { ItemsScreenHeader } from '../../components/items/ItemsScreenHeader';
import { ItemsList } from '../../components/items/ItemsList';
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