import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  
  {
    navCap: 'Your Contacts',
  },
  {
    displayName: 'Contacts',
    iconName: 'contacts',
    route: '/ui-components/badge',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
];
