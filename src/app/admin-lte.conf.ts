export const adminLteConf = {
  skin: 'blue',
  // isSidebarLeftCollapsed: false,
  // isSidebarLeftExpandOnOver: false,
  // isSidebarLeftMouseOver: false,
  // isSidebarLeftMini: true,
  // sidebarRightSkin: 'dark',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  // layout: 'normal',
  sidebarLeftMenu: [
    {label: 'MAIN NAVIGATION', separator: true},
    {label: 'Demo', route: '/', iconClasses: 'fa fa-dashboard'},
    {label: 'Templates', route: 'templates', iconClasses: 'fa fa-file-text-o'},
    {label: 'Mail Groups', route: '/groups', iconClasses: 'fa fa-envelope'},

    {label: 'SEND EMAIL', separator: true},
    {label: 'Send', route: 'email/send', iconClasses: 'fa fa-send-o'},
    {label: 'History', route: 'email/history', iconClasses: 'fa fa-history'},

    // {label: 'Layout', iconClasses: 'fa fa-th-list', children: [
    //     {label: 'Configuration', route: 'layout/configuration'},
    //     {label: 'Custom', route: 'layout/custom'},
    //     {label: 'Header', route: 'layout/header'},
    //     {label: 'Sidebar Left', route: 'layout/sidebar-left'},
    //     {label: 'Sidebar Right', route: 'layout/sidebar-right'},
    //     {label: 'Content', route: 'layout/content'}
    //   ]},
    // {label: 'COMPONENTS', separator: true},
    // {label: 'Accordion', route: 'accordion', iconClasses: 'fa fa-tasks'},
    // {label: 'Alert', route: 'alert', iconClasses: 'fa fa-exclamation-triangle'},
    // {label: 'Boxs', iconClasses: 'fa fa-files-o', children: [
    //     {label: 'Default Box', route: 'boxs/box'},
    //     {label: 'Info Box', route: 'boxs/info-box'},
    //     {label: 'Small Box', route: 'boxs/small-box'}
    //   ]},
    // {label: 'Dropdown', route: 'dropdown', iconClasses: 'fa fa-arrows-v'},
    // {label: 'Form', iconClasses: 'fa fa-files-o', children: [
    //     {label: 'Input Text', route: 'form/input-text'}
    // ]},
    // {label: 'Tabs', route: 'tabs', iconClasses: 'fa fa-th'}
  ]
};
