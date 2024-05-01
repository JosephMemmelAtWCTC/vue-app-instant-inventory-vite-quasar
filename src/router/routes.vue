<script>
import InventoryCollection from "src/models/InventoryCollection";
import Category from "src/models/Category";
import StoreItem from "src/models/StoreItem";
import Product from "src/models/Product";


const library = new InventoryCollection()
  .add(new Category('Category 1','Category 1\'s description', 'src/assets/icons/folder.svg'))
  .add(new StoreItem(
    new Product(
      'Fjallraven - Foldsack No. 1 Backpack',
      'Your perfect pack for everyday use and walks in the forest.',
      'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      '923087'
    ), 2, 4, Date.now() - 1000 * 60 * 60 * 9)
  );
const appNavigation = {
  currentPage: "home",
  currentPageLabel: "",
};
const appInfo = {//TODO: Remove!
  appTitle: "Instant Inventory",
  appVersion: "Vue App v4.0 (Demo)",
  sideBarWidth: 180,
};

const userInfo = {
  profileName: "Test Testerson",
  profileAvatar: "https://avatars.githubusercontent.com/u/67847710",
  password: "ABCD",
}
const appLocationConfig = {
  customLocationName: "Custom Name",
}
const filterSettings = {
  toggles: [
    {
      label: "Include Categories",
      state: true
    },
    {
      label: "Include Items",
      state: true
    },
    {
      label: "Only Under Threshold",
      state: false
    },
  ],
  searchString: "",
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // props: { appNavigation, appInfo, userInfo, authUser,
    //   locationKioskName: appLocationConfig.customLocationName,
    // },
    props: true,
    children: [
      {
        path: '',
        component: () => import('src/FullUserDetails/IndexPage.vue'),
        props: { appNavigation, appInfo, library }
      },
      {
        path: '/inventory',
        component: () => import('src/FullUserDetails/InventoryPage.vue'),
        props: { appNavigation, filterSettings, library }
      },
      {
        path: '/account',
        component: () => import('src/FullUserDetails/ProfilePage.vue'),
        // props: { appNavigation, userInfo,
        //   locationKioskName: appLocationConfig.customLocationName,
        // }
        props: true,
      },
      {
        path: '/app',
        component: () => import('src/FullUserDetails/MarketingDownloadApp.vue'),
        // component: () => import('FullUserDetails/ErrorNotFound.vue'),
        props: { }
      },
      {
        path: '/admin',
        component: () => import('src/FullUserDetails/AdminPage.vue'),
        // component: () => import('FullUserDetails/ErrorNotFound.vue'),
        props: { }
      },
      {
        path: '/login',
        component: () => import('src/FullUserDetails/LoginPage.vue'),
        props: { }
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/FullUserDetails/ErrorNotFound.vue')
  }
];

export default routes;
</script>
