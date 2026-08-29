import React, { useState, useEffect, useRef } from 'react';
import { 
  ArchiveRestore, 
  Ellipsis, 
  Trash2, 
  Trash as TrashIcon, 
  Users as UsersIcon, 
  Package, 
  Box, 
  Search,
  Mail,
  Shield
} from 'lucide-react';
import { useUsers } from '../context/UserContext';

// Dummy static data para sa Inventory Trash (Frontend Mockup)
const initialDummyInventoryTrash = [
  { id: 'INV-001', name: 'Ergonomic Office Chair', category: 'Furniture', quantity: 5, SKU: 'FUR-EOC-001' },
  { id: 'INV-002', name: 'Mechanical Keyboard RGB', category: 'Electronics', quantity: 12, SKU: 'ELE-MKR-002' },
  { id: 'INV-003', name: 'Wireless Optical Mouse', category: 'Accessories', quantity: 8, SKU: 'ACC-WOM-003' },
];

const Trash = () => {
  const { 
    trashUsers = [], 
    fetchTrashUsers, 
    restoreUser, 
    permanentDeleteUser 
  } = useUsers();

  // Active Tab State: 'users' or 'inventory'
  const [activeTab, setActiveTab] = useState('users');

  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // Local state para sa Mockup Inventory Trash
  const [inventoryTrash, setInventoryTrash] = useState(initialDummyInventoryTrash);

  // Popover Dropdown State (Para sa 3 Dots Menu)
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Close Popover dropdown kapag nag-click sa labas
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock handlers para sa Inventory (Frontend Only)
  const handleRestoreInventory = (id) => {
    setInventoryTrash(prev => prev.filter(item => item.id !== id));
    setActiveMenuId(null);
  };

  const handlePermanentDeleteInventory = (id) => {
    setInventoryTrash(prev => prev.filter(item => item.id !== id));
    setActiveMenuId(null);
  };

  // Filtered Lists base sa Search Term
  const filteredUsers = trashUsers.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInventory = inventoryTrash.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.SKU?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full  dark:bg-[#0C1221] p-6 transition-colors duration-300 font-sans">
      <div className=" space-y-6">
        
        {/* Module Header, Search Bar & Tab Switcher */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white dark:bg-[#121A2B] p-4 rounded-2xl border border-stone-200/80 dark:border-white/5 shadow-sm">
          
          {/* Header Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
              <TrashIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 dark:text-white">Recycling Bin</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Manage and restore deleted users or inventory items.
              </p>
            </div>
          </div>

          {/* Search Input & Navigation Tabs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder={activeTab === 'users' ? 'Search users...' : 'Search items or SKU...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-50 dark:bg-[#151C2D] border border-stone-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-800 dark:text-white placeholder-stone-400 focus:outline-none focus:border-violet-500 transition-all"
              />
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-stone-100 dark:bg-[#151C2D] p-1 rounded-xl border border-stone-200/60 dark:border-white/5 w-full sm:w-auto">
              <button
                onClick={() => { setActiveTab('users'); setActiveMenuId(null); }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'users'
                    ? 'bg-white dark:bg-[#121A2B] text-stone-900 dark:text-white shadow-sm font-semibold'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                }`}
              >
                <UsersIcon className="w-3.5 h-3.5" />
                <span>Users ({trashUsers.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('inventory'); setActiveMenuId(null); }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'inventory'
                    ? 'bg-white dark:bg-[#121A2B] text-stone-900 dark:text-white shadow-sm font-semibold'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Inventory ({inventoryTrash.length})</span>
              </button>
            </div>

          </div>
        </div>

        {/* ================= TAB 1: USERS TRASH ================= */}
        {activeTab === 'users' && (
          filteredUsers.length === 0 ? (
            <div className="bg-white dark:bg-[#121A2B] border border-stone-200/80 dark:border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-white/5 text-stone-400 flex items-center justify-center">
                <UsersIcon className="w-6 h-6 stroke-1" />
              </div>
              <h3 className="text-sm font-semibold text-stone-800 dark:text-white">
                {searchTerm ? 'No matching users found' : 'No deleted users'}
              </h3>
              <p className="text-xs text-stone-400 max-w-sm">
                {searchTerm ? 'Try checking your search keywords or clear the filter.' : 'There are no user accounts in the bin right now.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 ss:grid-cols-1 xx:grid-cols-1 tt:grid-cols-2 pp:grid-cols-2 md:grid-cols-5 gap-2 items-start">
              {filteredUsers.map((user) => {
                return (
                  <div 
                    key={user.id} 
                    className="bg-white dark:bg-[#121A2B] border border-stone-200/80 dark:border-white/5 rounded-2xl p-4 shadow-sm transition-all duration-200 relative"
                  >
                    {/* Upper User Details */}
                    <div className="flex items-start gap-3.5">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        {user.picture ? (
                          <img
                            className="w-11 h-11 rounded-full object-cover ring-2 ring-stone-200/80 dark:ring-white/10"
                            referrerPolicy="no-referrer"
                            src={user.picture}
                            alt={user.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}

                        <div 
                          className={`w-11 h-11 rounded-full bg-stone-800 text-white font-semibold text-xs flex items-center justify-center ${
                            user.picture ? 'hidden' : 'flex'
                          }`}
                        >
                          {user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : 'U'}
                        </div>
                      </div>

                      {/* Main Info */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="text-xs font-semibold text-stone-900 dark:text-white truncate pr-6">
                          {user.name}
                        </h3>
                        <p className="text-[11px] text-stone-400 truncate">
                          {user.email}
                        </p>
                        
                        <div>
                          <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-300 border border-stone-200/70 dark:border-white/10">
                            {user.role || 'User'}
                          </span>
                        </div>
                      </div>

                      {/* 3 DOTS MENU (ELLIPSIS) */}
                      <div className="absolute right-3 top-3" ref={activeMenuId === user.id ? menuRef : null}>
                        <button
                          onClick={() => setActiveMenuId(prev => (prev === user.id ? null : user.id))}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <Ellipsis className="w-4 h-4" />
                        </button>

                        {activeMenuId === user.id && (
                          <div className="absolute right-0 top-8 z-30 w-44 bg-white dark:bg-[#151C2D] border border-stone-200 dark:border-white/10 rounded-xl shadow-xl p-1 space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                            {/* RESTORE OPTION */}
                            <button 
                              onClick={() => {
                                restoreUser(user.id);
                                setActiveMenuId(null);
                              }}    
                              className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-stone-700 dark:text-stone-200 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-500/10 dark:hover:text-violet-400 rounded-lg transition-colors cursor-pointer font-medium text-left"
                            >
                              <ArchiveRestore className="w-3.5 h-3.5" />
                              <span>Restore User</span>
                            </button>
                            
                            {/* DELETE FOREVER OPTION */}
                            <button 
                              onClick={() => {
                                permanentDeleteUser(user.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer font-medium text-left"
                            > 
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete Forever</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* DIRECTLY VISIBLE DETAILS PANEL */}
                    <div className="mt-3 pt-3 border-t border-stone-100 dark:border-white/5 space-y-2 text-xs">
                      <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-stone-50 dark:bg-[#151C2D]">
                        <span className="text-stone-400 font-mono text-[11px]">User ID</span>
                        <span className="font-mono text-stone-700 dark:text-stone-300 font-medium truncate max-w-[150px]">#{user.id}</span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-stone-50 dark:bg-[#151C2D]">
                        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                          <Mail className="w-3 h-3 text-stone-400" />
                          <span>Email</span>
                        </div>
                        <span className="text-stone-700 dark:text-stone-300 font-medium truncate max-w-[140px]">{user.email || 'N/A'}</span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-stone-50 dark:bg-[#151C2D]">
                        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                          <Shield className="w-3 h-3 text-stone-400" />
                          <span>Role</span>
                        </div>
                        <span className="text-stone-700 dark:text-stone-300 font-semibold uppercase text-[10px]">{user.role || 'User'}</span>
                      </div>

                      <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-stone-50 dark:bg-[#151C2D]">
                        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                          <TrashIcon className="w-3 h-3 text-red-500" />
                          <span>Status</span>
                        </div>
                        <span className="text-red-500 dark:text-red-400 font-medium text-[11px]">Soft Deleted</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )
        )}

        {/* ================= TAB 2: INVENTORY TRASH (FRONTEND MOCKUP) ================= */}
        {activeTab === 'inventory' && (
          filteredInventory.length === 0 ? (
            <div className="bg-white dark:bg-[#121A2B] border border-stone-200/80 dark:border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-white/5 text-stone-400 flex items-center justify-center">
                <Box className="w-6 h-6 stroke-1" />
              </div>
              <h3 className="text-sm font-semibold text-stone-800 dark:text-white">
                {searchTerm ? 'No matching items found' : 'Inventory Trash is empty'}
              </h3>
              <p className="text-xs text-stone-400 max-w-sm">
                {searchTerm ? 'Try checking your search keywords or clear the filter.' : 'No deleted inventory items found in the recycling bin.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 ss:grid-cols-1 xx:grid-cols-1 tt:grid-cols-2 pp:grid-cols-2 md:grid-cols-3 gap-4 items-start">
              {filteredInventory.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white dark:bg-[#121A2B] border border-stone-200/80 dark:border-white/5 rounded-2xl p-4 shadow-sm transition-all duration-200 relative flex items-start gap-3.5"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 font-semibold text-xs border border-amber-200/60 dark:border-amber-500/20">
                    <Box className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-xs font-semibold text-stone-900 dark:text-white truncate pr-6">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-stone-400 font-mono">
                      SKU: {item.SKU}
                    </p>
                    
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-300 border border-stone-200/70 dark:border-white/10">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400">
                        Qty: <strong>{item.quantity}</strong>
                      </span>
                    </div>
                  </div>

                  {/* 3 Dots Menu for Inventory */}
                  <div className="absolute right-3 top-3" ref={activeMenuId === item.id ? menuRef : null}>
                    <button
                      onClick={() => setActiveMenuId(prev => (prev === item.id ? null : item.id))}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <Ellipsis className="w-4 h-4" />
                    </button>

                    {activeMenuId === item.id && (
                      <div className="absolute right-0 top-8 z-30 w-44 bg-white dark:bg-[#151C2D] border border-stone-200 dark:border-white/10 rounded-xl shadow-xl p-1 space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                        <button 
                          onClick={() => handleRestoreInventory(item.id)}    
                          className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-stone-700 dark:text-stone-200 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-500/10 dark:hover:text-amber-400 rounded-lg transition-colors cursor-pointer font-medium text-left"
                        >
                          <ArchiveRestore className="w-3.5 h-3.5" />
                          <span>Restore Item</span>
                        </button>
                        
                        <button 
                          onClick={() => handlePermanentDeleteInventory(item.id)}
                          className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer font-medium text-left"
                        > 
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Permanently</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      </div>
    </div>
  );
};

export default Trash;