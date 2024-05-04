const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // props: { appNavigation, appInfo, userInfo, authUser,
    //   locationKioskName: appLocationConfig.customLocationName,
    // },
    // props: true,
    children: [
      {
        path: '/',
        component: () => import('src/Pages/IndexPage.vue'),
        // props: true,
        // props: { appNavigation, appInfo, library }
      },
      {
        path: '/inventory',
        component: () => import('src/Pages/InventoryPage.vue'),
        props: true,
        // props: { appNavigation, filterSettings, library }
      },
      {
        path: '/account',
        component: () => import('src/Pages/ProfilePage.vue'),
        // props: { appNavigation, userInfo,
        //   locationKioskName: appLocationConfig.customLocationName,
        // }
        // props: true,
      },
      {
        path: '/app',
        component: () => import('src/Pages/MarketingDownloadApp.vue'),
        // component: () => import('Pages/ErrorNotFound.vue'),
        // props: { }
      },
      {
        path: '/admin',
        component: () => import('src/Pages/AdminPage.vue'),
        // component: () => import('Pages/ErrorNotFound.vue'),
        // props: { }
      },
      {
        path: '/login',
        component: () => import('src/Pages/LoginPage.vue'),
        // props: { }
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/Pages/ErrorNotFound.vue')
  }
];

export default routes;
