import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Package,
  MapPin,
  User,
  Lock,
  LogOut,
  Truck,
} from 'lucide-react';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../store/slices/authSlice';

const accountNavItems = [
  { to: '/account', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/account/orders', label: 'Order History', icon: Package },
  { to: '/account/track-order', label: 'Track Order', icon: Truck },
  { to: '/account/profile', label: 'Profile', icon: User },
  { to: '/account/addresses', label: 'Saved Addresses', icon: MapPin },
  { to: '/account/password', label: 'Change Password', icon: Lock },
];

export function AccountLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <aside className="lg:w-64 flex-shrink-0">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">My Account</p>
            <p className="font-semibold text-gray-900 mt-1">{user?.name || 'Guest'}</p>
            <p className="text-sm text-gray-600 truncate">{user?.email}</p>
          </div>
          <nav className="py-2">
            {accountNavItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-accent-600 hover:bg-red-50 w-full border-l-4 border-transparent"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
