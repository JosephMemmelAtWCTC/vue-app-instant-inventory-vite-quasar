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
const appInfo = {
  appTitle: "Instant Inventory",
    appVersion: "Vue App v4.0 (Demo)",
}
const appPageConfigSettings = {
  profileName: "Test Testerson",
    customName: "Custom Name",
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
    props: { appNavigation, appInfo },
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        props: { appNavigation, appInfo, library }
      },
      {
        path: '/inventory',
        component: () => import('pages/InventoryPage.vue'),
        props: { appNavigation, filterSettings, library }
      },
      {
        path: '/app',
        component: () => import('pages/MarketingDownloadApp.vue'),
        // component: () => import('pages/ErrorNotFound.vue'),
        props: { }
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
</script>
