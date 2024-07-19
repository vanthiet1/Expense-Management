import ManagerUser from "../admin/ManagerUser"
import MainContent from "../layouts/MainContent"
const Router = [
    {
        path: '/',
        Component: MainContent
    },
    {
        path: '/admin',
        Component: ManagerUser
    }

]
export default Router