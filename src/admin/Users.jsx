import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Mail, 
  MapPin, 
  Phone, 
  Trash2, 
  Users as UsersIcon, 
  Filter,
  Search,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useUsers } from '../context/UserContext';

const Users = ({ setTheme }) => {
  const { users, deleteUser } = useUsers();

  const [openSelect, setOpenSelect] = useState(false);
  const [filterRole, setFilterRole] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Close Filter Dropdown on Outside Click
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenSelect(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter & Search Logic
  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === 'All' ? true : user.role?.toLowerCase() === filterRole.toLowerCase();
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Role Badge Color Helper
  const getRoleBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20';
      case 'staff':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
      case 'utility':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700';
    }
  };

  return (
    <div className="w-full bg-stone-50/50 dark:bg-[#0C1221] p-6 transition-colors duration-300 font-sans">
      <div className="space-y-6">
        
        {/* Top Control Bar (Search & Filter) */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-[#121A2B] p-4 rounded-2xl border border-stone-200/80 dark:border-white/5 shadow-sm">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search by name, email, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-50 dark:bg-[#151C2D] border border-stone-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-800 dark:text-white placeholder-stone-400 focus:outline-none focus:border-violet-500 transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <button
              onClick={() => setOpenSelect(!openSelect)}
              className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 bg-stone-50 dark:bg-[#151C2D] border border-stone-200 dark:border-white/10 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span>Role: <strong className="capitalize text-stone-900 dark:text-white">{filterRole}</strong></span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openSelect ? 'rotate-180' : ''}`} />
            </button>

            {openSelect && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#121A2B] border border-stone-200 dark:border-white/10 rounded-xl shadow-xl p-1 z-30 animate-in fade-in zoom-in-95 duration-150 space-y-0.5">
                {['All', 'staff', 'utility', 'admin'].map((roleItem) => (
                  <button
                    key={roleItem}
                    onClick={() => {
                      setFilterRole(roleItem);
                      setOpenSelect(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs capitalize transition-colors flex items-center justify-between ${
                      filterRole.toLowerCase() === roleItem.toLowerCase()
                        ? 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 font-semibold'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{roleItem}</span>
                    {filterRole.toLowerCase() === roleItem.toLowerCase() && (
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Users Table Container */}
        <div className="bg-white dark:bg-[#121A2B] border border-stone-200/80 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* Header */}
              <thead>
                <tr className="border-b border-stone-200/80 dark:border-white/5 bg-stone-50/50 dark:bg-[#151C2D]/50 text-[11px] font-semibold text-stone-400 dark:text-stone-400 uppercase tracking-wider">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">User Name</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-stone-200/60 dark:divide-white/5 text-xs text-stone-700 dark:text-stone-300">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-stone-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <UsersIcon className="w-8 h-8 stroke-1 text-stone-300 dark:text-stone-600" />
                        <p>No users found matching your filter criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-stone-50/80 dark:hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* ID */}
                      <td className="py-4 px-6 font-mono text-[11px] text-stone-400">
                        #{user.id}
                      </td>

                    {/* Name & Avatar */}
                    <td className="py-4 px-6 font-medium text-stone-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        {/* BUMABASA NG PICTURE URL O INITIALS FALLBACK */}
                        {user.picture || user.avatar ? (
                          <img
                            src={user.picture || user.avatar}
                            alt={user.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-stone-200 dark:ring-white/10 flex-shrink-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}


                        <div 
                          className={`w-8 h-8 rounded-full bg-stone-800 text-white font-semibold text-[11px] flex items-center justify-center flex-shrink-0 ${
                            user.picture || user.avatar ? 'hidden' : 'flex'
                          }`}
                        >
                          {user.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : 'U'}
                        </div>

                        <span className="truncate max-w-[160px]">{user.name}</span>
                      </div>
                    </td>

                      {/* Email & Phone */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                          <Mail className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                          <span className="truncate max-w-[180px]">{user.email || 'N/A'}</span>
                        </div>
                        {user.contact && (
                          <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
                            <Phone className="w-3 h-3 text-stone-400 flex-shrink-0" />
                            <span>{user.contact}</span>
                          </div>
                        )}
                      </td>

                      {/* Address */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                          <span className="truncate max-w-[200px]">{user.address || 'Not specified'}</span>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${getRoleBadgeStyle(user.role)}`}>
                          {user.role || 'User'}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Users;