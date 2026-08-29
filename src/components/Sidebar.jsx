import React, { useState } from 'react'
import { 
  Search, 
  LayoutGrid, 
  Sparkles, 
  ChevronLeft,
  Shirt,
  Users,
  Trash2,
  ChevronDown,
  LogOut,
  Package,
  CalendarDays,
  Receipt,
  RotateCcw,
  BarChart3,
  Settings,
  Scissors,
  Wrench
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const { user, users, items, setItems, setLogoutConfirm } = useAuth()

  // Dynamic Link Style
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 group relative ${
      isActive
        ? 'bg-white text-stone-900 shadow-sm border border-stone-200/60 font-semibold'
        : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/40'
    } ${isCollapsed ? 'justify-center px-0' : ''}`

  return (
    <aside
      className={`relative h-screen bg-[#F8F9FA] border-r border-stone-200/70 p-4 flex flex-col justify-between transition-all duration-300 font-sans ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Toggle Button on Border */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-6 z-30 w-7 h-7 bg-white border border-stone-200 rounded-full flex items-center justify-center shadow-sm text-stone-500 hover:text-stone-800 transition-transform duration-300 hover:scale-105 cursor-pointer"
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        <ChevronLeft
          className={`w-4 h-4 transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Top Content Area */}
      <div className="flex flex-col gap-5 overflow-y-auto custom-scrollbar p-2">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-1 pt-1">
          <img className="w-10 h-10 object-contain" src={logo} alt="BONITA Logo" />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-stone-900 text-sm tracking-tight leading-none">
                BONITA
              </span>
              <span className="text-[10px] text-stone-400 font-medium">Rental System</span>
            </div>
          )}
        </div>

        {/* Quick Search */}
        {!isCollapsed ? (
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-3 text-stone-400" />
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full bg-stone-200/50 focus:bg-white text-stone-800 placeholder-stone-400 text-xs pl-8 pr-3 py-2 rounded-xl border border-transparent focus:border-stone-200 outline-none transition-all"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <button className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-200/50">
              <Search className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SECTION 1: OVERVIEW */}
        <div className="flex flex-col gap-1">
          {!isCollapsed && (
            <span className="text-[10px] font-semibold tracking-wider text-stone-400 px-3 uppercase">
              Main
            </span>
          )}
          <NavLink to="dashboard" className={getNavLinkClass}>
            <LayoutGrid className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && <span>Overview</span>}
          </NavLink>
          
          <NavLink to="calendar" className={getNavLinkClass}>
            <CalendarDays className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && <span>Rental Schedule</span>}
          </NavLink>
        </div>

        {/* SECTION 2: RENTAL OPERATIONS */}
        <div className="flex flex-col gap-1">
          {!isCollapsed && (
            <span className="text-[10px] font-semibold tracking-wider text-stone-400 px-3 uppercase">
              Rentals & Booking
            </span>
          )}
          
          {/* Active / Pending Rentals */}
          <NavLink to="activerentals" className={getNavLinkClass}>
            <Shirt className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && (
              <div className="flex justify-between items-center w-full">
                <span>Active Rentals</span>
                <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-medium">
                  5 Pending
                </span>
              </div>
            )}
          </NavLink>

          {/* Fitting Appointments */}
          <NavLink to="fittings" className={getNavLinkClass}>
            <Scissors className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && <span>Fitting Appointments</span>}
          </NavLink>

          {/* Returns & Overdue Tracking */}
          <NavLink to="returnsandoverdue" className={getNavLinkClass}>
            <RotateCcw className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && (
              <div className="flex justify-between items-center w-full">
                <span>Returns & Overdue</span>
                <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md font-medium">
                  2 Due
                </span>
              </div>
            )}
          </NavLink>
        </div>

        {/* SECTION 3: INVENTORY & CATALOG */}
        <div className="flex flex-col gap-1">
          {!isCollapsed && (
            <span className="text-[10px] font-semibold tracking-wider text-stone-400 px-3 uppercase">
              Catalog & Stock
            </span>
          )}
          <NavLink to="inventory" className={getNavLinkClass}>
            <Package className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && (
              <div className="flex justify-between items-center w-full">
                <span>Gowns & Inventory</span>
                <span className="text-[10px] bg-stone-200/60 px-1.5 py-0.5 rounded-md text-stone-600 font-normal">
                {items?.length || 0}
                </span>
              </div>
            )}
          </NavLink>

          {/* Maintenance & Dry Cleaning */}
          <NavLink to="laundry" className={getNavLinkClass}>
            <Wrench className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && <span>Laundry & Maintenance</span>}
          </NavLink>
        </div>

        {/* SECTION 4: MANAGEMENT & PAYMENTS */}
        <div className="flex flex-col gap-1">
          {!isCollapsed && (
            <span className="text-[10px] font-semibold tracking-wider text-stone-400 px-3 uppercase">
              Management
            </span>
          )}
          <NavLink to="users" className={getNavLinkClass}>
            <Users className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && (
              <div className="flex justify-between items-center w-full">
                <span>Users & Clients</span>
                <span className="text-[10px] bg-stone-200/60 px-1.5 py-0.5 rounded-md text-stone-600 font-normal">
                  {users?.length || 0}
                </span>
              </div>
            )}
          </NavLink>

          <NavLink to="payments" className={getNavLinkClass}>
            <Receipt className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && <span>Transactions & Payments</span>}
          </NavLink>
        </div>

        {/* SECTION 5: SYSTEM & REPORTS */}
        <div className="flex flex-col gap-1">
          {!isCollapsed && (
            <span className="text-[10px] font-semibold tracking-wider text-stone-400 px-3 uppercase">
              System
            </span>
          )}
          <NavLink to="reports" className={getNavLinkClass}>
            <BarChart3 className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && <span>Reports & Analytics</span>}
          </NavLink>

          <NavLink to="trash" className={getNavLinkClass}>
            <Trash2 className="w-4 h-4 text-stone-500 group-[.active]:text-red-500 flex-shrink-0" />
            {!isCollapsed && <span>Trash Bin</span>}
          </NavLink>
          
          <NavLink to="settings" className={getNavLinkClass}>
            <Settings className="w-4 h-4 text-stone-500 group-[.active]:text-violet-600 flex-shrink-0" />
            {!isCollapsed && <span>Settings</span>}
          </NavLink>
        </div>

        {/* Promo / Quick Card */}
        {!isCollapsed && (
          <div className="mt-2 bg-indigo-50/60 border border-indigo-100 rounded-2xl p-3.5 flex flex-col gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-violet-600 shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-stone-800">
                System Status
              </p>
              <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                All rental bookings active & synchronized.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Profile Area */}
      <div className="pt-3 border-t border-stone-200/60 relative">
        <div
          onClick={() => setOpenUserMenu(!openUserMenu)}
          className={`flex items-center gap-3 p-1.5 rounded-xl hover:bg-stone-200/50 cursor-pointer transition-colors ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {user?.picture ? (
              <img
                src={user?.picture}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
            )}

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-stone-800 truncate">
                  {user?.name || 'Admin User'}
                </span>
                <span className="text-[10px] text-stone-400 truncate">
                  Store Manager
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          )}
        </div>

        {/* User Popup Menu */}
        {openUserMenu && (
          <div className="absolute bottom-12 left-0 right-0 bg-white border border-stone-200 rounded-xl p-1 shadow-lg text-xs space-y-0.5 z-40">
            <button 
              onClick={() => {
                setOpenUserMenu(false)
                setLogoutConfirm(true)
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left cursor-pointer font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar